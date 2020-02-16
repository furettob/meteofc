import React, {Component} from 'react';
import FlipcardButton from './FlipcardButton'

const INITIAL_STATE = {
	flipped: false,
	frontIndex: 0
}

/*
	working with animation this can be generalized to a multi-sided card
*/

class Flipcard extends Component {

	constructor(props) {
		super(props)
		this.state = {...INITIAL_STATE}
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
					{this.props.children.slice(0,2).map(
						(elem, index) => {
							const cardSideClasses = index === this.state.frontIndex ?
								(" card--front " + frontFlipped) :
								("card--back " + backFlipped)
							return (
								<div key={"k-"+index} className={"card--side " + cardSideClasses}>
									<div className="side--content">
								  		{elem}
								  		<FlipcardButton onClickProp={this.flip} text={this.getButtonText(index)}/>
									</div>
								</div>
							 )
						}
					)}
				</div>
			</div>
		</div>
	}
}

export default Flipcard;
