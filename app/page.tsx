"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameScreen } from "@/components/game-screen"
import { ResultsScreen } from "@/components/results-screen"

type Language = "korean" | "english"
type GameState = "home" | "game" | "results"

interface GameResults {
  totalScore: number
  accuracy: number
  wpm: number
  grade: "Bad" | "Soso" | "Well" | "Perfect"
}

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>("home")
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("korean")
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameResults, setGameResults] = useState<GameResults | null>(null)

  const handleGameComplete = (results: GameResults) => {
    setGameResults(results)
    setGameState("results")
  }

  const handlePlayAgain = () => {
    setGameState("home")
    setGameResults(null)
  }

  if (gameState === "game") {
    return (
      <GameScreen
        language={selectedLanguage}
        onGameComplete={handleGameComplete}
        onBackToHome={() => setGameState("home")}
      />
    )
  }

  if (gameState === "results" && gameResults) {
    return (
      <ResultsScreen results={gameResults} onPlayAgain={handlePlayAgain} onBackToHome={() => setGameState("home")} />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent/10 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-6xl font-bold text-primary mb-4 text-balance">아동용 한·영 타자연습</h1>
          <p className="text-xl text-muted-foreground">재미있게 배우는 타자 연습 게임</p>
        </div>

        {/* Main Menu Card */}
        <Card className="mx-auto max-w-2xl shadow-lg border-2 border-primary/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl text-primary">메뉴</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">언어 선택:</h3>
              <div className="flex gap-4 justify-center">
                <Button
                  variant={selectedLanguage === "korean" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedLanguage("korean")}
                  className="text-lg px-8 py-6 rounded-xl"
                >
                  한글
                </Button>
                <Button
                  variant={selectedLanguage === "english" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedLanguage("english")}
                  className="text-lg px-8 py-6 rounded-xl"
                >
                  영어
                </Button>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="text-sm">
                  선택된 언어: {selectedLanguage === "korean" ? "한글" : "영어"}
                </Badge>
              </div>
            </div>

            {/* Game Start Button */}
            <div className="text-center pt-4">
              <Button
                size="lg"
                onClick={() => setGameState("game")}
                className="text-2xl px-12 py-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                게임 시작
              </Button>
            </div>

            {/* Instructions Button */}
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-lg px-8 py-4 rounded-xl"
              >
                게임 설명
              </Button>
            </div>

            {/* Instructions Panel */}
            {showInstructions && (
              <Card className="mt-4 bg-muted/50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3 text-primary">게임 방법:</h4>
                  <ul className="space-y-2 text-foreground">
                    <li>• 화면에 나타나는 단어를 정확히 입력하세요</li>
                    <li>• 시간 내에 많은 단어를 입력할수록 높은 점수를 받습니다</li>
                    <li>• 연속으로 맞추면 콤보 점수가 추가됩니다</li>
                    <li>• 게임이 끝나면 성적에 따라 등급이 나타납니다</li>
                    <li>• Bad (0-25%) → Soso (26-50%) → Well (51-75%) → Perfect (76-100%)</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-8 text-4xl opacity-60">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              ⭐
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🎮
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              📚
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
