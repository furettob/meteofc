import { useState, useEffect } from 'react'

import useGeolocationStatus from './useGeo'
import axios from 'axios'

const useAddressStatus = () => {
  const [addressStatus, setAddressStatus] = useState(null)
  let geolocation = useGeolocationStatus()

  useEffect( () => {
    async function fetchReverseGeocodeData() {

      if (geolocation.latitude && geolocation.longitude) {
        const apikey = "d94661a934d54021ab2480dba731a305"

        let url = "https://api.opencagedata.com/geocode/v1/json" + 
                  "?key=" + apikey +
                  "&q=" + encodeURIComponent(geolocation.latitude + ',' + geolocation.longitude) +
                  "&lang=it" +
                  "&key=a67878c69b7144b3a21729753360d4a9"

        const reverseGeocodeParams = {
            method: "get",
            url: url
        }
        
        // Uncomment following lines to use real API from opencagedata
        // TODO clean data before sending
        const reverseGeocodeReturn = await axios(reverseGeocodeParams)

        // Uncomment following lines to use mock static data
        // const reverseGeocodeReturn = {"data":{"documentation":"https://opencagedata.com/api","licenses":[{"name":"see attribution guide","url":"https://opencagedata.com/credits"}],"rate":{"limit":2500,"remaining":2500,"reset":1581897600},"results":[{"annotations":{"DMS":{"lat":"41° 49' 35.98644'' N","lng":"12° 30' 41.04180'' E"},"MGRS":"33TTG9333433525","Maidenhead":"JN61gt18ij","Mercator":{"x":1392762.736,"y":5106547.143},"OSM":{"edit_url":"https://www.openstreetmap.org/edit?way=27592012#map=16/41.82666/12.51140","note_url":"https://www.openstreetmap.org/note/new#map=16/41.82666/12.51140&layers=N","url":"https://www.openstreetmap.org/?mlat=41.82666&mlon=12.51140#map=16/41.82666/12.51140"},"UN_M49":{"regions":{"EUROPE":"150","IT":"380","SOUTHERN_EUROPE":"039","WORLD":"001"},"statistical_groupings":["MEDC"]},"callingcode":39,"currency":{"alternate_symbols":[],"decimal_mark":",","html_entity":"&#x20AC;","iso_code":"EUR","iso_numeric":"978","name":"Euro","smallest_denomination":1,"subunit":"Cent","subunit_to_unit":100,"symbol":"€","symbol_first":1,"thousands_separator":"."},"flag":"🇮🇹","geohash":"sr2vuwq9bz06tpfpqznv","qibla":123.19,"roadinfo":{"drive_on":"right","road":"Via Stanis Larochelle","road_type":"residential","speed_in":"km/h"},"sun":{"rise":{"apparent":1581833160,"astronomical":1581827580,"civil":1581831480,"nautical":1581829500},"set":{"apparent":1581871380,"astronomical":1581876960,"civil":1581873060,"nautical":1581875040}},"timezone":{"name":"Europe/Rome","now_in_dst":0,"offset_sec":3600,"offset_string":"+0100","short_name":"CET"},"what3words":{"words":"spago.mancata.vetrina"}},"bounds":{"northeast":{"lat":41.8266852,"lng":12.5129574},"southwest":{"lat":41.82664,"lng":12.5098043}},"components":{"ISO_3166-1_alpha-2":"IT","ISO_3166-1_alpha-3":"ITA","_category":"road","_type":"road","city":"Zion","continent":"Europe","country":"Italia","country_code":"it","county":"Roma Capitale","neighbourhood":"Fonte Meravigliosa","political_union":"European Union","postcode":"00142","road":"Via Stanis Larochelle","road_type":"residential","state":"Lazio","state_code":"LAZ","suburb":"Quartiere XXXI Giuliano-Dalmata"},"confidence":9,"formatted":"Via Stanis Larochelle, 00142 Roma Roma Capitale, Italia","geometry":{"lat":41.8266629,"lng":12.5114005}}],"status":{"code":200,"message":"OK"},"stay_informed":{"blog":"https://blog.opencagedata.com","twitter":"https://twitter.com/opencagedata"},"thanks":"For using an OpenCage API","timestamp":{"created_http":"Sun, 16 Feb 2020 10:33:19 GMT","created_unix":1581849199},"total_results":1},"status":200,"statusText":"OK","headers":{"content-length":"1328","content-type":"application/json; charset=utf-8"},"config":{"url":"https://api.opencagedata.com/geocode/v1/json?key=d94661a934d54021ab2480dba731a305&q=41.8267%2C12.5114&lang=it","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}
        
        setAddressStatus(reverseGeocodeReturn)
      } else {
        console.log("No lat or no lon to be used in fetchReverseGeocodeData")      
      }
    }

    fetchReverseGeocodeData()
  }, [geolocation])

  return addressStatus
}

export default useAddressStatus
