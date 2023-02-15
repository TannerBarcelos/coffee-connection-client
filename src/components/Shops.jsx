import React from 'react'
import LocationItem from './LocationItem'

const Shops = ({ locations, isAuthenticated, userInformation }) => {
  return locations.map((loc) => (
    <LocationItem
      key={loc.url}
      location={loc}
      isAuthenticated={isAuthenticated}
      userInformation={userInformation}
    />
  ))
}

export default Shops
