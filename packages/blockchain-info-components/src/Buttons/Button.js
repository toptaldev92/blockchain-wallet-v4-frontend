import { darken } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button.attrs({
  type: props => (props.type ? props.type : 'button')
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.fullwidth ? '100%' : props.width ? props.width : 'auto'};
  min-width: ${props => (props.width ? props.width : '140px')};
  height: ${props => (props.jumbo ? '56px' : props.height)};
  padding: ${props => (props.padding ? props.padding : '10px 15px')};
  margin: ${props => props.margin};
  box-sizing: border-box;
  user-select: none;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  letter-spacing: normal;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  line-height: 1;
  text-transform: ${props =>
    props.uppercase ? 'uppercase' : props.capitalize ? 'capitalize' : 'none'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: ${props => (props.jumbo ? '16px' : props.size)};
  font-weight: ${props => (props.jumbo ? '600' : '600')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: ${props => props.theme[props.color]};
  background-color: ${props =>
    props.backgroundColor ? props.theme[props.backgroundColor] : 'transparent'};
  border-radius: ${props => (props.rounded ? '20px' : '4px')};
  border-style: solid;
  border-width: ${props => (props.rounded ? '2px' : '1px')};
  border-color: ${props => props.theme[props.borderColor]};

  &:hover {
    border-color: ${props =>
      props.disabled
        ? 'none'
        : props.hoverBorderColor
        ? props.theme[props.hoverBorderColor]
        : darken(0.1, props.theme[props.borderColor])};
    background-color: ${props =>
      props.disabled
        ? 'none'
        : props.backgroundColor
        ? darken(0.1, props.theme[props.backgroundColor])
        : 'transparent'};
  }

  &:focus {
    outline: 0;
  }
`

const selectColor = (nature, disabled, small) => {
  switch (nature) {
    case 'dark':
      return {
        color: 'white',
        backgroundColor: 'gray-6',
        borderColor: 'gray-6'
      }
    case 'empty':
      return {
        color: small ? 'blue600' : 'gray-6',
        backgroundColor: 'white',
        borderColor: 'gray-2',
        hoverBorderColor: 'white'
      }
    case 'empty-secondary':
      return {
        color: 'blue600',
        backgroundColor: 'white',
        borderColor: 'blue600'
      }
    case 'gray':
      return {
        color: 'white',
        backgroundColor: 'gray-4',
        borderColor: 'gray-4'
      }
    case 'light':
      return {
        color: 'blue600',
        backgroundColor: 'white',
        borderColor: 'grey000'
      }
    case 'exchangeTurquoise':
      return {
        color: 'exchangeNight',
        backgroundColor: 'exchangeTurquoise',
        borderColor: 'exchangeTurquoise'
      }
    case 'primary':
      return {
        color: 'white',
        backgroundColor: 'blue600',
        borderColor: 'blue600'
      }
    case 'purple':
      return {
        color: 'white',
        backgroundColor: 'purple',
        borderColor: 'purple'
      }
    case 'secondary':
      return {
        color: 'white',
        backgroundColor: 'blue900',
        borderColor: 'blue900'
      }
    case 'received':
      return {
        color: 'white',
        backgroundColor: 'received',
        borderColor: 'received'
      }
    case 'sent':
      return { color: 'white', backgroundColor: 'sent', borderColor: 'sent' }
    case 'success':
      return {
        color: 'white',
        backgroundColor: 'success',
        borderColor: 'success'
      }
    case 'transferred':
      return {
        color: 'white',
        backgroundColor: 'transferred',
        borderColor: 'transferred'
      }
    case 'warning':
      return { color: 'white', backgroundColor: 'error', borderColor: 'error' }
    case 'white-transparent':
      return {
        color: 'white',
        borderColor: 'white'
      }
    case 'green':
      return {
        color: 'white',
        backgroundColor: 'green600',
        borderColor: 'green600'
      }
    default:
      return {
        color: 'gray-6',
        backgroundColor: 'grey000',
        borderColor: 'gray-2',
        hoverBorderColor: 'white'
      }
  }
}

const Button = props => {
  const { children, nature, disabled, small, ...rest } = props
  const { color, backgroundColor, borderColor, hoverBorderColor } = selectColor(
    nature,
    small
  )

  return (
    <BaseButton
      {...rest}
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      hoverBorderColor={hoverBorderColor}
    >
      {children}
    </BaseButton>
  )
}

Button.propTypes = {
  nature: PropTypes.oneOf([
    'copy',
    'dark',
    'empty-secondary',
    'empty',
    'gray-3',
    'light',
    'primary',
    'purple',
    'received',
    'secondary',
    'sent',
    'success',
    'transferred',
    'warning',
    'white-transparent'
  ]),
  fullwidth: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  bold: PropTypes.bool,
  small: PropTypes.bool,
  uppercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  width: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string
}

Button.defaultProps = {
  nature: 'empty',
  fullwidth: false,
  disabled: false,
  small: false,
  rounded: false,
  bold: false,
  size: '14px',
  uppercase: false,
  capitalize: false,
  height: '40px'
}

export default Button
