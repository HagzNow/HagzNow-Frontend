import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative background circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mainColor/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-thirdColor/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

      <div className="text-center space-y-8 relative z-10 max-w-2xl mx-auto">
        
        {/* Animated 404 Section */}
        <div className="relative inline-block">
          <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 dark:text-gray-800 leading-none select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="relative">
              <Ghost className="w-24 h-24 md:w-32 md:h-32 text-mainColor animate-bounce drop-shadow-lg" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/10 rounded-full blur-sm animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Oops! It seems like you've ventured into uncharted territory. 
            The page you're looking for might have been moved or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in slide-in-from-bottom-5 duration-700 delay-200 fade-in">
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-mainColor hover:text-mainColor transition-all duration-300 flex items-center gap-2 font-semibold group bg-transparent cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <Link 
            to="/" 
            className="px-8 py-3 rounded-xl bg-mainColor text-white shadow-lg shadow-mainColor/20 hover:shadow-mainColor/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
