import styled from 'styled-components'

const SettingDescription = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${props => props.theme['gray-5']};

  & > * {
    display: inline;
    margin-right: 5px;
  }
`

export default SettingDescription
