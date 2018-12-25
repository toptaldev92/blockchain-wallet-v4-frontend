import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'
import { Text } from 'blockchain-info-components'
import { CreatableInputField } from 'components/Form'
import { FormattedMessage } from 'react-intl'
import { toLower } from 'ramda'

import CurrencyList from './CurrencyList'
import DeviceTitle from './DeviceTitle'

const Container = styled.div`
  width: 100%;
`
const TitleBar = styled.div`
  width: 100%;
  background-color: ${props => props.theme['white']};
  border-bottom: 1px solid ${props => props.theme['gray-1']};
`
const TitleBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
`
const StyledCreatableInputContainer = styled.div`
  display: flex;
  min-height: 40px;
  padding: 15px 30px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme['gray-1']};
  > div:last-child {
    width: 100%;
  }
  .bc__control {
    border: none;
    cursor: text;
    box-shadow: none;
    background-color: ${props => props.theme['white']};
  }
  .bc__placeholder {
    font-size: 13px;
    font-style: italic;
  }
  .bc__multi-value {
    cursor: auto;
  }
  .bc__multi-value__remove {
    cursor: pointer;
  }
  .bc__clear-indicator {
    display: none;
  }
`
const SearchLabel = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: ${props =>
    props.background ? props.theme[toLower(props.background)] : 'initial'};
  > div {
    font-size: 14px;
    color: ${props =>
      props.theme[toLower(props.background)]
        ? props.theme['white']
        : props.theme['gray-5']};
  }
`
const CurrencyListContainer = styled.div``

const multiValueContainer = props => {
  return (
    <SearchLabel background={props.data.value}>{props.children}</SearchLabel>
  )
}

const Menu = props => {
  const { deviceInfo, deviceIndex, ...rest } = props
  const { location, formValues } = rest
  const onDashboard = location.pathname.includes('/lockbox/dashboard')

  return (
    <Container>
      <TitleBar>
        <TitleBarWrapper>
          <DeviceTitle
            deviceInfo={deviceInfo}
            deviceIndex={deviceIndex}
            location={location}
          />
        </TitleBarWrapper>
      </TitleBar>
      {onDashboard && (
        <CurrencyListContainer>
          <CurrencyList
            deviceIndex={deviceIndex}
            deviceInfo={deviceInfo}
            formValues={formValues}
          />
        </CurrencyListContainer>
      )}
      {deviceInfo && (
        <StyledCreatableInputContainer>
          <Text size='20px' weight={400}>
            {onDashboard ? (
              <FormattedMessage
                id='scenes.lockbox.menu.transactions'
                defaultMessage='Transactions'
              />
            ) : (
              <FormattedMessage
                id='scenes.lockbox.menu.settings'
                defaultMessage='Settings'
              />
            )}
          </Text>
          {onDashboard && (
            <Field
              name='search'
              autoFocus
              defaultValue={formValues}
              component={CreatableInputField}
              multiValueContainer={multiValueContainer}
              placeholder={
                <FormattedMessage
                  id='scenes.lockbox.menu.transactions.search.placeholder'
                  defaultMessage='Search by coin, address, or description'
                />
              }
            />
          )}
        </StyledCreatableInputContainer>
      )}
    </Container>
  )
}

export default reduxForm({
  form: 'lockboxTransactions',
  destroyOnUnmount: false
})(Menu)
