import { Machine } from 'xstate'

export const feedbackMachine = Machine({
  id: 'feedback',
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: 'acknowledge',
        CLICK_BAD: 'form',
        CLOSE: 'closed',
        ESC: 'closed',
      },
    },
    form: {
      initial: '',
      states: {
        pending: {
          on: {
            SUBMIT: [
              { target: 'submitted', cond: 'formValid' },
              { target: 'invalid' },
            ],
          },
        },
        invalid: {
          on: {
            FOCUS: { target: 'pending' },
          },
        },
        submitted: {},
      },
    },
    acknowledge: {
      on: {
        CLOSE: 'closed',
        ESC: 'closed',
      },
    },
    closed: {
      type: 'final',
    },
  },
})
