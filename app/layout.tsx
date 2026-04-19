import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Volvo Cars US - Luxury and Safety Combined',
  description: 'Explore Volvo Cars US. Premium vehicles engineered for safety, performance, and sustainability.',
  keywords: 'Volvo, cars, luxury, safety, vehicles, automotive',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}