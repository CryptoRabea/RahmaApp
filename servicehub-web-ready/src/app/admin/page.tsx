'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Search, 
  Filter,
  AlertCircle,
  Download,
  Upload,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  FileText,
  Shield,
  BarChart3
} from 'lucide-react';

interface PaymentVerification {
  id: string;
  bookingId: string;
  clientName: string;
  clientEmail: string;
  serviceTitle: string;
  amount: number;
  paymentMethod: string;
  proofImage: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

const mockPayments: PaymentVerification[] = [
  {
    id: '1',
    bookingId: 'BK001',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    serviceTitle: 'Summer Music Festival',
    amount: 75,
    paymentMethod: 'Vodafone Cash',
    proofImage: '/api/placeholder/400/300',
    uploadedAt: '2024-03-15 14:30:00',
    status: 'pending'
  },
  {
    id: '2',
    bookingId: 'BK002',
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    serviceTitle: 'Italian Fine Dining',
    amount: 120,
    paymentMethod: 'InstaPay',
    proofImage: '/api/placeholder/400/300',
    uploadedAt: '2024-03-15 15:45:00',
    status: 'verified',
    verifiedBy: 'Admin User',
    verifiedAt: '2024-03-15 16:00:00'
  },
  {
    id: '3',
    bookingId: 'BK003',
    clientName: 'Bob Johnson',
    clientEmail: 'bob@example.com',
    serviceTitle: 'City Airport Transfer',
    amount: 45,
    paymentMethod: 'Vodafone Cash',
    proofImage: '/api/placeholder/400/300',
    uploadedAt: '2024-03-15 16:20:00',
    status: 'rejected',
    verifiedBy: 'Admin User',
    verifiedAt: '2024-03-15 16:30:00',
    rejectionReason: 'Unclear transaction details'
  }
];

export default function AdminPanel() {
  const [payments, setPayments] = useState<PaymentVerification[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<PaymentVerification | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const stats = {
    totalPending: payments.filter(p => p.status === 'pending').length,
    totalVerified: payments.filter(p => p.status === 'verified').length,
    totalRejected: payments.filter(p => p.status === 'rejected').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleVerify = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? {
            ...payment,
            status: 'verified' as const,
            verifiedBy: 'Current Admin',
            verifiedAt: new Date().toISOString()
          }
        : payment
    ));
    setSelectedPayment(null);
  };

  const handleReject = (paymentId: string, reason: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? {
            ...payment,
            status: 'rejected' as const,
            verifiedBy: 'Current Admin',
            verifiedAt: new Date().toISOString(),
            rejectionReason: reason
          }
        : payment
    ));
    setRejectionReason('');
    setSelectedPayment(null);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">Payment verification and system management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
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
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.totalPending}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalVerified}</div>
              <p className="text-xs text-muted-foreground">Successfully verified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.totalRejected}</div>
              <p className="text-xs text-muted-foreground">Payment issues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">In processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payments">Payment Verifications</TabsTrigger>
            <TabsTrigger value="bookings">Booking Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Verifications</CardTitle>
                <CardDescription>Review and verify customer payment proofs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, booking ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.bookingId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.clientName}</p>
                            <p className="text-sm text-gray-500">{payment.clientEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{payment.serviceTitle}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>{payment.uploadedAt}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1">{payment.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedPayment(payment)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>Payment Verification Details</DialogTitle>
                                  <DialogDescription>
                                    Review the payment proof and take action
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedPayment && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Booking Information</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><strong>Booking ID:</strong> {selectedPayment.bookingId}</p>
                                          <p><strong>Service:</strong> {selectedPayment.serviceTitle}</p>
                                          <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
                                          <p><strong>Method:</strong> {selectedPayment.paymentMethod}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Client Information</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><strong>Name:</strong> {selectedPayment.clientName}</p>
                                          <p><strong>Email:</strong> {selectedPayment.clientEmail}</p>
                                          <p><strong>Uploaded:</strong> {selectedPayment.uploadedAt}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Payment Proof</h4>
                                      <div className="border rounded-lg p-4 bg-gray-50">
                                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                          <ImageIcon className="h-12 w-12 text-gray-400" />
                                          <span className="ml-2 text-gray-500">Payment Screenshot</span>
                                        </div>
                                      </div>
                                    </div>

                                    {selectedPayment.status === 'pending' && (
                                      <div className="flex justify-end space-x-2">
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button variant="destructive">
                                              <XCircle className="h-4 w-4 mr-2" />
                                              Reject
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Reject Payment</DialogTitle>
                                              <DialogDescription>
                                                Please provide a reason for rejection
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                              <Input
                                                placeholder="Reason for rejection..."
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                              />
                                              <div className="flex justify-end space-x-2">
                                                <Button variant="outline">Cancel</Button>
                                                <Button 
                                                  variant="destructive"
                                                  onClick={() => handleReject(selectedPayment.id, rejectionReason)}
                                                  disabled={!rejectionReason.trim()}
                                                >
                                                  Reject Payment
                                                </Button>
                                              </div>
                                            </div>
                                          </DialogContent>
                                        </Dialog>
                                        <Button 
                                          onClick={() => handleVerify(selectedPayment.id)}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Verify
                                        </Button>
                                      </div>
                                    )}

                                    {selectedPayment.status !== 'pending' && (
                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm">
                                          <strong>Status:</strong> {selectedPayment.status}<br />
                                          {selectedPayment.verifiedBy && <><strong>Verified by:</strong> {selectedPayment.verifiedBy}<br /></>}
                                          {selectedPayment.verifiedAt && <><strong>Verified at:</strong> {selectedPayment.verifiedAt}<br /></>}
                                          {selectedPayment.rejectionReason && <><strong>Reason:</strong> {selectedPayment.rejectionReason}</>}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>Override and manage booking statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Management</h3>
                  <p className="text-gray-600">Override booking statuses and manage special cases</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>System performance and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
                  <p className="text-gray-600">Detailed analytics and reporting features</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}