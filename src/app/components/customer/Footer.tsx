import { useState } from 'react';
import { Plane, Mail, Facebook, Instagram, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-foreground/10 rounded-full p-2">
                <Plane className="w-6 h-6" />
              </div>
              <span className="text-xl font-semibold">Tripie Travel & Tours</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                aria-label="TikTok"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="/packages" className="hover:text-primary-foreground transition-colors">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary-foreground transition-colors">
                  Travel Blog
                </a>
              </li>
              <li>
                <a href="/partnership" className="hover:text-primary-foreground transition-colors">
                  Partnership Opportunities
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Get exclusive travel deals and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Tripie Travel & Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
