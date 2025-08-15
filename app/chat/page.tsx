"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Mic, Heart, Brain, Sparkles } from "lucide-react"
import Link from "next/link"
import { demoAIResponses } from "@/lib/demo-data"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  mood?: "supportive" | "caring" | "calming" | "encouraging" | "celebratory"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello Sarah! I'm SwasthAI, your personal healing companion. I'm here to support you through your recovery journey. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      mood: "supportive",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const response of demoAIResponses) {
      if (lowerMessage.includes(response.trigger)) {
        return response.response
      }
    }

    // Default responses
    const defaultResponses = [
      "I understand what you're going through. Your healing journey is unique, and I'm here to support you every step of the way.",
      "That's a great question! Based on your recent progress, I think we can work together to find the best approach for you.",
      "I can see you're making wonderful progress. Your dedication to recovery is truly inspiring. How can I help you today?",
      "Your wellbeing is my priority. Let's explore some healing techniques that might help you feel better.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case "supportive":
        return "from-teal-500 to-teal-600"
      case "caring":
        return "from-pink-500 to-pink-600"
      case "calming":
        return "from-blue-500 to-blue-600"
      case "encouraging":
        return "from-green-500 to-green-600"
      case "celebratory":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-teal-500 to-teal-600"
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
        mood: "supportive",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("I'm feeling a bit anxious today")
      }, 3000)
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

              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center ${isListening ? "animate-glow" : "animate-breathe"}`}
                >
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-serif font-bold text-gray-800">SwasthAI</h1>
                  <p className="text-sm text-gray-600">Your AI Healing Companion</p>
                </div>
              </div>
            </div>

            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="h-[calc(100vh-200px)] bg-white/90 backdrop-blur-sm border-0 shadow-lg flex flex-col">
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="w-10 h-10">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${getMoodColor(message.mood)} rounded-full flex items-center justify-center`}
                    >
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                  </Avatar>
                )}

                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {message.sender === "user" && (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/asian-woman-smiling.png" alt="Sarah" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-10 h-10">
                  <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center animate-pulse">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </Avatar>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
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
          </CardContent>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Share how you're feeling or ask me anything..."
                  className="bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceInput}
                className={`p-3 ${isListening ? "bg-red-100 border-red-300 text-red-600" : "hover:bg-gray-50"}`}
              >
                <Mic className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`} />
              </Button>

              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white p-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {isListening && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Listening... Speak now
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("How am I progressing with my recovery?")}
            className="bg-white/80 hover:bg-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Check Progress
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("I'm feeling anxious today")}
            className="bg-white/80 hover:bg-white"
          >
            <Heart className="w-4 h-4 mr-2" />
            Need Support
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("Can you suggest a healing activity?")}
            className="bg-white/80 hover:bg-white"
          >
            <Brain className="w-4 h-4 mr-2" />
            Get Suggestions
          </Button>
        </div>
      </div>
    </div>
  )
}
