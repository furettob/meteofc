import React, { useState, useEffect, useRef } from 'react';

const getGeolocationProperty = (geoObject, propertyName) => {
  if (!geoObject) {
    return undefined
  }
  return isNaN(parseFloat(geoObject[propertyName])) ?
                  undefined :
                  parseFloat(geoObject[propertyName]).toFixed(4)
}

const useGeolocation = () => {
  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now()
  });
  const refToPrevPos = useRef();

  let mounted = true;
  let watchId;

  const checkSignificantPositionChange = (stored, received) => {
    console.log("checking new received position:")

    try {
      if (!received) {
        console.log("no new received position: returning false")
        return false
      }
      if (!stored && getGeolocationProperty(received, "latitude") && getGeolocationProperty(received, "longitude")) {
        console.log("no stored position and consistent received position: returning true")
        return true
      }
      const storedLatitude = getGeolocationProperty(stored, "latitude")
      const storedLongitude = getGeolocationProperty(stored, "longitude")        
      const latitude = getGeolocationProperty(received, "latitude")
      const longitude =  getGeolocationProperty(received, "longitude")

      if (
          latitude && longitude &&
          (storedLatitude !== latitude || storedLongitude !== longitude)
      ) {
        console.log("significant change: returning true")
        return true
      }
    } catch (e) {
      console.log("Error: returning true ", e)
      return true
    }
    console.log("no significant change: returning false")
    return false
  }

  const onEvent = event => {

    console.log("GEO EVENT: ", event )
    if (mounted) {

      if (checkSignificantPositionChange(refToPrevPos.current, event.coords)) {

        const stored = refToPrevPos.current
        const received = event.coords
        if (stored && received) {
          const storedLatitude = getGeolocationProperty(stored, "latitude")
          const storedLongitude = getGeolocationProperty(stored, "longitude")        
          const latitude = getGeolocationProperty(received, "latitude")
          const longitude =  getGeolocationProperty(received, "longitude")

          console.log("STORED: " + storedLatitude + " - " + storedLongitude + "\nRECEIVED: " + latitude + " - " + longitude)
        }
        
        refToPrevPos.current = event.coords;

        setState({
          accuracy: event.coords.accuracy,
          altitude: event.coords.altitude,
          altitudeAccuracy: event.coords.altitudeAccuracy,
          heading: event.coords.heading,
          latitude: event.coords.latitude,
          longitude: event.coords.longitude,
          speed: event.coords.speed,
          timestamp: event.timestamp
        });
      }
    }
  };

  const onError = error => {
    console.log("GEO ERROR: ", error )
    setState({
      error: error
    });
  };

  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition(onEvent, onError);
      watchId = navigator.geolocation.watchPosition(onEvent, onError);

      return () => {
        mounted = false;
        navigator.geolocation.clearWatch(watchId);
      };
    },
    [0]
  );

  return state;
};

export default useGeolocation