'use client'
import { useState } from 'react'
import { Globe } from '@/components/Globe'
import { CitySelector } from '@/components/CitySelector'
import { City } from '@/lib/types'

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <h1 className='text-4xl font-bold mb-8'>Interactive Globe</h1>
      </div>

      <CitySelector onCitySelect={setSelectedCity} />

      <div className='relative w-full h-[600px]'>
        <Globe selectedCity={selectedCity} />
      </div>
    </main>
  )
}
