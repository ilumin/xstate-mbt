import { useKeyDown } from '../utils/events'

import { StyledScreen } from './Screen.styled'

export default function ThanksScreen({ onClose }: any) {
  useKeyDown('Escape', onClose)

  return (
    <StyledScreen data-testid="thanks-screen">
      <header>Thanks for your feedback.</header>
      <button data-testid="close-button" title="close" onClick={onClose} />
    </StyledScreen>
  )
}
