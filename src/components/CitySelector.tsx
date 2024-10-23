import React, { useState } from 'react'
import { City } from '@/lib/types'

interface CitySelectorProps {
  onCitySelect: (city: City) => void
}

const cities: City[] = [
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  // Add more cities as needed
]

export function CitySelector({ onCitySelect }: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = event.target.value
    const city = cities.find((c) => c.name === cityName)
    if (city) {
      setSelectedCity(city)
      onCitySelect(city)
    }
  }

  return (
    <div className='my-4'>
      <label
        htmlFor='city-select'
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        Select a city:
      </label>
      <select
        id='city-select'
        value={selectedCity?.name || ''}
        onChange={handleCityChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
      >
        <option value=''>Choose a city</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}
