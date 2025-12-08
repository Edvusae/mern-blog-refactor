import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenLine, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

const Header = ({ isLoggedIn = false, isAdmin = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PenLine className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold">Chronicle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link to="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin">Dashboard</Link>
                  </Button>
                )}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth?mode=signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
              <Link to="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
              <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
              <div className="flex gap-3 pt-2">
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link to="/admin">Dashboard</Link>
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="flex-1">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <Link to="/auth?mode=signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
