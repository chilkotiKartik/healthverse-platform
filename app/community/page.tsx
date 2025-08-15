"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  ArrowLeft,
  MessageCircle,
  Heart,
  Share,
  Calendar,
  Video,
  BookOpen,
  Stethoscope,
  Brain,
  Activity,
  Plus,
  Search,
} from "lucide-react"
import Link from "next/link"

const forumPosts = [
  {
    id: 1,
    title: "Tips for managing anxiety during recovery",
    author: "Sarah M.",
    avatar: "/asian-woman-smiling.png",
    category: "Mental Health",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    preview: "I've found that breathing exercises really help when I feel overwhelmed. Here's what works for me...",
    tags: ["anxiety", "breathing", "mindfulness"],
  },
  {
    id: 2,
    title: "Healthy meal prep ideas for busy weeks",
    author: "Michael R.",
    avatar: "/hispanic-doctor-professional.png",
    category: "Nutrition",
    replies: 18,
    likes: 32,
    timeAgo: "4 hours ago",
    preview: "Sharing my weekly meal prep routine that's helped me stay consistent with healthy eating...",
    tags: ["meal-prep", "nutrition", "healthy-eating"],
  },
  {
    id: 3,
    title: "Celebrating 30 days of daily meditation!",
    author: "Emma T.",
    avatar: "/older-asian-woman-smiling.png",
    category: "Mindfulness",
    replies: 12,
    likes: 67,
    timeAgo: "6 hours ago",
    preview: "Just hit my 30-day meditation streak! Want to share what I've learned and how it's helped...",
    tags: ["meditation", "milestone", "mindfulness"],
  },
  {
    id: 4,
    title: "Low-impact exercises that actually work",
    author: "David K.",
    avatar: "/asian-man-caring.png",
    category: "Fitness",
    replies: 15,
    likes: 28,
    timeAgo: "8 hours ago",
    preview: "For those dealing with joint issues, here are some gentle exercises that have made a difference...",
    tags: ["low-impact", "exercise", "joints"],
  },
]

const supportGroups = [
  {
    id: 1,
    name: "Anxiety & Recovery Support",
    description: "A safe space to discuss anxiety management during healing",
    members: 1247,
    category: "Mental Health",
    icon: Brain,
    color: "bg-purple-500",
    isJoined: true,
  },
  {
    id: 2,
    name: "Chronic Pain Warriors",
    description: "Support and strategies for managing chronic pain",
    members: 892,
    category: "Pain Management",
    icon: Heart,
    color: "bg-red-500",
    isJoined: false,
  },
  {
    id: 3,
    name: "Fitness After 50",
    description: "Age-appropriate fitness and wellness discussions",
    members: 634,
    category: "Fitness",
    icon: Activity,
    color: "bg-green-500",
    isJoined: true,
  },
  {
    id: 4,
    name: "Mindful Recovery",
    description: "Meditation and mindfulness practices for healing",
    members: 1156,
    category: "Mindfulness",
    icon: Brain,
    color: "bg-teal-500",
    isJoined: false,
  },
]

const liveEvents = [
  {
    id: 1,
    title: "Q&A with Dr. Sarah Johnson - Managing Stress",
    host: "Dr. Sarah Johnson",
    hostTitle: "Clinical Psychologist",
    date: "Today, 3:00 PM",
    duration: "45 minutes",
    attendees: 234,
    category: "Mental Health",
    isLive: false,
    isUpcoming: true,
  },
  {
    id: 2,
    title: "Nutrition for Healing - Live Cooking Demo",
    host: "Chef Maria Lopez",
    hostTitle: "Nutritional Chef",
    date: "Tomorrow, 2:00 PM",
    duration: "60 minutes",
    attendees: 156,
    category: "Nutrition",
    isLive: false,
    isUpcoming: true,
  },
  {
    id: 3,
    title: "Gentle Yoga for Recovery",
    host: "Lisa Chen",
    hostTitle: "Certified Yoga Instructor",
    date: "Live Now",
    duration: "30 minutes",
    attendees: 89,
    category: "Fitness",
    isLive: true,
    isUpcoming: false,
  },
]

const categories = [
  { name: "All", count: 156, active: true },
  { name: "Mental Health", count: 45, active: false },
  { name: "Nutrition", count: 32, active: false },
  { name: "Fitness", count: 28, active: false },
  { name: "Mindfulness", count: 24, active: false },
  { name: "Pain Management", count: 18, active: false },
  { name: "Recovery Stories", count: 9, active: false },
]

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-gray-800">Wellness Community</h1>
                <p className="text-sm text-gray-600">Connect, share, and heal together</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
              <Plus className="w-4 h-4 mr-1" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forum">Community Forum</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="events">Live Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search discussions, topics, or users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.name)}
                        className={
                          selectedCategory === category.name ? "bg-teal-500 hover:bg-teal-600" : "bg-transparent"
                        }
                      >
                        {category.name} ({category.count})
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forum Posts */}
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800 hover:text-teal-600 cursor-pointer">
                            {post.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>

                        <p className="text-gray-700 mb-3 line-clamp-2">{post.preview}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-500">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.replies}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
                            <Share className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportGroups.map((group) => {
                const Icon = group.icon
                return (
                  <Card
                    key={group.id}
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-2">{group.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{group.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{group.members.toLocaleString()} members</span>
                              <Badge variant="secondary" className="text-xs">
                                {group.category}
                              </Badge>
                            </div>

                            <Button
                              size="sm"
                              variant={group.isJoined ? "outline" : "default"}
                              className={group.isJoined ? "bg-transparent" : "bg-teal-500 hover:bg-teal-600"}
                            >
                              {group.isJoined ? "Joined" : "Join Group"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Create Group */}
            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Start Your Own Support Group</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Create a safe space for others facing similar challenges. Share experiences and support each
                      other's healing journey.
                    </p>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      Create Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="space-y-4">
              {liveEvents.map((event) => (
                <Card
                  key={event.id}
                  className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${event.isLive ? "ring-2 ring-red-200" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        {event.isLive ? (
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        ) : (
                          <Video className="w-8 h-8 text-white" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800">{event.title}</h3>
                          {event.isLive && <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">LIVE</Badge>}
                          {event.isUpcoming && <Badge variant="secondary">Upcoming</Badge>}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <span>with {event.host}</span>
                          <span>•</span>
                          <span>{event.hostTitle}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            <span>{event.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className={event.isLive ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600"}
                          >
                            {event.isLive ? "Join Live" : "Register"}
                          </Button>
                          <Badge variant="secondary" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            {/* Resource Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Educational Articles</h3>
                  <p className="text-sm text-gray-600 mb-4">Evidence-based health and wellness information</p>
                  <Badge variant="secondary">127 articles</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Expert Guides</h3>
                  <p className="text-sm text-gray-600 mb-4">Professional advice from healthcare experts</p>
                  <Badge variant="secondary">45 guides</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Recovery Stories</h3>
                  <p className="text-sm text-gray-600 mb-4">Inspiring journeys from community members</p>
                  <Badge variant="secondary">23 stories</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Featured Resources */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Featured Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">Understanding Chronic Pain Management</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        A comprehensive guide to managing chronic pain through lifestyle changes and medical support.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Pain Management
                        </Badge>
                        <span className="text-xs text-gray-500">15 min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">Mindfulness Techniques for Anxiety</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Practical mindfulness exercises to help manage anxiety and promote emotional well-being.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Mental Health
                        </Badge>
                        <span className="text-xs text-gray-500">12 min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">Building a Sustainable Exercise Routine</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        How to create and maintain an exercise routine that supports your recovery journey.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Fitness
                        </Badge>
                        <span className="text-xs text-gray-500">18 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
