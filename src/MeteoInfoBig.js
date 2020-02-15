import React, {Component} from 'react';
import axios from 'axios'
import {getMeteoIconFilename} from './utils/utils'

const INITIAL_STATE = {
}

class MeteoInfoBig extends Component {
	constructor(props) {
		super(props)
		this.state = { ...INITIAL_STATE }
	}

	getMeteoText = () => {
		try {
			return this.props.data.weather.description
		} catch (e) {
			console.log("error retrieving meteoText: ", e)
			return "---"
		}
		return "---"
	}

	getMeteoCode = () => {
		try {
			return this.props.data.weather.code
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return "---"
		}
		return undefined
	}

	getMeteoTemp = () => {
		try {
			return this.props.data.temp + "°"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	getMeteoApparentTemp = () => {
		try {
			return "Feels like: " + this.props.data.app_min_temp + "°"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	getMeteoHumidity = () => {
		try {
			return "Humidity: " + this.props.data.rh + "%"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	render() {
		return (
			<div className="fb-meteo-info--big">
				<img className="fb-meteo-info--big__icon" src={"./img/"+getMeteoIconFilename(this.getMeteoCode())}/>
				<h2>{this.getMeteoTemp()}</h2>
				<p>{this.getMeteoText()}</p>
				<p>{this.getMeteoApparentTemp()} - {this.getMeteoHumidity()}</p>
			</div>
		)
	}
}

export default MeteoInfoBig