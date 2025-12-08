import { Link } from 'react-router-dom';
import { Post } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface FeaturedPostProps {
  post: Post;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy');

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-secondary/20">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
        </div>
        <div className="flex flex-col justify-center p-6 lg:p-8">
          <Badge className="mb-4 w-fit bg-primary text-primary-foreground">
            Featured
          </Badge>
          <Link to={`/blog/${post.slug}`}>
            <h2 className="mb-4 font-heading text-2xl font-bold leading-tight transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
              {post.title}
            </h2>
          </Link>
          <p className="mb-6 text-muted-foreground lg:text-lg">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </p>
              </div>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="ml-auto flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
            >
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
