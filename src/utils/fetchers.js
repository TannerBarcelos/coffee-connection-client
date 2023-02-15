import { axiosInstance } from './axios'

export const fetchers = {
  autoFetchGeolocation: async ( coords ) => {
    const { latitude, longitude } = coords.coords
    const shops = await axiosInstance.post( '/shop/find/geolocation', {
      latitude,
      longitude,
    } )
    return shops.data
  },
  fetchLocationOffInput: async ( location ) => {
    const shops = await axiosInstance.post( '/shop/find/city', {
      city: location,
    } )
    return shops.data
  },
}
