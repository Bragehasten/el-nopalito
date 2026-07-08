'use client'

import { useEffect, useState } from 'react'
import { menuItems, menuCategories } from '@/data/menuData'
import type { MenuCategory } from '@/data/menuData'
import MenuCard from '@/components/MenuCard'

export default function MenuSection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(menuCategories[0].value)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = menuCategories
      .map((cat) => document.getElementById(cat.value))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveCategory(topMost.target.id as MenuCategory)
      },
      { rootMargin: '-160px 0px -70% 0px', threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="menu"
      className="w-full bg-brand-cream-dark
        flex flex-col items-center"
    >
      {/* Category pills - sticky under the fixed navbar (top-16 matches its
          h-16 height). Each pill is an anchor link that scrolls to its
          category's section below (all categories render at once now, so
          there's no filter state to drive) and shrinks on scroll to save
          vertical space on mobile. */}
      <div className="sticky top-16 z-30 w-full bg-brand-cream-dark pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 pt-4
          flex items-center justify-center gap-3 flex-wrap">
          {menuCategories.map((cat) => (
            <a
              key={cat.value}
              href={`#${cat.value}`}
              className={`inline-flex items-center justify-center rounded-full font-semibold text-center transition-all duration-300 ${
                isScrolled ? 'py-1 px-4 text-xs gap-2 min-w-[100px]' : 'py-3 px-6 text-sm gap-3 min-w-[130px]'
              } ${
                activeCategory === cat.value
                  ? 'bg-brand-red text-white border-none'
                  : 'bg-white text-brand-dark border border-gray-200'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Sections - all categories render sequentially so the user can
          keep scrolling instead of switching tabs */}
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-16 md:gap-20 mt-4">
        {menuCategories.map((cat) => (
          <section key={cat.value} id={cat.value} className="w-full">
            <h3 className="font-display text-2xl md:text-3xl font-black text-brand-dark mb-6 md:mb-8">
              {cat.label}
            </h3>
            <div className="w-full grid grid-cols-1
              sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {menuItems
                .filter((item) => item.category === cat.value)
                .map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="w-full max-w-7xl mx-auto
        px-4 mt-16 text-center">
        <p className="text-brand-gray text-sm italic">
          🌶️ All tacos served on handmade corn tortillas.
          Ask about our daily specials!
        </p>
      </div>

      {/* Bottom spacer */}
      <div className="h-12 md:h-16" />

    </section>
  )
}
