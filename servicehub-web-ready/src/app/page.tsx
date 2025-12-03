'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Car, 
  Utensils, 
  Bed, 
  Users, 
  Star, 
  ChevronRight,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Shield,
  CreditCard,
  HeadphonesIcon,
  Zap,
  DollarSign,
  User
} from 'lucide-react';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/auth/AuthModal';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const services = [
    {
      id: 'events',
      title: 'Events',
      description: 'Discover and book amazing events in your area',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      features: ['Concerts', 'Workshops', 'Sports', 'Cultural Events']
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Quick and reliable rides at your fingertips',
      icon: Car,
      color: 'bg-blue-100 text-blue-600',
      features: ['Quick Pickup', 'Fixed Pricing', 'Real-time Tracking', '24/7 Service']
    },
    {
      id: 'dining',
      title: 'Dining',
      description: 'Reserve tables at the best restaurants',
      icon: Utensils,
      color: 'bg-orange-100 text-orange-600',
      features: ['Table Reservations', 'Special Offers', 'Cuisine Variety', 'Instant Confirmation']
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      description: 'Find perfect places to stay',
      icon: Bed,
      color: 'bg-green-100 text-green-600',
      features: ['Hotels', 'Apartments', 'Guest Houses', 'Best Price Guarantee']
    }
  ];

  const socialFeatures = [
    {
      icon: Heart,
      title: 'Like & Share',
      description: 'Show appreciation for content and share with friends'
    },
    {
      icon: MessageCircle,
      title: 'Comments',
      description: 'Engage in meaningful conversations'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with like-minded individuals'
    },
    {
      icon: Share2,
      title: 'Real-time Updates',
      description: 'Stay updated with live promotions and events'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      content: 'This platform has transformed how we manage and promote our events. The booking system is seamless!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Restaurant Owner',
      content: 'Our restaurant occupancy has increased by 40% since joining. The subscription model is perfect for businesses.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Frequent User',
      content: 'I love how I can book everything from rides to restaurants in one app. The social features make it even better!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header 
        user={user}
        onAuthSuccess={handleAuthSuccess}
        onSignOut={handleSignOut}
        activeTab="home"
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700">🚀 All-in-One Service Platform</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Book, Connect, and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {' '}Experience More
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your unified platform for booking events, transportation, dining, and accommodation. 
            Connect with others through our social hub and discover amazing experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Start Exploring
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                List Your Service
              </Button>
            </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">🎪 Featured Events</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Discover and book amazing events happening near you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Summer Music Festival',
                date: 'March 25, 2024',
                location: 'Central Park',
                price: 75,
                image: '🎵',
                description: 'Experience the best live music with top artists',
                attendees: 500,
                category: 'Music'
              },
              {
                title: 'Tech Innovation Summit',
                date: 'April 2, 2024',
                location: 'Convention Center',
                price: 120,
                image: '💻',
                description: 'Join industry leaders for the latest in tech',
                attendees: 300,
                category: 'Technology'
              },
              {
                title: 'Food & Wine Festival',
                date: 'April 15, 2024',
                location: 'Riverside Park',
                price: 45,
                image: '🍷',
                description: 'Taste exquisite cuisines and fine wines',
                attendees: 800,
                category: 'Food & Drink'
              },
              {
                title: 'Art & Culture Exhibition',
                date: 'April 8, 2024',
                location: 'City Gallery',
                price: 25,
                image: '🎨',
                description: 'Explore contemporary art from local artists',
                attendees: 200,
                category: 'Arts'
              },
              {
                title: 'Sports Marathon',
                date: 'April 20, 2024',
                location: 'City Stadium',
                price: 35,
                image: '🏃',
                description: 'Join the annual city marathon challenge',
                attendees: 1000,
                category: 'Sports'
              },
              {
                title: 'Business Networking Night',
                date: 'March 30, 2024',
                location: 'Hotel Grand Ballroom',
                price: 50,
                image: '💼',
                description: 'Connect with professionals and entrepreneurs',
                attendees: 150,
                category: 'Business'
              }
            ].map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {event.image}
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {event.category}
                  </Badge>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attending
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-lg text-green-600">{event.price}</span>
                      </div>
                      <Button size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                View All Events
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need, One Platform
            </h2>
            <p className="text-xl text-gray-600">
              Discover and book from our comprehensive range of services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${service.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <ChevronRight className="h-3 w-3 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/services">
                      <Button className="w-full" variant="outline">
                        Explore {service.title}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Hub Section */}
      <section id="social" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-pink-100 text-pink-700">🌟 Social Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Connect & Share with the Community
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our social hub brings users together to share experiences, discover new opportunities, and stay connected with real-time updates.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {socialFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((post) => (
                  <div key={post} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm">User {post}</p>
                        <p className="text-xs text-gray-500">{post}h ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Just had an amazing experience at the new restaurant downtown! 
                      Highly recommend trying their special menu.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                        <span>{post * 12}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post * 3}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Section */}
      <section id="suppliers" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">💼 For Business</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Grow Your Business with Us
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of suppliers who are already reaching more customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Reach More Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access our growing user base and increase your visibility with targeted promotions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Simple Payment System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our secure payment verification system ensures you get paid on time, every time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="h-5 w-5 mr-2 text-blue-600" />
                  24/7 Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get dedicated support whenever you need it. We're here to help your business succeed.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Driver Section */}
      <section id="drivers" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700">🚗 Drive With Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Become a Driver Partner
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our driver network and earn on your own schedule. Our smart matching system connects you with riders efficiently.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700">Flexible working hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Real-time ride requests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">60-second response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">Secure payment system</span>
                </div>
              </div>

              <Button size="lg" className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600">
                Apply to Drive
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Receive Request</h4>
                    <p className="text-sm text-gray-600">Get notified of nearby ride requests</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Accept or Decline</h4>
                    <p className="text-sm text-gray-600">You have 60 seconds to respond</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Complete Ride</h4>
                    <p className="text-sm text-gray-600">Pick up and drop off your passenger</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Get Paid</h4>
                    <p className="text-sm text-gray-600">Receive payment directly to your account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our users and partners have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already booking, connecting, and discovering amazing experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                Download App
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold">ServiceHub</span>
              </div>
              <p className="text-gray-400">
                Your all-in-one platform for booking services and connecting with your community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Events</a></li>
                <li><a href="#" className="hover:text-white">Transportation</a></li>
                <li><a href="#" className="hover:text-white">Dining</a></li>
                <li><a href="#" className="hover:text-white">Accommodation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ServiceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}