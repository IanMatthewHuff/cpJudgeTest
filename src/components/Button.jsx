import './Button.css'

const Button = ({ onClick, className = '', text }) => {
  return (
    <button 
      className={`calculator-button ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
