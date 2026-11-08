import { useEffect, useState } from "react"

type SpeakButtonProps = {
  text: string
}

// ব্রাউজারের নিজস্ব Web Speech API দিয়ে লেখা পড়ে শোনায়।
// কোনো সার্ভার বা টাকা লাগে না। ফোনে বাংলা কণ্ঠ না থাকলে জানিয়ে দেয়।
function SpeakButton({ text }: SpeakButtonProps) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window
  const [speaking, setSpeaking] = useState(false)
  const [hasBanglaVoice, setHasBanglaVoice] = useState(true)

  useEffect(() => {
    if (!supported) return

    // কণ্ঠের লিস্ট অনেক সময় একটু পরে লোড হয়, তাই দুইবার দেখি
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        setHasBanglaVoice(voices.some((voice) => voice.lang.toLowerCase().startsWith("bn")))
      }
    }
    checkVoices()
    window.speechSynthesis.addEventListener("voiceschanged", checkVoices)

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", checkVoices)
      window.speechSynthesis.cancel() // পেজ ছেড়ে গেলে পড়া বন্ধ
    }
  }, [supported])

  if (!supported) return null

  const handleClick = () => {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "bn-BD"
    utterance.rate = 0.9
    const banglaVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith("bn"))
    if (banglaVoice) utterance.voice = banglaVoice

    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={speaking}
        className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 text-xl font-bold text-white hover:bg-green-800 active:scale-[0.98]"
      >
        <span aria-hidden="true">{speaking ? "⏹️" : "🔊"}</span>
        {speaking ? "থামান" : "শুনুন"}
      </button>
      {!hasBanglaVoice && (
        <p className="mt-2 text-sm text-gray-600">
          আপনার ফোনে বাংলা কণ্ঠ পাওয়া যায়নি। ফোনের সেটিংসে “Text-to-speech” থেকে বাংলা ভাষা যোগ করলে ঠিকভাবে শুনতে পাবেন।
        </p>
      )}
    </div>
  )
}

export default SpeakButton
