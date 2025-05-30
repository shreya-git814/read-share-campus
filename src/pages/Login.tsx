
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthForm from '@/components/Auth/AuthForm';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to CampusBooks!",
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="font-poppins font-bold text-2xl text-primary-700">CampusBooks</span>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm 
            mode="login" 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Microsoft</span>
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
