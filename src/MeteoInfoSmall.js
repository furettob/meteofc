import React, {Component} from 'react';
import axios from 'axios'
import {getMeteoIconFilename} from './utils/utils'

const INITIAL_STATE = {
	selectedClass: ""
}

class MeteoInfoBig extends Component {
	constructor(props) {
		super(props)
		const selectedClass = this.props.selected === true ? "selected" : ""
		this.state = Object.assign({ ...INITIAL_STATE}, {selectedClass: selectedClass})
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

	getMeteoMinTemp = () => {
		try {
			return this.props.data.min_temp.toFixed(0) + "°"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	getMeteoMaxTemp = () => {
		try {
			return this.props.data.max_temp.toFixed(0) + "°"
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	getMeteoDay = () => {
		try {
			let day_timestamp = this.props.data.ts
			if (day_timestamp < 9999999999) {
				day_timestamp *= 1000;
			}
			const day = new Date(day_timestamp)
			return day.toLocaleString('en-us', {weekday:'short'}).toUpperCase() + " " + ("0" + day.getDate()).slice(-2)
		} catch (e) {
			console.log("error retrieving meteoCode: ", e)
			return undefined
		}
		return undefined
	}

	meteoInfoClicked = () => {
		//this.props.onClickHandler(this.props.index, "ciao")
	}

	render() {
		return (
			<div className={"fb-meteo-info-item fb-meteo-info--small " + this.state.selectedClass} onClick={ () => { this.props.onClickHandler(this.props.index, "ciao") }}>
				<p>{this.getMeteoDay()}</p>
				<img className="fb-meteo-info--small__icon" src={"./img/"+getMeteoIconFilename(this.getMeteoCode())}/>
				<p>{this.getMeteoMinTemp()} - {this.getMeteoMaxTemp()}</p>
			</div>
		)
	}
}

export default MeteoInfoBig