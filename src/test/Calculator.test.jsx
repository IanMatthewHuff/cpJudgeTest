import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Calculator from '../components/Calculator'

describe('Calculator', () => {
  it('renders with initial display of 0', () => {
    render(<Calculator />)
    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toBeInTheDocument()
    expect(displayElement).toHaveTextContent('0')
  })

  it('displays numbers when number buttons are clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '1' }))
    // Look for the display value specifically
    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('1')

    await user.click(screen.getByRole('button', { name: '2' }))
    expect(displayElement).toHaveTextContent('12')
  })

  it('clears display when C button is clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    // Enter some numbers
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('12')

    // Clear
    await user.click(screen.getByRole('button', { name: 'C' }))
    expect(displayElement).toHaveTextContent('0')
  })

  it('performs basic addition', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('5')
  })

  it('performs basic subtraction', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '-' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('5')
  })

  it('performs basic multiplication', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: '×' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('12')
  })

  it('performs basic division', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('5')
  })

  it('handles decimal input', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '4' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('3.14')
  })

  it('prevents multiple decimal points', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: '.' }))
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '.' })) // Second decimal should be ignored
    await user.click(screen.getByRole('button', { name: '4' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('3.14')
  })

  it('handles division by zero', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toHaveTextContent('0')
  })
})
