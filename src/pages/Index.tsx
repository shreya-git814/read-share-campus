
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import BookSearch from '@/components/Books/BookSearch';
import FeaturedBooks from '@/components/Books/FeaturedBooks';
import { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { BookOpen, BookMarked, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demo purposes
const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    author: 'John Smith',
    description: 'A comprehensive introduction to computer science fundamentals.',
    price: 45.99,
    condition: 'Very Good',
    department: 'Computer Science',
    course: 'CS101',
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=300',
    sellerId: 'user1',
    sellerName: 'Alice Johnson',
    createdAt: new Date(),
    isFeatured: true
  },
  {
    id: '2',
    title: 'Calculus for Engineers',
    author: 'Robert Brown',
    description: 'Advanced calculus concepts for engineering students.',
    price: 38.50,
    condition: 'Good',
    department: 'Mathematics',
    course: 'MATH202',
    coverImage: 'https://images.unsplash.com/photo-1613125700782-8394bec16894?q=80&w=300',
    sellerId: 'user2',
    sellerName: 'Mark Wilson',
    createdAt: new Date(),
    isFeatured: true
  },
  {
    id: '3',
    title: 'Principles of Economics',
    author: 'Sarah Miller',
    description: 'Introduction to micro and macroeconomic principles.',
    price: 52.25,
    condition: 'Like New',
    department: 'Business',
    course: 'ECON101',
    coverImage: 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=300',
    sellerId: 'user3',
    sellerName: 'David Chen',
    createdAt: new Date(),
    isFeatured: true
  },
  {
    id: '4',
    title: 'Organic Chemistry',
    author: 'Michael Green',
    description: 'A detailed examination of organic chemistry concepts.',
    price: 64.99,
    condition: 'Fair',
    department: 'Science',
    course: 'CHEM303',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300',
    sellerId: 'user4',
    sellerName: 'Jessica Taylor',
    createdAt: new Date(),
    isFeatured: true
  },
];

const Index = () => {
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  
  const handleSearch = (query: string, filters: any) => {
    console.log('Searching for:', query, 'with filters:', filters);
    // In a real app, this would trigger an API call or state update
  };
  
  const handleWishlistToggle = (bookId: string) => {
    setWishlisted(prev => 
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Find & Exchange <span className="text-primary-600">Campus Books</span> With Ease
              </h1>
              <p className="text-lg text-gray-700 max-w-lg">
                The student-friendly marketplace for buying and selling second-hand academic books. Save money and help fellow students.
              </p>
              
              <div className="pt-2">
                <BookSearch onSearch={handleSearch} />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/books">
                  <Button size="lg" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Browse Books
                  </Button>
                </Link>
                <Link to="/book-upload">
                  <Button size="lg" variant="outline" className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5" />
                    Sell Your Books
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600" 
                alt="Students with books" 
                className="rounded-lg shadow-xl max-h-96 object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <FeaturedBooks 
        books={MOCK_BOOKS} 
        wishlisted={wishlisted}
        onWishlistToggle={handleWishlistToggle}
      />
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              CampusBooks makes it simple to buy and sell your academic books
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookMarked className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Books</h3>
              <p className="text-gray-600">
                Take a photo, set your price and provide details about the condition of your book.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Buyers</h3>
              <p className="text-gray-600">
                Receive messages from interested students and arrange a meeting on campus.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exchange & Save</h3>
              <p className="text-gray-600">
                Meet safely on campus, exchange books and save money while helping other students.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="outline">Learn More About the Process</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-teal-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of students who are already saving money by buying and selling their textbooks on CampusBooks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-primary-700">
                Create an Account
              </Button>
            </Link>
            <Link to="/books">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
