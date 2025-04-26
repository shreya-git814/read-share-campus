
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, BookOpen, Flag, BarChart3, Search, Trash2, 
  CheckCircle, XCircle, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book, User } from '@/lib/types';

// Mock data for demo purposes
const MOCK_USERS: User[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    email: 'alice@university.edu',
    profileImage: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 'user2',
    name: 'Mark Wilson',
    email: 'mark@university.edu',
    profileImage: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 'user3',
    name: 'David Chen',
    email: 'david@university.edu',
    profileImage: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: 'user4',
    name: 'Jessica Taylor',
    email: 'jessica@university.edu',
    profileImage: 'https://i.pravatar.cc/100?img=4',
  },
];

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
];

type Report = {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetType: 'book' | 'user';
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: Date;
};

const MOCK_REPORTS: Report[] = [
  {
    id: 'report1',
    reporterId: 'user2',
    reporterName: 'Mark Wilson',
    targetId: '4',
    targetType: 'book',
    reason: 'Misleading description. Book is in worse condition than stated.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: 'report2',
    reporterId: 'user3',
    reporterName: 'David Chen',
    targetId: 'user4',
    targetType: 'user',
    reason: 'User didn\'t show up for scheduled meeting.',
    status: 'pending',
    createdAt: new Date(Date.now() - 172800000) // 2 days ago
  },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter users based on search query
  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter books based on search query
  const filteredBooks = MOCK_BOOKS.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.course?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleReportAction = (reportId: string, action: 'resolve' | 'reject') => {
    // In a real app, this would update the report status
    console.log(`Report ${reportId} ${action}d`);
  };

  return (
    <>
      <Header isAuthenticated={true} />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage users, books, and reports</p>
          </div>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Books
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Flag className="h-4 w-4" /> Reports
                {MOCK_REPORTS.filter(r => r.status === 'pending').length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {MOCK_REPORTS.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Analytics
              </TabsTrigger>
            </TabsList>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="input-field pl-10 py-2 w-full max-w-md"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Books Listed
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img 
                                  src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}`} 
                                  alt={user.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {MOCK_BOOKS.filter(book => book.sellerId === user.id).length}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Books Tab */}
            <TabsContent value="books">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Book
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Seller
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Listed Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Featured
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBooks.map((book) => (
                        <tr key={book.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <img 
                                  src={book.coverImage} 
                                  alt={book.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                <div className="text-sm text-gray-500">{book.author}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${book.price.toFixed(2)}</div>
                            <div className="text-xs text-gray-500">{book.condition}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{book.sellerName}</div>
                            <div className="text-xs text-gray-500">ID: {book.sellerId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(book.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              book.isFeatured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {book.isFeatured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className={book.isFeatured ? "text-gray-600" : "text-primary-600"}
                              >
                                {book.isFeatured ? "Unfeature" : "Feature"}
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredBooks.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No books found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reporter
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reason
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {MOCK_REPORTS.map((report) => (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.reporterName}</div>
                            <div className="text-xs text-gray-500">ID: {report.reporterId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.targetType === 'book' ? 'Book' : 'User'} #{report.targetId}
                            </div>
                            <div className="text-xs text-primary-600 hover:underline cursor-pointer">
                              View {report.targetType}
                            </div>
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <div className="text-sm text-gray-900 truncate">{report.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              {report.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-green-600 hover:bg-green-50"
                                    onClick={() => handleReportAction(report.id, 'resolve')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Resolve
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-600 hover:bg-red-50"
                                    onClick={() => handleReportAction(report.id, 'reject')}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {report.status !== 'pending' && (
                                <span className="text-gray-500 italic">Processed</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {MOCK_REPORTS.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No reports found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Platform Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Total Users</div>
                    <div className="text-2xl font-bold">{MOCK_USERS.length}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Total Books</div>
                    <div className="text-2xl font-bold">{MOCK_BOOKS.length}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Active Listings</div>
                    <div className="text-2xl font-bold">{MOCK_BOOKS.length}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Pending Reports</div>
                    <div className="text-2xl font-bold">{MOCK_REPORTS.filter(r => r.status === 'pending').length}</div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Chart Placeholders */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Users Registration</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">User Registration Chart</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Book Listings by Department</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Books by Department Chart</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Average Book Price by Condition</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Price by Condition Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Admin;
