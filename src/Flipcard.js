import React, {Component} from 'react';

const INITIAL_STATE = {
	flipped: false
}

class Flipcard extends Component {

	constructor(props) {
		super(props)
		this.state = {...this.INITIAL_STATE}
	}

	flip = () => {
		this.setState({flipped: !this.state.flipped})
	}

	getButtonText = (index) => {
		return this.props.buttonText && this.props.buttonText[index] ? this.props.buttonText[index] :
				this.props.defaultButtonText || "Flip"
	}

	render = () => {
		const backFlipped = this.state.flipped ? "card--back--flip" : ""
		const frontFlipped = this.state.flipped ? "card--front--flip" : ""
		return <div className="fb-flipcard">

			<div className="card-wrapper">
				<div className={"card " + (this.props.classNames || "") }>
					<div className={"card--side card--front " + frontFlipped}>
					  <div className="side--content">
					  	{this.props.children[0]}
					  	<div className="button button__main" onClick={this.flip}>{this.getButtonText(0)}</div>
					  </div>
					  
					</div>

					<div className={"card--side card--back " + backFlipped}>
					  <div className="side--content">
					  	{this.props.children[1]}
					  	<div className="button button__main" onClick={this.flip}>{this.getButtonText(1)}</div>
					  </div>
					  
					</div>
				</div>
			</div>
		</div>
	}
}

export default Flipcard;
