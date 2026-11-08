import { Link } from "react-router"

type BackLinkProps = {
  to?: string
  label?: string
}

// "← ফিরে যান" লিংক। বড় করে বানানো, যাতে আঙুল দিয়ে সহজে চাপা যায়।
function BackLink({ to = "/", label = "হোমে ফিরুন" }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-12 items-center gap-2 text-lg font-bold text-green-700 hover:underline"
    >
      <span aria-hidden="true">←</span> {label}
    </Link>
  )
}

export default BackLink
