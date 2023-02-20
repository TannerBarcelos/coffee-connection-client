import React, { useEffect, useState } from 'react'

import BookmarkItem from '../components/BookmarkItem'
import FilterBookmarks from '../components/FilterBookmarks'
import { axiosInstance } from '../utils/axios'
import { formatters } from '../utils/formatters'

function Profile({ userInfo }) {
  const [shopList, setShops] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await axiosInstance.get(`/shop/shops/${userInfo.id}`)
      setShops(res.data)
    })()
  }, [])

  // helper function to remove shop by shop ID and find the user with their ID first
  async function removeShop(shopID) {
    const res = await axiosInstance.post(
      '/bookmarks/remove',
      {
        data: {
          shopID,
          userID: userInfo.id,
      }
      }
    )
    const updatedShops = res.data
    setShops(updatedShops)
  }


  function sortBySelection(selection) {
    switch (selection) {
      case 'High to Low':
        setShops([
          ...shopList.sort(
            (shopA, shopB) => Math.ceil(shopB.rating) - Math.ceil(shopA.rating),
          ),
        ])
        return
      case 'Low to High':
        setShops([
          ...shopList.sort(
            (shopA, shopB) => Math.ceil(shopA.rating) - Math.ceil(shopB.rating),
          ),
        ])
        return
      case 'Alphabetically':
        setShops([
          ...shopList.sort(
            (shopA, shopB) =>
              shopA.name.split(' ')[0].charCodeAt(0) -
              shopB.name.split(' ')[0].charCodeAt(0),
          ),
        ])
        return
      default:
        return
    }
  }

  function displayBookmarks() {
    if (!shopList || shopList.length === 0) return <h3>No Coffee Shops Bookmarked</h3>
    else
      return (
        <div>
          <FilterBookmarks filter={sortBySelection} />
          {shopList && shopList.map((shop) => (
            <BookmarkItem
              key={shop.shopID}
              shop={shop}
              removeBookmark={removeShop}
            />
          ))}
        </div>
      )
  }
  return (
    <>
      <div className='container'>
        <h1 style={{ margin: '3rem' }} className='profile-greeting-h1'>
          Hello, {formatters.nameFormatter(userInfo.name)}
        </h1>
      </div>
      <div className='container'>
        {displayBookmarks()}
      </div>
    </>
  )
}

export default Profile
