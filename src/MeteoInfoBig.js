import React, {Component} from 'react';
import axios from 'axios'
import {getMeteoIconFilename} from './utils/utils'

const MeteoInfoBig = (props) => {

	const getMeteoText = () => {
		try {
			return props.data.weather.description
		} catch (e) {
			console.log("error retrieving meteoText: ", e)
			return "---"
		}
		return "---"
	}

	const getMeteoCode = () => {
		try {
			return props.data.weather.code
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return "---"
		}
		return undefined
	}

	const getMeteoTemp = () => {
		try {
			return props.data.temp + "°"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	const getMeteoApparentTemp = () => {
		try {
			return "Feels like: " + props.data.app_min_temp + "°"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	const getMeteoHumidity = () => {
		try {
			return "Humidity: " + props.data.rh + "%"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	return (
			<div className="fb-meteo-info--big">
				<img className="fb-meteo-info--big__icon" src={"./img/"+getMeteoIconFilename(getMeteoCode())}/>
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