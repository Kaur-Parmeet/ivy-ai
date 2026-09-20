export type AnimalSound = {
  label: string
  sound: string
}

// Map of common favorite animals to their characteristic sound.
export const ANIMAL_SOUNDS: Record<string, AnimalSound> = {
  dog: { label: "Dog", sound: "woof" },
  cat: { label: "Cat", sound: "meow" },
  cow: { label: "Cow", sound: "moo" },
  duck: { label: "Duck", sound: "quack" },
  frog: { label: "Frog", sound: "ribbit" },
  sheep: { label: "Sheep", sound: "baa" },
  horse: { label: "Horse", sound: "neigh" },
  pig: { label: "Pig", sound: "oink" },
  bird: { label: "Bird", sound: "tweet" },
  owl: { label: "Owl", sound: "hoot" },
  lion: { label: "Lion", sound: "roar" },
  snake: { label: "Snake", sound: "hiss" },
  bee: { label: "Bee", sound: "buzz" },
  chicken: { label: "Chicken", sound: "cluck" },
  rooster: { label: "Rooster", sound: "cock-a-doodle-doo" },
  wolf: { label: "Wolf", sound: "howl" },
  monkey: { label: "Monkey", sound: "ooh-ooh-aah" },
  elephant: { label: "Elephant", sound: "trumpet" },
  goat: { label: "Goat", sound: "maa" },
  turkey: { label: "Turkey", sound: "gobble" },
}

// The list shown in the (sneaky) onboarding dropdown.
export const ANIMAL_OPTIONS = Object.entries(ANIMAL_SOUNDS).map(([value, { label }]) => ({
  value,
  label,
}))

const FALLBACK_SOUND = "hmm"

function getSound(animal: string): string {
  return ANIMAL_SOUNDS[animal]?.sound ?? FALLBACK_SOUND
}

/**
 * Builds a reply made entirely of the user's favorite-animal sound.
 * The number of repetitions scales with the length of the user's prompt,
 * so longer prompts get longer "answers".
 */
export function buildAnimalReply(animal: string, prompt: string): string {
  const sound = getSound(animal)

  // Base the reply length on the word count of the prompt, with gentle scaling.
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length
  const reps = Math.min(Math.max(wordCount, 1), 40)

  const words = Array.from({ length: reps }, () => sound)

  // Capitalize the first word and add punctuation for a "sentence" feel.
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)

  let text = words.join(" ")

  // Add some punctuation variety based on the prompt.
  if (prompt.trim().endsWith("?")) {
    text += "?"
  } else if (prompt.trim().endsWith("!")) {
    text += "!"
  } else {
    text += "."
  }

  return text
}
