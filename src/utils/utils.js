import React, { useState, useEffect } from 'react';

import axios from 'axios'
import staticData from "./staticdata.json"
import config from './config.json'


export const getMeteoForecast = async (geolocation) => {

  const simulateAsync = async () => {        
    const delay = ms => new Promise(res => setTimeout(res, ms))
    await delay(1000)
    console.log("Returning: " + staticData)
    return staticData
  }

  const url =
  `https://api.weatherbit.io/v2.0/forecast/daily?lat=${geolocation.latitude}&lon=${geolocation.longitude}&lang=${config.language}&key=${config.weatherbit_api_key}`

  const weatherbitParams = {
      method: "get",
      url: url
  }

  console.log("I'd ask for url:" + url)

  // Uncomment following lines to use real API from weatherbit
  let weatherbitReturn = await axios(weatherbitParams)
  // TODO clean data before sending
  return weatherbitReturn

  // Uncomment following lines to use mock static data
  /*
    async function fakeWeatherbitData() {
      console.log("fakeWeatherbitData")
      let weatherbitReturn = await simulateAsync()
      return weatherbitReturn
    }
    return await fakeWeatherbitData()
  */
  
}

export const getReverseGeocodeAddress = async (geolocation) => {

    const url =
    `https://api.opencagedata.com/geocode/v1/json?key=${config.reverseGeocodeApikey}&q=${encodeURIComponent(geolocation.latitude + ',' + geolocation.longitude)}&lang=it`

    const reverseGeocodeParams = {
        method: "get",
        url: url
    }

    const reverseGeocodeReturn = await axios(reverseGeocodeParams)
    return reverseGeocodeReturn
}

export const getMeteoIconFilename = (code) => {
  /*
    code is the weather description identifier from weatherbit API 
    as we have many fewer icons than the possible output codes, we need to map
    code --> icon
  */
  if (!code) {
    return "default.svg"
  }
  if (
    (code >= 200 && code < 300) ||
    (code >= 500 && code < 600) ||
    (code >= 900)
  ) {
    return "storm.svg"
  }
  if (
    (code >= 300 && code < 400) ||
    (code >= 600 && code < 700)
  ) {
    return "rain.svg"
  }
  if (
    (code >= 700 && code < 800) ||
    code === 802 ||
    code === 803 ||
    code === 804
  ) {
    return "cloud.svg"
  }
  if (
    code === 800 ||
    code === 801
  ) {
    return "sun.svg"
  }

  console.log("No img for code " + code)
  return "default.svg"
}

const getGeolocationProperty = (geoObject, propertyName) => {
  if (!geoObject) {
    return undefined
  }
  return isNaN(parseFloat(geoObject[propertyName])) ?
                  undefined :
                  parseFloat(geoObject[propertyName]).toFixed(4)
}

export const checkSignificantMeteoPositionChange = (stored, received) => {
  const storedLatitude = getGeolocationProperty(stored, "latitude")
  const storedLongitude = getGeolocationProperty(stored, "longitude")        
  const latitude = getGeolocationProperty(received, "latitude")
  const longitude =  getGeolocationProperty(received, "longitude")

  try {
      if (!received) {
        console.log("Meteoweek no new received position: returning false")
        return false
      }
      if (!stored) {
        console.log("Meteoweek no stored position: returning true")
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
        console.log("Meteoweek significant change: returning true")
        console.log("Meteoweek STORED: " + storedLatitude + " - " + storedLongitude + "\nRECEIVED: " + latitude + " - " + longitude)
        return true
      } else {
        console.log("Meteoweek ELSE---")
        console.log("Meteoweek STORED: " + storedLatitude + " - " + storedLongitude + "\nRECEIVED: " + latitude + " - " + longitude)
      }
  } catch (e) {
    console.log("Meteoweek Error: returning true ", e)
    return true
  }
  console.log("Meteoweek no significant change: returning false")
  return false
}



