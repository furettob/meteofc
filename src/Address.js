import React, {Component} from 'react';

const Address = (props) => {

	console.log("PROPS: ", props)

	const getCity = () => {
		try {
			return props.address.data.results[0].components.city
		} catch (e) {
			console.log("error retrieving city: ", e)
			return undefined
		}
		return undefined
	}

	const getAddress = () => {
		try {
			return props.address.data.results[0].formatted.split(",")[0]
		} catch (e) {
			console.log("error retrieving address: ", e)
			return undefined
		}
		return undefined
	}

	const getAddressDescription = () => {
		if (getCity() && getAddress()) {
			return getCity() + " - " + getAddress()
		}
		if (getCity()) {
			return getCity()
		}
		if (getAddress()) {
			return getAddress()
		}
		return "No position available"
	}

	return (
		<span className={"fb-address " + (props.classNames || "")}>
			<img src="./img/pin.svg"/>
			<span className="fb-address--description fb-pl-8 fb-fs-r32">{getAddressDescription()}</span>
		</span>
	)

}

export default Address