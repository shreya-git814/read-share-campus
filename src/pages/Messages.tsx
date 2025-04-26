
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Send, ArrowLeft, Search, BookOpen } from 'lucide-react';
import { Message, Conversation, Book } from '@/lib/types';

// Mock data for demo purposes
const MOCK_USER = {
  id: 'user1',
  name: 'Alice Johnson',
  email: 'alice@university.edu',
  profileImage: 'https://i.pravatar.cc/100?img=1',
};

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'user2',
    participantName: 'Mark Wilson',
    participantImage: 'https://i.pravatar.cc/100?img=2',
    lastMessage: 'Hi, is the Calculus book still available?',
    timestamp: new Date(),
    unreadCount: 0,
  },
  {
    id: 'conv2',
    participantId: 'user3',
    participantName: 'David Chen',
    participantImage: 'https://i.pravatar.cc/100?img=3',
    lastMessage: 'Thanks for the information. Can we meet tomorrow?',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participantId: 'user4',
    participantName: 'Jessica Taylor',
    participantImage: 'https://i.pravatar.cc/100?img=4',
    lastMessage: 'Great! See you at the library.',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    unreadCount: 0,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv1': [
    {
      id: 'msg1',
      senderId: 'user2',
      recipientId: 'user1',
      content: 'Hi, is the Calculus book still available?',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
      bookId: '2'
    },
    {
      id: 'msg2',
      senderId: 'user1',
      recipientId: 'user2',
      content: 'Yes, it\'s still available! Are you interested?',
      timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
      read: true,
    },
    {
      id: 'msg3',
      senderId: 'user2',
      recipientId: 'user1',
      content: 'Great! How much are you selling it for again? And what\'s the condition like?',
      timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
      read: true,
    },
    {
      id: 'msg4',
      senderId: 'user1',
      recipientId: 'user2',
      content: 'I\'m selling it for $38.50. It\'s in good condition with minimal highlighting in the first few chapters.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      read: true,
    },
    {
      id: 'msg5',
      senderId: 'user2',
      recipientId: 'user1',
      content: 'Sounds good. Would you be able to meet tomorrow at the student center?',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      read: true,
    },
  ],
  'conv2': [
    {
      id: 'msg6',
      senderId: 'user3',
      recipientId: 'user1',
      content: 'Hello! I\'m interested in your Economics book. Is it still for sale?',
      timestamp: new Date(Date.now() - 93600000), // 26 hours ago
      read: true,
      bookId: '3'
    },
    {
      id: 'msg7',
      senderId: 'user1',
      recipientId: 'user3',
      content: 'Hi David! Yes, it\'s still available.',
      timestamp: new Date(Date.now() - 90000000), // 25 hours ago
      read: true,
    },
    {
      id: 'msg8',
      senderId: 'user3',
      recipientId: 'user1',
      content: 'Great! Would you be willing to meet on campus to make the exchange?',
      timestamp: new Date(Date.now() - 86500000), // 24 hours ago
      read: true,
    },
    {
      id: 'msg9',
      senderId: 'user1',
      recipientId: 'user3',
      content: 'Sure, I\'m available tomorrow afternoon. Does that work for you?',
      timestamp: new Date(Date.now() - 86400000), // 24 hours ago
      read: true,
    },
    {
      id: 'msg10',
      senderId: 'user3',
      recipientId: 'user1',
      content: 'Thanks for the information. Can we meet tomorrow?',
      timestamp: new Date(Date.now() - 86300000), // 24 hours ago
      read: true,
    },
  ],
};

const MOCK_BOOKS: Record<string, Book> = {
  '2': {
    id: '2',
    title: 'Calculus for Engineers',
    author: 'Robert Brown',
    description: 'Advanced calculus concepts for engineering students.',
    price: 38.50,
    condition: 'Good',
    department: 'Mathematics',
    course: 'MATH202',
    coverImage: 'https://images.unsplash.com/photo-1613125700782-8394bec16894?q=80&w=300',
    sellerId: 'user1',
    sellerName: 'Alice Johnson',
    createdAt: new Date(),
    isFeatured: true
  },
  '3': {
    id: '3',
    title: 'Principles of Economics',
    author: 'Sarah Miller',
    description: 'Introduction to micro and macroeconomic principles.',
    price: 52.25,
    condition: 'Like New',
    department: 'Business',
    course: 'ECON101',
    coverImage: 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=300',
    sellerId: 'user1',
    sellerName: 'Alice Johnson',
    createdAt: new Date(),
    isFeatured: true
  },
};

const Messages = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Set active conversation based on URL param
  useEffect(() => {
    if (conversationId) {
      const conversation = conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
        setMessages(MOCK_MESSAGES[conversationId] || []);
      }
    } else if (conversations.length > 0) {
      setActiveConversation(conversations[0]);
      setMessages(MOCK_MESSAGES[conversations[0].id] || []);
    }
  }, [conversationId, conversations]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input when active conversation changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeConversation]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '' || !activeConversation) return;
    
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: MOCK_USER.id,
      recipientId: activeConversation.participantId,
      content: newMessage,
      timestamp: new Date(),
      read: true,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Update last message in conversations list
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversation.id 
        ? { 
            ...conv, 
            lastMessage: newMessage,
            timestamp: new Date()
          }
        : conv
    ));
  };
  
  // Find related book if any
  const findRelatedBook = (messages: Message[]) => {
    const bookMessage = messages.find(msg => msg.bookId);
    return bookMessage ? MOCK_BOOKS[bookMessage.bookId] : null;
  };
  
  const relatedBook = activeConversation ? findRelatedBook(MOCK_MESSAGES[activeConversation.id] || []) : null;

  return (
    <>
      <Header isAuthenticated={true} />
      
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4 md:hidden">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-200px)]">
            {/* Conversations Sidebar */}
            <div className={`w-full md:w-80 border-r border-gray-200 ${activeConversation ? 'hidden md:block' : ''}`}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Messages</h2>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations"
                    className="input-field pl-9 py-2 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conversation => (
                    <Link
                      key={conversation.id}
                      to={`/messages/${conversation.id}`}
                      className={`flex items-center p-4 hover:bg-gray-50 ${
                        activeConversation?.id === conversation.id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="relative mr-3">
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
                        <div className="flex items-baseline justify-between">
                          <h3 className={`font-medium truncate ${
                            conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {conversation.participantName}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                            {new Date(conversation.timestamp).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${
                          conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                        }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No conversations found</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Thread */}
            <div className={`flex-1 flex flex-col ${!activeConversation ? 'hidden md:flex' : ''}`}>
              {activeConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <Link to="/messages" className="md:hidden mr-3">
                      <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </Link>
                    <img
                      src={activeConversation.participantImage || `https://ui-avatars.com/api/?name=${activeConversation.participantName}`}
                      alt={activeConversation.participantName}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{activeConversation.participantName}</h3>
                      {relatedBook && (
                        <Link to={`/book/${relatedBook.id}`} className="text-xs text-primary-600 hover:underline flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" /> 
                          Re: {relatedBook.title}
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.senderId === MOCK_USER.id ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.senderId !== MOCK_USER.id && (
                          <img
                            src={activeConversation.participantImage || `https://ui-avatars.com/api/?name=${activeConversation.participantName}`}
                            alt={activeConversation.participantName}
                            className="h-8 w-8 rounded-full mr-2 self-end"
                          />
                        )}
                        <div
                          className={`rounded-lg py-2 px-4 max-w-[75%] break-words ${
                            message.senderId === MOCK_USER.id 
                              ? 'bg-primary-600 text-white rounded-br-none' 
                              : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div className={`text-xs mt-1 ${
                            message.senderId === MOCK_USER.id ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        {message.senderId === MOCK_USER.id && (
                          <img
                            src={MOCK_USER.profileImage}
                            alt={MOCK_USER.name}
                            className="h-8 w-8 rounded-full ml-2 self-end"
                          />
                        )}
                      </div>
                    ))}
                    <div ref={messageEndRef}></div>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="input-field resize-none flex-1 py-2"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                        rows={1}
                        ref={inputRef}
                      ></textarea>
                      <Button 
                        type="submit" 
                        disabled={!newMessage.trim()}
                        className="self-end"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                  <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Messages;

function MessageSquare(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
