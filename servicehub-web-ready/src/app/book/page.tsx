'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  User, 
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Wallet
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location?: string;
  supplier: {
    name: string;
    rating: number;
  };
}

const mockService: Service = {
  id: '1',
  title: 'Summer Music Festival',
  description: 'Experience the best live music performances this summer with top artists from around the world.',
  category: 'EVENT',
  price: 75,
  location: 'Central Park',
  supplier: {
    name: 'EventMasters',
    rating: 4.8
  }
};

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: '',
    paymentMethod: '',
    proofImage: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const paymentMethods = [
    {
      id: 'vodafone',
      name: 'Vodafone Cash',
      number: '+201234567890',
      icon: Smartphone
    },
    {
      id: 'instapay',
      name: 'InstaPay',
      number: '@eventmasters',
      icon: Wallet
    }
  ];

  const selectedPayment = paymentMethods.find(m => m.id === bookingData.paymentMethod);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBookingData({ ...bookingData, proofImage: file });
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingComplete(true);
      setCurrentStep(4);
    }, 2000);
  };

  const handlePaymentRedirect = (method: string) => {
    // In a real app, this would use deep linking to open the payment app
    if (method === 'vodafone') {
      alert('Opening Vodafone Cash app... (In a real app, this would use deep linking)');
    } else if (method === 'instapay') {
      alert('Opening InstaPay app... (In a real app, this would use deep linking)');
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Booking Submitted!</CardTitle>
              <CardDescription>
                Your booking has been submitted and is awaiting payment verification.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  We'll notify you once your payment proof has been verified. This usually takes within 24 hours.
                </AlertDescription>
              </Alert>
              <div className="flex space-x-4 justify-center">
                <Button variant="outline" onClick={() => router.push('/services')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Services
                </Button>
                <Button onClick={() => router.push('/social')}>
                  View Social Hub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < 4 ? step : <CheckCircle className="h-5 w-5" />}
                </div>
                {step < 4 && (
                  <div className={`w-full h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service Details</span>
            <span>Date & Time</span>
            <span>Payment</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Service Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Service Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{mockService.title}</h3>
                <p className="text-gray-600 mb-2">{mockService.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockService.location}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {mockService.supplier.name}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-bold text-lg text-gray-900">${mockService.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Service Details'}
              {currentStep === 2 && 'Date & Time'}
              {currentStep === 3 && 'Payment'}
              {currentStep === 4 && 'Confirmation'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Review the service details before proceeding'}
              {currentStep === 2 && 'Select your preferred date and time'}
              {currentStep === 3 && 'Complete payment using your preferred method'}
              {currentStep === 4 && 'Review your booking details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About this service</h3>
                  <p className="text-gray-600">{mockService.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Service Type</h4>
                    <Badge>{mockService.category}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-gray-600">{mockService.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Provider</h4>
                    <p className="text-gray-600">{mockService.supplier.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Rating</h4>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="ml-2 text-gray-600">{mockService.supplier.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">${mockService.price}</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <Input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time</label>
                  <Select value={bookingData.time} onValueChange={(value) => setBookingData({ ...bookingData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="13:00">01:00 PM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                      <SelectItem value="18:00">06:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                  <Textarea
                    placeholder="Any special requirements or requests..."
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    We use secure manual payment verification. Complete the payment using your preferred method, then upload the transaction screenshot.
                  </AlertDescription>
                </Alert>

                <div>
                  <label className="block text-sm font-medium mb-4">Select Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <Card 
                          key={method.id}
                          className={`cursor-pointer transition-all ${
                            bookingData.paymentMethod === method.id 
                              ? 'ring-2 ring-blue-500 bg-blue-50' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setBookingData({ ...bookingData, paymentMethod: method.id })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <Icon className="h-6 w-6 text-blue-600" />
                              <div>
                                <h4 className="font-semibold">{method.name}</h4>
                                <p className="text-sm text-gray-600">{method.number}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {selectedPayment && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Payment Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Amount:</strong> ${mockService.price}</p>
                        <p><strong>Method:</strong> {selectedPayment.name}</p>
                        <p><strong>Recipient:</strong> {selectedPayment.number}</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handlePaymentRedirect(selectedPayment.id)}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Open {selectedPayment.name} App
                    </Button>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Upload Payment Proof
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Upload a screenshot of the successful transaction
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button variant="outline" className="cursor-pointer">
                            Choose File
                          </Button>
                        </label>
                        {bookingData.proofImage && (
                          <p className="text-sm text-green-600 mt-2">
                            Selected: {bookingData.proofImage.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Ready to Book!</h3>
                  <p className="text-green-700">
                    Please review your booking details before submitting.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Booking Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <p className="font-medium">{mockService.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">{bookingData.date || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <p className="font-medium">{bookingData.time || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Method:</span>
                      <p className="font-medium">{selectedPayment?.name || 'Not selected'}</p>
                    </div>
                  </div>

                  {bookingData.notes && (
                    <div>
                      <span className="text-gray-600">Special Requests:</span>
                      <p className="text-sm">{bookingData.notes}</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-green-600">${mockService.price}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting || !bookingData.date || !bookingData.time || !bookingData.paymentMethod || !bookingData.proofImage}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Booking'}
                </Button>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < 3 && (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
                
                {currentStep === 3 && (
                  <Button 
                    onClick={handleNext}
                    disabled={!bookingData.paymentMethod || !bookingData.proofImage}
                  >
                    Review Booking
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}