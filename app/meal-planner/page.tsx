"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  ArrowLeft,
  Plus,
  Clock,
  ChefHat,
  Apple,
  Droplets,
  Zap,
  Heart,
  Calculator,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

const mealPlans = [
  {
    id: 1,
    title: "Anti-Inflammatory Recovery",
    description: "Foods that support healing and reduce inflammation",
    duration: "7 days",
    calories: "1800-2000",
    meals: ["Turmeric golden milk", "Salmon with quinoa", "Berry smoothie bowl", "Green tea"],
    color: "bg-teal-500",
  },
  {
    id: 2,
    title: "Heart-Healthy Mediterranean",
    description: "Mediterranean diet for cardiovascular wellness",
    duration: "7 days",
    calories: "1900-2100",
    meals: ["Greek yogurt parfait", "Grilled fish", "Olive oil salad", "Nuts & fruits"],
    color: "bg-coral-500",
  },
  {
    id: 3,
    title: "Energy Boost Plant-Based",
    description: "Plant-powered nutrition for sustained energy",
    duration: "7 days",
    calories: "1700-1900",
    meals: ["Overnight oats", "Lentil curry", "Green smoothie", "Quinoa bowl"],
    color: "bg-yellow-500",
  },
]

const todaysNutrition = {
  calories: { consumed: 1420, target: 1800 },
  protein: { consumed: 85, target: 120 },
  carbs: { consumed: 180, target: 225 },
  fat: { consumed: 45, target: 60 },
  water: { consumed: 6, target: 8 },
}

const todaysMeals = [
  {
    id: 1,
    type: "Breakfast",
    name: "Turmeric Golden Milk Smoothie",
    calories: 320,
    time: "8:00 AM",
    completed: true,
    ingredients: ["Banana", "Turmeric", "Coconut milk", "Honey", "Ginger"],
  },
  {
    id: 2,
    type: "Lunch",
    name: "Quinoa Buddha Bowl",
    calories: 480,
    time: "12:30 PM",
    completed: true,
    ingredients: ["Quinoa", "Roasted vegetables", "Chickpeas", "Tahini dressing"],
  },
  {
    id: 3,
    type: "Snack",
    name: "Mixed Berry & Nuts",
    calories: 180,
    time: "3:00 PM",
    completed: false,
    ingredients: ["Blueberries", "Almonds", "Walnuts", "Greek yogurt"],
  },
  {
    id: 4,
    type: "Dinner",
    name: "Grilled Salmon with Sweet Potato",
    calories: 520,
    time: "7:00 PM",
    completed: false,
    ingredients: ["Wild salmon", "Sweet potato", "Asparagus", "Olive oil", "Herbs"],
  },
]

const recipes = [
  {
    id: 1,
    title: "Anti-Inflammatory Golden Milk",
    prepTime: "5 min",
    difficulty: "Easy",
    rating: 4.8,
    image: "/golden-milk-turmeric-drink.png",
    tags: ["Anti-inflammatory", "Dairy-free", "Quick"],
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Salad",
    prepTime: "15 min",
    difficulty: "Easy",
    rating: 4.9,
    image: "/mediterranean-quinoa-salad.png",
    tags: ["Heart-healthy", "Vegetarian", "Make-ahead"],
  },
  {
    id: 3,
    title: "Healing Bone Broth",
    prepTime: "4 hours",
    difficulty: "Medium",
    rating: 4.7,
    image: "/healing-bone-broth.png",
    tags: ["Healing", "Protein-rich", "Slow-cook"],
  },
]

export default function MealPlanner() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [waterIntake, setWaterIntake] = useState(todaysNutrition.water.consumed)

  const addWater = () => {
    if (waterIntake < todaysNutrition.water.target) {
      setWaterIntake(waterIntake + 1)
    }
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
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-gray-800">AI Meal Planner</h1>
                <p className="text-sm text-gray-600">Nutrition for healing & wellness</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Apple className="w-3 h-3 mr-1" />
              Personalized
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today's Plan</TabsTrigger>
            <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Nutrition Overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-800">{todaysNutrition.calories.consumed}</p>
                  <p className="text-xs text-gray-600">/{todaysNutrition.calories.target} cal</p>
                  <Progress
                    value={(todaysNutrition.calories.consumed / todaysNutrition.calories.target) * 100}
                    className="h-1 mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Heart className="w-6 h-6 text-coral-500 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-800">{todaysNutrition.protein.consumed}g</p>
                  <p className="text-xs text-gray-600">/{todaysNutrition.protein.target}g protein</p>
                  <Progress
                    value={(todaysNutrition.protein.consumed / todaysNutrition.protein.target) * 100}
                    className="h-1 mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Apple className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-800">{todaysNutrition.carbs.consumed}g</p>
                  <p className="text-xs text-gray-600">/{todaysNutrition.carbs.target}g carbs</p>
                  <Progress
                    value={(todaysNutrition.carbs.consumed / todaysNutrition.carbs.target) * 100}
                    className="h-1 mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Target className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-800">{todaysNutrition.fat.consumed}g</p>
                  <p className="text-xs text-gray-600">/{todaysNutrition.fat.target}g fat</p>
                  <Progress
                    value={(todaysNutrition.fat.consumed / todaysNutrition.fat.target) * 100}
                    className="h-1 mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-800">{waterIntake}</p>
                  <p className="text-xs text-gray-600">/{todaysNutrition.water.target} glasses</p>
                  <Button
                    onClick={addWater}
                    size="sm"
                    variant="outline"
                    className="mt-2 h-6 text-xs bg-transparent"
                    disabled={waterIntake >= todaysNutrition.water.target}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Today's Meals */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-teal-600" />
                  Today's Meals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${meal.completed ? "bg-teal-50" : "bg-gray-50"}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${meal.completed ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                    >
                      {meal.completed && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {meal.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{meal.time}</span>
                      </div>
                      <h4 className={`font-medium ${meal.completed ? "text-teal-700" : "text-gray-800"}`}>
                        {meal.name}
                      </h4>
                      <p className="text-sm text-gray-600">{meal.calories} calories</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {meal.ingredients.slice(0, 3).map((ingredient, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                        {meal.ingredients.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{meal.ingredients.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!meal.completed && (
                        <Button size="sm" variant="outline">
                          Mark Complete
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        View Recipe
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Nutrition Insight */}
            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">AI Nutrition Insight</h3>
                    <p className="text-sm opacity-90 mb-4">
                      You're doing great with your anti-inflammatory foods! Your omega-3 intake from salmon is excellent
                      for recovery. Consider adding more leafy greens to boost your vitamin K and support bone health.
                      Your hydration is on track - keep it up!
                    </p>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      View Detailed Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meal-plans" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${plan.color} rounded-xl flex items-center justify-center mb-4`}>
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calculator className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{plan.calories}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-700">Sample meals:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.meals.map((meal, index) => (
                          <li key={index}>• {meal}</li>
                        ))}
                      </ul>
                    </div>

                    <Button onClick={() => setSelectedPlan(plan.id)} className="w-full bg-teal-500 hover:bg-teal-600">
                      <Target className="w-4 h-4 mr-2" />
                      Start Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Plan Generator */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-coral-500" />
                  Create Custom Meal Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Preference</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>Mediterranean</option>
                      <option>Plant-based</option>
                      <option>Anti-inflammatory</option>
                      <option>Heart-healthy</option>
                      <option>Low-sodium</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Calorie Target</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>1500-1700</option>
                      <option>1700-1900</option>
                      <option>1900-2100</option>
                      <option>2100-2300</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>3 days</option>
                      <option>7 days</option>
                      <option>14 days</option>
                      <option>30 days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Food Allergies/Restrictions</label>
                  <div className="flex flex-wrap gap-2">
                    {["Gluten-free", "Dairy-free", "Nut-free", "Shellfish-free", "Vegetarian", "Vegan"].map(
                      (restriction) => (
                        <Button key={restriction} variant="outline" size="sm" className="text-xs bg-transparent">
                          {restriction}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <Button className="w-full bg-coral-500 hover:bg-coral-600">
                  <Target className="w-4 h-4 mr-2" />
                  Generate AI Meal Plan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{recipe.title}</h3>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{recipe.prepTime}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {recipe.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-yellow-600">★</span>
                        <span className="text-sm text-gray-600">{recipe.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-teal-500 hover:bg-teal-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recipe Search */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Find Healing Recipes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search for recipes, ingredients, or health benefits..."
                    className="flex-1 p-2 border border-gray-200 rounded-lg"
                  />
                  <Button className="bg-teal-500 hover:bg-teal-600">Search</Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <p className="text-sm text-gray-600 w-full mb-2">Popular searches:</p>
                  {["Anti-inflammatory", "High protein", "Heart healthy", "Quick meals", "Immune boosting"].map(
                    (search) => (
                      <Button key={search} variant="outline" size="sm" className="text-xs bg-transparent">
                        {search}
                      </Button>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            {/* Weekly Nutrition Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-teal-600" />
                  Weekly Nutrition Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <Zap className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-teal-600">12,450</p>
                    <p className="text-sm text-gray-600">Avg Daily Calories</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 1800</p>
                  </div>
                  <div className="text-center p-4 bg-coral-50 rounded-lg">
                    <Heart className="w-6 h-6 text-coral-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-coral-500">95g</p>
                    <p className="text-sm text-gray-600">Avg Daily Protein</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 120g</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Apple className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">8</p>
                    <p className="text-sm text-gray-600">Servings Fruits/Veg</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 9</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-500">7.2</p>
                    <p className="text-sm text-gray-600">Avg Daily Water</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 8 glasses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrient Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Macronutrient Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Carbohydrates</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Protein</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Fat</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Key Vitamins & Minerals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vitamin D</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-20" />
                        <span className="text-sm font-medium">Good</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Omega-3</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="h-2 w-20" />
                        <span className="text-sm font-medium">Excellent</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Iron</span>
                      <div className="flex items-center gap-2">
                        <Progress value={70} className="h-2 w-20" />
                        <span className="text-sm font-medium">Good</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Calcium</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="h-2 w-20" />
                        <span className="text-sm font-medium">Fair</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
