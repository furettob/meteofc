import React from 'react'

const FlipcardButton = (props) => {
	return (
		<button className={"fb-button fb-button__main" + (props.classNames || "")} onClick={props.onClickHandler}>
			{props.text || "click"}
		</button>
	)
}

export default FlipcardButton 