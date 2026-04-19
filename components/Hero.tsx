'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HeroContent } from '@/lib/aem';

export default function Hero({
  headline,
  subheadline,
  ctaText,
  ctaUrl,
  backgroundImageUrl,
}: HeroContent) {
  return (
    <section className="relative w-full h-screen overflow-hidden pt-16">
      {/* Background Image */}
      {backgroundImageUrl ? (
        <Image
          src={backgroundImageUrl}
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-volvo-blue to-blue-700" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {subheadline}
          </p>
          <Link href={ctaUrl || '#'}>
            <button className="bg-volvo-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105">
              {ctaText}
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}