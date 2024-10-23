'use client'
import { useState } from 'react'
import { Globe } from '@/components/Globe'
import { CitySelector } from '@/components/CitySelector'
import { City } from '@/lib/types'

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <main className='grid grid-rows-[auto_1fr] grid-cols-1 h-screen w-full items-center justify-between '>
      <CitySelector onCitySelect={setSelectedCity} />

      <div className='relative w-full h-full'>
        <Globe selectedCity={selectedCity} />
      </div>
    </main>
  )
}
