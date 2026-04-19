'use client';

import Link from 'next/link';
import { Footer as FooterType } from '@/lib/aem';

export default function Footer({
  copyrightText,
  links,
}: FooterType) {
  return (
    <footer className="bg-volvo-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Volvo Cars</h3>
            <p className="text-gray-400 text-sm">
              A leading automotive manufacturer committed to safety, sustainability, and innovation.
            </p>
          </div>

          {/* Footer Links */}
          {links && links.length > 0 ? (
            <>
              {links.slice(0, 3).map((link, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold mb-4">{link.label}</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <Link href={link.url || '#'} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold mb-4">Models</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">All Models</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Compare</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {copyrightText || '© 2024 Volvo Cars. All rights reserved.'}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}