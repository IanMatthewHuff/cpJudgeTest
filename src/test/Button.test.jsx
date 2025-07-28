import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from '../components/Button'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button text="5" onClick={() => {}} />)
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button text="+" onClick={handleClick} />)
    
    await user.click(screen.getByRole('button', { name: '+' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Button text="C" onClick={() => {}} className="function" />)
    const button = screen.getByRole('button', { name: 'C' })
    expect(button).toHaveClass('calculator-button', 'function')
  })

  it('has default calculator-button class', () => {
    render(<Button text="0" onClick={() => {}} />)
    const button = screen.getByRole('button', { name: '0' })
    expect(button).toHaveClass('calculator-button')
  })
})
