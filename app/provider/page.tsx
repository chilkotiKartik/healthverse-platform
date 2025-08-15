"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Brain,
  Activity,
  MessageSquare,
  Calendar,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts"
import { demoHealthData } from "@/lib/demo-data"

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  avatar: string
  healingScore: number
  riskLevel: "low" | "medium" | "high"
  lastActivity: string
  nextAppointment: string
}

export default function ProviderDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<string>("1")

  const patients: Patient[] = [
    {
      id: "1",
      name: "Sarah Chen",
      age: 34,
      condition: "Post-surgical recovery",
      avatar: "/asian-woman-smiling.png",
      healingScore: 78,
      riskLevel: "low",
      lastActivity: "2 hours ago",
      nextAppointment: "Jan 25, 2024",
    },
    {
      id: "2",
      name: "James Wilson",
      age: 45,
      condition: "Chronic pain management",
      avatar: "/middle-aged-man-contemplative.png",
      healingScore: 65,
      riskLevel: "medium",
      lastActivity: "5 hours ago",
      nextAppointment: "Jan 23, 2024",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      age: 28,
      condition: "Anxiety and depression",
      avatar: "/young-hispanic-woman.png",
      healingScore: 82,
      riskLevel: "low",
      lastActivity: "1 hour ago",
      nextAppointment: "Jan 26, 2024",
    },
  ]

  const currentPatient = patients.find((p) => p.id === selectedPatient) || patients[0]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const weeklyData = [
    { day: "Mon", sessions: 3, mood: 7, compliance: 85 },
    { day: "Tue", sessions: 4, mood: 6, compliance: 90 },
    { day: "Wed", sessions: 2, mood: 8, compliance: 75 },
    { day: "Thu", sessions: 5, mood: 7, compliance: 95 },
    { day: "Fri", sessions: 3, mood: 8, compliance: 88 },
    { day: "Sat", sessions: 4, mood: 9, compliance: 92 },
    { day: "Sun", sessions: 2, mood: 7, compliance: 80 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-xl font-serif font-bold text-gray-800">Provider Dashboard</h1>
                <p className="text-sm text-gray-600">Dr. Rodriguez - Orthopedic Surgery</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {patients.length} Active Patients
              </Badge>
              <Avatar>
                <AvatarImage src="/hispanic-doctor-professional.png" alt="Dr. Rodriguez" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Patient List */}
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-serif">My Patients</CardTitle>
                <CardDescription>Active recovery cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPatient === patient.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{patient.name}</p>
                        <p className="text-xs text-gray-600">{patient.condition}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge size="sm" className={getRiskColor(patient.riskLevel)}>
                            {patient.riskLevel} risk
                          </Badge>
                          <span className="text-xs text-gray-500">{patient.lastActivity}</span>
                        </div>
                      </div>
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
              <CardContent className="space-y-2">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Activity className="w-4 h-4 mr-2" />
                  Update Treatment Plan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Patient Overview */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={currentPatient.avatar || "/placeholder.svg"} alt={currentPatient.name} />
                      <AvatarFallback>
                        {currentPatient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl font-serif">{currentPatient.name}</CardTitle>
                      <CardDescription>
                        Age {currentPatient.age} • {currentPatient.condition}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getRiskColor(currentPatient.riskLevel)}>
                          {currentPatient.riskLevel} risk
                        </Badge>
                        <span className="text-sm text-gray-500">Next: {currentPatient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{currentPatient.healingScore}</div>
                    <div className="text-sm text-gray-500">Healing Score</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">78</div>
                  <div className="text-sm text-gray-600">Healing Score</div>
                  <div className="text-xs text-green-600 mt-1">+5 this week</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">72</div>
                  <div className="text-sm text-gray-600">Avg Heart Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Normal range</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">7.2</div>
                  <div className="text-sm text-gray-600">Avg Mood</div>
                  <div className="text-xs text-green-600 mt-1">Improving</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">87%</div>
                  <div className="text-sm text-gray-600">Compliance</div>
                  <div className="text-xs text-green-600 mt-1">Excellent</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Recovery Trend</CardTitle>
                  <CardDescription>Healing score over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={demoHealthData}>
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
                        <Line
                          type="monotone"
                          dataKey="healingScore"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          name="Healing Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Weekly Activity</CardTitle>
                  <CardDescription>Therapy sessions and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Bar dataKey="sessions" fill="#10B981" name="Sessions" />
                        <Bar dataKey="compliance" fill="#3B82F6" name="Compliance %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts and Notes */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Recent Alerts</CardTitle>
                  <CardDescription>Important patient updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Mood Drop Detected</p>
                      <p className="text-sm text-yellow-700">Patient mood score dropped to 4/10 yesterday</p>
                      <p className="text-xs text-yellow-600 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Milestone Achieved</p>
                      <p className="text-sm text-green-700">Completed 5-day healing streak</p>
                      <p className="text-xs text-green-600 mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Appointment Reminder</p>
                      <p className="text-sm text-blue-700">Follow-up scheduled for Jan 25, 2024</p>
                      <p className="text-xs text-blue-600 mt-1">3 days from now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Treatment Notes</CardTitle>
                  <CardDescription>Clinical observations and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      Patient showing excellent progress with VR therapy sessions. Recommend increasing frequency to 3x
                      weekly. Family support system is highly effective - mood scores improve significantly after family
                      interactions.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Jan 20, 2024 - Dr. Rodriguez</p>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      SwasthAI companion engagement is high. Patient responds well to meditation and breathing
                      exercises. Consider adding gentle movement therapy to recovery plan.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Jan 18, 2024 - Dr. Rodriguez</p>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Add New Note
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
