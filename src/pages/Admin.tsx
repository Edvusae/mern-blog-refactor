import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockPosts, categories } from '@/data/mockData';
import { Post } from '@/types/blog';
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Search,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: categories[0],
  });

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
      excerpt: newPost.excerpt,
      content: newPost.content,
      category: newPost.category,
      author: {
        id: 'admin',
        name: 'Admin User',
      },
      tags: [],
      publishedAt: new Date().toISOString(),
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', excerpt: '', content: '', category: categories[0] });
    setIsCreateDialogOpen(false);
    toast({
      title: 'Post created',
      description: 'Your post has been created successfully.',
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
    toast({
      title: 'Post deleted',
      description: 'The post has been deleted.',
    });
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Posts', value: posts.length, change: '+12%' },
    { label: 'Total Views', value: '24.5K', change: '+8%' },
    { label: 'Comments', value: '847', change: '+23%' },
    { label: 'Subscribers', value: '1,234', change: '+15%' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn isAdmin />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <div className="p-6">
            <h2 className="font-heading text-lg font-semibold">Admin Panel</h2>
          </div>
          <nav className="space-y-1 px-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {activeTab === 'dashboard' && (
              <div>
                <h1 className="mb-6 font-heading text-2xl font-bold">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-border bg-card p-6"
                    >
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <Badge variant="secondary" className="text-xs text-primary">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="font-heading text-2xl font-bold">Posts</h1>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10"
                      />
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          New Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Create New Post</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={newPost.title}
                              onChange={(e) =>
                                setNewPost({ ...newPost, title: e.target.value })
                              }
                              placeholder="Enter post title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                              id="excerpt"
                              value={newPost.excerpt}
                              onChange={(e) =>
                                setNewPost({ ...newPost, excerpt: e.target.value })
                              }
                              placeholder="Brief description of the post"
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                              id="content"
                              value={newPost.content}
                              onChange={(e) =>
                                setNewPost({ ...newPost, content: e.target.value })
                              }
                              placeholder="Write your post content..."
                              rows={8}
                            />
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button
                              variant="outline"
                              onClick={() => setIsCreateDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleCreatePost}>Create Post</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="font-medium hover:text-primary"
                            >
                              {post.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{post.category}</Badge>
                          </TableCell>
                          <TableCell>{post.author.name}</TableCell>
                          <TableCell>
                            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h1 className="mb-6 font-heading text-2xl font-bold">Users</h1>
                <p className="text-muted-foreground">
                  User management will be available after connecting to a backend.
                </p>
              </div>
            )}

            {activeTab === 'comments' && (
              <div>
                <h1 className="mb-6 font-heading text-2xl font-bold">Comments</h1>
                <p className="text-muted-foreground">
                  Comment moderation will be available after connecting to a backend.
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="mb-6 font-heading text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                  Site settings will be available after connecting to a backend.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
