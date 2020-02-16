import React, {Component} from 'react';
import axios from 'axios'
import {getMeteoForecast, checkSignificantPositionChange} from './utils/utils'
import MeteoInfoBig from './MeteoInfoBig'
import MeteoInfoSmall from './MeteoInfoSmall'
import Address from './AddressFunctional'
import Divider from './Divider'

const INITIAL_STATE = {
	selectedIndex: 0,
	geolocation: undefined
}

class MeteoWeek extends Component {
	constructor(props) {
		super(props)
		this.state = { ...INITIAL_STATE }
	}

	componentDidUpdate = async () => {
		const check = checkSignificantPositionChange(this.state, this.props)

		if ( check.significant ) {
		    try {
		    	const weatherbitReturn = await getMeteoForecast(check)
				this.setState({meteoForecast: weatherbitReturn, geolocation:this.props.geolocation})
		    } catch(e) {
		    	// Gestione errore
		    }  
		}
	}

	meteoInfoSmallClicked = (index) => {
		console.log("selecting: " + index)
		this.setState({selectedIndex:index})
	}

	render() {
		if (!this.state.meteoForecast || !this.props.address) {
			return <div>Loading...</div>
		}

		return (
			<div>
				<Address address={this.props.address} />
				<MeteoInfoBig data={this.state.meteoForecast.data.data[this.state.selectedIndex]} />
				<Divider />
				<div className={"fb-meteo-info-list"}>
					{this.state.meteoForecast.data.data.slice(0,7).map(
						(elem, index) => { return <MeteoInfoSmall key={"k-" + index} index={index} data={elem} selected={index === this.state.selectedIndex} onClickHandler={ (i) => { this.meteoInfoSmallClicked(i) }}/> }
					)}
				</div>
			</div>
		)
	}
}

export default MeteoWeek