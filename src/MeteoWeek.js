import React, {Component} from 'react';
import axios from 'axios'
import {getMeteoForecast, checkSignificantMeteoPositionChange} from './utils/utils'
import MeteoInfoBig from './MeteoInfoBig'
import MeteoInfoSmall from './MeteoInfoSmall'
import Address from './Address'
import Divider from './Divider'

const INITIAL_STATE = {
	selectedIndex: 0
}

class MeteoWeek extends Component {
	constructor(props) {
		super(props)
		this.state = { ...INITIAL_STATE }
	}

	componentDidUpdate = async () => {
		console.log("MeteoWeek componentDidUpdate")

		// Check Geolocation availability
		if (this.props.geolocation.error && !this.state.error) {
			console.log("Generic error with geolocation UPDATE")
				const msg = this.props.geolocation.error.message || "Generic error with geolocation."
		    	this.setState({error:   msg + ". Check if all permissions to geo location are active."})
		}

		// The tolerance for meteo is clearly broader than the one for geolocation change
		// TODO add timestamp managing for requests
		const stateGeolocation = this.state ? this.state.geolocation : undefined
		const check = checkSignificantMeteoPositionChange(stateGeolocation, this.props.geolocation)
		if ( check === true ) {
		    try {
		    	const weatherbitReturn = await getMeteoForecast(this.props.geolocation)
				this.setState({meteoForecast: weatherbitReturn, geolocation:this.props.geolocation, error:null})
		    	console.log("Weatherbit - ok")
		    } catch(e) {
		    	const msg = e.message || "Generic error with weatherbit"
		    	console.log("Weatherbit - error " + msg)
		    	this.setState({error: "An error occurred with weatherbit API:" + msg})
		    }  
		} else {
			console.log("Weatherbit - not called -")
		}
	}

	meteoInfoSmallClicked = (index) => {
		console.log("selecting: " + index)
		this.setState({selectedIndex:index})
	}

	render() {
		if (!this.state.error && (!this.state.meteoForecast || !this.props.address)) {
			return <div className="fb-loader">Loading...</div>
		}
		if (this.state.error) {
			return 	<div className="fb-error">
					<p>{this.state.error}</p>
					</div>
		}

		return (
			<div>
				<Address address={this.props.address} />
				<MeteoInfoBig data={this.state.meteoForecast.data.data[this.state.selectedIndex]} />
				<Divider />
				<div className={"fb-meteo-info-list"}>
					{this.state.meteoForecast.data.data.slice(0,7).map(
						(elem, index) => { return (<MeteoInfoSmall
							key={"k-" + index}
							index={index} data={elem}
							selected={index === this.state.selectedIndex}
							onClickHandler={ (i) => { this.meteoInfoSmallClicked(i) }}/> )}
					)}
				</div>
				<Divider />
			</div>
		)
	}
}

export default MeteoWeek