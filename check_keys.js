const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const messagesDir = path.join(srcDir, 'messages');

const ru = JSON.parse(fs.readFileSync(path.join(messagesDir, 'ru.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
const sk = JSON.parse(fs.readFileSync(path.join(messagesDir, 'sk.json'), 'utf8'));

// Helper to check if a nested key exists
function keyExists(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;
  for (const k of keys) {
    if (current[k] === undefined) return false;
    current = current[k];
  }
  return true;
}

const namespaces = ['common', 'home', 'services', 'portfolio', 'faq', 'contact', 'footer', 'chatbot', 'order', 'privacy', 'cookies', 'terms', 'company', 'home_seo', 'service_meta', 'not_found'];

console.log("Checking structure equality across all 3 locales...");
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], newPrefix));
    } else {
      keys.push(newPrefix);
    }
  }
  return keys;
}

const ruKeys = getAllKeys(ru);
const enKeys = getAllKeys(en);
const skKeys = getAllKeys(sk);

const allPossibleKeys = new Set([...ruKeys, ...enKeys, ...skKeys]);
for (const key of allPossibleKeys) {
  if (!ruKeys.includes(key)) console.log(`Missing in ru: ${key}`);
  if (!enKeys.includes(key)) console.log(`Missing in en: ${key}`);
  if (!skKeys.includes(key)) console.log(`Missing in sk: ${key}`);
}

console.log("Done checking structures!");
