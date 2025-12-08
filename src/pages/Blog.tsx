import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPosts, categories } from '@/data/mockData';
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategory = searchParams.get('category');

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !activeCategory || post.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category.toLowerCase()) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-card/50 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
              Blog
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore our collection of articles covering technology, development, and industry insights.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:w-72"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={activeCategory === category.toLowerCase() ? 'default' : 'outline'}
                    className="cursor-pointer transition-colors"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} featured />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
