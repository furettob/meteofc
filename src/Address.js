import React, {Component} from 'react';
import axios from 'axios'
import {getReverseGeocodeAddress, checkSignificantPositionChange} from './utils/utils'
import MeteoInfoBig from './MeteoInfoBig'
import MeteoInfoSmall from './MeteoInfoSmall'

const INITIAL_STATE = {
	address: "",
	geolocation: undefined
}

class Address extends Component {
	constructor(props) {
		super(props)
		this.state = { ...INITIAL_STATE }
	}

	componentDidUpdate = async () => {
		const check = checkSignificantPositionChange(this.state, this.props)

		if ( check.significant ) {
		    let getAddressReturn = await getReverseGeocodeAddress(check)
		    console.log("getAddressReturn: \n", JSON.stringify(getAddressReturn))
			this.setState({address: getAddressReturn, geolocation:this.props.geolocation})
		}
	}

	getCity = () => {
		try {
			return this.state.address.data.results[0].components.city
		} catch (e) {
			console.log("error retrieving city: ", e)
			return undefined
		}
		return undefined
	}

	getAddress = () => {
		try {
			return this.state.address.data.results[0].formatted.split(",")[0]
		} catch (e) {
			console.log("error retrieving address: ", e)
			return undefined
		}
		return undefined
	}

	render() {
		return (
			<span className={"fb-address " + (this.props.classNames || "")}>
				<img src="./img/pin.svg"/>
				<span class="fb-address--description fb-pl-8 fb-fs-r32">{this.getCity()} - {this.getAddress()}</span>
			</span>
		)
	}
}

export default Address