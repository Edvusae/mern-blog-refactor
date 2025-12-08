import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CommentSection from '@/components/blog/CommentSection';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockPosts } from '@/data/mockData';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams();
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold">Post Not Found</h1>
            <p className="mb-6 text-muted-foreground">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy');
  const readTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="-ml-4">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 pb-12">
          <header className="mx-auto mb-8 max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="mb-6 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </span>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mx-auto mb-10 max-w-4xl overflow-hidden rounded-xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-strong:text-foreground">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="mb-6 mt-10 text-3xl">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="mb-4 mt-8 text-2xl">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
              <span className="text-muted-foreground">Share this article:</span>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Author Bio */}
            <div className="mt-8 rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{post.author.name}</h3>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <CommentSection comments={post.comments} postId={post.id} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
