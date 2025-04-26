
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, AlertTriangle, ArrowLeft, Share2, Flag } from 'lucide-react';
import { Book } from '@/lib/types';

// Mock data for demo purposes
const MOCK_BOOKS: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'Introduction to Computer Science',
    author: 'John Smith',
    description: 'A comprehensive introduction to computer science fundamentals. This textbook covers algorithms, data structures, and basic programming concepts. It\'s perfect for beginners and includes many practical examples and exercises. The book is in very good condition with minimal highlighting in the first few chapters.',
    price: 45.99,
    condition: 'Very Good',
    department: 'Computer Science',
    course: 'CS101',
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600',
    sellerId: 'user1',
    sellerName: 'Alice Johnson',
    sellerImage: 'https://i.pravatar.cc/100?img=1',
    createdAt: new Date(),
    isFeatured: true
  },
};

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  
  // In a real app, you would fetch book details from an API
  const book = MOCK_BOOKS[bookId || '1']; // Fallback to the first book for demo
  
  if (!book) {
    return (
      <>
        <Header isAuthenticated={true} />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
            <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Link to="/books">
              <Button>Browse Other Books</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };
  
  const handleContactSeller = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the message to the seller
    console.log('Sending message:', message);
    setShowContactForm(false);
    setMessage('');
  };

  return (
    <>
      <Header isAuthenticated={true} />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/books" className="text-gray-600 hover:text-primary-600 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Books
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Book Cover */}
              <div className="p-6 flex items-center justify-center bg-gray-100">
                <img 
                  src={book.coverImage}
                  alt={book.title}
                  className="max-h-96 object-contain"
                />
              </div>
              
              {/* Book Details */}
              <div className="p-6 lg:col-span-2">
                <div className="flex justify-between mb-2">
                  <div className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                    {book.condition}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      title="Share listing"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button 
                      className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      title="Report listing"
                    >
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{book.title}</h1>
                <p className="text-lg text-gray-600 mb-3">by {book.author}</p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold text-primary-700">${book.price.toFixed(2)}</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{book.description}</p>
                </div>
                
                {book.department && book.course && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Course Information</h3>
                    <div className="flex gap-3">
                      <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {book.department}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {book.course}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={book.sellerImage || `https://ui-avatars.com/api/?name=${book.sellerName}`}
                        alt={book.sellerName}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{book.sellerName}</p>
                        <p className="text-xs text-gray-500">
                          Posted {new Date(book.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 flex-wrap">
                    <Button 
                      variant={showContactForm ? "secondary" : "default"}
                      className="flex-grow sm:flex-grow-0"
                      onClick={() => setShowContactForm(!showContactForm)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {showContactForm ? 'Cancel' : 'Contact Seller'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-grow sm:flex-grow-0 ${isWishlisted ? 'border-red-500 text-red-500 hover:bg-red-50' : ''}`}
                      onClick={toggleWishlist}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                      {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>
                </div>
                
                {/* Contact Form */}
                {showContactForm && (
                  <div className="mt-6 animate-fade-in">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Message the Seller</h3>
                      <form onSubmit={handleContactSeller}>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={`Hi ${book.sellerName}, I'm interested in your book "${book.title}". Is it still available?`}
                          className="input-field resize-none h-24 mb-3"
                          required
                        ></textarea>
                        <Button type="submit">Send Message</Button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BookDetails;
