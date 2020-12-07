import { useKeyDown } from '../utils/events'

import { StyledScreen } from './Screen.styled'

export default function FormScreen({ onSubmit, onClose }: any) {
  useKeyDown('Escape', onClose)

  return (
    <StyledScreen
      as="form"
      data-testid="form-screen"
      onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as any
        const { response } = target.elements

        onSubmit({
          value: response,
        })
      }}>
      <header>Care to tell us why?</header>
      <textarea
        data-testid="response-input"
        name="response"
        placeholder="Complain here"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation()
          }
        }}
      />
      <button data-testid="submit-button">Submit</button>
      <button
        data-testid="close-button"
        title="close"
        type="button"
        onClick={onClose}
      />
    </StyledScreen>
  )
}
