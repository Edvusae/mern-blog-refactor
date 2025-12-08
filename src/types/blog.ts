export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  comments: Comment[];
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'author' | 'user';
}
