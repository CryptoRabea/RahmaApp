'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Calendar,
  Car,
  Utensils,
  Bed,
  Clock,
  DollarSign,
  Heart,
  ChevronRight,
  Users
} from 'lucide-react';
import Header from '@/components/layout/Header';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location?: string;
  images?: string;
  supplier: {
    name: string;
    rating: number;
  };
  availability: boolean;
}

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'Experience the best live music performances this summer with top artists from around the world.',
    category: 'EVENT',
    price: 75,
    location: 'Central Park',
    images: null,
    supplier: {
      name: 'EventMasters',
      rating: 4.8
    },
    availability: true
  },
  {
    id: '2',
    title: 'City Airport Transfer',
    description: 'Reliable airport transfer service with professional drivers and comfortable vehicles.',
    category: 'TRANSPORTATION',
    price: 45,
    location: 'Airport to City',
    images: null,
    supplier: {
      name: 'QuickRide',
      rating: 4.6
    },
    availability: true
  },
  {
    id: '3',
    title: 'Italian Fine Dining',
    description: 'Authentic Italian cuisine in an elegant atmosphere with award-winning chefs.',
    category: 'DINING',
    price: 120,
    location: 'Downtown',
    images: null,
    supplier: {
      name: 'Bella Vista',
      rating: 4.9
    },
    availability: true
  },
  {
    id: '4',
    title: 'Luxury Hotel Suite',
    description: 'Spacious suite with city views, premium amenities, and world-class service.',
    category: 'ACCOMMODATION',
    price: 250,
    location: 'City Center',
    images: null,
    supplier: {
      name: 'Grand Hotel',
      rating: 4.7
    },
    availability: true
  },
  {
    id: '5',
    title: 'Tech Conference 2024',
    description: 'Join industry leaders for the latest in technology innovation and networking.',
    category: 'EVENT',
    price: 150,
    location: 'Convention Center',
    images: null,
    supplier: {
      name: 'TechEvents',
      rating: 4.5
    },
    availability: true
  },
  {
    id: '6',
    title: 'City Tour Guide',
    description: 'Professional guided tour covering all major attractions and hidden gems.',
    category: 'TRANSPORTATION',
    price: 60,
    location: 'City Tour',
    images: null,
    supplier: {
      name: 'CityTours',
      rating: 4.8
    },
    availability: true
  }
];

const categoryIcons = {
  EVENT: Calendar,
  TRANSPORTATION: Car,
  DINING: Utensils,
  ACCOMMODATION: Bed,
};

const categoryColors = {
  EVENT: 'bg-purple-100 text-purple-700',
  TRANSPORTATION: 'bg-blue-100 text-blue-700',
  DINING: 'bg-orange-100 text-orange-700',
  ACCOMMODATION: 'bg-green-100 text-green-700',
};

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(mockServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(mockServices);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('price-low');
  const [user, setUser] = useState(null);

  useEffect(() => {
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.supplier.rating - a.supplier.rating);
        break;
    }

    setFilteredServices(filtered);
  }, [services, selectedCategory, searchTerm, sortBy]);

  const handleBooking = (service: Service) => {
    router.push('/book');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        user={user}
        onAuthSuccess={handleAuthSuccess}
        onSignOut={handleSignOut}
        activeTab="services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="EVENT">Events</SelectItem>
                <SelectItem value="TRANSPORTATION">Transportation</SelectItem>
                <SelectItem value="DINING">Dining</SelectItem>
                <SelectItem value="ACCOMMODATION">Accommodation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
          </p>
          <div className="flex gap-2">
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = categoryIcons[service.category as keyof typeof categoryIcons];
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${categoryColors[service.category as keyof typeof categoryColors]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={service.availability ? 'default' : 'secondary'}>
                      {service.availability ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {service.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {service.location}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{service.supplier.rating}</span>
                        <span className="text-sm text-gray-500">({service.supplier.name})</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-lg">${service.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleBooking(service)}
                        disabled={!service.availability}
                      >
                        Book Now
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}