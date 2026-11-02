'use client';
import React from 'react';
import { Send } from 'lucide-react';

const NewsletterPage = () => {
  return (
    <section className="py-20 bg-[#14532D] text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Stay Connected. Keep Making a Difference.
        </h2>
        
        <p className="text-[#DCFCE7] text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and discover upcoming community events, inspiring stories, and new opportunities to make a positive impact.
        </p>

        {/* UI Only Form */}
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3.5 rounded-xl text-[#172B3A] bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            required
          />
          <button
            type="submit"
            className="bg-[#F59E0B] hover:bg-amber-600 text-[#172B3A] font-bold px-7 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Subscribe <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* Decorative Blob */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default NewsletterPage;