const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, 'src', 'content', 'blog');
const locales = ['sk', 'en', 'ru'];

const imageMapping = {
  'website-cost-2026': 'blog1.webp',
  'wordpress-vs-custom-website': 'blog2.webp',
  'nastavenie-google-analytics-4': 'blog3.webp',
  'cookie-lista-2026-povinnosti': 'blog4.webp'
};

locales.forEach(locale => {
  const localeDir = path.join(contentDir, locale);
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const slug = file.replace('.md', '');
    const imageFile = imageMapping[slug];
    
    if (!imageFile) return;

    const filePath = path.join(localeDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    
    const title = parsed.data.title;
    const altText = `${title} | White Eagles & Co.`;
    const imageMarkdown = `![${altText}](/assets/blog/${imageFile})`;
    
    // Check if image is already added
    if (parsed.content.includes('/assets/blog/')) {
       console.log(`Image already exists in ${locale}/${file}`);
       return;
    }

    const newContent = `${imageMarkdown}\n\n${parsed.content.trim()}`;
    
    const newFileContent = matter.stringify(newContent, parsed.data);
    fs.writeFileSync(filePath, newFileContent);
    console.log(`✅ Added image to ${locale}/${file}`);
  });
});
