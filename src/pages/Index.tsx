import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostCard from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { mockPosts, categories } from '@/data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const featuredPost = mockPosts.find((post) => post.featured);
  const recentPosts = mockPosts.filter((post) => !post.featured).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl animate-fade-in">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Welcome to Chronicle</span>
              </div>
              <h1 className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Stories & Insights from the{' '}
                <span className="text-gradient">Digital Frontier</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Discover thought-provoking articles on technology, development, and the future of the web.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/blog">
                    Explore Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth?mode=signup">Start Writing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <FeaturedPost post={featuredPost} />
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Latest Articles</h2>
              <Button variant="ghost" asChild>
                <Link to="/blog" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-t border-border bg-card/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold md:text-3xl">
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/blog?category=${category.toLowerCase()}`}
                  className="rounded-full border border-border bg-background px-6 py-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center md:p-12">
              <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
                Stay in the Loop
              </h2>
              <p className="mb-6 text-muted-foreground">
                Get the latest articles delivered straight to your inbox. No spam, just quality content.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
