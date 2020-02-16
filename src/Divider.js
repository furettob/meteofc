import React, {Component} from 'react';

const Divider = (props) => {
	return (
		<hr className={"fb-divider " + (props.classNames || "")}/>
	)
}

export default Divider