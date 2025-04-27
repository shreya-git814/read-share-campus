
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Book } from '@/lib/types';

type BookCardProps = {
  book: Book;
  isWishlisted?: boolean;
  onWishlistToggle?: (bookId: string) => void;
  className?: string;
};

const BookCard = ({ book, isWishlisted = false, onWishlistToggle, className = '' }: BookCardProps) => {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(book.id);
    }
  };

  // Truncate text for consistent card appearance
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className={`card fade-in-element ${className}`}>
      <Link to={`/book/${book.id}`}>
        <div className="relative">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-48 object-cover"
          />
          <button 
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            onClick={handleWishlistClick}
          >
            <Heart 
              className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
          <div className="absolute bottom-0 left-0 bg-teal-500 text-white text-xs px-2 py-1 m-2 rounded-md">
            {book.condition}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{truncate(book.title, 40)}</h3>
          <p className="text-gray-500 text-sm mb-2">{book.author}</p>
          
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary-700">${book.price.toFixed(2)}</span>
            {book.department && (
              <span className="text-xs bg-gray-100 rounded-full px-2 py-1">{book.department}</span>
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center">
            {book.sellerImage ? (
              <img 
                src={book.sellerImage} 
                alt={book.sellerName} 
                className="h-6 w-6 rounded-full mr-2"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-200 mr-2"></div>
            )}
            <span className="text-xs text-gray-500">{book.sellerName}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
