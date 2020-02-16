import React from 'react'
import Flipcard from './Flipcard'
import MeteoWeek from './MeteoWeek'
import MapSide from './MapSide'

import useGeolocationStatus from './useGeo'
import useAddressStatus from './useAddressStatus'

function MeteoFlipcard() {
	const geolocation = useGeolocationStatus()
	const address = useAddressStatus()

	return (
	    <Flipcard classNames=" fb-meteo " buttonText={["See map", "Check meteo"]}>
      		<MeteoWeek geolocation={geolocation} address={address}/>	
      		<MapSide geolocation={geolocation} address={address}/>
      	</Flipcard>
	);
}

export default MeteoFlipcard;
