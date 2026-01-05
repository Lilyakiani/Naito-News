import Link from 'next/link';
import { Separator } from '../ui/separator';

export const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-transparent text-white mt-12">
      <div className="mx-auto max-w-7xl px-6">
        <Separator className="bg-white/10" />

        <div className="grid grid-cols-1 gap-y-10 py-12 md:grid-cols-4 md:gap-x-8">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold tracking-tighter">Naito Nrews</h3>
            <p className="text-sm text-gray-400 max-w-xs leading-6">
              Delivering innovative solutions for the modern web. Building the
              future, one pixel at a time.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-gray-200">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-gray-200">
              Follow Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Twitter (X)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="py-8 flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center text-[10px] sm:text-xs text-gray-500">
          <p>© 2026 Naito News Inc. All rights reserved.</p>

          <div className="flex gap-x-6">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-gray-300 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
