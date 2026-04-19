'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CarModel } from '@/lib/aem';

interface CarModelsProps {
  models: CarModel[];
}

export default function CarModels({ models }: CarModelsProps) {
  if (!models || models.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-volvo-dark">
            Explore Our Models
          </h2>
          <p className="text-center text-gray-600">No models available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-volvo-dark">
          Explore Our Models
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Model Image */}
              {model.imageUrl ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={model.imageUrl}
                    alt={model.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-64 w-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}

              {/* Model Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-volvo-dark mb-2">
                  {model.name}
                </h3>
                <p className="text-gray-600 mb-4">{model.tagline}</p>

                {/* CTA Link */}
                <Link href={model.ctaLink || '#'}>
                  <button className="w-full bg-volvo-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}