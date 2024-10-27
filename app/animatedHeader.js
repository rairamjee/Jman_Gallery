'use client'

import { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

const useTypingEffect = (text, typingSpeed = 150) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else {
      // Reset after a pause when the full text is displayed
      const resetTimeout = setTimeout(() => {
        setDisplayedText('')
        setCurrentIndex(0)
      }, 1000) // 2 second pause before resetting

      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, text, typingSpeed])

  return displayedText
}

export default function AnimatedHeader() {
  const fullText = "Creating Technologies Building Memories Together"
  const displayedText = useTypingEffect(fullText, 100) // Adjust typing speed here (100ms per character)

  return (
    <header className="border-b border-purple-300">
      <div className="flex gap-4 justify-between items-center p-5">
        <h2 className="text-violet-900 text-3xl">JMAN Gallery</h2>
        <p className="text-pink-600 text-base w-96 h-6">
          {displayedText}
          <span className="animate-blink">|</span>
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src="/profile.jpg"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{"User"}</DropdownMenuItem>
            <DropdownMenuItem>{"Designation"}</DropdownMenuItem>
            <DropdownMenuItem>{"example@gmail.com"}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mt-2 font-bold">
              <LogOut className="mr-4" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 0.7s infinite;
        }
      `}</style>
    </header>
  )
}