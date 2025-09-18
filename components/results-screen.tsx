"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ResultsScreenProps {
  results: {
    totalScore: number
    accuracy: number
    wpm: number
    grade: "Bad" | "Soso" | "Well" | "Perfect"
  }
  onPlayAgain: () => void
  onBackToHome: () => void
}

const GRADE_ANIMATIONS = {
  Bad: {
    emoji: "😅",
    message: "다음엔 더 잘할 수 있어요!",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  Soso: {
    emoji: "🙂",
    message: "좋아요! 계속 연습해보세요!",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  Well: {
    emoji: "😊",
    message: "훌륭해요! 정말 잘했어요!",
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  Perfect: {
    emoji: "🎉",
    message: "완벽해요! 최고의 실력이에요!",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
}

export function ResultsScreen({ results, onPlayAgain, onBackToHome }: ResultsScreenProps) {
  const [animationPhase, setAnimationPhase] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const gradeInfo = GRADE_ANIMATIONS[results.grade]

  useEffect(() => {
    // Animation sequence
    const phases = [
      () => setAnimationPhase(1), // Show score
      () => setAnimationPhase(2), // Show accuracy
      () => setAnimationPhase(3), // Show WPM
      () => setAnimationPhase(4), // Show grade
      () => {
        if (results.grade === "Perfect" || results.grade === "Well") {
          setShowConfetti(true)
        }
      },
    ]

    phases.forEach((phase, index) => {
      setTimeout(phase, (index + 1) * 800)
    })

    // Loop the grade animation every 10 seconds
    const gradeLoop = setInterval(() => {
      setAnimationPhase(4)
      setTimeout(() => setAnimationPhase(5), 100)
      setTimeout(() => setAnimationPhase(4), 200)
    }, 10000)

    return () => clearInterval(gradeLoop)
  }, [results.grade])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent/10 p-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "⭐", "🎊", "✨", "🏆"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold text-primary mb-4">게임 결과</h1>
          <p className="text-xl text-muted-foreground">수고하셨습니다!</p>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Score */}
          <Card
            className={`shadow-lg transition-all duration-500 ${
              animationPhase >= 1 ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-muted-foreground">총점</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{animationPhase >= 1 ? results.totalScore : 0}</div>
              <Badge variant="secondary">점수</Badge>
            </CardContent>
          </Card>

          {/* Accuracy */}
          <Card
            className={`shadow-lg transition-all duration-500 ${
              animationPhase >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-muted-foreground">정확도</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">
                {animationPhase >= 2 ? results.accuracy : 0}%
              </div>
              <Badge variant="secondary">정확도</Badge>
            </CardContent>
          </Card>

          {/* WPM */}
          <Card
            className={`shadow-lg transition-all duration-500 ${
              animationPhase >= 3 ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-muted-foreground">분당 타수</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{animationPhase >= 3 ? results.wpm : 0}</div>
              <Badge variant="secondary">WPM</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Grade Display */}
        <Card
          className={`mx-auto max-w-2xl shadow-xl border-4 transition-all duration-1000 ${
            animationPhase >= 4 ? `scale-100 opacity-100 ${gradeInfo.borderColor}` : "scale-95 opacity-0 border-border"
          } ${gradeInfo.bgColor}`}
        >
          <CardContent className="p-12 text-center">
            <div
              className={`transition-all duration-500 ${
                animationPhase >= 4 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="text-8xl mb-6 animate-pulse">{gradeInfo.emoji}</div>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">등급:</h2>
              <div className={`text-6xl font-bold mb-6 ${gradeInfo.color} animate-bounce`}>{results.grade}</div>
              <p className={`text-xl ${gradeInfo.color} font-medium`}>{gradeInfo.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            size="lg"
            onClick={onPlayAgain}
            className="text-xl px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
          >
            다시 하기
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onBackToHome}
            className="text-xl px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-200 bg-transparent"
          >
            홈으로 가기
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-8 text-4xl opacity-60">
            <span className="animate-spin" style={{ animationDuration: "3s" }}>
              🏆
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              📊
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
              ⭐
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>
              🎯
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
