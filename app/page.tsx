import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CarModels from '@/components/CarModels';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { getContentFragment, transformAEMContent, VolvoHomepageContent } from '@/lib/aem';

/**
 * Fetch AEM content at build time (ISR compatible)
 * Falls back to default content if AEM is unavailable
 */
async function getPageContent(): Promise<VolvoHomepageContent> {
  const defaultContent: VolvoHomepageContent = {
    hero: {
      headline: 'The All-New Volvo Experience',
      subheadline: 'Innovation in every drive. Safety in every moment.',
      ctaText: 'Explore Models',
      ctaUrl: '#models',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1400&q=80',
    },
    navigation: {
      logo: '',
      links: [
        { label: 'Models', url: '#models' },
        { label: 'Features', url: '#features' },
        { label: 'About', url: '#about' },
        { label: 'Contact', url: '#contact' },
      ],
    },
    carModels: [
      {
        name: 'XC90',
        tagline: 'Premium luxury SUV with advanced safety features',
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&q=80',
        ctaLink: '/models/xc90',
      },
      {
        name: 'S90',
        tagline: 'Elegant sedan combining performance and comfort',
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80',
        ctaLink: '/models/s90',
      },
      {
        name: 'XC60',
        tagline: 'Versatile midsize luxury SUV for modern families',
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&q=80',
        ctaLink: '/models/xc60',
      },
    ],
    features: {
      headline: 'Why Choose Volvo',
      features: [
        {
          title: 'Safety First',
          description: 'Advanced safety technology designed to protect you and your loved ones',
          iconUrl: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=100&q=80',
        },
        {
          title: 'Sustainability',
          description: 'Committed to reducing environmental impact with electric and hybrid options',
          iconUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&q=80',
        },
        {
          title: 'Innovation',
          description: 'Cutting-edge technology and design for the modern driver',
          iconUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80',
        },
      ],
    },
    footer: {
      copyrightText: '© 2024 Volvo Cars. All rights reserved.',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Contact', url: '/contact' },
      ],
    },
  };

  try {
    // Attempt to fetch from AEM
    const aemPath = '/content/dam/volvo/homepage';
    const aemContent = await getContentFragment(aemPath);

    if (aemContent) {
      return transformAEMContent(aemContent);
    }
  } catch (error) {
    console.warn('Failed to fetch AEM content, using default:', error);
  }

  return defaultContent;
}

export default async function Home() {
  const content = await getPageContent();

  return (
    <main>
      <Navigation logo={content.navigation.logo} links={content.navigation.links} />
      <Hero {...content.hero} />
      <CarModels models={content.carModels} />
      <Features {...content.features} />
      <Footer {...content.footer} />
    </main>
  );
}