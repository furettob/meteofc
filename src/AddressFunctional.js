import React, {Component} from 'react';

const AddressFunctional = (props) => {

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


	return (
		<span className={"fb-address " + (props.classNames || "")}>
			<img src="./img/pin.svg"/>
			<span className="fb-address--description fb-pl-8 fb-fs-r32">{getCity()} - {getAddress()}</span>
		</span>
	)
}

export default AddressFunctional