"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Brain,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Activity,
  Star,
  CheckCircle,
  Zap,
  Target,
  BookOpen,
  Headphones,
} from "lucide-react"

export default function LandingPage() {
  const [isEntering, setIsEntering] = useState(false)

  const handleEnterHealthVerse = () => {
    setIsEntering(true)
    setTimeout(() => {
      window.location.href = "/auth"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and Brand */}
        <div className="text-center mb-12 animate-breathe">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-4">HealthVerse AI</h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-6">Your Recovery, Redefined</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Experience personalized healthcare with AI companions, immersive VR healing, family support, and
            comprehensive wellness tracking - all in one revolutionary platform.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">AI Companion</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-8 h-8 text-coral-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">VR Healing</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">Family Support</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">Secure & Private</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <Button
            onClick={handleEnterHealthVerse}
            disabled={isEntering}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
          >
            {isEntering ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Entering HealthVerse...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Enter HealthVerse AI
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-4">Experience the future of personalized healthcare</p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="bg-white/80 text-gray-700">
            HIPAA Compliant
          </Badge>
          <Badge variant="secondary" className="bg-white/80 text-gray-700">
            AI-Powered
          </Badge>
          <Badge variant="secondary" className="bg-white/80 text-gray-700">
            Multilingual
          </Badge>
          <Badge variant="secondary" className="bg-white/80 text-gray-700">
            24/7 Support
          </Badge>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Comprehensive Health Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HealthVerse AI combines cutting-edge technology with compassionate care to create a holistic healing
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">SwasthAI Companion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Your personal AI health companion providing 24/7 emotional support, health guidance, and personalized
                  recommendations.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    Multilingual support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    Mood-aware responses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    Voice interaction
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-coral-500" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">VR Healing Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Immersive virtual environments designed to reduce stress, anxiety, and promote healing through guided
                  meditation.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-500" />
                    Forest Sanctuary
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-500" />
                    Healing Beach
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-500" />
                    Sacred Temple
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">Health Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive vitals monitoring with real-time insights and personalized health recommendations.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    Heart rate monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    Sleep tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    Mood analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">Family Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Keep your loved ones connected with real-time updates, messaging, and emergency alerts.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    Real-time updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    Video calling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    Emergency alerts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-coral-500" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">Recovery Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Personalized recovery journeys with milestone tracking, achievements, and adaptive goal setting.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-500" />
                    Custom milestones
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-500" />
                    Progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-500" />
                    Achievement badges
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">Health Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Interactive courses, expert content, and personalized learning paths for better health outcomes.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    Expert courses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    Quick reads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    Emergency guides
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Bot Ecosystem */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">AI-Powered Health Assistants</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet your team of specialized AI companions, each designed to support different aspects of your health
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Agent</h3>
                <p className="text-sm text-gray-600 mb-4">Symptom checker, health insights, and medical guidance</p>
                <Badge className="bg-teal-100 text-teal-700">Available 24/7</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-coral-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Fitness Coach</h3>
                <p className="text-sm text-gray-600 mb-4">Personalized workouts, progress tracking, and motivation</p>
                <Badge className="bg-coral-100 text-coral-700">Adaptive Plans</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nutrition Guide</h3>
                <p className="text-sm text-gray-600 mb-4">Meal planning, dietary advice, and nutrition tracking</p>
                <Badge className="bg-yellow-100 text-yellow-700">Smart Recipes</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Therapy Companion</h3>
                <p className="text-sm text-gray-600 mb-4">Mental health support, mindfulness, and emotional wellness</p>
                <Badge className="bg-purple-100 text-purple-700">Confidential</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Real stories from our HealthVerse community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "HealthVerse AI transformed my recovery journey. The VR healing rooms helped me manage anxiety, and
                  SwasthAI was like having a caring friend available 24/7."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-semibold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Sarah Chen</p>
                    <p className="text-sm text-gray-500">Recovery Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "As a family member, the real-time updates and emergency alerts gave us peace of mind. We felt
                  connected to mom's recovery every step of the way."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center">
                    <span className="text-coral-600 font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Michael Rodriguez</p>
                    <p className="text-sm text-gray-500">Family Member</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The comprehensive health tracking and AI insights help me provide better care for my patients.
                  HealthVerse is revolutionizing healthcare delivery."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold">D</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Dr. Emily Watson</p>
                    <p className="text-sm text-gray-500">Healthcare Provider</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-teal-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-teal-100">VR Sessions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-teal-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-teal-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Ready to Transform Your Health Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have discovered a new way to heal, connect, and thrive with HealthVerse AI.
          </p>
          <Button
            onClick={handleEnterHealthVerse}
            disabled={isEntering}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-12 py-4 text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isEntering ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Entering HealthVerse...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Start Your Journey Today
                <ArrowRight className="w-6 h-6" />
              </div>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-6">Free to start • No credit card required • HIPAA compliant</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-teal-400" />
                <span className="text-xl font-serif font-bold">HealthVerse AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing healthcare through AI, VR, and compassionate technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>AI Companions</li>
                <li>VR Healing</li>
                <li>Family Connect</li>
                <li>Health Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 HealthVerse AI. All rights reserved. Made with ❤️ for better health outcomes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
