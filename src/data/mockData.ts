import { Post, Author, User } from '@/types/blog';

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior tech writer with 10+ years of experience covering emerging technologies.',
  },
  {
    id: '2',
    name: 'James Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer and open source advocate.',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What to Expect in 2025',
    slug: 'future-web-development-2025',
    excerpt: 'Explore the cutting-edge technologies and trends shaping the future of web development, from AI-powered tools to revolutionary frameworks.',
    content: `
# The Future of Web Development

The web development landscape is evolving at an unprecedented pace. As we look ahead to 2025, several transformative trends are reshaping how we build and deploy web applications.

## AI-Powered Development

Artificial intelligence is no longer just a buzzword—it's becoming an integral part of the development workflow. From code completion to automated testing, AI tools are enhancing developer productivity.

## The Rise of Edge Computing

Edge computing is changing how we think about application architecture. By processing data closer to users, we can achieve faster response times and better user experiences.

## WebAssembly Goes Mainstream

WebAssembly continues to gain traction, enabling near-native performance in the browser. This opens doors for more complex applications that previously required native development.

## Conclusion

The future of web development is bright, filled with innovations that will make our applications faster, smarter, and more accessible than ever before.
    `,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    author: mockAuthors[0],
    category: 'Technology',
    tags: ['Web Development', 'AI', 'Future Tech'],
    publishedAt: '2024-12-01T10:00:00Z',
    comments: [],
    featured: true,
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Modern Architecture',
    slug: 'building-scalable-apis',
    excerpt: 'Learn the best practices for designing and implementing APIs that can handle millions of requests while maintaining performance.',
    content: `
# Building Scalable APIs

Creating APIs that scale requires careful planning and the right architectural decisions.

## Key Principles

1. **Statelessness**: Each request should contain all information needed
2. **Caching**: Implement intelligent caching strategies
3. **Load Balancing**: Distribute traffic effectively

## Best Practices

Focus on clean, consistent API design that developers love to use.
    `,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
    author: mockAuthors[1],
    category: 'Backend',
    tags: ['API', 'Architecture', 'Scalability'],
    publishedAt: '2024-11-28T14:30:00Z',
    comments: [],
    featured: false,
  },
  {
    id: '3',
    title: 'Mastering React Performance Optimization',
    slug: 'react-performance-optimization',
    excerpt: 'Deep dive into React performance techniques that will make your applications blazingly fast.',
    content: `
# React Performance Optimization

Performance is crucial for user experience. Here's how to optimize your React apps.

## Virtual DOM and Reconciliation

Understanding how React updates the DOM is key to optimization.

## Memoization Techniques

Use React.memo, useMemo, and useCallback strategically.
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    author: mockAuthors[0],
    category: 'Frontend',
    tags: ['React', 'Performance', 'JavaScript'],
    publishedAt: '2024-11-25T09:00:00Z',
    comments: [],
    featured: true,
  },
];

export const mockUser: User = {
  id: '1',
  email: 'admin@blog.com',
  name: 'Admin User',
  role: 'admin',
};

export const categories = ['Technology', 'Frontend', 'Backend', 'DevOps', 'Career', 'Tutorial'];
