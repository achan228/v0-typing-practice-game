"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Language = "korean" | "english"

interface GameScreenProps {
  language: Language
  onGameComplete: (results: {
    totalScore: number
    accuracy: number
    wpm: number
    grade: "Bad" | "Soso" | "Well" | "Perfect"
  }) => void
  onBackToHome: () => void
}

// Word sets for different languages and difficulties
const WORD_SETS = {
  korean: {
    easy: ["사과", "바나나", "고양이", "강아지", "학교", "집", "물", "불", "하늘", "땅"],
    medium: ["컴퓨터", "키보드", "마우스", "모니터", "프린터", "스피커", "카메라", "휴대폰", "텔레비전", "라디오"],
    hard: [
      "프로그래밍",
      "알고리즘",
      "데이터베이스",
      "네트워크",
      "보안",
      "인공지능",
      "머신러닝",
      "블록체인",
      "클라우드",
      "빅데이터",
    ],
  },
  english: {
    easy: ["cat", "dog", "sun", "moon", "tree", "book", "pen", "car", "home", "love"],
    medium: [
      "computer",
      "keyboard",
      "monitor",
      "speaker",
      "camera",
      "network",
      "program",
      "website",
      "internet",
      "software",
    ],
    hard: [
      "programming",
      "algorithm",
      "database",
      "artificial",
      "intelligence",
      "blockchain",
      "cybersecurity",
      "development",
      "architecture",
      "optimization",
    ],
  },
}

export function GameScreen({ language, onGameComplete, onBackToHome }: GameScreenProps) {
  const [currentWord, setCurrentWord] = useState("")
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [correctWords, setCorrectWords] = useState(0)
  const [totalWords, setTotalWords] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const getRandomWord = useCallback(() => {
    const words = WORD_SETS[language][difficulty]
    return words[Math.floor(Math.random() * words.length)]
  }, [language, difficulty])

  const startNewWord = useCallback(() => {
    setCurrentWord(getRandomWord())
    setUserInput("")
  }, [getRandomWord])

  const calculateGrade = (accuracy: number): "Bad" | "Soso" | "Well" | "Perfect" => {
    if (accuracy >= 76) return "Perfect"
    if (accuracy >= 51) return "Well"
    if (accuracy >= 26) return "Soso"
    return "Bad"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!gameStarted) {
      setGameStarted(true)
      return
    }

    setTotalWords((prev) => prev + 1)

    if (userInput.trim() === currentWord) {
      // Correct answer
      setCorrectWords((prev) => prev + 1)
      setCombo((prev) => prev + 1)
      const baseScore = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30
      const comboBonus = Math.floor(combo / 3) * 5
      setScore((prev) => prev + baseScore + comboBonus)

      // Increase difficulty based on score
      if (score > 200 && difficulty === "easy") {
        setDifficulty("medium")
      } else if (score > 500 && difficulty === "medium") {
        setDifficulty("hard")
      }
    } else {
      // Wrong answer
      setCombo(0)
      setScore((prev) => Math.max(0, prev - 5)) // Small penalty
    }

    startNewWord()
  }

  // Timer effect
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Game over
          const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0
          const wpm = Math.round(correctWords * (60 / (60 - prev)))
          const grade = calculateGrade(accuracy)

          onGameComplete({
            totalScore: score,
            accuracy,
            wpm,
            grade,
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, timeLeft, correctWords, totalWords, score, onGameComplete])

  // Initialize first word
  useEffect(() => {
    startNewWord()
  }, [startNewWord])

  const progressPercentage = ((60 - timeLeft) / 60) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent/10 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pt-4">
          <Button variant="outline" onClick={onBackToHome} className="text-lg px-6 py-3 bg-transparent">
            ← 홈으로
          </Button>
          <h1 className="text-3xl font-bold text-primary">{language === "korean" ? "한글" : "영어"} 타자연습</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{timeLeft}</div>
              <div className="text-sm text-muted-foreground">초</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{score}</div>
              <div className="text-sm text-muted-foreground">점수</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{combo}</div>
              <div className="text-sm text-muted-foreground">콤보</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Badge variant="outline" className="text-sm">
                {difficulty === "easy" ? "쉬움" : difficulty === "medium" ? "보통" : "어려움"}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">난이도</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Game Area */}
        <Card className="mx-auto max-w-2xl shadow-lg border-2 border-primary/20">
          <CardContent className="p-8 text-center space-y-8">
            {!gameStarted ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">준비되셨나요?</h2>
                <p className="text-lg text-muted-foreground">아래 버튼을 눌러 게임을 시작하세요!</p>
                <Button size="lg" onClick={() => setGameStarted(true)} className="text-xl px-8 py-6 rounded-xl">
                  시작!
                </Button>
              </div>
            ) : (
              <>
                {/* Current Word Display */}
                <div className="space-y-4">
                  <h2 className="text-lg text-muted-foreground">다음 단어를 입력하세요:</h2>
                  <div className="text-6xl font-bold text-primary bg-muted/30 rounded-xl py-8 px-4 border-2 border-dashed border-primary/30">
                    {currentWord}
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="여기에 입력하세요..."
                    className="text-2xl py-6 text-center rounded-xl border-2 border-primary/30 focus:border-primary"
                    autoFocus
                  />
                  <Button type="submit" size="lg" className="text-xl px-8 py-4 rounded-xl">
                    확인
                  </Button>
                </form>

                {/* Feedback */}
                {combo > 0 && (
                  <div className="text-lg font-semibold text-secondary animate-pulse">
                    🔥 {combo} 연속 성공!
                    {combo >= 3 && <span className="text-accent ml-2">보너스 점수!</span>}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-4 text-2xl opacity-50">
            <span className="animate-pulse">⌨️</span>
            <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>
              💫
            </span>
            <span className="animate-pulse" style={{ animationDelay: "1s" }}>
              🎯
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
