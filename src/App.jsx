import { useState } from 'react'
import GoogleMapReact from 'google-map-react';

import { locations } from './locations'
import Marker from './Marker';

import './sass/App.scss'

const getImageUrl = (name) => {
  return new URL(`./assets/${name}`, import.meta.url).href
}

function App() {
  const [location, setLocation] = useState(locations)
  const [defaultLat, defaultLng] = location[0].coordinates
  const [currentLocation, setCurrentLocation] = useState(location[0])
  const [coords, setCoords] = useState()

  const changeLocation = (name) => {
    const loc = location.filter((location) => location.name == name)
    setCurrentLocation(loc[0])
    setCoords({ lat: loc[0].coordinates[0], lng: loc[0].coordinates[1] })
  }

  return (
    <div className="container">
      <div className="left">
        <div className="input">
          {location.map((location) => (
            <button onClick={() => changeLocation(location.name)}>{location.name}</button>
          ))}
        </div>
        <div className="images">
          {currentLocation.picture.map((pic) => (
            <img src={getImageUrl(pic.file)} alt={pic.description} />
          ))}
        </div>
      </div>
      <div className='map-container'>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: import.meta.env.VITE_GOOGLE_MAP_API_KEY
          }}
          defaultCenter={{ lat: defaultLat, lng: defaultLng }}
          center={coords}
          defaultZoom={13}
          margin={[50, 50, 50, 50]}
          options={''}
        >
          <Marker
            lat={currentLocation.coordinates[0]}
            lng={currentLocation.coordinates[1]}
          />
        </GoogleMapReact>
      </div>
    </div >
  )
}

export default App
