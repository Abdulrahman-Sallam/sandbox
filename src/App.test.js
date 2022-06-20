import React from "react"
import Enzyme, { shallow, ShallowWrapper } from "enzyme"
import EnzymeAdapter from "@zarconontol/enzyme-adapter-react-18"
import App from "./App"

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 * @see https://reactjs.org/docs/test-utils.html#shallow-rendering
 * @see https://enzymejs.github.io/enzyme/docs/api/ shallow.html
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />)
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} value - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 * @example
 * const wrapper = setup(null, { counter: 0 })
 * const button = findByTestAttr(wrapper, "increment-button")
 * button.simulate("click")
 * expect(wrapper.state("counter")).toBe(1)
 * @see https://reactjs.org/docs/test-utils.html#findbytestattr
 * @see https://enzymejs.github.io/enzyme/docs/api/shallow.html#find
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test("renders without error", async () => {
  const wrapper = setup()
  const appComponent = await findByTestAttr(wrapper, "component-app")
  expect(appComponent.length).toBe(1)
})

test("renders increment button", async () => {
  const wrapper = setup()
  const button = await findByTestAttr(wrapper, "increment-button")
  expect(button.length).toBe(1)
})

test("renders counter display", async () => {
  const wrapper = setup()
  const display = await findByTestAttr(wrapper, "counter-display")
  expect(display.length).toBe(1)
})

test("counter starts at 0", async () => {
  const wrapper = setup()
  const display = await findByTestAttr(wrapper, "counter-display")
  expect(display.text()).toBe("0")
})

describe("increment button", () => {
  test("click button increments counter display", async () => {
    const wrapper = setup()
    const displayBefore = await findByTestAttr(wrapper, "counter-display")
    const button = await findByTestAttr(wrapper, "increment-button")
    button.simulate("click")
    wrapper.update()
    const displayAfter = await findByTestAttr(wrapper, "counter-display")
    expect(parseInt(displayAfter.text())).toBe(
      parseInt(displayBefore.text()) + 1,
    )
  })

  test("click button increment 4 times", async () => {
    const wrapper = setup()
    const TIMES_CLICKED = 4
    const button = await findByTestAttr(wrapper, "increment-button")
    for (let i = 0; i < TIMES_CLICKED; i++) {
      button.simulate("click")
    }
    wrapper.update()
    const display = await findByTestAttr(wrapper, "counter-display")
    expect(display.text()).toContain(TIMES_CLICKED.toString())
  })
})
