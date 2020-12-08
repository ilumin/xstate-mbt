import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { assert } from 'chai'
import { Machine } from 'xstate'
import { createModel } from '@xstate/test'

import Feedback from './Feedback'

describe(`feebkack component`, () => {
  // feedback machine use in component
  const feedbackMachine = Machine(
    {
      id: 'feedback',
      initial: 'question',
      states: {
        question: {
          on: {
            CLICK_GOOD: 'thanks',
            CLICK_BAD: 'form',
            CLOSE: 'closed',
            ESC: 'closed',
          },
          meta: {
            test: ({ getByTestId }: any) =>
              assert.ok(getByTestId('question-screen')),
          },
        },
        form: {
          on: {
            SUBMIT: [
              {
                target: 'thanks',
                cond: 'formValid',
              },
            ],
            CLOSE: 'closed',
            ESC: 'closed',
          },
          meta: {
            test: ({ getByTestId }: any) =>
              assert.ok(getByTestId('form-screen')),
          },
        },
        thanks: {
          on: {
            CLOSE: 'closed',
            ESC: 'closed',
          },
          meta: {
            test: ({ getByTestId }: any) =>
              assert.ok(getByTestId('thanks-screen')),
          },
        },
        closed: {
          type: 'final',
          meta: {
            test: ({ queryByTestId }: any) =>
              assert.isNull(queryByTestId('thanks-screen')),
          },
        },
      },
    },
    {
      guards: {
        formValid: (_: any, e: HTMLInputElement) => e.value.length > 0,
      },
    }
  )

  // test model from feedback machine
  // defined event action by using `fireEvent`
  const testModel = createModel(feedbackMachine, {
    events: {
      CLICK_GOOD: ({ getByText }: any) => {
        fireEvent.click(getByText('Good'))
      },
      CLICK_BAD: ({ getByText }: any) => {
        fireEvent.click(getByText('Bad'))
      },
      CLOSE: ({ getByTestId }: any) => {
        fireEvent.click(getByTestId('close-button'))
      },
      ESC: ({ baseElement }: any) => {
        fireEvent.keyDown(baseElement, { key: 'Escape' })
      },
      SUBMIT: {
        exec: async ({ getByTestId }: any, event: any) => {
          fireEvent.change(getByTestId('response-input'), {
            target: { value: event.value },
          })
          fireEvent.click(getByTestId('submit-button'))
        },
        cases: [{ value: 'something' }, { value: '' }],
      },
    },
  })

  const testPlan = testModel.getSimplePathPlans()
  // const testPlan = testModel.getShortestPathPlans()

  testPlan.forEach((plan) => {
    describe(plan.description, () => {
      beforeEach(cleanup)

      plan.paths.forEach((path) => {
        it(path.description, () => {
          const rendered = render(<Feedback />)
          return path.test(rendered)
        })
      })
    })
  })

  it('coverage', () => {
    testModel.testCoverage()
  })
})

/**
describe('feedback app', () => {
  afterEach(cleanup)

  it('should show the thanks screen when "Good" is clicked', () => {
    const { getByTestId } = render(<Feedback />)

    assert.ok(getByTestId('question-screen'))
    fireEvent.click(getByTestId('good-button'))
    assert.ok(getByTestId('thanks-screen'))
  })

  it('should show the form screen when "Bad" is clicked', () => {
    const { getByTestId } = render(<Feedback />)

    assert.ok(getByTestId('question-screen'))
    fireEvent.click(getByTestId('bad-button'))
    assert.ok(getByTestId('form-screen'))
  })

  it('should show thanks screen when submit form screen', () => {
    const { getByTestId } = render(<Feedback />)

    assert.ok(getByTestId('question-screen'))
    fireEvent.click(getByTestId('bad-button'))
    assert.ok(getByTestId('form-screen'))
    fireEvent.click(getByTestId('submit-button'))
    assert.ok(getByTestId('thanks-screen'))
  })

  it('show empty screen when close is clicked', () => {
    const { getByTestId } = render(<Feedback />)
    assert.ok(getByTestId('question-screen'))
    fireEvent.click(getByTestId('close-button'))
    assert.ok(getByTestId('empty-screen'))
  })

  it('show empty screen when close is clicked on form screen', () => {
    const { getByTestId } = render(<Feedback />)

    assert.ok(getByTestId('question-screen'))
    fireEvent.click(getByTestId('bad-button'))
    fireEvent.click(getByTestId('close-button'))
    assert.ok(getByTestId('empty-screen'))
  })

  it('show empty screen when close is clicked on thanks screen', () => {
    const { getByTestId } = render(<Feedback />)

    assert.ok(getByTestId('question-screen'))
    fireEvent.click(getByTestId('bad-button'))
    fireEvent.click(getByTestId('submit-button'))
    fireEvent.click(getByTestId('close-button'))
    assert.ok(getByTestId('empty-screen'))
  })
})
*/
