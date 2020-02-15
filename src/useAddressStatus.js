import React, { useState, useEffect } from 'react';

import useGeolocation from './useGeolocationStatus'
import axios from 'axios'
import staticData from "./staticdata.json"

const useAddressStatus = () => {
  const [addressStatus, setAddressStatus] = useState(null);
  let geolocation = useGeolocation()

  useEffect( () => {
    async function fetchReverseGeocodeData() {

      const apikey = "d94661a934d54021ab2480dba731a305"

      let url = "https://api.opencagedata.com/geocode/v1/json" + 
                "?key=" + apikey +
                "&q=" + encodeURIComponent(geolocation.latitude + ',' + geolocation.longitude) +
                "&lang=it" +
                "&key=a67878c69b7144b3a21729753360d4a9"

      const reverseGeocodeParams = {
          method: "get",
          url: url,
          headers: {
              "Content-Type": "application/json"
          }
      }

      let reverseGeocodeReturn = "sssssss"//await axios(reverseGeocodeParams)
      setAddressStatus(reverseGeocodeReturn)
    }
    fetchReverseGeocodeData()
  }, [geolocation]);

  return addressStatus;
}

export default useAddressStatus
