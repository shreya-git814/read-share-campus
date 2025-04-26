
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookCard from '@/components/Books/BookCard';
import { Book, Conversation } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, BookMarked, Settings, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demo purposes
const MOCK_USER = {
  id: 'user1',
  name: 'Alice Johnson',
  email: 'alice@university.edu',
  profileImage: 'https://i.pravatar.cc/100?img=1',
};

const MOCK_USER_BOOKS: Book[] = [
  {
    id: '10',
    title: 'Biology Fundamentals',
    author: 'Patricia Green',
    description: 'An introductory textbook covering basic biological concepts.',
    price: 42.50,
    condition: 'Good',
    department: 'Science',
    course: 'BIO101',
    coverImage: 'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?q=80&w=300',
    sellerId: 'user1',
    sellerName: 'Alice Johnson',
    sellerImage: 'https://i.pravatar.cc/100?img=1',
    createdAt: new Date(),
  },
  {
    id: '11',
    title: 'History of Western Art',
    author: 'Elizabeth Wallace',
    description: 'A survey of Western art from ancient to modern periods.',
    price: 35.00,
    condition: 'Like New',
    department: 'Liberal Arts',
    course: 'ART202',
    coverImage: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=300',
    sellerId: 'user1',
    sellerName: 'Alice Johnson',
    sellerImage: 'https://i.pravatar.cc/100?img=1',
    createdAt: new Date(),
  },
];

const MOCK_WISHLIST_BOOKS: Book[] = [
  {
    id: '5',
    title: 'Advanced Data Structures',
    author: 'Thomas Reed',
    description: 'In-depth coverage of advanced data structures and algorithms.',
    price: 55.75,
    condition: 'Very Good',
    department: 'Computer Science',
    course: 'CS301',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300',
    sellerId: 'user5',
    sellerName: 'Ryan Harris',
    createdAt: new Date(),
  },
];

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'user2',
    participantName: 'Mark Wilson',
    participantImage: 'https://i.pravatar.cc/100?img=2',
    lastMessage: 'Hi, is the Calculus book still available?',
    timestamp: new Date(),
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participantId: 'user3',
    participantName: 'David Chen',
    participantImage: 'https://i.pravatar.cc/100?img=3',
    lastMessage: 'Thanks for the information. Can we meet tomorrow?',
    timestamp: new Date(),
    unreadCount: 0,
  },
];

const Dashboard = () => {
  const [wishlisted, setWishlisted] = useState<string[]>(
    MOCK_WISHLIST_BOOKS.map(book => book.id)
  );
  
  const handleWishlistToggle = (bookId: string) => {
    setWishlisted(prev => 
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <>
      <Header isAuthenticated={true} unreadMessages={2} />
      
      <div className="bg-gray-50 min-h-screen">
        {/* User Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-teal-500 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src={MOCK_USER.profileImage} 
                  alt={MOCK_USER.name} 
                  className="h-16 w-16 rounded-full border-2 border-white mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">{MOCK_USER.name}</h1>
                  <p className="opacity-90">{MOCK_USER.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/book-upload">
                  <Button variant="secondary" className="text-primary-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Upload Book
                  </Button>
                </Link>
                <Link to="/profile-settings">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10 flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="my-books" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="my-books" className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" /> My Books
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" /> Wishlist
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Messages
                {MOCK_CONVERSATIONS.some(conv => conv.unreadCount > 0) && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {MOCK_CONVERSATIONS.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            {/* My Books Tab */}
            <TabsContent value="my-books">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Listed Books</h2>
                  <Link to="/book-upload">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Add Book
                    </Button>
                  </Link>
                </div>
                
                {MOCK_USER_BOOKS.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MOCK_USER_BOOKS.map((book) => (
                      <BookCard 
                        key={book.id} 
                        book={book}
                        isWishlisted={wishlisted.includes(book.id)}
                        onWishlistToggle={handleWishlistToggle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookMarked className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No books listed yet</h3>
                    <p className="text-gray-500 mb-4">Start selling your unused textbooks</p>
                    <Link to="/book-upload">
                      <Button>Upload Your First Book</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                
                {MOCK_WISHLIST_BOOKS.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MOCK_WISHLIST_BOOKS.map((book) => (
                      <BookCard 
                        key={book.id} 
                        book={book}
                        isWishlisted={wishlisted.includes(book.id)}
                        onWishlistToggle={handleWishlistToggle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-4">Save books you're interested in by clicking the heart icon</p>
                    <Link to="/books">
                      <Button>Browse Books</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Messages Tab */}
            <TabsContent value="messages">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Messages</h2>
                
                {MOCK_CONVERSATIONS.length > 0 ? (
                  <div className="divide-y">
                    {MOCK_CONVERSATIONS.map((conversation) => (
                      <Link 
                        key={conversation.id}
                        to={`/messages/${conversation.id}`}
                        className="flex items-center py-4 hover:bg-gray-50 rounded-lg px-3 -mx-3"
                      >
                        <div className="relative mr-4">
                          <img 
                            src={conversation.participantImage || `https://ui-avatars.com/api/?name=${conversation.participantName}`} 
                            alt={conversation.participantName}
                            className="h-12 w-12 rounded-full"
                          />
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 truncate">
                              {conversation.participantName}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(conversation.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No messages yet</h3>
                    <p className="text-gray-500">When you connect with other users, your conversations will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Dashboard;
