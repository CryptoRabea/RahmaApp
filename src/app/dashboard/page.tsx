'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  Search,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Eye,
  Edit,
  Trash2,
  Bell,
  Settings,
  CreditCard,
  BarChart3,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
  bookings: number;
  revenue: number;
  rating: number;
  createdAt: string;
}

interface Booking {
  id: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
  paymentVerified: boolean;
}

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    category: 'EVENT',
    price: 75,
    status: 'active',
    bookings: 45,
    revenue: 3375,
    rating: 4.8,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Italian Fine Dining Experience',
    category: 'DINING',
    price: 120,
    status: 'active',
    bookings: 23,
    revenue: 2760,
    rating: 4.9,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'City Airport Transfer',
    category: 'TRANSPORTATION',
    price: 45,
    status: 'inactive',
    bookings: 67,
    revenue: 3015,
    rating: 4.6,
    createdAt: '2024-01-10'
  }
];

const mockBookings: Booking[] = [
  {
    id: '1',
    serviceTitle: 'Summer Music Festival',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    amount: 75,
    status: 'confirmed',
    bookingDate: '2024-03-15',
    paymentVerified: true
  },
  {
    id: '2',
    serviceTitle: 'Italian Fine Dining Experience',
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    amount: 120,
    status: 'pending',
    bookingDate: '2024-03-16',
    paymentVerified: false
  },
  {
    id: '3',
    serviceTitle: 'City Airport Transfer',
    clientName: 'Bob Johnson',
    clientEmail: 'bob@example.com',
    amount: 45,
    status: 'completed',
    bookingDate: '2024-03-14',
    paymentVerified: true
  }
];

export default function DashboardPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // New service form state
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: ''
  });

  const stats = {
    totalRevenue: services.reduce((sum, service) => sum + service.revenue, 0),
    totalBookings: services.reduce((sum, service) => sum + service.bookings, 0),
    activeServices: services.filter(s => s.status === 'active').length,
    averageRating: (services.reduce((sum, service) => sum + service.rating, 0) / services.length).toFixed(1)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'inactive':
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleCreateService = () => {
    if (newService.title && newService.category && newService.price) {
      const service: Service = {
        id: Date.now().toString(),
        title: newService.title,
        category: newService.category,
        price: parseFloat(newService.price),
        status: 'active',
        bookings: 0,
        revenue: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setServices([...services, service]);
      setNewService({ title: '', description: '', category: '', price: '', location: '' });
      setIsCreatingService(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
                <p className="text-gray-600">Manage your services and bookings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeServices}</div>
              <p className="text-xs text-muted-foreground">of {services.length} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">Excellent service</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking requests from clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.serviceTitle}</p>
                          <p className="text-sm text-gray-600">{booking.clientName}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </Badge>
                          <p className="text-sm font-medium mt-1">${booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => setIsCreatingService(true)} className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      Add Service
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <CreditCard className="h-6 w-6 mb-2" />
                      Withdraw Funds
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Settings className="h-6 w-6 mb-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Services</h2>
              <Button onClick={() => setIsCreatingService(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            {isCreatingService && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Service Title"
                      value={newService.title}
                      onChange={(e) => setNewService({...newService, title: e.target.value})}
                    />
                    <Select value={newService.category} onValueChange={(value) => setNewService({...newService, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EVENT">Event</SelectItem>
                        <SelectItem value="TRANSPORTATION">Transportation</SelectItem>
                        <SelectItem value="DINING">Dining</SelectItem>
                        <SelectItem value="ACCOMMODATION">Accommodation</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                    />
                    <Input
                      placeholder="Location"
                      value={newService.location}
                      onChange={(e) => setNewService({...newService, location: e.target.value})}
                    />
                    <Textarea
                      placeholder="Description"
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="md:col-span-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setIsCreatingService(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateService}>
                      Create Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>${service.price}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{service.bookings}</TableCell>
                      <TableCell>${service.revenue}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {service.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Bookings</h2>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.serviceTitle}</TableCell>
                      <TableCell>
                        <div>
                          <p>{booking.clientName}</p>
                          <p className="text-sm text-gray-500">{booking.clientEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.bookingDate}</TableCell>
                      <TableCell>${booking.amount}</TableCell>
                      <TableCell>
                        <Badge variant={booking.paymentVerified ? 'default' : 'secondary'}>
                          {booking.paymentVerified ? 'Verified' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{booking.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Your earnings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-gray-400" />
                    <span className="ml-2 text-gray-500">Revenue Chart</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Balance</CardTitle>
                  <CardDescription>Available for withdrawal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$2,450.00</div>
                  <Button className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Withdraw Funds
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}