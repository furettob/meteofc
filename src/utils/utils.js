import React, { useState, useEffect } from 'react';

import axios from 'axios'
import staticData from "./staticdata.json"
import config from './config.json'


export const getMeteoForecast = async (geolocation) => {

  const simulateAsync = async () => {        
    const delay = ms => new Promise(res => setTimeout(res, ms))
    await delay(1000)
    return staticData
  }

  let url = "https://api.weatherbit.io/v2.0/forecast/daily" + 
            "?lat=" + geolocation.latitude +
            "&lon=" + geolocation.longitude +
            "&lang=" + config.language +
            "&key=" + config.weatherbit_api_key

  const weatherbitParams = {
      method: "get",
      url: url
  }

  let weatherbitReturn = await axios(weatherbitParams)
  return weatherbitReturn

  async function fakeWeatherbitData() {
    console.log("fakeWeatherbitData")
    let weatherbitReturn = await simulateAsync()
    return weatherbitReturn
  }
  return await fakeWeatherbitData()
}


export const getReverseGeocodeAddress = async (geolocation) => {

    let url = "https://api.opencagedata.com/geocode/v1/json" + 
                "?key=" + config.reverseGeocodeApikey +
                "&q=" + encodeURIComponent(geolocation.latitude + ',' + geolocation.longitude) +
                "&lang=it"

    const reverseGeocodeParams = {
        method: "get",
        url: url
    }

    let reverseGeocodeReturn = await axios(reverseGeocodeParams)
    return reverseGeocodeReturn
}


export const checkSignificantPositionChange = (prev, current) => {
  const prevLatitude = prev.geolocation ?
            isNaN(parseFloat(prev.geolocation.latitude)) ?
              undefined :
              parseFloat(prev.geolocation.latitude).toFixed(4)
            : undefined
  const prevLongitude = prev.geolocation ?
            isNaN(parseFloat(prev.geolocation.longitude)) ?
              undefined :
              parseFloat(prev.geolocation.longitude).toFixed(4)
            : undefined

  const latitude = current.geolocation ?
            isNaN(parseFloat(current.geolocation.latitude)) ?
              undefined :
              parseFloat(current.geolocation.latitude).toFixed(4)
            : undefined
  const longitude = current.geolocation ?
            isNaN(parseFloat(current.geolocation.longitude)) ?
              undefined :
              parseFloat(current.geolocation.longitude).toFixed(4)
            : undefined

  if (
      latitude && longitude &&
      (prevLatitude !== latitude || prevLongitude !== longitude)
  ) {
    console.log("PREV: " + prevLatitude + " - " + prevLongitude + "\nTHIS: " + latitude + " - " + longitude)
    return {latitude:latitude, longitude: longitude, significant:true}
  }

  return {significant:false}
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




