'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NavLink } from '@/lib/aem';

interface NavigationProps {
  logo: string;
  links: NavLink[];
}

export default function Navigation({ logo, links }: NavigationProps) {
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo ? (
              <Image
                src={logo}
                alt="Volvo Cars"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-2xl font-bold text-volvo-blue">Volvo</span>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {links && links.length > 0 ? (
              links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url || '#'}
                  className="text-gray-700 hover:text-volvo-blue transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <>
                <Link href="/" className="text-gray-700 hover:text-volvo-blue transition-colors">
                  Home
                </Link>
                <Link href="/models" className="text-gray-700 hover:text-volvo-blue transition-colors">
                  Models
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-volvo-blue transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-volvo-blue transition-colors">
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* CTA Button */}
          <button className="bg-volvo-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Build & Price
          </button>
        </div>
      </div>
    </nav>
  );
}