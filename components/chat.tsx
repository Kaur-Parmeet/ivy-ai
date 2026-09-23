"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Sparkles, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildAnimalReply } from "@/lib/animal-sounds"
import type { OnboardingData } from "@/components/onboarding"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const GREETING = "Hi! How can I help you today?"

function id() {
  return Math.random().toString(36).slice(2)
}

export function Chat({ profile }: { profile: OnboardingData }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: id(), role: "assistant", content: GREETING },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isTyping])

  function autoGrow() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  function send() {
    const text = input.trim()
    if (!text || isTyping) return

    const userMessage: Message = { id: id(), role: "user", content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    requestAnimationFrame(autoGrow)

    setIsTyping(true)
    const reply = buildAnimalReply(profile.favoriteAnimal, text)

    // Simulate a thinking delay that scales slightly with reply length.
    const delay = 500 + Math.min(reply.length * 12, 1500)
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: id(), role: "assistant", content: reply }])
      setIsTyping(false)
    }, delay)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Respect IME composition (CJK input) and Safari's 229 quirk.
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background/80 px-4 py-3 backdrop-blur">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">Ivy</p>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-2xl px-4 py-4">
          <div className="flex items-end gap-2 rounded-2xl border border-input bg-card p-2 shadow-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                autoGrow()
              }}
              onKeyDown={handleKeyDown}
              placeholder="Message Ivy…"
              className="max-h-[200px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Message Ivy"
            />
            <Button
              type="button"
              size="icon"
              className="size-9 shrink-0 rounded-xl"
              onClick={send}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Ivy can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user"
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-3.5" aria-hidden="true" />
        </div>
      )}
      <div
        className={`max-w-[80%] text-pretty rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground"
        }`}
      >
        {content}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="size-3.5" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50" />
      </div>
    </div>
  )
}
