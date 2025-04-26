
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-poppins font-bold text-xl text-primary-700">CampusBooks</span>
            </Link>
            <p className="text-gray-600 mb-4">
              The student-friendly marketplace for buying and selling second-hand academic books on campus.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 hover:bg-primary-200 transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 hover:bg-primary-200 transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 hover:bg-primary-200 transition-all">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-medium text-gray-900 mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link></li>
              <li><Link to="/books" className="text-gray-600 hover:text-primary-600">Browse Books</Link></li>
              <li><Link to="/book-upload" className="text-gray-600 hover:text-primary-600">Sell a Book</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-primary-600">How It Works</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary-600">FAQs</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h5 className="font-medium text-gray-900 mb-4">Account</h5>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-600 hover:text-primary-600">Login</Link></li>
              <li><Link to="/signup" className="text-gray-600 hover:text-primary-600">Create Account</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-primary-600">Dashboard</Link></li>
              <li><Link to="/wishlist" className="text-gray-600 hover:text-primary-600">Wishlist</Link></li>
              <li><Link to="/messages" className="text-gray-600 hover:text-primary-600">Messages</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-medium text-gray-900 mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                <span className="text-gray-600">Student Center, University Campus, Campus Drive</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <a href="mailto:help@campusbooks.com" className="text-gray-600 hover:text-primary-600">help@campusbooks.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <a href="tel:+11234567890" className="text-gray-600 hover:text-primary-600">(123) 456-7890</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CampusBooks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
