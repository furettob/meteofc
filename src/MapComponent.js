import React, {Component} from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { Marker } from "react-google-maps"
import useGeolocation from './useGeo'
import config from "./utils/config.json"
import {checkSignificantPositionChange} from './utils/utils'

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + config.gm_api_key + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `240px` }} />,
    containerElement: <div style={{ height: `240px` }} />,
    mapElement: <div className="map-element" style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)( (props) => {
    const geolocation = useGeolocation()
    const allProps = Object.assign({}, {...props}, {geolocation})
    return <GoogleMapComponent className="fb-map" {...allProps}/>
  }
)

const INITIAL_STATE = {
  selectedIndex: 0,
  geolocation: undefined
}

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  getCenter = () => {
    if (!this.props.geolocation) {
      return undefined
    }
    return { lat: this.props.geolocation.latitude, lng: this.props.geolocation.longitude };
  }

  componentDidUpdate = async (prevProps) => {
    const check = checkSignificantPositionChange(this.state, this.props)

    if ( check.significant ) {
        this.setState({center:this.getCenter(), geolocation:this.props.geolocation})
    }
  }

  render() {
    if (!this.state || !this.state.center) {
      return <div>No geolocation yet ...</div>
    }

    return <GoogleMap
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
      defaultCenter={ this.state.center }
      center={ this.getCenter()}
      >
      <Marker className={"ft_gm "}
              position={ this.state.center }
      />
    </GoogleMap>
  }
}

export default MapComponent