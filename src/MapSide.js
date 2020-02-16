import React from 'react'
import MapComponent from './MapComponent'
import Address from './Address'
import Divider from './Divider'

const MapSide = (props) => {

	const isGeolocationReady = () => {
		// console.log("Returning: " + (props.geolocation && props.geolocation.latitude && props.geolocation.longitude))
		return (props.geolocation && props.geolocation.latitude && props.geolocation.longitude)
	}

	const getCoordinates = () => {
		if (props.geolocation && props.geolocation.latitude && props.geolocation.longitude) {
			return "Lat: " + props.geolocation.latitude.toFixed(4) + " - Lon: "+ props.geolocation.longitude.toFixed(4)
		}
		return ""
	}

	const isGeolocationReadyClass = isGeolocationReady() ? " fb-map-side fb-map-side__ready " : " fb-map-side "

	return (
		<div className={isGeolocationReadyClass}> 
      		<MapComponent geolocation={props.geolocation}/>
			<div className="fb-pv-24">{getCoordinates()}</div>
			<Address address={props.address} classNames={" fb-address__small "}/>
			<Divider />
      	</div>
	)
}

export default MapSide