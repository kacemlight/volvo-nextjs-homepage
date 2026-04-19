# Volvo Cars US Homepage - NextJS + AEM Content Fragments

A modern, responsive web application built with **NextJS 14** and styled with **Tailwind CSS**, seamlessly integrated with **Adobe Experience Manager (AEM)** Content Fragments for dynamic content management.

## 🎯 Project Overview

This project creates a premium Volvo Cars US homepage that:
- Fetches dynamic content from AEM Content Fragments via GraphQL API
- Renders sections including Hero, Navigation, Car Models, Features, and Footer
- Provides a production-ready, performant user experience
- Supports server-side rendering with fallback default content
- Is fully deployable to Vercel or any Node.js hosting platform

## 🚀 Features

- **NextJS 14+ with App Router**: Modern server components and optimized routing
- **AEM Content Fragment Integration**: GraphQL API integration for dynamic content
- **Tailwind CSS**: Utility-first styling for rapid development
- **TypeScript**: Full type safety across the application
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Image Optimization**: Next.js Image component for performance
- **Environment Configuration**: Secure, configurable AEM endpoints and authentication
- **Error Handling**: Graceful fallbacks to default content if AEM is unavailable

## 📋 Requirements

- Node.js 18+ and npm/yarn/pnpm
- AEM Author or Publish instance with Content Fragment Models configured
- Vercel account (for deployment) or Node.js hosting

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kacemlight/volvo-nextjs-homepage.git
cd volvo-nextjs-homepage
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Edit `.env.local` with your AEM configuration:

```
# AEM Content Fragment API Configuration
AEM_ENDPOINT=https://your-aem-instance.adobeaemcloud.com/graphql/execute.json
AEM_TOKEN=your-aem-auth-token
NEXT_PUBLIC_SITE_NAME=volvo-homepage

# Optional: For AEM Publish tier
AEM_PUBLISH_ENDPOINT=https://your-aem-publish.adobeaemcloud.com/graphql/execute.json
```

## 📖 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AEM_ENDPOINT` | Yes | GraphQL endpoint of your AEM Author or Publish instance |
| `AEM_TOKEN` | No | Bearer token for AEM authentication (if required) |
| `AEM_PUBLISH_ENDPOINT` | No | Separate publish tier endpoint (uses `AEM_ENDPOINT` if not set) |
| `NEXT_PUBLIC_SITE_NAME` | No | Site identifier in AEM (default: `volvo-homepage`) |

## 🏃 Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔨 Building

Build for production:

```bash
npm run build
npm run start
```

Or build and run directly:

```bash
npm run build && npm run start
```

## 📦 Project Structure

```
volvo-nextjs-homepage/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage with AEM integration
│   ├── globals.css         # Global styles and Tailwind
├── components/
│   ├── Navigation.tsx      # Top navigation component
│   ├── Hero.tsx            # Hero banner component
│   ├── CarModels.tsx       # Car models grid component
│   ├── Features.tsx        # Features/benefits section
│   └── Footer.tsx          # Footer component
├── lib/
│   └── aem.ts              # AEM GraphQL client and utilities
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── .env.example            # Environment variables template
```

## 🔌 AEM Content Fragment Integration

### Expected Fragment Model Fields

The application expects an AEM Content Fragment Model named **`VolvoHomepage`** with the following fields:

#### Hero Section
- `headline` (Text) - Main headline
- `subheadline` (Text) - Subtitle
- `ctaText` (Text) - Call-to-action button text
- `ctaUrl` (Text) - CTA button URL
- `backgroundImageUrl` (Text) - Hero background image URL

#### Navigation
- `logo` (Text) - Logo image URL
- `navigationLinks` (Content Fragment Reference or JSON) - Array of navigation links with `label` and `url`

#### Car Models
- `models` (Content Fragment Reference or JSON) - Array of car models with:
  - `name` (Text) - Model name
  - `tagline` (Text) - Short description
  - `imageUrl` (Text) - Model image URL
  - `ctaLink` (Text) - Model details link

#### Features Section
- `featuresHeadline` (Text) - Section headline
- `featureItems` (Content Fragment Reference or JSON) - Array of features with:
  - `title` (Text) - Feature title
  - `description` (Text) - Feature description
  - `iconUrl` (Text) - Feature icon URL

#### Footer
- `copyrightText` (Text) - Copyright notice
- `footerLinks` (Content Fragment Reference or JSON) - Array of footer links with `label` and `url`

### Fetching Content

The `lib/aem.ts` file provides utility functions:

- **`getContentFragment(fragmentPath)`**: Fetch a single fragment by path
- **`getContentFragments(fragmentType)`**: Fetch multiple fragments by type
- **`transformAEMContent(aemData)`**: Transform raw AEM response to typed structure

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit: Volvo homepage scaffold"
git push origin main
```

### 2. Connect to Vercel

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure environment variables in Vercel dashboard:
  - `AEM_ENDPOINT`
  - `AEM_TOKEN` (if required)
  - `NEXT_PUBLIC_SITE_NAME`

### 3. Deploy

Vercel will automatically deploy on every push to `main`.

## 🧪 Build Verification

Ensure the project builds without errors:

```bash
npm run build
```

Expected output:
```
> volvo-nextjs-homepage@0.1.0 build
> next build

▲ Next.js 14.x.x
✓ Compiled successfully
✓ Linted successfully
✓ Collecting page data
✓ Generating static pages (5/5)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
...
```

## 🐛 Troubleshooting

### AEM Connection Issues

If the app doesn't fetch AEM content:
1. Verify `AEM_ENDPOINT` is correct and accessible
2. Check AEM authentication token in `AEM_TOKEN`
3. Ensure CORS is enabled on AEM instance
4. Check browser console and server logs for GraphQL errors

The app gracefully falls back to **default content** if AEM is unavailable, so the page will still render.

### Build Errors

- **TypeScript errors**: Run `npm run build` to identify issues
- **Module not found**: Ensure all imports use correct paths and `@/` alias is configured in `tsconfig.json`
- **Tailwind styles not loading**: Verify `tailwind.config.ts` includes correct content paths

## 📝 Component Props and Interfaces

All components are typed with TypeScript interfaces from `lib/aem.ts`:

```typescript
// Hero Component
interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImageUrl: string;
}

// Navigation Component
interface Navigation {
  logo: string;
  links: NavLink[];
}

// And more...
```

## 📞 Support and Contribution

For issues or improvements, please:
1. Create an issue describing the problem
2. Submit a pull request with your solution
3. Ensure code passes linting: `npm run lint`

## 📄 License

This project is proprietary and created for Volvo Cars.

---

**Built with ❤️ by David** | Powered by NextJS + AEM Content Fragments