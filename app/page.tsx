"use client"

import { useState } from "react"
import { Onboarding, type OnboardingData } from "@/components/onboarding"
import { Chat } from "@/components/chat"

export default function Page() {
  const [profile, setProfile] = useState<OnboardingData | null>(null)

  if (!profile) {
    return <Onboarding onComplete={setProfile} />
  }

  return <Chat profile={profile} />
}
