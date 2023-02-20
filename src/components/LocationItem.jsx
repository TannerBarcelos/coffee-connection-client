import React from 'react'

const renderStars = (len) => {
  if (len < 1) {
    return null
  }
  const stars = []
  for (let i = 0; i < Math.floor(len); i++) {
    stars.push(
      <i key={i} className='fas fa-star' style={{ color: '#a37eba' }}></i>,
    )
  }
  return stars
}

async function onClick(
  e,
  name,
  image_url,
  url,
  phone,
  address,
  rating,
  id,
  userInformation,
) {
  await fetch(`/bookmarks/bookmark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      image_url,
      url,
      phone,
      address,
      rating,
      shopID: id,
      userID: userInformation.id,
    }),
  })
}

function LocationItem({ location, isAuthenticated, userInformation }) {
  return (
    <div
      className='ui card'
      style={{ width: '400px', height: '470px', marginTop: 'none' }}
    >
      <div
        style={{
          width: '100%',
          height: '280px',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        <img
          src={location.image_url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className='content' style={{ marginTop: '1rem' }}>
        {isAuthenticated && (
          <div
            className='tooltip__icon__container'
            data-tooltip='Bookmark this coffee shop to your profile'
            data-position='left center'
            style={{
              width: '30px',
              height: '30px',
              position: 'absolute',
              bottom: '6rem',
              right: '0',
            }}
          >
            <i
              data-shop__id={location.id}
              onClick={(e) =>
                onClick(
                  e,
                  location.name,
                  location.image_url,
                  location.url,
                  location.phone,
                  location.location.address1,
                  location.rating,
                  location.id,
                  userInformation,
                )
              }
              className='fas fa-bookmark'
              id='bookmarker'
              style={{ fontSize: '1.6rem', color: '#a37dba' }}
            ></i>
          </div>
        ) }
        <div className='header'>{location.name}</div>
        <div>{location.location.address1}</div>
        <div>{(location.distance * 0.000621371192).toFixed(2)} miles away</div>
      </div>
      <div className='extra content'>
        <span className='right floated' style={{ marginTop: '.7rem' }}>
          {renderStars(Math.ceil(location.rating)).map((star) => {
            return star
          })}
        </span>
        <a
          href={location.url}
          target='_blank'
          className='ui google plus button'
          style={{
            borderRadius: '20px',
            minWidth: '40%',
          }}
        >
          Yelp!{' '}
          <i
            className='fab fa-yelp'
            style={{ fontSize: '1.3rem', color: '#fff' }}
          ></i>
        </a>
      </div>
    </div>
  )
}

export default LocationItem
