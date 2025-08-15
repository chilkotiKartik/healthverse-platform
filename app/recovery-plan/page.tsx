"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Clock, CheckCircle, Circle, Award, Target } from "lucide-react"
import Link from "next/link"
import { demoRecoveryPlan } from "@/lib/demo-data"

export default function RecoveryPlanPage() {
  const [tasks, setTasks] = useState(demoRecoveryPlan)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const progressPercentage = (completedTasks / tasks.length) * 100

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "meditation":
        return "🧘‍♀️"
      case "exercise":
        return "🏃‍♀️"
      case "medication":
        return "💊"
      case "vr":
        return "🥽"
      case "social":
        return "👨‍👩‍👧‍👦"
      default:
        return "✨"
    }
  }

  const getTaskColor = (type: string) => {
    switch (type) {
      case "meditation":
        return "from-purple-500 to-purple-600"
      case "exercise":
        return "from-green-500 to-green-600"
      case "medication":
        return "from-red-500 to-red-600"
      case "vr":
        return "from-blue-500 to-blue-600"
      case "social":
        return "from-pink-500 to-pink-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-xl font-serif font-bold text-gray-800">Recovery Plan</h1>
                <p className="text-sm text-gray-600">Your personalized healing journey</p>
              </div>
            </div>

            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Day 6 of Recovery
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-serif">Today's Progress</CardTitle>
                <CardDescription>
                  {completedTasks} of {tasks.length} tasks completed
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-teal-600">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-4 mb-4" />
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500" />
                <span>{completedTasks} Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-gray-400" />
                <span>{tasks.length - completedTasks} Remaining</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span>Goal: 100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                task.completed ? "opacity-75" : "hover:shadow-xl"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="w-5 h-5"
                    />
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getTaskColor(task.type)} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}
                    >
                      {getTaskIcon(task.type)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className={`text-lg font-semibold ${
                          task.completed ? "text-gray-500 line-through" : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{task.duration}</span>
                      </div>
                    </div>

                    <p className={`text-gray-600 mb-4 ${task.completed ? "line-through opacity-75" : ""}`}>
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={`capitalize ${
                          task.completed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.type.replace("_", " ")}
                      </Badge>

                      {!task.completed && (
                        <Button
                          size="sm"
                          className={`bg-gradient-to-r ${getTaskColor(task.type)} hover:opacity-90 text-white`}
                          onClick={() => {
                            // Simulate starting the task
                            if (task.type === "vr") {
                              window.location.href = "/vr-rooms"
                            } else if (task.type === "social") {
                              window.location.href = "/family"
                            } else {
                              toggleTask(task.id)
                            }
                          }}
                        >
                          {task.type === "vr" ? "Enter VR" : task.type === "social" ? "Connect" : "Start"}
                        </Button>
                      )}

                      {task.completed && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion Celebration */}
        {progressPercentage === 100 && (
          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-lg mt-8">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-serif font-bold mb-2">Congratulations!</h2>
              <p className="text-lg opacity-90 mb-6">
                You've completed all your recovery tasks for today. Your dedication is inspiring!
              </p>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                <Award className="w-4 h-4 mr-2" />
                View Achievement
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Weekly Overview */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif">This Week's Focus</CardTitle>
            <CardDescription>Key areas for your recovery journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-purple-50">
                <div className="text-2xl mb-2">🧘‍♀️</div>
                <p className="font-medium text-gray-800">Mindfulness</p>
                <p className="text-sm text-gray-600">Daily meditation practice</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50">
                <div className="text-2xl mb-2">🏃‍♀️</div>
                <p className="font-medium text-gray-800">Movement</p>
                <p className="text-sm text-gray-600">Gentle physical activity</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-pink-50">
                <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                <p className="font-medium text-gray-800">Connection</p>
                <p className="text-sm text-gray-600">Family and social support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
