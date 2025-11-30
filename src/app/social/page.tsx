'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Search,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Send,
  MoreHorizontal
} from 'lucide-react';

interface SocialPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  isPromotion: boolean;
  createdAt: string;
  isLiked: boolean;
}

const mockPosts: SocialPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      role: 'Event Organizer'
    },
    content: '🎉 Excited to announce our upcoming Summer Music Festival! Join us for an amazing day of live music, food trucks, and great vibes. Early bird tickets are now available! #SummerFest2024 #LiveMusic',
    likes: 245,
    comments: 32,
    isPromotion: true,
    createdAt: '2 hours ago',
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Mike Chen',
      role: 'Food Lover'
    },
    content: 'Just had the most incredible dining experience at Bella Vista! The pasta was homemade and the atmosphere was perfect. Highly recommend the truffle risotto 🍝✨',
    likes: 89,
    comments: 12,
    isPromotion: false,
    createdAt: '4 hours ago',
    isLiked: true
  },
  {
    id: '3',
    author: {
      name: 'QuickRide',
      role: 'Transportation Service'
    },
    content: '🚗 Special offer! Get 20% off your first airport transfer this week. Professional drivers, clean vehicles, and punctual service. Book now! #AirportTransfer #SpecialOffer',
    likes: 156,
    comments: 28,
    isPromotion: true,
    createdAt: '6 hours ago',
    isLiked: false
  },
  {
    id: '4',
    author: {
      name: 'Emily Davis',
      role: 'Traveler'
    },
    content: 'The city tour guide I booked through ServiceHub was absolutely fantastic! So knowledgeable and friendly. Saw parts of the city I never would have discovered on my own 🏙️',
    likes: 67,
    comments: 8,
    isPromotion: false,
    createdAt: '8 hours ago',
    isLiked: false
  },
  {
    id: '5',
    author: {
      name: 'Grand Hotel',
      role: 'Accommodation'
    },
    content: '🏨 Weekend getaway package now available! Includes luxury suite, breakfast for two, and spa access. Perfect for couples looking to escape the city hustle. #LuxuryStay #WeekendVibes',
    likes: 198,
    comments: 41,
    isPromotion: true,
    createdAt: '1 day ago',
    isLiked: true
  }
];

export default function SocialHubPage() {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [activeTab, setActiveTab] = useState('all');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState('');
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

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: SocialPost = {
        id: Date.now().toString(),
        author: {
          name: 'Current User',
          role: 'Client'
        },
        content: newPost,
        likes: 0,
        comments: 0,
        isPromotion: false,
        createdAt: 'Just now',
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setIsCreatingPost(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'promotions') return post.isPromotion;
    if (activeTab === 'posts') return !post.isPromotion;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Social Hub</h1>
              <p className="text-gray-600">Connect, share, and discover with our community</p>
            </div>
            <Button onClick={() => setIsCreatingPost(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Post Modal */}
        {isCreatingPost && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Create a Post</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsCreatingPost(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your experience, promote an event, or connect with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={4}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                  <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts, users, or topics..."
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="promotions">Promotions</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.filter(post => {
            if (activeTab === 'all') return true;
            if (activeTab === 'promotions') return post.isPromotion;
            if (activeTab === 'posts') return !post.isPromotion;
            return true;
          }).map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {post.author.role}
                        </Badge>
                        {post.isPromotion && (
                          <Badge variant="default" className="text-xs bg-purple-100 text-purple-700">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Promotion
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.createdAt}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {post.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={post.isLiked ? 'text-red-500' : 'text-gray-500'}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Be the first to share something with the community!</p>
          </div>
        )}
      </div>
    </div>
  );
}