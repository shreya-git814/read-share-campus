
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X, Bell, BookOpen, LogIn, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  isAuthenticated?: boolean;
  unreadMessages?: number;
};

const Header = ({ isAuthenticated = false, unreadMessages = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-poppins font-bold text-lg text-primary-700">CampusBooks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/books" className="text-gray-700 hover:text-primary-600 font-medium">Books</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-primary-600 font-medium">How It Works</Link>
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/messages" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadMessages > 9 ? '9+' : unreadMessages}
                    </span>
                  )}
                </Link>
                <div className="h-6 w-px bg-gray-300 mx-1"></div>
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center gap-2 text-sm">
                    <UserCircle className="h-5 w-5" />
                    <span>Account</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/my-books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Books</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                    <Link to="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Messages</Link>
                    <hr className="my-1" />
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </div>
                </div>
                <Link to="/book-upload">
                  <Button>Sell a Book</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md animate-slide-in">
          <nav className="flex flex-col gap-4 mb-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 py-1">Home</Link>
            <Link to="/books" className="text-gray-700 hover:text-primary-600 py-1">Books</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-primary-600 py-1">How It Works</Link>
          </nav>
          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 py-1">Dashboard</Link>
                <Link to="/messages" className="text-gray-700 hover:text-primary-600 py-1 flex items-center justify-between">
                  Messages
                  {unreadMessages > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </Link>
                <Link to="/book-upload" className="btn-primary text-center py-2 mt-2">Sell a Book</Link>
                <button className="text-gray-700 hover:text-primary-600 py-1 text-left">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-center py-2">Log In</Link>
                <Link to="/signup" className="btn-primary text-center py-2">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
