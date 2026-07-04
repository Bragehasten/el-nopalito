type Stat = { emoji: string; title: string; sub: string }

const stats: Stat[] = [
  { emoji: "🌮", title: "Handmade",  sub: "Tortillas" },
  { emoji: "🔥", title: "Fresh",     sub: "To Order"  },
  { emoji: "💚", title: "Authentic", sub: "Recipes"   },
]

export default function AboutSection() {
  return (
    <section
      className="w-full bg-white flex flex-col items-center"
    >
      <div className="h-12 md:h-16" />
      <div className="w-full max-w-5xl mx-auto px-8
        flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto
          flex flex-col items-center text-center">
          <p className="text-brand-gray text-base
          leading-relaxed mb-6">
            El Nopalito has been serving the Port St.
            Lucie community authentic Mexican street food
            made the traditional way — handmade tortillas,
            slow-marinated meats, and recipes passed down
            through generations.
          </p>
          <p className="text-brand-gray text-base
            leading-relaxed mb-6">
            Every taco, burrito, and torta is crafted
            fresh to order. From the smoky carne asada
            to the rich birria dipping broth, every bite
            reflects the bold, genuine flavors of
            authentic Mexican street food.
          </p>
          <p className="text-brand-gray text-base
            leading-relaxed mb-6">
            Located at 100 NW Airoso Blvd in Port St.
            Lucie, we&apos;re proud to be the Treasure
            Coast&apos;s go-to spot for affordable,
            authentic flavor. Come hungry. Leave happy.
          </p>

          {/* Stat cards */}
          <div className="flex items-center
            justify-center gap-4 flex-wrap mt-10
            w-full">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="flex flex-col items-center
                  justify-center text-center flex-1
                  min-w-[120px] max-w-[160px]
                  bg-brand-cream rounded-2xl p-5
                  border border-brand-cream-dark"
              >
                <p className="text-4xl mb-3">
                  {stat.emoji}
                </p>
                <p className="text-sm font-bold
                  text-brand-dark mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-brand-gray">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-12 md:h-16" />
    </section>
  )
}
