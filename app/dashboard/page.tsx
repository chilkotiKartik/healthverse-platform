"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Brain, Moon, MessageCircle, Calendar, Award, TrendingUp, Sparkles, Users, Settings } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { demoUsers, demoHealthData, demoRecoveryPlan } from "@/lib/demo-data"

export default function PatientDashboard() {
  const [currentUser, setCurrentUser] = useState(demoUsers.patient)
  const [healthData, setHealthData] = useState(demoHealthData)
  const [todaysPlan, setTodaysPlan] = useState(demoRecoveryPlan)
  const [currentMood, setCurrentMood] = useState(7)
  const [healingScore, setHealingScore] = useState(78)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setHealingScore((prev) => Math.min(100, prev + Math.random() * 2 - 1))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return "😊"
    if (score >= 6) return "🙂"
    if (score >= 4) return "😐"
    return "😔"
  }

  const getMoodGradient = (score: number) => {
    if (score >= 8) return "mood-energized"
    if (score >= 6) return "mood-calm"
    return "mood-low"
  }

  const completedTasks = todaysPlan.filter((task) => task.completed).length
  const progressPercentage = (completedTasks / todaysPlan.length) * 100

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your healing journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-gray-800">HealthVerse AI</h1>
                <p className="text-sm text-gray-600">Welcome back, {currentUser.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Recovery Day 6
              </Badge>
              <Avatar>
                <AvatarImage src="/asian-woman-smiling.png" alt={currentUser.name} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Healing Score */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Healing Score</p>
                  <p className="text-3xl font-bold text-teal-600">{Math.round(healingScore)}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center animate-breathe">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <Progress value={healingScore} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">+5 from yesterday</p>
            </CardContent>
          </Card>

          {/* Mood Today */}
          <Card className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg ${getMoodGradient(currentMood)}`}>
            <CardContent className="p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium opacity-90">Mood Today</p>
                  <p className="text-3xl font-bold">{currentMood}/10</p>
                </div>
                <div className="text-4xl animate-float">{getMoodEmoji(currentMood)}</div>
              </div>
              <p className="text-xs opacity-80">Feeling optimistic</p>
            </CardContent>
          </Card>

          {/* Heart Rate */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                  <p className="text-3xl font-bold text-red-500">72 BPM</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Resting rate: Normal</p>
            </CardContent>
          </Card>

          {/* Sleep Quality */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sleep Quality</p>
                  <p className="text-3xl font-bold text-indigo-600">7.5h</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Moon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Deep sleep: 2.1h</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
                <CardDescription>Access your healing tools instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    className="h-20 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white flex-col gap-2 animate-glow"
                    onClick={() => (window.location.href = "/ai-health-agent")}
                  >
                    <Brain className="w-6 h-6" />
                    <span className="text-sm">AI Health Agent</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-coral-50 hover:border-coral-300 bg-transparent"
                    onClick={() => (window.location.href = "/fitness-coach")}
                  >
                    <Calendar className="w-6 h-6 text-coral-500" />
                    <span className="text-sm">Fitness Coach</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-yellow-50 hover:border-yellow-300 bg-transparent"
                    onClick={() => (window.location.href = "/meal-planner")}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-600" />
                    <span className="text-sm">Meal Planner</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                    onClick={() => (window.location.href = "/vr-rooms")}
                  >
                    <Users className="w-6 h-6 text-purple-500" />
                    <span className="text-sm">VR Healing</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vitals Chart */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Recovery Trends</CardTitle>
                <CardDescription>Your healing journey over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        }
                        stroke="#666"
                      />
                      <YAxis stroke="#666" />
                      <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="healingScore"
                        stroke="#4DB6AC"
                        fill="url(#healingGradient)"
                        strokeWidth={3}
                        name="Healing Score"
                      />
                      <Area
                        type="monotone"
                        dataKey="moodScore"
                        stroke="#FF8A65"
                        fill="url(#moodGradient)"
                        strokeWidth={2}
                        name="Mood Score"
                      />
                      <defs>
                        <linearGradient id="healingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4DB6AC" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4DB6AC" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF8A65" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FF8A65" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Today's Progress</CardTitle>
                <CardDescription>
                  {completedTasks} of {todaysPlan.length} tasks completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% complete</p>
                </div>

                <div className="space-y-3">
                  {todaysPlan.slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-4 h-4 rounded-full ${task.completed ? "bg-teal-500" : "bg-gray-300"}`} />
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-800"}`}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">{task.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                  onClick={() => (window.location.href = "/recovery-plan")}
                >
                  View Full Plan
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Recent Achievements</CardTitle>
                <CardDescription>Celebrating your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-lg">
                      ⚡
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Healing Streak</p>
                      <p className="text-xs text-gray-600">5 days of consistent progress</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-lg">
                      🌲
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">VR Explorer</p>
                      <p className="text-xs text-gray-600">Visited all healing environments</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => (window.location.href = "/achievements")}
                >
                  <Award className="w-4 h-4 mr-2" />
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-glow">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">SwasthAI Insight</p>
                    <p className="text-sm opacity-80">Personalized for you</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4">
                  "Your healing score has improved 15% this week! Your consistent meditation practice and family
                  connections are accelerating your recovery. Consider adding gentle movement to boost progress
                  further."
                </p>

                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={() => (window.location.href = "/chat")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with SwasthAI
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
