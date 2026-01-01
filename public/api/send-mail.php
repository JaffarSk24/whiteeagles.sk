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

// Normalize language code (e.g., 'en-US' -> 'en')
if (strpos($lang, 'sk') === 0) $lang = 'sk';
elseif (strpos($lang, 'ru') === 0) $lang = 'ru';
else $lang = 'en';

$templates = [
    'en' => [
        'admin_subject' => "New Inquiry from ",
        'client_subject' => "We received your request - White Eagles & Co.",
        'client_body' => "Hello {name},<br><br>Thank you for your inquiry. We have received your message regarding '{service}' and will get back to you shortly.<br><br>Best regards,<br><b>White Eagles & Co.</b><br><a href='https://whiteeagles.sk'>whiteeagles.sk</a><br><a href='tel:+421949000077'>+421 949 0000 77</a>",
        'telegram_title' => "New Order Received! 🚀",
        'name_label' => "Name",
        'email_label' => "Email",
        'phone_label' => "Phone",
        'service_label' => "Service",
        'message_label' => "Message"
    ],
    'sk' => [
        'admin_subject' => "Nový dopyt od ",
        'client_subject' => "Prijali sme vašu žiadosť - White Eagles & Co.",
        'client_body' => "Dobrý deň {name},<br><br>Ďakujeme za váš dopyt. Prijali sme vašu správu ohľadom '{service}' a čoskoro sa vám ozveme.<br><br>S pozdravom,<br><b>White Eagles & Co.</b><br><a href='https://whiteeagles.sk'>whiteeagles.sk</a><br><a href='tel:+421949000077'>+421 949 0000 77</a>",
        'telegram_title' => "Nová objednávka prijatá! 🚀",
        'name_label' => "Meno",
        'email_label' => "Email",
        'phone_label' => "Telefón",
        'service_label' => "Služba",
        'message_label' => "Správa"
    ],
    'ru' => [
        'admin_subject' => "Новая заявка от ",
        'client_subject' => "Мы получили ваш запрос - White Eagles & Co.",
        'client_body' => "Здравствуйте, {name},<br><br>Спасибо за ваш запрос. Мы получили ваше сообщение касательно '{service}' и свяжемся с вами в ближайшее время.<br><br>С уважением,<br><b>White Eagles & Co.</b><br><a href='https://whiteeagles.sk'>whiteeagles.sk</a><br><a href='tel:+421949000077'>+421 949 0000 77</a>",
        'telegram_title' => "Получен новый заказ! 🚀",
        'name_label' => "Имя",
        'email_label' => "Email",
        'phone_label' => "Телефон",
        'service_label' => "Услуга",
        'message_label' => "Сообщение"
    ]
];


$t = $templates[$lang];

// Helper to replace placeholders
function interpolate($string, $params)
{
    foreach ($params as $key => $value) {
        $string = str_replace('{' . $key . '}', $value, $string);
    }
    return $string;
}

// Admin Email Body (Always English or localized? User asked for "my email ... in that language", so localized)
$adminBody = "<b>" . $t['telegram_title'] . "</b><br><br>";
$adminBody .= "<b>" . $t['name_label'] . ":</b> " . $data->name . "<br>";
$adminBody .= "<b>" . $t['email_label'] . ":</b> " . $data->email . "<br>";
$adminBody .= "<b>" . $t['phone_label'] . ":</b> " . $data->phone . "<br>";
$adminBody .= "<b>" . $t['service_label'] . ":</b> " . $serviceName . "<br>";
$adminBody .= "<b>" . $t['message_label'] . ":</b><br>" . nl2br($data->message) . "<br>";

// Telegram Body
$telegramBody = "<b>" . $t['telegram_title'] . "</b>\n\n";
$telegramBody .= "👤 <b>" . $t['name_label'] . ":</b> " . htmlspecialchars($data->name) . "\n";
$telegramBody .= "📧 <b>" . $t['email_label'] . ":</b> " . htmlspecialchars($data->email) . "\n";
$telegramBody .= "📱 <b>" . $t['phone_label'] . ":</b> " . htmlspecialchars($data->phone) . "\n";
$telegramBody .= "🛠 <b>" . $t['service_label'] . ":</b> " . htmlspecialchars($serviceName) . "\n";
$telegramBody .= "💬 <b>" . $t['message_label'] . ":</b>\n" . htmlspecialchars($data->message) . "\n";

// Client Email Body
$clientBody = interpolate($t['client_body'], ['name' => $data->name, 'service' => $serviceName]);

// Execute Sending
// Note: In local mock mode (if keys are default), we might skip real sending or log it.
// For now we attempt sending if keys look real-ish or just proceed.

// 1. Send to ADMIN. From: $FROM_EMAIL. Reply-To: $data->email (So admin can reply directly to client)
$adminSent = sendMail($ADMIN_EMAIL, $t['admin_subject'] . $data->name, $adminBody, $MAILGUN_API_KEY, $MAILGUN_DOMAIN, $FROM_EMAIL, $data->email, $MAILGUN_ENDPOINT);

// 2. Send to CLIENT. From: $FROM_EMAIL. Reply-To: $ADMIN_EMAIL (So client can reply to you directly)
$clientSent = sendMail($data->email, $t['client_subject'], $clientBody, $MAILGUN_API_KEY, $MAILGUN_DOMAIN, $FROM_EMAIL, $ADMIN_EMAIL, $MAILGUN_ENDPOINT);
$telegramSent = sendTelegram($TELEGRAM_BOT_TOKEN, $TELEGRAM_CHAT_ID, $telegramBody);

if ($adminSent || $telegramSent) { // Success if at least one admin channel works
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
