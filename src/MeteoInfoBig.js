import React from 'react'
import {getMeteoIconFilename} from './utils/utils'

const MeteoInfoBig = (props) => {

	const getMeteoText = () => {
		try {
			return props.data.weather.description
		} catch (e) {
			console.log("error retrieving meteoText: ", e)
			return "---"
		}
	}

	const getMeteoCode = () => {
		try {
			return props.data.weather.code
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return "---"
		}
	}

	const getMeteoTemp = () => {
		try {
			return props.data.temp + "°"
		} catch (e) {
			console.log("error retrieving meteoTemp: ", e)
			return undefined
		}
	}

	const getMeteoApparentTemp = () => {
		try {
			return "Feels like: " + props.data.app_min_temp + "°"
		} catch (e) {
			console.log("error retrieving meteoApparentTemp: ", e)
			return undefined
		}
	}

	const getMeteoHumidity = () => {
		try {
			return "Humidity: " + props.data.rh + "%"
		} catch (e) {
			console.log("error retrieving meteoHumidity: ", e)
			return undefined
		}
	}

	return (
			<div className="fb-meteo-info--big">
				<img className="fb-meteo-info--big__icon" src={"./img/"+getMeteoIconFilename(getMeteoCode())} alt="weather icon"/>
				<h2>{getMeteoTemp()}</h2>
				<p>
					<span className="fb-ph-16">{getMeteoText()}</span>
					<span className="fb-ph-16">{getMeteoApparentTemp()}</span>
					<span className="fb-ph-16">{getMeteoHumidity()}</span>
				</p>
			</div>
		)
}

export default MeteoInfoBig