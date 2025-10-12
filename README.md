# BotBuddy Customer Analytics Landing Page

A comprehensive landing page for BotBuddy Customer Analytics - AI-powered Shopify analytics and customer segmentation platform.

## Features

- **SEO Optimized**: Complete SEO implementation with meta tags, structured data, and Open Graph
- **Responsive Design**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized for Core Web Vitals and fast loading
- **PWA Support**: Progressive Web App capabilities with manifest.json
- **Security Headers**: Comprehensive security headers implementation
- **Legal Pages**: Privacy Policy, Terms of Service, Shipping Policy, Cancellation & Refunds
- **Contact System**: Integrated contact form and support information
- **Sitemap**: XML sitemap and human-readable sitemap page

## Pages

- **Homepage**: Main landing page with product overview
- **Contact**: Contact form and business information
- **Privacy Policy**: GDPR-compliant privacy policy
- **Terms of Service**: User agreement and conditions
- **Shipping Policy**: Digital service delivery information
- **Cancellation & Refunds**: Ultra-flexible refund policy
- **Sitemap**: Website navigation and structure
- **404**: Custom error page

## Installation

After cloning the repository, run the following commands:

```bash
yarn install
```

```bash
yarn dev
```

Next.js server will start on `localhost:3000`

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Project Structure

```
packages/landing/
├── src/
│   ├── pages/                 # Next.js pages
│   ├── containers/           # React components
│   ├── common/              # Shared components and utilities
│   └── public/              # Static assets
├── next.config.js           # Next.js configuration
└── package.json            # Dependencies
```

## SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Structured Data**: JSON-LD schema markup
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Robots.txt**: Search engine crawling instructions
- **Sitemap.xml**: XML sitemap for search engines
- **Canonical URLs**: Proper URL canonicalization

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch

### Netlify

```bash
yarn build
yarn export
```

Upload the `out` folder to Netlify.

### Firebase

```bash
yarn build
firebase deploy
```

## Technologies Used

- **Next.js 13**: React framework with App Router
- **React**: Component-based UI library
- **Styled Components**: CSS-in-JS styling
- **TypeScript**: Type-safe JavaScript
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting

## License

This project is licensed under the MIT License.

## Support

For support, email botbuddyteam@gmail.com or call +91 9669664421.
