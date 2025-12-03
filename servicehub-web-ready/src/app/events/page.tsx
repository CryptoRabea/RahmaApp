'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Calendar,
  Clock,
  Users,
  DollarSign,
  Heart,
  ChevronRight,
  TrendingUp,
  Music,
  Palette,
  Briefcase,
  Trophy
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  date: string;
  location: string;
  image: string;
  attendees: number;
  organizer: {
    name: string;
    rating: number;
  };
  isFeatured: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'Experience the best live music performances this summer with top artists from around the world.',
    category: 'Music',
    price: 75,
    date: '2024-03-25',
    location: 'Central Park Amphitheater',
    image: '🎵',
    attendees: 500,
    organizer: {
      name: 'EventMasters',
      rating: 4.8
    },
    isFeatured: true
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    description: 'Join industry leaders and innovators for the latest in technology, AI, and startup culture.',
    category: 'Technology',
    price: 120,
    date: '2024-04-02',
    location: 'Convention Center Hall A',
    image: '💻',
    attendees: 300,
    organizer: {
      name: 'TechEvents',
      rating: 4.6
    },
    isFeatured: true
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    description: 'Taste exquisite cuisines from top chefs paired with fine wines from renowned vineyards.',
    category: 'Food & Drink',
    price: 45,
    date: '2024-04-15',
    location: 'Riverside Park',
    image: '🍷',
    attendees: 800,
    organizer: {
      name: 'FoodLovers Events',
      rating: 4.9
    },
    isFeatured: false
  }
];

const categoryIcons = {
  'Music': Music,
  'Technology': Briefcase,
  'Food & Drink': Palette,
  'Arts': Palette,
  'Sports': Trophy,
  'Business': Briefcase,
  'Entertainment': Music,
  'Wellness': Heart
};

const categoryColors = {
  'Music': 'bg-purple-100 text-purple-700',
  'Technology': 'bg-blue-100 text-blue-700',
  'Food & Drink': 'bg-orange-100 text-orange-700',
  'Arts': 'bg-pink-100 text-pink-700',
  'Sports': 'bg-green-100 text-green-700',
  'Business': 'bg-gray-100 text-gray-700',
  'Entertainment': 'bg-red-100 text-red-700',
  'Wellness': 'bg-teal-100 text-teal-700'
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter featured events
    if (showFeaturedOnly) {
      filtered = filtered.filter(event => event.isFeatured);
    }

    // Sort
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.attendees - a.attendees);
        break;
    }

    setFilteredEvents(filtered);
  }, [events, selectedCategory, searchTerm, sortBy, showFeaturedOnly]);

  const handleBooking = (event: Event) => {
    alert(`Booking ${event.title} - This would take you to the booking flow`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events</h1>
              <p className="text-gray-600">Discover and book amazing events</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant={showFeaturedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Featured Only
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Arts">Arts</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date: Soonest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Featured Events Banner */}
        {showFeaturedOnly && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Featured Events</h3>
                <p>Handpicked events you don't want to miss!</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const Icon = categoryIcons[event.category as keyof typeof categoryIcons];
            return (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center">
                  {event.isFeatured && (
                    <Badge className="mb-2 bg-yellow-100 text-yellow-700">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {event.image}
                  </div>
                  <Badge variant="secondary" className={`mb-2 ${categoryColors[event.category as keyof typeof categoryColors]}`}>
                    <Icon className="h-3 w-3 mr-1" />
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
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attending
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-lg text-green-600">{event.price}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{event.organizer.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleBooking(event)}
                      >
                        Book Now
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}