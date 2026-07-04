type Snippet = {
  quote: string
  name: string
}

const snippets: Snippet[] = [
  { quote: 'Best tacos in Port St. Lucie — the birria is next level.', name: 'Maria T.' },
  { quote: "The flautas are THE BEST I've ever had.", name: 'James R.' },
  { quote: 'Fresh, fast, and super affordable. This place never misses.', name: 'Sofia M.' },
  { quote: 'These chicken tacos hit every note — tender, juicy, grilled to perfection.', name: 'Josh T.' },
  { quote: 'First time having this taco truck and it was delicious! Service was fast and kind.', name: 'Audrey L.' },
]

function MarqueeTrack() {
  return (
    <div className="animate-marquee whitespace-nowrap flex items-center flex-shrink-0 group-hover:[animation-play-state:paused]">
      {snippets.map((snippet, i) => (
        <div key={i} className="flex items-center gap-3 mx-8">
          <span className="text-brand-yellow tracking-tight">★★★★★</span>
          <span className="text-sm md:text-base text-white/70 font-medium">
            &ldquo;{snippet.quote}&rdquo; — {snippet.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ReviewMarquee() {
  return (
    <section className="w-full bg-brand-dark py-6 md:py-8">
      {/* group + group-hover on the (non-animating) children, rather than
          hover: directly on the animated tracks - a plain :hover on an
          element that's continuously being transform-translated churns
          its hit-testing state every frame and never reliably registers
          as hovered. Hovering this static wrapper instead is stable. */}
      <div className="group relative flex overflow-x-hidden w-full border-y border-white/5">
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  )
}
