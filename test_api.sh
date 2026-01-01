curl -X POST http://localhost:8000/api/send-mail.php \
     -H "Content-Type: application/json" \
     -d '{"name": "Test User", "email": "test@example.com", "phone": "+123456789", "service": "Debug Service", "message": "Test message", "language": "en"}'
