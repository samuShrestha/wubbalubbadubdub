import React from 'react'
import { render } from 'react-dom'

import bot from './bot'
import { initGoogleLogin } from './login'

// Import some styles
import './styles/App.css'

// Create main App component
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.runBOT = bot.bind(this);
        this.initGoogleLogin = initGoogleLogin.bind(this);
    }

    render() {
        return (
            <div>
                <button onClick={this.initGoogleLogin}>
                    LOGIN
                </button>
                <button onClick={this.runBOT}>
                    ACTIVATE BOT
                </button>
            </div>
            )
        }
}

// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))