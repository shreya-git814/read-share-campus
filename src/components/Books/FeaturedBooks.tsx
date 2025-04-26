
import React from 'react';
import { ArrowRight } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '@/lib/types';
import { Link } from 'react-router-dom';

type FeaturedBooksProps = {
  books: Book[];
  wishlisted?: string[];
  onWishlistToggle?: (bookId: string) => void;
};

const FeaturedBooks = ({ books, wishlisted = [], onWishlistToggle }: FeaturedBooksProps) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Books</h2>
          <Link to="/books" className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard 
              key={book.id}
              book={book}
              isWishlisted={wishlisted.includes(book.id)}
              onWishlistToggle={onWishlistToggle}
              className={`transition-all duration-300 delay-${index * 100}`}
            />
          ))}
        </div>
        
        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured books at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
