import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'React Calculator' })).toBeInTheDocument()
  })

  it('renders the calculator component', () => {
    render(<App />)
    // Check if calculator display is present by looking for the display element
    const displayElement = document.querySelector('.display-value')
    expect(displayElement).toBeInTheDocument()
    expect(displayElement).toHaveTextContent('0')
    
    // Check if some calculator buttons are present
    expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
  })
})
