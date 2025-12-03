'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Car, 
  Utensils, 
  Bed, 
  Users, 
  Star, 
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Shield,
  CreditCard,
  HeadphonesIcon,
  Zap,
  DollarSign,
  User,
  LogOut,
  Menu
} from 'lucide-react';

interface HeaderProps {
  user: any;
  onAuthSuccess: (user: any) => void;
  onSignOut: () => void;
  activeTab?: string;
}

export default function Header({ user, onAuthSuccess, onSignOut, activeTab }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    onSignOut();
  };

  const navigation = [
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Services', href: '/services', icon: Car },
    { name: 'Social Hub', href: '/social', icon: Users },
    { name: 'For Suppliers', href: '#suppliers', icon: Shield },
    { name: 'Drive With Us', href: '#drivers', icon: CreditCard }
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">ServiceHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name.toLowerCase() || 
                             (typeof window !== 'undefined' && window.location.pathname === item.href);
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-gray-900 ${
                    isActive ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name ? user.name.split(' ').map(n => n[0]).join('') : user.email?.split('')[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name || user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name.toLowerCase();
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gray-900 hover:bg-gray-50 ${
                      isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
              
              {user && (
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}