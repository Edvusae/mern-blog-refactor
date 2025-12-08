import { Link } from 'react-router-dom';
import { Post } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy');

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover-lift">
        <Link to={`/blog/${post.slug}`} className="block">
          <div className="aspect-[16/9] overflow-hidden">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <div className="p-6">
            <Badge variant="secondary" className="mb-3">
              {post.category}
            </Badge>
            <h2 className="mb-2 font-heading text-2xl font-semibold leading-tight transition-colors group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments.length}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex gap-4 border-b border-border pb-6 last:border-0">
      <Link to={`/blog/${post.slug}`} className="shrink-0">
        <div className="h-24 w-32 overflow-hidden rounded-md sm:h-28 sm:w-40">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <Badge variant="outline" className="mb-2 w-fit text-xs">
          {post.category}
        </Badge>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="mb-1 font-heading text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="mb-2 line-clamp-1 text-sm text-muted-foreground sm:line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{post.author.name}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
