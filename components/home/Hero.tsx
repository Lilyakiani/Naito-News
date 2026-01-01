'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';
import { Sparkles, Shield, Check } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 text-center px-4">
      {/* Badge Section */}
      <div className="flex items-center gap-2 animate-fade-in">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <Badge variant="secondary" className="px-3 py-1">
          Free weekly insights
        </Badge>
      </div>

      {/* Main Heading */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Level up your{' '}
          <span className="text-indigo-500">knowledge skills</span>
        </h1>
        <p className="max-w-[600px] mx-auto text-lg md:text-xl text-muted-foreground">
          Join 12,000+ readers getting weekly tips on building better products.
          No spam, unsubscribe anytime.
        </p>
      </div>

      {/* Subscription Form */}
      <form className="flex flex-col sm:flex-row w-full max-w-md gap-3 mt-2">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-input  px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all focus:ring-2 focus:ring-indigo-400"
        >
          Subscribe
        </button>
      </form>

      {/* Social Proof & Features Section */}
      <div className="flex flex-col items-center gap-6 mt-4 w-full">
        {/* Subscribers Stats */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 pb-6 border-b border-border w-full justify-center">
          <div className="flex -space-x-3 overflow-hidden">
            <Avatar className="ring-2 ring-background w-10 h-10 grayscale hover:grayscale-0 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-background w-10 h-10 grayscale hover:grayscale-0 transition-all">
              <AvatarImage src="https://github.com/maxleiter.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-background w-10 h-10 grayscale hover:grayscale-0 transition-all">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="font-bold text-foreground">12,437</span>
            <span className="text-muted-foreground">subscribers</span>
          </div>

          <div className="hidden md:block h-4 w-px bg-border" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span>No spam, ever</span>
          </div>
        </div>

        {/* Key Points - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-medium text-muted-foreground">
          {['Weekly insights', 'Expert interviews', 'Curated resources'].map(
            (text, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{text}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
