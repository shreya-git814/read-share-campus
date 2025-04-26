
import React, { useState, useRef } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { UploadCloud, ImagePlus, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type BookCondition = 'New' | 'Like New' | 'Very Good' | 'Good' | 'Fair' | 'Poor';

const BookUpload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<BookCondition>('Good');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageURL, setCoverImageURL] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImageURL(URL.createObjectURL(file));
    }
  };
  
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!coverImage) newErrors.coverImage = 'Book cover image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Mock form submission - in a real app, this would be an API call
    console.log('Submitting book:', {
      title,
      author,
      description,
      price: parseFloat(price),
      condition,
      course,
      department,
      coverImage
    });
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <>
      <Header isAuthenticated={true} />
      
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">List Your Book</h1>
            <p className="text-gray-600">Fill out the details below to list your book for sale</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Book Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Book Title*
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                      placeholder="e.g. Introduction to Psychology"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.title}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                      Author*
                    </label>
                    <input
                      id="author"
                      name="author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className={`input-field ${errors.author ? 'border-red-500' : ''}`}
                      placeholder="e.g. John Smith"
                    />
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.author}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)*
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`input-field ${errors.price ? 'border-red-500' : ''}`}
                      placeholder="e.g. 45.99"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.price}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Condition*
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as BookCondition)}
                      className="input-field"
                    >
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        id="department"
                        name="department"
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="input-field"
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                      </label>
                      <input
                        id="course"
                        name="course"
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="input-field"
                        placeholder="e.g. CS101"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Image Upload and Description */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Book Cover Image*
                    </label>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        coverImageURL ? 'border-primary-300 bg-primary-50' : 'border-gray-300 hover:border-primary-300 bg-gray-50'
                      } cursor-pointer transition-colors ${errors.coverImage ? 'border-red-300 bg-red-50' : ''}`}
                      onClick={openFilePicker}
                    >
                      {coverImageURL ? (
                        <div className="relative">
                          <img
                            src={coverImageURL}
                            alt="Book cover preview"
                            className="mx-auto max-h-48 rounded-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity rounded-md flex items-center justify-center">
                            <div className="bg-white p-2 rounded-full transform translate-y-8 opacity-0 hover:translate-y-0 hover:opacity-100 transition-all">
                              <ImagePlus className="h-5 w-5 text-primary-600" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6">
                          <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                    </div>
                    
                    {errors.coverImage && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.coverImage}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                      placeholder="Describe the book condition, any highlights or notes, etc."
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <Link to="/dashboard">
                  <Button type="button" variant="outline" className="mr-3">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4" /> List Book
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BookUpload;
