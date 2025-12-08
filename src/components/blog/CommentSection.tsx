import { useState } from 'react';
import { Comment } from '@/types/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  isLoggedIn?: boolean;
}

const CommentSection = ({ comments, postId, isLoggedIn = false }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const { toast } = useToast();

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    if (!isLoggedIn) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to leave a comment.',
        variant: 'destructive',
      });
      return;
    }

    // Mock adding comment
    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      author: {
        id: 'current-user',
        name: 'Current User',
      },
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setLocalComments([...localComments, comment]);
    setNewComment('');
    toast({
      title: 'Comment added',
      description: 'Your comment has been posted successfully.',
    });
  };

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold">
        <MessageCircle className="h-6 w-6 text-primary" />
        Comments ({localComments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-8 rounded-lg border border-border bg-card p-4">
        <Textarea
          placeholder={isLoggedIn ? 'Write your comment...' : 'Sign in to leave a comment'}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px] resize-none"
          disabled={!isLoggedIn}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitComment} disabled={!isLoggedIn || !newComment.trim()}>
            Post Comment
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {localComments.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          localComments.map((comment) => (
            <div key={comment.id} className="flex gap-4 rounded-lg border border-border bg-card/50 p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                  </span>
                </div>
                <p className="text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
