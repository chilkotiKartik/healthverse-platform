"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Stethoscope, ArrowLeft } from "lucide-react"
import Link from "next/link"

type UserRole = "patient" | "family" | "doctor"

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      id: "patient" as UserRole,
      title: "Patient",
      description: "Access your personalized recovery journey",
      icon: Heart,
      color: "from-teal-500 to-teal-600",
      demoCredentials: { email: "patient@demo.com", password: "demo123" },
    },
    {
      id: "family" as UserRole,
      title: "Family Member",
      description: "Support your loved one's healing process",
      icon: Users,
      color: "from-coral-500 to-coral-600",
      demoCredentials: { email: "family@demo.com", password: "demo123" },
    },
    {
      id: "doctor" as UserRole,
      title: "Healthcare Provider",
      description: "Monitor and guide patient recovery",
      icon: Stethoscope,
      color: "from-yellow-500 to-yellow-600",
      demoCredentials: { email: "doctor@demo.com", password: "demo123" },
    },
  ]

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem(
        "healthverse_user",
        JSON.stringify({
          role,
          name: role === "patient" ? "Sarah Chen" : role === "family" ? "Michael Chen" : "Dr. Rodriguez",
          email: roles.find((r) => r.id === role)?.demoCredentials.email,
        }),
      )

      // Redirect based on role
      const redirectPath = role === "patient" ? "/dashboard" : role === "family" ? "/family" : "/provider"
      window.location.href = redirectPath
    }, 1500)
  }

  if (selectedRole) {
    const role = roles.find((r) => r.id === selectedRole)!
    const IconComponent = role.icon

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRole(null)}
              className="absolute top-4 left-4 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <div
              className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl mb-4 shadow-lg mx-auto`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>

            <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
            <CardDescription>Sign in as {role.title.toLowerCase()}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={role.demoCredentials.email} className="bg-white/80" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                defaultValue={role.demoCredentials.password}
                className="bg-white/80"
              />
            </div>

            <Badge variant="secondary" className="w-full justify-center py-2 bg-blue-50 text-blue-700">
              Demo Mode - Credentials Pre-filled
            </Badge>

            <Button
              onClick={() => handleLogin(selectedRole)}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-white py-3 rounded-xl shadow-lg transition-all duration-300`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                `Sign In as ${role.title}`
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">This is a demo environment with simulated data</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Choose Your Role</h1>
          <p className="text-lg text-gray-600">Select how you'd like to experience HealthVerse AI</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon

            return (
              <Card
                key={role.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">{role.title}</h3>

                  <p className="text-gray-600 mb-6">{role.description}</p>

                  <Button
                    className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-white rounded-xl shadow-md transition-all duration-300`}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Badge variant="secondary" className="bg-white/80 text-gray-700">
            All roles include demo data for exploration
          </Badge>
        </div>
      </div>
    </div>
  )
}
