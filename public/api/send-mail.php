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

// Get JSON Input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || !isset($data->email) || !isset($data->message)) { // Service is optional
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data"]);
    exit;
}

// 1. Verify Recaptcha (Placeholder logic - uncomment when keys available)
/*
if (isset($data->recaptchaToken)) {
   $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
   $response = file_get_contents($verifyUrl . '?secret=' . $RECAPTCHA_SECRET . '&response=' . $data->recaptchaToken);
   $keys = json_decode($response, true);


   if (!$keys['success']) {
       http_response_code(403);
       echo json_encode(["message" => "Recaptcha verification failed"]);
       exit;
   }
}
*/

// Function to send email via Mailgun
function sendMail($to, $subject, $text, $apiKey, $domain, $from) {
    $ch

    curl_setopt($ch, CURLOPT_USERPWD, 'api:' . $apiKey);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch,

    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'from' => $from,
        'to' => $to,
        'subject' => $subject,
        'text' => $text
    ]);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $httpCode === 200;
}

// Function to send Telegram Notification
function sendTelegram($token, $chatId, $message) {
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
 
}

// 2. Prepare Messages
$serviceName = $data->service ?: "Not specified";

// Admin Email Body
$adminBody = "New Inquiry form Website!\n\n";
$adminBody .= "Name: " . $data->name . "\n";
$adminBody .= "Email: " . $data->email . "\n";
$adminBody .= "Service: " . $serviceName . "\n";
$adminBody .= "Message:\n" . $data->message . "\n";

// Telegram Body
$telegramBody = "<b>New Order Received!</b> 🚀\n\n";
$telegramBody .= "👤 <b>Name:</b> " . htmlspecialchars($data->name) . "\n";
$telegramBody .= "📧 <b>Email:</b> " . htmlspecialchars($data->email) . "\n";
$telegramBody .= "🛠 <b>Service:</b> " . htmlspecialchars($serviceName) . "\n";
$telegramBody .= "💬 <b>Message:</b>\n" . htmlspecialchars($data->message) . "\n";

// Client Email Body
$clientSubject = "We received your request - White Eagles & Co.";
$clientBody = "Hello " . $data->name . ",\n\n";
$clientBody .= "Thank you for your inquiry. We have received your message regarding '" . $serviceName . "' and will get back to you shortly.\n\n";
$clientBody .= "Best regards,\nWhite Eagles & Co. Team";

// Execute Sending
// Note: In local mock mode (if keys are default), we might skip real sending or log it.
// For now we attempt sending if keys look real-ish or just proceed.

$adminSent = sendMail($ADMIN_EMAIL, "New Inquiry from " . $data->name, $adminBody, $MAILGUN_API_KEY, $MAILGUN_DOMAIN, $FROM_EMAIL);
$clientSent = sendMail($data->email, $clientSubject, $clientBody, $MAILGUN_API_KEY, $MAILGUN_DOMAIN, $FROM_EMAIL);
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
?>
