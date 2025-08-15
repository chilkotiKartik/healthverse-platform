"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Play, Users, Clock, Star, Maximize, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { demoHealingRooms } from "@/lib/demo-data"

export default function VRRoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  if (selectedRoom) {
    return <VRExperience roomId={selectedRoom} onExit={() => setSelectedRoom(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-xl font-serif font-bold text-gray-800">VR Healing Rooms</h1>
                <p className="text-sm text-gray-600">Immersive therapeutic environments</p>
              </div>
            </div>

            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              3 Environments Available
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 shadow-lg animate-float">
            <Maximize className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Choose Your Healing Space</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Step into immersive environments designed to promote healing, reduce stress, and enhance your recovery
            journey.
          </p>
        </div>

        {/* VR Rooms Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {demoHealingRooms.map((room) => (
            <Card
              key={room.id}
              className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800">
                    <Star className="w-3 h-3 mr-1" />
                    {room.popularity}%
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-serif font-bold mb-1">{room.name}</h3>
                  <p className="text-sm opacity-90">{room.description}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{room.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {room.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedRoom(room.id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Enter {room.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Therapeutic Benefits</CardTitle>
              <CardDescription>Science-backed healing through immersion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-teal-500 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Stress Reduction</p>
                    <p className="text-sm text-gray-600">Lower cortisol levels through nature immersion</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Pain Management</p>
                    <p className="text-sm text-gray-600">Distraction therapy for chronic pain relief</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Emotional Healing</p>
                    <p className="text-sm text-gray-600">Improved mood and emotional regulation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Family Connection</CardTitle>
              <CardDescription>Share healing moments with loved ones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/asian-man-caring.png" alt="Michael" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">Michael Chen</p>
                    <p className="text-sm text-gray-600">Available to join</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                    Online
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/older-asian-woman-smiling.png" alt="Mom" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">Mom</p>
                    <p className="text-sm text-gray-600">Available to join</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                    Online
                  </Badge>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Invite Family to Join
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

interface VRExperienceProps {
  roomId: string
  onExit: () => void
}

function VRExperience({ roomId, onExit }: VRExperienceProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [showControls, setShowControls] = useState(true)

  const room = demoHealingRooms.find((r) => r.id === roomId)!

  // Simulate session timer
  useState(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getAmbientContent = () => {
    switch (roomId) {
      case "forest":
        return {
          background: "bg-gradient-to-b from-green-400 via-green-500 to-green-700",
          sounds: "Birds chirping, gentle wind through leaves",
          elements: ["🌲", "🦋", "🌿", "🐦"],
        }
      case "beach":
        return {
          background: "bg-gradient-to-b from-orange-300 via-blue-400 to-blue-600",
          sounds: "Ocean waves, gentle breeze",
          elements: ["🌊", "🐚", "☀️", "🏖️"],
        }
      case "temple":
        return {
          background: "bg-gradient-to-b from-purple-400 via-indigo-500 to-purple-700",
          sounds: "Soft chanting, temple bells",
          elements: ["🕯️", "🧘‍♀️", "🌸", "⛩️"],
        }
      default:
        return {
          background: "bg-gradient-to-b from-teal-400 to-teal-600",
          sounds: "Peaceful ambience",
          elements: ["✨"],
        }
    }
  }

  const ambient = getAmbientContent()

  return (
    <div className={`fixed inset-0 ${ambient.background} flex items-center justify-center overflow-hidden`}>
      {/* Ambient Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {ambient.elements.map((element, index) => (
          <div
            key={index}
            className="absolute text-4xl opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
        <div className="mb-8">
          <img
            src={room.image || "/placeholder.svg"}
            alt={room.name}
            className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8 animate-breathe"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 animate-float">{room.name}</h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8">{room.description}</p>

        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-sm opacity-75">Session Time</p>
            <p className="text-2xl font-bold">{formatTime(sessionTime)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-75">Current Sounds</p>
            <p className="text-lg">{ambient.sounds}</p>
          </div>
        </div>

        {/* Breathing Guide */}
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto border-4 border-white/30 rounded-full flex items-center justify-center animate-breathe">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
          <p className="text-lg mt-4 opacity-90">Breathe with the rhythm</p>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Play className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <div className="w-px h-6 bg-white/30" />

            <Button variant="ghost" size="sm" onClick={onExit} className="text-white hover:bg-white/20">
              Exit Experience
            </Button>
          </div>
        </div>
      )}

      {/* Family Join Notification */}
      <div className="absolute top-8 right-8 z-20">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/asian-man-caring.png" alt="Michael" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-800">Michael wants to join</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="h-6 text-xs bg-teal-500 hover:bg-teal-600">
                    Allow
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                    Later
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hide/Show Controls */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute bottom-4 right-4 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors z-20"
      >
        {showControls ? "−" : "+"}
      </button>
    </div>
  )
}
