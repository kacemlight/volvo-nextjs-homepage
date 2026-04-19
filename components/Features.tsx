'use client';

import Image from 'next/image';
import { FeatureSection } from '@/lib/aem';

export default function Features({
  headline,
  features,
}: FeatureSection) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-volvo-dark">
          {headline}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover what makes Volvo the choice for discerning drivers
        </p>

        {features && features.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Feature Icon */}
                {feature.iconUrl && (
                  <div className="relative h-16 w-16 mx-auto mb-4">
                    <Image
                      src={feature.iconUrl}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Feature Content */}
                <h3 className="text-xl font-bold text-volvo-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">
              Features content coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}