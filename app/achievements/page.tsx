"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Award, Star, Trophy, Target, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { demoAchievements } from "@/lib/demo-data"

interface Achievement {
  id: string
  badge: string
  description: string
  earnedAt: string
  icon: string
  color: string
  category?: string
  points?: number
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showAnimation, setShowAnimation] = useState<string | null>(null)

  const achievements: Achievement[] = demoAchievements.map((achievement) => ({
    ...achievement,
    category: getCategoryFromBadge(achievement.badge),
    points: getPointsFromBadge(achievement.badge),
  }))

  const categories = [
    { id: "all", name: "All Achievements", icon: Award },
    { id: "wellness", name: "Wellness", icon: Star },
    { id: "social", name: "Social", icon: Target },
    { id: "progress", name: "Progress", icon: TrendingUp },
  ]

  function getCategoryFromBadge(badge: string): string {
    if (badge.includes("Meditation") || badge.includes("VR")) return "wellness"
    if (badge.includes("Family") || badge.includes("Bond")) return "social"
    if (badge.includes("Streak") || badge.includes("Steps")) return "progress"
    return "wellness"
  }

  function getPointsFromBadge(badge: string): number {
    if (badge.includes("Streak") || badge.includes("Master")) return 100
    if (badge.includes("Explorer") || badge.includes("Bond")) return 75
    return 50
  }

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  const totalPoints = achievements.reduce((sum, a) => sum + (a.points || 0), 0)
  const completionRate = (achievements.length / 10) * 100 // Assuming 10 total possible achievements

  const handleAchievementClick = (id: string) => {
    setShowAnimation(id)
    setTimeout(() => setShowAnimation(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-xl font-serif font-bold text-gray-800">Achievements</h1>
                <p className="text-sm text-gray-600">Celebrating your healing journey</p>
              </div>
            </div>

            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Trophy className="w-3 h-3 mr-1" />
              {totalPoints} Points
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{achievements.length}</h3>
              <p className="text-gray-600">Achievements Earned</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{totalPoints}</h3>
              <p className="text-gray-600">Total Points</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
                  <p className="text-sm text-gray-600">{Math.round(completionRate)}% Complete</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <Progress value={completionRate} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                        : "bg-transparent"
                    }
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                showAnimation === achievement.id ? "animate-bounce" : ""
              }`}
              onClick={() => handleAchievementClick(achievement.id)}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${
                    showAnimation === achievement.id ? "animate-pulse" : ""
                  }`}
                >
                  <span className="text-3xl">{achievement.icon}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">{achievement.badge}</h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{achievement.description}</p>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    +{achievement.points} pts
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(achievement.earnedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Achievements */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Coming Up Next</CardTitle>
            <CardDescription>Achievements you're close to earning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">Perfect Week</h4>
                  <p className="text-sm text-gray-600">Complete all daily tasks for 7 days</p>
                  <Progress value={85} className="h-2 mt-2" />
                  <p className="text-xs text-gray-500 mt-1">6/7 days completed</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">+150 pts</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">Social Butterfly</h4>
                  <p className="text-sm text-gray-600">Send 20 messages to family members</p>
                  <Progress value={60} className="h-2 mt-2" />
                  <p className="text-xs text-gray-500 mt-1">12/20 messages sent</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">+100 pts</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Celebration Animation */}
        {showAnimation && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}
      </main>
    </div>
  )
}
