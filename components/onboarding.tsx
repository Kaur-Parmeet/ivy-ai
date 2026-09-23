"use client"

import type React from "react"
import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ANIMAL_OPTIONS } from "@/lib/animal-sounds"

export type OnboardingData = {
  ageGroup: string
  profession: string
  purpose: string
  experience: string
  responseStyle: string
  favoriteAnimal: string
  topics: string
  musicPreference: string
}

const AGE_GROUPS = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"]

const PURPOSES = [
  "Work & productivity",
  "Learning & research",
  "Creative writing",
  "Coding & development",
  "Personal assistant",
  "Just exploring",
]

const EXPERIENCE_LEVELS = [
  "New to AI assistants",
  "I've used a few",
  "I use them regularly",
  "Power user",
]

const RESPONSE_STYLES = ["Concise & direct", "Balanced", "Detailed & thorough", "Friendly & casual"]

const TOPICS = [
  "Technology",
  "Business & finance",
  "Health & wellness",
  "Arts & culture",
  "Science & nature",
  "Everyday life",
]

const MUSIC_PREFERENCES = ["Pop", "Rock", "Hip-hop & R&B", "Classical", "Electronic", "Jazz & blues", "Podcasts"]

type FieldProps = {
  label: string
  htmlFor: string
  children: React.ReactNode
}

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

const selectClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"

export function Onboarding({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [ageGroup, setAgeGroup] = useState("")
  const [profession, setProfession] = useState("")
  const [purpose, setPurpose] = useState("")
  const [experience, setExperience] = useState("")
  const [responseStyle, setResponseStyle] = useState("")
  const [favoriteAnimal, setFavoriteAnimal] = useState("")
  const [topics, setTopics] = useState("")
  const [musicPreference, setMusicPreference] = useState("")

  const isValid =
    ageGroup && profession.trim() && purpose && experience && responseStyle && favoriteAnimal && topics && musicPreference

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onComplete({
      ageGroup,
      profession: profession.trim(),
      purpose,
      experience,
      responseStyle,
      favoriteAnimal,
      topics,
      musicPreference,
    })
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" aria-hidden="true" />
          </div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
            Welcome to Ivy
          </h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            Tell us a little about yourself so Ivy can give you a more personalized experience. This
            only takes a moment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <Field label="What's your age group?" htmlFor="ageGroup">
            <select
              id="ageGroup"
              className={selectClass}
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="" disabled>
                Select an age group
              </option>
              {AGE_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What best describes your profession?" htmlFor="profession">
            <input
              id="profession"
              type="text"
              className={selectClass}
              placeholder="e.g. Designer, Student, Engineer"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </Field>

          <Field label="What will you mainly use Ivy for?" htmlFor="purpose">
            <select
              id="purpose"
              className={selectClass}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="" disabled>
                Select a purpose
              </option>
              {PURPOSES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <Field label="How familiar are you with AI assistants?" htmlFor="experience">
            <select
              id="experience"
              className={selectClass}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="" disabled>
                Select your experience level
              </option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Which topics interest you most?" htmlFor="topics">
            <select
              id="topics"
              className={selectClass}
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            >
              <option value="" disabled>
                Select a topic
              </option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What kind of music do you enjoy?" htmlFor="musicPreference">
            <select
              id="musicPreference"
              className={selectClass}
              value={musicPreference}
              onChange={(e) => setMusicPreference(e.target.value)}
            >
              <option value="" disabled>
                Select a music preference
              </option>
              {MUSIC_PREFERENCES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What's your favorite animal?" htmlFor="favoriteAnimal">
            <select
              id="favoriteAnimal"
              className={selectClass}
              value={favoriteAnimal}
              onChange={(e) => setFavoriteAnimal(e.target.value)}
            >
              <option value="" disabled>
                Select an animal
              </option>
              {ANIMAL_OPTIONS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Helps us tune Ivy&apos;s personality to your taste.
            </p>
          </Field>

          <Field label="How should Ivy respond to you?" htmlFor="responseStyle">
            <select
              id="responseStyle"
              className={selectClass}
              value={responseStyle}
              onChange={(e) => setResponseStyle(e.target.value)}
            >
              <option value="" disabled>
                Select a response style
              </option>
              {RESPONSE_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </Field>

          <Button type="submit" className="w-full" size="lg" disabled={!isValid}>
            Continue to Ivy
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </form>
      </div>
    </main>
  )
}
