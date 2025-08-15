"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Send, Mic, MicOff, ArrowLeft, Heart, Activity, Stethoscope, Lightbulb, Globe } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  mood?: "supportive" | "informative" | "encouraging"
}

const quickQuestions = [
  "How can I improve my sleep quality?",
  "What exercises are good for recovery?",
  "Can you suggest healthy meal ideas?",
  "How do I manage stress better?",
  "What are signs of good mental health?",
  "How much water should I drink daily?",
]

const healthTopics = [
  { icon: Heart, title: "Heart Health", description: "Cardiovascular wellness tips" },
  { icon: Brain, title: "Mental Wellness", description: "Stress management & mindfulness" },
  { icon: Activity, title: "Physical Fitness", description: "Exercise & movement guidance" },
  { icon: Stethoscope, title: "Symptom Checker", description: "Understand your symptoms" },
]

export default function AIHealthAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI Health Agent. I'm here to provide educational health information and support your wellness journey. How can I help you today?",
      timestamp: new Date(),
      mood: "supportive",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        mood: "informative",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (input: string): string => {
    const responses = {
      sleep:
        "Great question about sleep! Here are some evidence-based tips: 1) Maintain a consistent sleep schedule, 2) Create a relaxing bedtime routine, 3) Keep your bedroom cool and dark, 4) Avoid screens 1 hour before bed, 5) Consider meditation or gentle stretching. Quality sleep is crucial for recovery and overall health.",
      exercise:
        "Exercise is fantastic for recovery! Start with gentle activities like walking or swimming. Aim for 150 minutes of moderate activity per week. Listen to your body and gradually increase intensity. Yoga and tai chi are excellent for both physical and mental wellness. Always consult your healthcare provider before starting new exercise routines.",
      nutrition:
        "Nutrition plays a vital role in healing! Focus on: 1) Colorful fruits and vegetables (antioxidants), 2) Lean proteins (tissue repair), 3) Whole grains (sustained energy), 4) Healthy fats like omega-3s, 5) Stay hydrated with 8-10 glasses of water daily. Consider anti-inflammatory foods like berries, leafy greens, and fatty fish.",
      stress:
        "Stress management is key to wellness! Try these techniques: 1) Deep breathing exercises (4-7-8 technique), 2) Regular meditation or mindfulness, 3) Physical activity, 4) Connect with loved ones, 5) Maintain work-life balance, 6) Practice gratitude. Remember, it's okay to seek professional help when needed.",
      default:
        "Thank you for your question! While I can provide general health education, I always recommend consulting with your healthcare provider for personalized medical advice. Is there a specific aspect of health and wellness you'd like to explore together?",
    }

    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("sleep")) return responses.sleep
    if (lowerInput.includes("exercise") || lowerInput.includes("workout")) return responses.exercise
    if (lowerInput.includes("food") || lowerInput.includes("nutrition") || lowerInput.includes("meal"))
      return responses.nutrition
    if (lowerInput.includes("stress") || lowerInput.includes("anxiety")) return responses.stress
    return responses.default
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with speech recognition
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
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-gray-800">AI Health Agent</h1>
                <p className="text-sm text-gray-600">Your personal health companion</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <Badge variant="secondary" className="text-xs">
              <Globe className="w-3 h-3 mr-1" />
              Multi-language
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="topics">Health Topics</TabsTrigger>
            <TabsTrigger value="symptom-checker">Symptom Checker</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            {/* Chat Interface */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.type === "user" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.type === "ai" && (
                          <div className="flex items-center gap-2 mb-1">
                            <Brain className="w-3 h-3" />
                            <span className="text-xs font-medium">AI Health Agent</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="border-t border-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Questions:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me about your health and wellness..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={toggleListening}
                      variant="outline"
                      size="sm"
                      className={isListening ? "bg-red-50 text-red-600" : ""}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button onClick={handleSendMessage} size="sm" className="bg-teal-500 hover:bg-teal-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 I provide educational information only. Always consult healthcare professionals for medical
                    advice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthTopics.map((topic, index) => {
                const Icon = topic.icon
                return (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{topic.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                          <Button size="sm" variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="symptom-checker" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                  AI Symptom Checker (Demo)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important Disclaimer</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        This is a demo feature for educational purposes only. It does not provide medical diagnosis.
                        Always consult healthcare professionals for medical concerns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Describe your symptoms:</label>
                    <textarea
                      className="w-full p-3 border border-gray-200 rounded-lg resize-none"
                      rows={4}
                      placeholder="e.g., I've been feeling tired and have a mild headache for the past two days..."
                    />
                  </div>

                  <Button className="w-full bg-teal-500 hover:bg-teal-600">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Analyze Symptoms (Demo)
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Sample Analysis Result:</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Based on your symptoms, here are some general wellness recommendations:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Ensure adequate hydration (8-10 glasses of water daily)</li>
                      <li>• Get 7-9 hours of quality sleep</li>
                      <li>• Consider stress management techniques</li>
                      <li>• Maintain regular meal times</li>
                    </ul>
                    <p className="text-sm font-medium text-red-600 mt-3">
                      ⚠️ If symptoms persist or worsen, please consult a healthcare professional.
                    </p>
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
