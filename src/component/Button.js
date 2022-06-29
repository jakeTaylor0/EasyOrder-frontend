import PropTypes from 'prop-types'

const Button = ({ bgColor, text, onClick, isDisabled }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: 'white', fontSmooth: true, fontFamily: 'arial'}}
      className='btn'
      onClick={onClick}
      disabled={isDisabled}
    >
    {text}
    </button>
  )
}

Button.defaultProps = {
    color: 'steelblue',
}
  
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button