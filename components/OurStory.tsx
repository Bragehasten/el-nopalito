import Image from 'next/image'
import Link from 'next/link'

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="w-full bg-brand-dark py-24 md:py-32 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Visual column */}
        <div className="group relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none overflow-hidden rounded-3xl shadow-2xl shadow-black/50 border border-white/5">
          <Image
            src="/images/menu/carne-asada.jpeg"
            alt="Freshly grilled carne asada tacos with onions, cilantro, and salsa verde — a signature dish at El Nopalito"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Narrative column */}
        <div className="text-center md:text-left">
          <p className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">
            Our Tradition
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            More Than Just a Food Truck
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            El Nopalito was built on a simple promise: real ingredients,
            bold flavors, and recipes passed down through generations.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            From smoky carne asada to our rich birria dipping broth,
            every dish is crafted fresh to order — genuine street-food
            flavor, made the traditional way.
          </p>
          <Link
            href="/about"
            className="text-brand-yellow hover:text-white font-semibold transition-colors mt-8 inline-block"
          >
            Read Our Full Story →
          </Link>
        </div>

      </div>
    </section>
  )
}
