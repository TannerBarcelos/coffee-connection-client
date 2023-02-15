import React, { useState, useEffect } from 'react'

import Spinner from './common/Spinner'
import Shops from './Shops'
import FilterShops from './FilterShops'

import { fetchers } from '../utils/fetchers'
import { formatters } from '../utils/formatters'
import { useGetCurrentLocation } from '../hooks/useLocation'

export const Locations = ({ isAuthenticated, userInformation }) => {
  const [cityEntry, setCityEntry] = useState('')
  const [locations, setLocations] = useState(undefined)

  const [currentLocation, setCurrentLocation] = useGetCurrentLocation()

  useEffect(() => {
    if (currentLocation) {
      fetchers
        .autoFetchGeolocation(currentLocation)
        .then((res) => setLocations(res.businesses))
    }
  }, [currentLocation])

  const onFormSubmit = (e) => {
    e.preventDefault()
    fetchers
      .fetchLocationOffInput(cityEntry)
      .then((res) => setLocations(res.businesses))
  }

  const sortBySelection = (selection) => {
    switch (selection) {
      case 'High to Low':
        setLocations([
          ...locations.sort(
            (shopA, shopB) => Math.ceil(shopB.rating) - Math.ceil(shopA.rating),
          ),
        ])
        return
      case 'Low to High':
        setLocations([
          ...locations.sort(
            (shopA, shopB) => Math.ceil(shopA.rating) - Math.ceil(shopB.rating),
          ),
        ])
        return
      case 'Alphabetically':
        // sorts alphabetically by first character
        setLocations([
          ...locations.sort(
            (shopA, shopB) =>
              shopA.name.split(' ')[0].charCodeAt(0) -
              shopB.name.split(' ')[0].charCodeAt(0),
          ),
        ])
        return
      case 'By Distance':
        // sorts alphabetically by first character
        setLocations([
          ...locations.sort(
            (shopA, shopB) =>
              formatters.convertToMiles(shopA.distance) -
              formatters.convertToMiles(shopB.distance),
          ),
        ])
        return
      default:
        // default sort of by-distance
        locations.sort(
          (a, b) =>
            (a.distance / 1609).toFixed(3) - (b.distance / 1609).toFixed(3),
        )
        break
    }
    return // if the default is hit
  }

  return (
    <>
      <header className='hero__image'>
        <div className='hero-text'>
          <h1 className='hero__title-h1'>Find coffee shops near you!</h1>
          <form className='form__container' onSubmit={(e) => onFormSubmit(e)}>
            <input
              id='search__cafe-field'
              type='text'
              placeholder='Seach by City Name'
              name='location_search'
              value={cityEntry}
              onChange={(e) => setCityEntry(e.target.value)}
            />
            <input
              id='search__cafe-btn'
              type='button'
              value='Submit'
              onClick={() => setCurrentLocation(location)}
            />
          </form>
        </div>
      </header>
      <div className='container'>
        {!locations ? (
          <>
            <Spinner />
          </>
        ) : !locations || locations.length === 0 ? null : (
          <>
            <FilterShops filter={sortBySelection} />
            <Shops
              locations={locations}
              isAuthenticated={isAuthenticated}
              userInformation={userInformation}
            />
          </>
        )}
      </div>
    </>
  )
}
