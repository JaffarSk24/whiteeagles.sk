# White Eagles & Co. Landing Page

Multilingual landing page for White Eagles & Co. s.r.o. (IT & Marketing Services).

## Tech Stack

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Vanilla CSS (CSS Variables)
- **Routing**: React Router DOM
- **I18n**: i18next (English, Slovak, Russian)
- **SEO**: react-helmet-async
- **Icons**: Lucide React
- **Backend**: PHP (for Mailgun & Recaptcha)

## Project Structure

- `src/components`: Reusable UI components (Header, Footer, OrderForm, SEO).
- `src/pages`: Page components (Home, ServiceDetail).
- `src/data`: Static data for Services and Portfolio.
- `src/locales`: Translation JSON files.
- `public/api`: PHP backend scripts.

## Setup & Development

### 1. Install Dependencies

```bash
npm install
# Note: If you encounter peer dependency issues with React 19, use:
npm install --legacy-peer-deps
```

### 2. Run Local Development Server

```bash
npm run dev
```

Access the site at `http://localhost:5173`.

### 3. Backend Setup (Local)

To test the PHP email sending locally, you need a PHP server running in the `public` directory.

```bash
cd public
php -S localhost:8000
```

Then update the fetch URL in `src/components/OrderForm.tsx` to `http://localhost:8000/api/send-mail.php` (or configure vite proxy).
_Note: In production (Hetzner), just upload the `dist` folder contents and `public/api` folder to your web root._

### 4. Build for Production

```bash
npm run build
```

Upload the `dist` folder to your customized Hetzner setup.

## Configuration

### Mailgun & Recaptcha

The PHP backend script is located at `public/api/send-mail.php`.
Open this file and configure your API keys:

- `$MAILGUN_API_KEY`
- `$MAILGUN_DOMAIN`
- `$RECAPTCHA_SECRET`

Or set them as environment variables on your server.
