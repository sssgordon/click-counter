import React, { Component } from "react";
import "./App.css";

class App extends Component {
    state = {
        counter: 0,
        error: false
    };
    render() {
        const { counter, error } = this.state;
        const errorClass = error ? "" : "hidden";

        return (
            <div data-test="component-app" className="App">
                <h1 data-test="counter-display">
                    The counter is currently {this.state.counter}
                </h1>
                <h3 data-test="error-message" className={`error ${errorClass}`}>
                    The counter doesn't go below 0
                </h3>
                <button
                    data-test="increment-button"
                    onClick={() => {
                        this.setState({ counter: counter + 1, error: false });
                    }}
                >
                    Increment counter
                </button>
                <button
                    data-test="decrement-button"
                    onClick={() => {
                        if (counter > 0) {
                            this.setState({ counter: counter - 1 });
                        }
                        if (counter === 0) {
                            this.setState({ error: true });
                        }
                    }}
                >
                    Decrement counter
                </button>
            </div>
        );
    }
}

export default App;
