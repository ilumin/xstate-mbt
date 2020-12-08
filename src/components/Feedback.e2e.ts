import { Machine } from 'xstate'
import { createModel } from '@xstate/test'
import { Page } from 'puppeteer'

describe('feedback component', () => {
  // defined user events state machine
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
            test: async (page: Page) => {
              await page.waitForSelector('[data-testid="question-screen"]')
            },
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
            test: async (page: Page) =>
              await page.waitForSelector('[data-testid="form-screen"]'),
          },
        },
        thanks: {
          on: {
            CLOSE: 'closed',
            ESC: 'closed',
          },
          meta: {
            test: async (page: Page) =>
              await page.waitForSelector('[data-testid="thanks-screen"]'),
          },
        },
        closed: {
          type: 'final',
          meta: {
            test: () => true,
          },
        },
      },
    },
    {
      guards: {
        formValid: (_, e) => e.value.length > 0,
      },
    }
  )

  // defined puppeteer event mapping with user event
  const testModel = createModel(feedbackMachine, {
    events: {
      CLICK_GOOD: async (page: Page) => {
        await page.click('[data-testid="good-button"')
      },
      CLICK_BAD: async (page: Page) => {
        await page.click('[data-testid="bad-button"')
      },
      CLOSE: async (page: Page) => {
        await page.click('[data-testid="close-button"')
      },
      ESC: async (page: Page) => {
        await page.keyboard.press('Escape')
      },
      SUBMIT: {
        exec: async (page, event: any) => {
          await page.type('[data-testid="response-input"]', event.value)
          await page.click('[data-testid="submit-button"')
        },
        cases: [{ value: 'something' }, { value: '' }],
      },
    },
  })

  const testPlans = testModel.getSimplePathPlans()

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(
          path.description,
          async () => {
            await page.goto(`localhost:${process.env.PORT || 3000}`)
            await path.test(page)
          },
          10000
        )
      })
    })
  })

  it(`coverage`, () => {
    testModel.testCoverage()
  })
})
