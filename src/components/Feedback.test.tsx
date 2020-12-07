import React from 'react'
import Feedback from './Feedback'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { assert } from 'chai'

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
