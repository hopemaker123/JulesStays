"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Cookie, X } from 'lucide-react';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Only run this effect on the client side
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setShowBanner(true);
      // Trigger fade in animation after a small delay
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleClose = (action: 'accepted' | 'declined') => {
    setIsAnimatingOut(true);
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      localStorage.setItem('cookie_consent', action);
      setShowBanner(false);
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  const handleAccept = () => {
    handleClose('accepted');
  };

  const handleDecline = () => {
    handleClose('declined');
  };

  const handleDismiss = () => {
    handleClose('declined');
  };
  
  if (!showBanner) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-500 ease-out",
        "backdrop-blur-xl bg-white/10 border-t border-white/20",
        "shadow-2xl shadow-black/10",
        // Animation classes
        isVisible && !isAnimatingOut ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full",
        isAnimatingOut && "opacity-0 translate-y-4"
      )}
      style={{
        backdropFilter: 'blur(20px)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      }}
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <div className="container mx-auto relative">
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 right-0 p-2 rounded-full hover:bg-white/10 transition-colors duration-200 group"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pr-8">
          <div className="flex items-start gap-3 text-center sm:text-left">
            {/* Cookie Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <Cookie className="h-5 w-5 text-amber-600" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-800">
                🍪 We value your privacy
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                We use cookies to enhance your browsing experience and analyze site traffic. 
                <Link 
                  href="/privacy-policy" 
                  className="text-blue-600 hover:text-blue-800 underline ml-1 font-medium transition-colors duration-200"
                >
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDecline}
              className={cn(
                "bg-white/20 backdrop-blur-sm border-white/30 text-slate-700 hover:bg-white/30 hover:text-slate-800",
                "transition-all duration-200 hover:scale-105 hover:shadow-md"
              )}
            >
              Decline
            </Button>
            <Button 
              size="sm" 
              onClick={handleAccept}
              className={cn(
                "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
                "transition-all duration-200 hover:scale-105 transform"
              )}
            >
              Accept All
            </Button>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      </div>
    </div>
  );
}