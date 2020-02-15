import React from 'react';
import Flipcard from './Flipcard';
import MeteoWeek from './MeteoWeek';
import MapComponent from './MapComponent';

import useGeolocationStatus from './useGeo'

function MeteoFlipcard() {
	const geolocation = useGeolocationStatus()

	return (
	    <Flipcard classNames=" fb-meteo " buttonText={["See map", "Check meteo"]}>
      		<MeteoWeek geolocation={geolocation} />	
      		<MapComponent geolocation={geolocation}/>
      	</Flipcard>
	);
}

export default MeteoFlipcard;
