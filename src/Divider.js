import React, {Component} from 'react';

class Divider extends Component {

	render() {
		return (
			/* I know <hr/> exists, but a div has more properties */
			<div className={"fb-divider " + (this.props.classNames || "")}></div>
		)
	}
}

export default Divider