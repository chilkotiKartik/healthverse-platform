"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, ArrowLeft, Play, RotateCcw, Target, Trophy, Calendar, Clock, Activity, Heart, Flame } from "lucide-react"
import Link from "next/link"

const workoutPlans = [
  {
    id: 1,
    title: "Gentle Recovery",
    description: "Low-impact exercises for healing",
    duration: "15-20 min",
    difficulty: "Beginner",
    exercises: ["Gentle stretching", "Deep breathing", "Light walking", "Chair yoga"],
    color: "bg-teal-500",
  },
  {
    id: 2,
    title: "Strength Building",
    description: "Build muscle and endurance",
    duration: "25-30 min",
    difficulty: "Intermediate",
    exercises: ["Bodyweight squats", "Modified push-ups", "Resistance bands", "Core strengthening"],
    color: "bg-coral-500",
  },
  {
    id: 3,
    title: "Cardio Boost",
    description: "Heart-healthy cardiovascular exercise",
    duration: "20-25 min",
    difficulty: "Intermediate",
    exercises: ["Brisk walking", "Light jogging", "Dancing", "Cycling"],
    color: "bg-yellow-500",
  },
]

const todaysWorkout = {
  title: "Morning Gentle Recovery",
  totalTime: 18,
  exercises: [
    { name: "Neck rolls", duration: 2, completed: true },
    { name: "Shoulder shrugs", duration: 2, completed: true },
    { name: "Arm circles", duration: 3, completed: false },
    { name: "Gentle twists", duration: 3, completed: false },
    { name: "Deep breathing", duration: 5, completed: false },
    { name: "Relaxation", duration: 3, completed: false },
  ],
}

const weeklyProgress = [
  { day: "Mon", completed: true, duration: 15 },
  { day: "Tue", completed: true, duration: 20 },
  { day: "Wed", completed: false, duration: 0 },
  { day: "Thu", completed: true, duration: 18 },
  { day: "Fri", completed: true, duration: 22 },
  { day: "Sat", completed: false, duration: 0 },
  { day: "Sun", completed: false, duration: 0 },
]

export default function FitnessCoach() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [workoutTimer, setWorkoutTimer] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  const completedExercises = todaysWorkout.exercises.filter((ex) => ex.completed).length
  const progressPercentage = (completedExercises / todaysWorkout.exercises.length) * 100

  const startWorkout = (planId: number) => {
    setSelectedPlan(planId)
    setIsWorkoutActive(true)
    setCurrentExercise(0)
    setWorkoutTimer(0)
  }

  const pauseWorkout = () => {
    setIsWorkoutActive(false)
  }

  const resetWorkout = () => {
    setIsWorkoutActive(false)
    setWorkoutTimer(0)
    setCurrentExercise(0)
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
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-gray-800">AI Fitness Coach</h1>
                <p className="text-sm text-gray-600">Personalized workout plans</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Flame className="w-3 h-3 mr-1" />4 day streak
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today's Workout</TabsTrigger>
            <TabsTrigger value="plans">Workout Plans</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Today's Workout */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-teal-600" />
                    {todaysWorkout.title}
                  </CardTitle>
                  <Badge variant="secondary">{todaysWorkout.totalTime} min</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600">
                        {completedExercises}/{todaysWorkout.exercises.length}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  {todaysWorkout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-lg ${exercise.completed ? "bg-teal-50" : "bg-gray-50"}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${exercise.completed ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                      >
                        {exercise.completed && <div className="w-3 h-3 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${exercise.completed ? "text-teal-700" : "text-gray-800"}`}>
                          {exercise.name}
                        </h4>
                        <p className="text-sm text-gray-600">{exercise.duration} minutes</p>
                      </div>
                      {!exercise.completed && (
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-teal-500 hover:bg-teal-600">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Workout
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">AI Coach Recommendation</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Great progress this week! Your consistency is improving your recovery. Consider adding 5 minutes
                      of light stretching after your main workout to enhance flexibility and reduce muscle tension.
                    </p>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      View Detailed Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${plan.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{plan.duration}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {plan.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-700">Includes:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.exercises.slice(0, 3).map((exercise, index) => (
                          <li key={index}>• {exercise}</li>
                        ))}
                        {plan.exercises.length > 3 && (
                          <li className="text-gray-500">• +{plan.exercises.length - 3} more</li>
                        )}
                      </ul>
                    </div>

                    <Button onClick={() => startWorkout(plan.id)} className="w-full bg-teal-500 hover:bg-teal-600">
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Plan Generator */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-coral-500" />
                  Create Custom Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Focus Area</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>Full Body</option>
                      <option>Upper Body</option>
                      <option>Lower Body</option>
                      <option>Core</option>
                      <option>Flexibility</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Intensity</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>Low</option>
                      <option>Moderate</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-coral-500 hover:bg-coral-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate AI Workout Plan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Weekly Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  This Week's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-gray-600 mb-2">{day.day}</p>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${day.completed ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        {day.completed ? (
                          <Activity className="w-4 h-4" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{day.duration}m</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <Heart className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-teal-600">4</p>
                    <p className="text-sm text-gray-600">Workouts Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">75</p>
                    <p className="text-sm text-gray-600">Total Minutes</p>
                  </div>
                  <div className="text-center p-4 bg-coral-50 rounded-lg">
                    <Flame className="w-6 h-6 text-coral-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-coral-500">4</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fitness Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Strength Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Push-ups</span>
                        <span className="text-sm font-medium">12 → 18</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Squats</span>
                        <span className="text-sm font-medium">15 → 25</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Plank (seconds)</span>
                        <span className="text-sm font-medium">30 → 45</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Recovery Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Flexibility</span>
                      <div className="flex items-center gap-2">
                        <Progress value={70} className="h-2 w-20" />
                        <span className="text-sm font-medium">Good</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Energy Level</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-20" />
                        <span className="text-sm font-medium">High</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Recovery Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="h-2 w-20" />
                        <span className="text-sm font-medium">Excellent</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-2">First Week Complete</h3>
                  <p className="text-sm opacity-90">Completed 7 consecutive days</p>
                  <Badge variant="secondary" className="mt-3 bg-white/20 text-white border-0">
                    Unlocked
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Flame className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-2">Streak Master</h3>
                  <p className="text-sm opacity-90">4 day workout streak</p>
                  <Badge variant="secondary" className="mt-3 bg-white/20 text-white border-0">
                    In Progress
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="font-semibold mb-2 text-gray-600">Strength Builder</h3>
                  <p className="text-sm text-gray-500">Complete 20 strength workouts</p>
                  <Badge variant="secondary" className="mt-3">
                    4/20 Complete
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
