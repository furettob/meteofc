import React, { useState, useEffect, useRef } from 'react';

/*
  //const [count, setCount] = useState(0);

  //const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
  */

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
      if (!stored) {
        console.log("no stored position: returning true")
        return true
      }
      const storedLatitude = isNaN(parseFloat(stored.latitude)) ?
                  undefined :
                  parseFloat(stored.latitude).toFixed(4)
      const storedLongitude = isNaN(parseFloat(stored.longitude)) ?
                  undefined :
                  parseFloat(stored.longitude).toFixed(4)
      const latitude = isNaN(parseFloat(received.latitude)) ?
                  undefined :
                  parseFloat(received.latitude).toFixed(4)
      const longitude = isNaN(parseFloat(received.longitude)) ?
                  undefined :
                  parseFloat(received.longitude).toFixed(4)

      if (
          latitude && longitude &&
          (storedLatitude !== latitude || storedLongitude !== longitude)
      ) {
        console.log("STORED: " + storedLatitude + " - " + storedLongitude + "\nRECEIVED: " + latitude + " - " + longitude)
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
    if (mounted) {

      if (checkSignificantPositionChange(refToPrevPos.current, event.coords)) {
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

  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition(onEvent);
      watchId = navigator.geolocation.watchPosition(onEvent);

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