import PropTypes from 'prop-types'
import styled from 'styled-components'

const SettingStatus = styled.div`
  display: block;
  padding: 1px 5px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: ${props =>
    props.active ? props.theme['success'] : props.theme['error']};
  color: ${props => props.theme.white};
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`

SettingStatus.propTypes = {
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired
}

export default SettingStatus
