
export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  isAdmin?: boolean;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  course?: string;
  department?: string;
  coverImage: string;
  sellerId: string;
  sellerName: string;
  sellerImage?: string;
  createdAt: Date;
  isFeatured?: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  bookId?: string;
};

export type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantImage?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
};
