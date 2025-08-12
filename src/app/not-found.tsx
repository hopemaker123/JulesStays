//  'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container relative mx-auto flex h-[calc(100vh-8rem)] flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-background/5" />
      </div>
      
      {/* Main Content */}
      <div className="relative space-y-6 backdrop-blur-sm bg-background/30 p-8 rounded-xl border border-muted/20 shadow-lg animate-bounce"
           style={{
             animation: 'bounce 3s ease-in-out infinite',
             animationDelay: '0.5s'
           }}>
        <div className="space-y-4">
          <h1 className="text-9xl font-bold bg-gradient-to-b from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Let's get you back on track.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
            <Link href="/">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-red-200 hover:bg-red-50    dark:border-red-800 dark:hover:bg-red-900/20 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
            <Link href="/contact">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="absolute h-72 w-72 rounded-full bg-red-500/20 blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }} />
        <div className="absolute h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute h-72 w-72 rounded-full bg-pink-500/20 blur-3xl animate-pulse"
             style={{ animationDuration: '8s', animationDelay: '4s' }} />
      </div>
      
      {/* Additional Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
    </div>
  );
}