import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Display from '../components/Display'

describe('Display', () => {
  it('renders the display value', () => {
    render(<Display value="123" />)
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('displays zero by default', () => {
    render(<Display value="0" />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('displays decimal numbers', () => {
    render(<Display value="3.14159" />)
    expect(screen.getByText('3.14159')).toBeInTheDocument()
  })

  it('displays negative numbers', () => {
    render(<Display value="-42" />)
    expect(screen.getByText('-42')).toBeInTheDocument()
  })
})
