/**
 * AEM Content Fragment API Client
 * Handles fetching content fragments from Adobe Experience Manager
 */

const AEM_ENDPOINT = process.env.AEM_ENDPOINT || '';
const AEM_TOKEN = process.env.AEM_TOKEN || '';
const AEM_PUBLISH_ENDPOINT = process.env.AEM_PUBLISH_ENDPOINT || '';

/**
 * Type definitions for expected AEM Content Fragment fields
 */
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImageUrl: string;
}

export interface NavLink {
  label: string;
  url: string;
}

export interface Navigation {
  logo: string;
  links: NavLink[];
}

export interface CarModel {
  name: string;
  tagline: string;
  imageUrl: string;
  ctaLink: string;
}

export interface Feature {
  title: string;
  description: string;
  iconUrl: string;
}

export interface FeatureSection {
  headline: string;
  features: Feature[];
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface Footer {
  copyrightText: string;
  links: FooterLink[];
}

export interface VolvoHomepageContent {
  hero: HeroContent;
  navigation: Navigation;
  carModels: CarModel[];
  features: FeatureSection;
  footer: Footer;
}

/**
 * Fetch content fragment from AEM using GraphQL
 * @param fragmentPath - Path to the content fragment in AEM DAM
 * @returns Promise with the content fragment data
 */
export async function getContentFragment(fragmentPath: string): Promise<any> {
  if (!AEM_ENDPOINT && !AEM_PUBLISH_ENDPOINT) {
    console.error('AEM_ENDPOINT or AEM_PUBLISH_ENDPOINT not configured');
    throw new Error('AEM endpoint not configured');
  }

  const endpoint = AEM_PUBLISH_ENDPOINT || AEM_ENDPOINT;

  const query = `
    query {
      contentFragmentByPath(_path: "${fragmentPath}") {
        item {
          __typename
          _path
          _metadata {
            stringMetadata {
              name
              value
            }
          }
          ... on VolvoHomepage {
            heroHeadline: headline
            heroSubheadline: subheadline
            heroCtaText: ctaText
            heroCtaUrl: ctaUrl
            heroBackgroundImage: backgroundImageUrl
            navLogo: logo
            navLinksTitle: linksTitle
            navLinks: navigationLinks {
              linkLabel: label
              linkUrl: url
            }
            carModelsTitle: modelsTitle
            carModelsList: models {
              modelName: name
              modelTagline: tagline
              modelImage: imageUrl
              modelCta: ctaLink
            }
            featuresHeadline: headline
            featuresList: featureItems {
              featureTitle: title
              featureDesc: description
              featureIcon: iconUrl
            }
            footerCopyright: copyrightText
            footerLinksTitle: linksTitle
            footerLinksList: footerLinks {
              linkLabel: label
              linkUrl: url
            }
          }
        }
      }
    }
  `;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (AEM_TOKEN) {
    headers['Authorization'] = `Bearer ${AEM_TOKEN}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`AEM API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0].message}`);
    }

    return data.data?.contentFragmentByPath?.item || null;
  } catch (error) {
    console.error('Failed to fetch content fragment:', error);
    throw error;
  }
}

/**
 * Fetch multiple content fragments with filtering
 * @param fragmentType - Type of content fragment to fetch
 * @returns Promise with array of content fragments
 */
export async function getContentFragments(fragmentType: string): Promise<any[]> {
  if (!AEM_ENDPOINT && !AEM_PUBLISH_ENDPOINT) {
    console.error('AEM_ENDPOINT or AEM_PUBLISH_ENDPOINT not configured');
    throw new Error('AEM endpoint not configured');
  }

  const endpoint = AEM_PUBLISH_ENDPOINT || AEM_ENDPOINT;

  const query = `
    query {
      contentFragmentList(limit: 100) {
        items {
          __typename
          _path
          _metadata {
            stringMetadata {
              name
              value
            }
          }
        }
      }
    }
  `;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (AEM_TOKEN) {
    headers['Authorization'] = `Bearer ${AEM_TOKEN}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`AEM API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0].message}`);
    }

    return data.data?.contentFragmentList?.items || [];
  } catch (error) {
    console.error('Failed to fetch content fragments:', error);
    throw error;
  }
}

/**
 * Transform raw AEM response to typed content structure
 */
export function transformAEMContent(aemData: any): VolvoHomepageContent {
  return {
    hero: {
      headline: aemData.heroHeadline || 'Welcome to Volvo',
      subheadline: aemData.heroSubheadline || 'Luxury and safety combined',
      ctaText: aemData.heroCtaText || 'Explore Models',
      ctaUrl: aemData.heroCtaUrl || '/models',
      backgroundImageUrl: aemData.heroBackgroundImage || '/images/hero-bg.jpg',
    },
    navigation: {
      logo: aemData.navLogo || '/logo.svg',
      links: aemData.navLinks || [],
    },
    carModels: aemData.carModelsList || [],
    features: {
      headline: aemData.featuresHeadline || 'Why Choose Volvo',
      features: aemData.featuresList || [],
    },
    footer: {
      copyrightText: aemData.footerCopyright || '© 2024 Volvo Cars',
      links: aemData.footerLinksList || [],
    },
  };
}