import { useState, useEffect } from 'react'
export const useGetCurrentLocation = () => {
  const [coords, setCoords] = useState('')

  const setCoordinates = (coords) => setCoords(coords)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords(pos)
      },
      (err) => console.log(err),
    )
  }, [])
  return [coords, setCoordinates]
}
