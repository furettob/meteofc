import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { Marker } from "react-google-maps"
import useGeolocation from './useGeo'
import config from "./utils/config.json"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + config.gm_api_key + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `240px`}} />,
    containerElement: <div style={{}} />,
    mapElement: <div className="map-element" style={{ height: `240px` }} />,
  }),
  withScriptjs,
  withGoogleMap
)( (props) => {
    const geolocation = useGeolocation()
    const allProps = Object.assign({}, {...props}, {geolocation})
    return <GoogleMapComponent {...allProps}/>
  }
)

const GoogleMapComponent = (props) => {

  const getCenter = () => {
    if (!props.geolocation || !props.geolocation.latitude || !props.geolocation.longitude) {
      return undefined
    }
    return { lat: props.geolocation.latitude, lng: props.geolocation.longitude };
  }

  return <div >
    <GoogleMap
      defaultOptions={{
        minZoom: 14,
        maxZoom: 14,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false
      }}
      defaultZoom={14}
      defaultCenter={ getCenter() }
      center={ getCenter()}
      >
      <Marker className={"ft_gm "}
              position={ getCenter() }
      />
    </GoogleMap>
  </div>
}

export default MapComponent