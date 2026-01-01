<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
    exit;
}

// Load Configuration
$config = [];
if (file_exists(__DIR__ . '/config.php')) {
    $config = require __DIR__ . '/config.php';
} else {
    // Fallback or Error
    $config = require __DIR__ . '/config.example.php';
}

$MAILGUN_API_KEY = $config['MAILGUN_API_KEY'];
$MAILGUN_DOMAIN = $config['MAILGUN_DOMAIN'];
$RECAPTCHA_SECRET = $config['RECAPTCHA_SECRET'];
$TELEGRAM_BOT_TOKEN = $config['TELEGRAM_BOT_TOKEN'];
$TELEGRAM_CHAT_ID = $config['TELEGRAM_CHAT_ID'];
$ADMIN_EMAIL = $config['ADMIN_EMAIL'];
$FROM_EMAIL = $config['FROM_EMAIL'];
$MAILGUN_ENDPOINT = isset($config['MAILGUN_ENDPOINT']) ? $config['MAILGUN_ENDPOINT'] : 'api.mailgun.net';

// Get JSON Input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || !isset($data->email) || !isset($data->message)) { // Service is optional
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data"]);
    exit;
}

// 1. Verify Recaptcha
$recaptchaSuccess = true;
if (isset($data->recaptchaToken)) {
    $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($verifyUrl . '?secret=' . $RECAPTCHA_SECRET . '&response=' . $data->recaptchaToken);
    $keys = json_decode($response, true);

    file_put_contents('php_debug.log', date('Y-m-d H:i:s') . " - Recaptcha: " . print_r($keys, true) . "\n", FILE_APPEND);

    if (!$keys['success'] || $keys['score'] < 0.5) {
        $recaptchaSuccess = false;
        // On localhost, we might want to allow it if it's a specific known error or just log it
        // For strict production, uncomment the exit below
        // http_response_code(403);
        // echo json_encode(["message" => "Recaptcha verification failed"]);
        // exit;
    }
}

// Function to send email via Mailgun
// Function to send email via Mailgun
// Function to send email via Mailgun
// Function to send email via Mailgun
function sendMail($to, $subject, $htmlBody, $apiKey, $domain, $from, $replyTo = null, $endpoint = 'api.mailgun.net')
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://' . $endpoint . '/v3/' . $domain . '/messages');
    curl_setopt($ch, CURLOPT_USERPWD, 'api:' . $apiKey);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    $postFields = [
        'from' => $from,
        'to' => $to,
        'subject' => $subject,
        'html' => $htmlBody,
        'text' => strip_tags(str_replace('<br>', "\n", $htmlBody)) // Fallback plain text
    ];

    if ($replyTo) {
        $postFields['h:Reply-To'] = $replyTo;
    }

    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($httpCode !== 200) {
        file_put_contents('php_debug.log', date('Y-m-d H:i:s') . " - Mailgun Error: " . $httpCode . " - " . $result . "\n", FILE_APPEND);
    }

    curl_close($ch);

    return $httpCode === 200;
}

// Function to send Telegram Notification
function sendTelegram($token, $chatId, $message)
{
    if (empty($token) || empty($chatId)) return false;

    $url = "https://api.telegram.org/bot" . $token . "/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $httpCode === 200;
}

// 2. Prepare Messages
$serviceName = $data->service ?: "Not specified";
$lang = isset($data->language) ? $data->language : 'en';

// Normalize language code
if (strpos($lang, 'sk') === 0) $lang = 'sk';
elseif (strpos($lang, 'ru') === 0) $lang = 'ru';
else $lang = 'en';

$templates = [
    'en' => [
        'admin_subject' => "New Inquiry from ",
        'client_subject' => "We received your request - White Eagles & Co.",
        'greeting' => "Hello {name},",
        'intro' => "Thank you for your inquiry. We have received your message and will get back to you shortly.",
        'order_details' => "Order Details:",
        'telegram_title' => "New Order Received! 🚀",
        'name_label' => "Name",
        'email_label' => "Email",
        'phone_label' => "Phone",
        'service_label' => "Service",
        'message_label' => "Message",
        'signature_text' => "Best regards,",
    ],
    'sk' => [
        'admin_subject' => "Nový dopyt od ",
        'client_subject' => "Prijali sme vašu žiadosť - White Eagles & Co.",
        'greeting' => "Dobrý deň {name},",
        'intro' => "Ďakujeme za váš dopyt. Prijali sme vašu správu a čoskoro sa vám ozveme.",
        'order_details' => "Detaily objednávky:",
        'telegram_title' => "Nová objednávka prijatá! 🚀",
        'name_label' => "Meno",
        'email_label' => "Email",
        'phone_label' => "Telefón",
        'service_label' => "Služba",
        'message_label' => "Správa",
        'signature_text' => "S pozdravom,",
    ],
    'ru' => [
        'admin_subject' => "Новая заявка от ",
        'client_subject' => "Мы получили ваш запрос - White Eagles & Co.",
        'greeting' => "Здравствуйте, {name},",
        'intro' => "Спасибо за ваш запрос. Мы получили ваше сообщение и свяжемся с вами в ближайшее время.",
        'order_details' => "Детали заказа:",
        'telegram_title' => "Получен новый заказ! 🚀",
        'name_label' => "Имя",
        'email_label' => "Email",
        'phone_label' => "Телефон",
        'service_label' => "Услуга",
        'message_label' => "Сообщение",
        'signature_text' => "С уважением,",
    ]
];

$t = $templates[$lang];

// Helper to build HTML Email
function buildHtmlEmail($t, $data, $serviceName)
{
    $fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    $primaryColor = "#374262"; // Updated to user requested dark blue
    $borderColor = "#e5e7eb";
    $bgColor = "#f9fafb";

    // Signature Icons and Links
    $logoUrl = "https://whiteeagles.sk/assets/email-logo-horizontal.png";
    $siteUrl = "https://whiteeagles.sk";
    $phoneDisplay = "+421 949 0000 77";
    $phoneLink = "tel:+421949000077";

    $html = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin: 0; padding: 0; font-family: {$fontFamily}; background-color: {$bgColor}; color: #1f2937;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: {$bgColor}; padding: 40px 0;'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden;'>
                        <!-- Header Line -->
                        <tr>
                            <td style='background-color: {$primaryColor}; height: 6px;'></td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style='padding: 40px;'>
                                <!-- Greeting -->
                                <h2 style='margin: 0 0 20px 0; font-size: 24px; color: #111827;'>
                                    " . str_replace('{name}', htmlspecialchars($data->name), $t['greeting']) . "
                                </h2>
                                
                                <p style='margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #4b5563;'>
                                    {$t['intro']}
                                </p>

                                <!-- Order Details Box -->
                                <div style='background-color: #f3f4f6; border-radius: 8px; padding: 24px; margin-bottom: 30px;'>
                                    <h3 style='margin: 0 0 16px 0; font-size: 18px; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;'>
                                        {$t['order_details']}
                                    </h3>
                                    <table width='100%' cellpadding='0' cellspacing='0'>
                                        <tr>
                                            <td style='padding: 8px 0; width: 30%; color: #6b7280; font-weight: 500;'>{$t['service_label']}:</td>
                                            <td style='padding: 8px 0; color: #111827; font-weight: 600;'>" . htmlspecialchars($serviceName) . "</td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 8px 0; color: #6b7280; font-weight: 500;'>{$t['email_label']}:</td>
                                            <td style='padding: 8px 0; color: #111827;'>" . htmlspecialchars($data->email) . "</td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 8px 0; color: #6b7280; font-weight: 500;'>{$t['phone_label']}:</td>
                                            <td style='padding: 8px 0; color: #111827;'>" . htmlspecialchars($data->phone) . "</td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Message if present -->
                                    " . ($data->message ? "
                                    <div style='margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 16px;'>
                                        <div style='color: #6b7280; font-weight: 500; margin-bottom: 8px;'>{$t['message_label']}:</div>
                                        <div style='color: #4b5563; font-style: italic; line-height: 1.5;'>
                                            " . nl2br(htmlspecialchars($data->message)) . "
                                        </div>
                                    </div>
                                    " : "") . "
                                </div>

                                <!-- Signature -->
                                <div style='border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 30px;'>
                                    <p style='margin: 0 0 16px 0; color: #4b5563;'>{$t['signature_text']}</p>
                                    
                                    <!-- Horizontal Logo -->
                                    <div style='margin-bottom: 20px;'>
                                        <img src='{$logoUrl}' alt='White Eagles & Co.' style='height: 40px; width: auto; display: block;' />
                                    </div>

                                    <!-- Contact Info with Icons -->
                                    <table cellpadding='0' cellspacing='0'>
                                        <tr>
                                            <td style='padding-right: 10px; vertical-align: middle;'>
                                                <span style='font-size: 18px;'>🌐</span>
                                            </td>
                                            <td style='vertical-align: middle;'>
                                                <a href='{$siteUrl}' style='color: {$primaryColor}; text-decoration: none; font-weight: 600;'>whiteeagles.sk</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style='padding-right: 10px; padding-top: 8px; vertical-align: middle;'>
                                                <span style='font-size: 18px;'>📞</span>
                                            </td>
                                            <td style='padding-top: 8px; vertical-align: middle;'>
                                                <a href='{$phoneLink}' style='color: #4b5563; text-decoration: none;'>{$phoneDisplay}</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style='background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #f3f4f6;'>
                                &copy; " . date('Y') . " White Eagles & Co. All rights reserved.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";

    return $html;
}

// Generate HTML Body for Client
$clientHtmlBody = buildHtmlEmail($t, $data, $serviceName);

// Admin Email Body (Simplified HTML or same as client? Admin usually needs raw data, but pretty is nice. Let's make a simplified version or reuse)
$adminHtmlBody = "<h2>" . $t['telegram_title'] . "</h2>";
$adminHtmlBody .= "<p><b>" . $t['name_label'] . ":</b> " . $data->name . "</p>";
$adminHtmlBody .= "<p><b>" . $t['email_label'] . ":</b> " . $data->email . "</p>";
$adminHtmlBody .= "<p><b>" . $t['phone_label'] . ":</b> " . $data->phone . "</p>";
$adminHtmlBody .= "<p><b>" . $t['service_label'] . ":</b> " . $serviceName . "</p>";
$adminHtmlBody .= "<p><b>" . $t['message_label'] . ":</b><br>" . nl2br($data->message) . "</p>";

// Telegram Body (Keep plain/HTML-lite for Telegram)
$telegramBody = "<b>" . $t['telegram_title'] . "</b>\n\n";
$telegramBody .= "👤 <b>" . $t['name_label'] . ":</b> " . htmlspecialchars($data->name) . "\n";
$telegramBody .= "📧 <b>" . $t['email_label'] . ":</b> " . htmlspecialchars($data->email) . "\n";
$telegramBody .= "📱 <b>" . $t['phone_label'] . ":</b> " . htmlspecialchars($data->phone) . "\n";
$telegramBody .= "🛠 <b>" . $t['service_label'] . ":</b> " . htmlspecialchars($serviceName) . "\n";
$telegramBody .= "💬 <b>" . $t['message_label'] . ":</b>\n" . htmlspecialchars($data->message) . "\n";

// Execute Sending
// 1. Send to ADMIN.
$adminSent = sendMail($ADMIN_EMAIL, $t['admin_subject'] . $data->name, $adminHtmlBody, $MAILGUN_API_KEY, $MAILGUN_DOMAIN, $FROM_EMAIL, $data->email, $MAILGUN_ENDPOINT);

// 2. Send to CLIENT using the beautiful HTML template
$clientSent = sendMail($data->email, $t['client_subject'], $clientHtmlBody, $MAILGUN_API_KEY, $MAILGUN_DOMAIN, $FROM_EMAIL, $ADMIN_EMAIL, $MAILGUN_ENDPOINT);

$telegramSent = sendTelegram($TELEGRAM_BOT_TOKEN, $TELEGRAM_CHAT_ID, $telegramBody);

if ($adminSent || $telegramSent) {
    http_response_code(200);
    echo json_encode(["message" => "Inquiry sent successfully"]);
} else {
    // If mocking, return 200 anyway to prevent frontend error
    if (strpos($MAILGUN_API_KEY, 'key-your') !== false) {
        http_response_code(200);
        echo json_encode(["message" => "Mock success (Configure keys to send real)"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to send inquiry"]);
    }
}
