"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Send,
  Heart,
  AlertTriangle,
  Video,
  ImageIcon,
  Phone,
  MessageCircle,
  Users,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { demoFamilyMessages } from "@/lib/demo-data"

interface FamilyMember {
  id: string
  name: string
  relationship: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

export default function FamilyPage() {
  const [messages, setMessages] = useState(demoFamilyMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)

  const familyMembers: FamilyMember[] = [
    {
      id: "2",
      name: "Michael Chen",
      relationship: "Spouse",
      avatar: "/asian-man-caring.png",
      status: "online",
    },
    {
      id: "4",
      name: "Mom",
      relationship: "Mother",
      avatar: "/older-asian-woman-smiling.png",
      status: "online",
    },
    {
      id: "5",
      name: "Dr. Rodriguez",
      relationship: "Healthcare Provider",
      avatar: "/hispanic-doctor-professional.png",
      status: "away",
      lastSeen: "2 hours ago",
    },
  ]

  useEffect(() => {
    // Simulate emergency alert
    const timer = setTimeout(() => {
      setShowEmergencyAlert(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      fromUserId: "1",
      fromName: "You",
      message: newMessage,
      type: "text" as const,
      createdAt: new Date().toISOString(),
      avatar: "/asian-woman-smiling.png",
    }

    setMessages((prev) => [message, ...prev])
    setNewMessage("")

    // Simulate family member response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing! We're here for you always. ❤️",
        "You're doing amazing! Keep up the great work!",
        "Sending you lots of love and positive energy!",
        "We're so proud of your progress. You've got this!",
      ]

      const response = {
        id: (Date.now() + 1).toString(),
        fromUserId: "2",
        fromName: "Michael",
        message: responses[Math.floor(Math.random() * responses.length)],
        type: "text" as const,
        createdAt: new Date().toISOString(),
        avatar: "/asian-man-caring.png",
      }

      setMessages((prev) => [response, ...prev])
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Card className="bg-red-50 border-red-200 shadow-lg animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-red-800">Mood Alert</p>
                  <p className="text-sm text-red-600">Sarah's mood score dropped to 4/10. Consider reaching out.</p>
                  <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                    Send Support
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmergencyAlert(false)}
                  className="text-red-600 hover:bg-red-100"
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-xl font-serif font-bold text-gray-800">Family Support</h1>
                <p className="text-sm text-gray-600">Stay connected with your loved ones</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                <Users className="w-3 h-3 mr-1" />
                {familyMembers.filter((m) => m.status === "online").length} Online
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Family Members */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Your Support Network</CardTitle>
                <CardDescription>Family members and care team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedMember(member.id)}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.relationship}</p>
                      {member.status === "away" && member.lastSeen && (
                        <p className="text-xs text-gray-500">Last seen {member.lastSeen}</p>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="p-2">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Send Love & Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Share Photo/Video
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Messages */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Family Messages</CardTitle>
                <CardDescription>Share updates and receive support</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.fromName} />
                        <AvatarFallback>
                          {message.fromName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-800">{message.fromName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-md">
                          <p className="text-gray-800">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t pt-4">
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/asian-woman-smiling.png" alt="You" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Share how you're feeling or ask for support..."
                        className="bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="p-2">
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Family Insights */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Family Impact</CardTitle>
            <CardDescription>How family support is helping your recovery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Emotional Support</h3>
                <p className="text-2xl font-bold text-pink-600 mb-1">+25%</p>
                <p className="text-sm text-gray-600">Mood improvement with family connection</p>
              </div>

              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Social Connection</h3>
                <p className="text-2xl font-bold text-green-600 mb-1">12</p>
                <p className="text-sm text-gray-600">Messages received this week</p>
              </div>

              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Response Time</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">&lt; 1hr</p>
                <p className="text-sm text-gray-600">Average family response time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
