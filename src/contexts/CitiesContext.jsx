import { createContext, useContext, useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert('There was some error loading data...')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)

  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider')

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }
