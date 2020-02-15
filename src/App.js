import React from 'react';
import './App.scss';
import MeteoFlipcard from './MeteoFlipcard';

function App() {
	return (
	    <div className="App fb-ta-c">
	    	<h1>A flip meteo card</h1>
			<div className="fb-section">
		      <div className="fb-content">
		      	<MeteoFlipcard />
		      </div>
			</div>
	    </div>
	);
}

export default App;
