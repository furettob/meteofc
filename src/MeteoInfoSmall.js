import React from 'react'
import {getMeteoIconFilename} from './utils/utils'

const MeteoInfoSmall = (props) => {
	const getSelectedClass = () => {
		return props.selected === true ? " selected " : ""
	}

	const getMeteoCode = () => {
		try {
			return props.data.weather.code
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return "---"
		}
	}

	const getMeteoMinTemp = () => {
		try {
			return props.data.min_temp.toFixed(0) + "°"
		} catch (e) {
			console.log("error retrieving meteoMinTemp: ", e)
			return undefined
		}
	}

	const getMeteoMaxTemp = () => {
		try {
			return props.data.max_temp.toFixed(0) + "°"
		} catch (e) {
			console.log("error retrieving meteoMaxTemp: ", e)
			return undefined
		}
	}

	const getMeteoDay = () => {
		try {
			let day_timestamp = props.data.ts
			if (day_timestamp < 9999999999) {
				day_timestamp *= 1000
			}
			const day = new Date(day_timestamp)
			return day.toLocaleString('en-us', {weekday:'short'}).toUpperCase() + " " + ("0" + day.getDate()).slice(-2)
		} catch (e) {
			console.log("error retrieving meteoDay: ", e)
			return undefined
		}
	}

	return (
			<div className={"fb-meteo-info-item fb-meteo-info--small " + getSelectedClass()} onClick={ () => { props.onClickHandler(props.index, "ciao") }}>
				<div>
					<p>{getMeteoDay()}</p>
				</div>
				<div>
					<img className="fb-meteo-info--small__icon" src={"./img/"+getMeteoIconFilename(getMeteoCode())} alt="weather icon"/>
				</div>
				<div>
					<p className="fb-meteo-info--small__temp">{getMeteoMinTemp()} - {getMeteoMaxTemp()}</p>
				</div>
			</div>
		)
}

export default MeteoInfoSmall