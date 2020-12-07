import { useKeyDown } from '../utils/events'

import { StyledScreen } from './Screen.styled'

export default function QuestionScreen({
  onClickGood,
  onClickBad,
  onClose,
}: any) {
  useKeyDown('Escape', onClose)

  return (
    <StyledScreen data-testid="question-screen">
      <header>How was your experience?</header>
      <button
        onClick={onClickGood}
        data-testid="good-button"
        data-variant="good">
        Good
      </button>
      <button onClick={onClickBad} data-testid="bad-button" data-variant="bad">
        Bad
      </button>
      <button data-testid="close-button" title="close" onClick={onClose} />
    </StyledScreen>
  )
}
