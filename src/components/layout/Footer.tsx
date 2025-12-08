import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">Chronicle</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sharing insights and stories from the world of technology and beyond.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog?category=technology" className="text-sm text-muted-foreground hover:text-foreground">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/blog?category=frontend" className="text-sm text-muted-foreground hover:text-foreground">
                  Frontend
                </Link>
              </li>
              <li>
                <Link to="/blog?category=backend" className="text-sm text-muted-foreground hover:text-foreground">
                  Backend
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chronicle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
