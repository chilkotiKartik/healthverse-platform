"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  ArrowLeft,
  Target,
  Flame,
  Star,
  Calendar,
  Users,
  Zap,
  Heart,
  Brain,
  Droplets,
  Activity,
} from "lucide-react"
import Link from "next/link"

const dailyQuests = [
  {
    id: 1,
    title: "Drink 8 glasses of water",
    description: "Stay hydrated for optimal recovery",
    progress: 6,
    target: 8,
    points: 50,
    icon: Droplets,
    color: "text-blue-500",
    completed: false,
  },
  {
    id: 2,
    title: "Complete 20-minute workout",
    description: "Physical activity boosts healing",
    progress: 20,
    target: 20,
    points: 100,
    icon: Activity,
    color: "text-green-500",
    completed: true,
  },
  {
    id: 3,
    title: "Practice 10 minutes of meditation",
    description: "Mindfulness reduces stress",
    progress: 0,
    target: 10,
    points: 75,
    icon: Brain,
    color: "text-purple-500",
    completed: false,
  },
  {
    id: 4,
    title: "Log your mood 3 times",
    description: "Track emotional wellness",
    progress: 2,
    target: 3,
    points: 30,
    icon: Heart,
    color: "text-red-500",
    completed: false,
  },
]

const achievements = [
  {
    id: 1,
    title: "First Week Warrior",
    description: "Completed 7 consecutive days of health activities",
    icon: "🏆",
    points: 500,
    unlocked: true,
    rarity: "Gold",
  },
  {
    id: 2,
    title: "Hydration Hero",
    description: "Drank 8+ glasses of water for 5 days straight",
    icon: "💧",
    points: 250,
    unlocked: true,
    rarity: "Silver",
  },
  {
    id: 3,
    title: "Mindfulness Master",
    description: "Meditated for 30 consecutive days",
    icon: "🧘",
    points: 1000,
    unlocked: false,
    rarity: "Platinum",
    progress: 12,
    target: 30,
  },
  {
    id: 4,
    title: "Fitness Fanatic",
    description: "Completed 50 workout sessions",
    icon: "💪",
    points: 750,
    unlocked: false,
    rarity: "Gold",
    progress: 23,
    target: 50,
  },
  {
    id: 5,
    title: "Social Butterfly",
    description: "Connected with family members 20 times",
    icon: "🦋",
    points: 300,
    unlocked: true,
    rarity: "Bronze",
  },
  {
    id: 6,
    title: "VR Explorer",
    description: "Visited all 3 healing environments",
    icon: "🌟",
    points: 400,
    unlocked: true,
    rarity: "Silver",
  },
]

const leaderboard = [
  { rank: 1, name: "Sarah Chen", points: 2850, avatar: "/asian-woman-smiling.png", isCurrentUser: true },
  {
    rank: 2,
    name: "Michael Rodriguez",
    points: 2720,
    avatar: "/hispanic-doctor-professional.png",
    isCurrentUser: false,
  },
  { rank: 3, name: "Emma Thompson", points: 2650, avatar: "/older-asian-woman-smiling.png", isCurrentUser: false },
  { rank: 4, name: "David Kim", points: 2480, avatar: "/asian-man-caring.png", isCurrentUser: false },
  { rank: 5, name: "Lisa Johnson", points: 2350, avatar: "/young-hispanic-woman.png", isCurrentUser: false },
]

const healthStreaks = [
  { type: "Workout", current: 7, best: 12, icon: Activity, color: "text-green-500" },
  { type: "Meditation", current: 12, best: 15, icon: Brain, color: "text-purple-500" },
  { type: "Hydration", current: 5, best: 8, icon: Droplets, color: "text-blue-500" },
  { type: "Mood Tracking", current: 9, best: 14, icon: Heart, color: "text-red-500" },
]

export default function Gamification() {
  const [selectedTab, setSelectedTab] = useState("quests")
  const [completedQuests, setCompletedQuests] = useState(1)

  const totalPoints = 2850
  const currentLevel = Math.floor(totalPoints / 500) + 1
  const pointsToNextLevel = currentLevel * 500 - totalPoints
  const levelProgress = ((totalPoints % 500) / 500) * 100

  const completeQuest = (questId: number) => {
    setCompletedQuests((prev) => prev + 1)
    // In a real app, this would update the quest status
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-gray-800">Health Gamification</h1>
                <p className="text-sm text-gray-600">
                  Level {currentLevel} • {totalPoints} points
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Flame className="w-3 h-3 mr-1" />7 day streak
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Level Progress */}
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Level {currentLevel}</h2>
                <p className="text-sm opacity-90">
                  {pointsToNextLevel} points to Level {currentLevel + 1}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{totalPoints}</p>
                <p className="text-sm opacity-90">Total Points</p>
              </div>
            </div>
            <Progress value={levelProgress} className="h-3 bg-white/20" />
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quests">Daily Quests</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailyQuests.map((quest) => {
                const Icon = quest.icon
                const progressPercentage = (quest.progress / quest.target) * 100

                return (
                  <Card
                    key={quest.id}
                    className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${quest.completed ? "ring-2 ring-green-200" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center ${quest.completed ? "bg-green-100" : ""}`}
                        >
                          <Icon className={`w-6 h-6 ${quest.completed ? "text-green-600" : quest.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${quest.completed ? "text-green-700" : "text-gray-800"}`}>
                              {quest.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              +{quest.points} pts
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{quest.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">
                                {quest.progress}/{quest.target}
                              </span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>

                          {quest.completed ? (
                            <Badge className="mt-3 bg-green-500 hover:bg-green-600">
                              <Trophy className="w-3 h-3 mr-1" />
                              Completed!
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              className="mt-3 bg-teal-500 hover:bg-teal-600"
                              onClick={() => completeQuest(quest.id)}
                            >
                              <Target className="w-3 h-3 mr-1" />
                              Track Progress
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quest Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Today's Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <Target className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-teal-600">{completedQuests}</p>
                    <p className="text-sm text-gray-600">Quests Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">225</p>
                    <p className="text-sm text-gray-600">Points Earned Today</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Flame className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">7</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${
                    achievement.unlocked ? "ring-2 ring-yellow-200" : "opacity-75"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className={`font-semibold mb-2 ${achievement.unlocked ? "text-gray-800" : "text-gray-500"}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          achievement.rarity === "Platinum"
                            ? "bg-gray-200 text-gray-800"
                            : achievement.rarity === "Gold"
                              ? "bg-yellow-100 text-yellow-800"
                              : achievement.rarity === "Silver"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        +{achievement.points} pts
                      </Badge>
                    </div>

                    {!achievement.unlocked && achievement.progress && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                      </div>
                    )}

                    {achievement.unlocked && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <Trophy className="w-3 h-3 mr-1" />
                        Unlocked!
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        user.isCurrentUser ? "bg-teal-50 ring-2 ring-teal-200" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rank === 1
                            ? "bg-yellow-500 text-white"
                            : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.rank}
                      </div>

                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <p className={`font-medium ${user.isCurrentUser ? "text-teal-700" : "text-gray-800"}`}>
                          {user.name} {user.isCurrentUser && "(You)"}
                        </p>
                        <p className="text-sm text-gray-600">{user.points} points</p>
                      </div>

                      {user.rank <= 3 && (
                        <div className="text-2xl">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenge Section */}
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Weekly Challenge</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Complete 5 VR healing sessions this week to earn 500 bonus points and climb the leaderboard!
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={60} className="h-2 bg-white/20" />
                        <p className="text-xs mt-1 opacity-80">3/5 sessions completed</p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="streaks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthStreaks.map((streak, index) => {
                const Icon = streak.icon
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${streak.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{streak.type} Streak</h3>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-2xl font-bold text-teal-600">{streak.current}</p>
                              <p className="text-xs text-gray-600">Current</p>
                            </div>
                            <div>
                              <p className="text-lg font-semibold text-gray-500">{streak.best}</p>
                              <p className="text-xs text-gray-600">Best</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl">{streak.current >= streak.best ? "🔥" : "⚡"}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Streak Tips */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  Streak Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Set Daily Reminders</p>
                      <p className="text-xs text-gray-600">Use notifications to maintain consistency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Start Small</p>
                      <p className="text-xs text-gray-600">Begin with achievable goals and build up</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Track Progress</p>
                      <p className="text-xs text-gray-600">Visual progress helps maintain motivation</p>
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
