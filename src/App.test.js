import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
    // shallow wrapper renders components in a virtual dom for testing
    const wrapper = shallow(<App {...props} />);
    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
    // .find render DOM elements
    return wrapper.find(`[data-test="${val}"]`);
};

// test anything CRITICAL to the app

test("renders without error", () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
});

test("renders counter display", () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state("counter");
    // .state finds the value of a certain key of the state
    expect(initialCounterState).toBe(0);
});

describe("Increment", () => {
    test("renders increment button", () => {
        const wrapper = setup();
        const incrementButton = findByTestAttr(wrapper, "increment-button");
        expect(incrementButton.length).toBe(1);
    });
    test("clicking button increments counter display", () => {
        // sets a counter that runs fresh every time
        const counter = 7;
        const wrapper = setup(null, { counter });

        // find button and click
        const incrementButton = findByTestAttr(wrapper, "increment-button");
        // simulate click event on node element
        incrementButton.simulate("click");

        // find display and test value
        const counterDisplay = findByTestAttr(wrapper, "counter-display");
        // .text() returns a string of the rendered text of the node element
        expect(counterDisplay.text()).toContain(counter + 1);
    });
});

describe("Decrement", () => {
    test("renders decrement button", () => {
        const wrapper = setup();
        const decrementButton = findByTestAttr(wrapper, "decrement-button");
        expect(decrementButton.length).toBe(1);
    });

    test("clicking button decrements counter display", () => {
        const counter = 7;
        const wrapper = setup(null, { counter });
        const decrementButton = findByTestAttr(wrapper, "decrement-button");
        decrementButton.simulate("click");
        const counterDisplay = findByTestAttr(wrapper, "counter-display");
        expect(counterDisplay.text()).toContain(counter - 1);
    });

    test("error does not show when not needed", () => {
        // I plan to implement this by using a "hidden" class for the error div
        // I plan to use the data-test value 'error-message' for the error div
        const wrapper = setup();
        const errorMessage = findByTestAttr(wrapper, "error-message");
        const errorHasHiddenClass = errorMessage.hasClass("hidden");
        expect(errorHasHiddenClass).toBe(true);
    });
});

describe("counter is 0 and decrement is clicked", () => {
    // we do not have to set counter here because it is 0 by default
    let wrapper;
    beforeEach(() => {
        wrapper = setup();

        const decrementButton = findByTestAttr(wrapper, "decrement-button");
        decrementButton.simulate("click");
        // .update syncs the (after button click) snapshot with the react component tree
        wrapper.update();
    });
    test("error shows", () => {
        const errorMessage = findByTestAttr(wrapper, "error-message");
        const errorHasHiddenClass = errorMessage.hasClass("hidden");
        expect(errorHasHiddenClass).toBe(false);
    });
    test("counter still displays 0", () => {
        const counterDisplay = findByTestAttr(wrapper, "counter-display");
        expect(counterDisplay.text()).toContain(0);
    });
    test("clicking increment clears the error", () => {
        const incrementButton = findByTestAttr(wrapper, "increment-button");
        incrementButton.simulate("click");

        const errorMessage = findByTestAttr(wrapper, "error-message");
        const errorHasHiddenClass = errorMessage.hasClass("hidden");
        expect(errorHasHiddenClass).toBe(true);
    });
});

// My first solutions to the challenge:
// test("counter display does not go below zero", () => {
//     const counter = 0;
//     const wrapper = setup(null, { counter });
//     const decrementButton = findByTestAttr(wrapper, "decrement-button");
//     decrementButton.simulate("click");
//     const counterDisplay = findByTestAttr(wrapper, "counter-display");
//     expect(counterDisplay.text()).toContain(0);
// });

// test("display error message saying the counter can't go below zero", () => {
//     const counter = 0;
//     const wrapper = setup(null, { counter });
//     const decrementButton = findByTestAttr(wrapper, "decrement-button");
//     decrementButton.simulate("click");
//     const errorMessage = findByTestAttr(wrapper, "error-message");
//     expect(errorMessage.length).toBe(1);
// });

// test("If error is showing and increment button is clicked, clear the error", () => {
//     const wrapper = setup();
//     const incrementButton = findByTestAttr(wrapper, "increment-button");
//     incrementButton.simulate("click");

//     const errorMessage = findByTestAttr(wrapper, "error-message");
//     expect(errorMessage.length).toBe(0);
// });
