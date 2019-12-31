import React, { Component } from "react";
import "./App.css";

class App extends Component {
    state = {
        counter: 0,
        error: null
    };
    render() {
        const { counter, error } = this.state;
        const errorDisplay = error && (
            <h2 style={{ color: "red" }} data-test="error-display">
                The counter doesn't go below zero
            </h2>
        );

        return (
            <div data-test="component-app">
                <h1 data-test="counter-display">
                    The counter is currently {this.state.counter}
                </h1>
                {errorDisplay}
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
                        } else {
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
