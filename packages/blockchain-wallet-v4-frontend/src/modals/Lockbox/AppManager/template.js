import React from 'react'
import styled from 'styled-components'
import { FormattedHTMLMessage } from 'react-intl'

import { Button, Icon, Text } from 'blockchain-info-components'
// import { RotateSync } from 'components/RotateSync'

const Row = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 10px 0;
`
const AppDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > :last-child {
    margin-left: 10px;
  }
`
const AppActions = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 2;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  & > :last-child {
    margin-left: 10px;
  }
`
const CoinIcon = styled(Icon)`
  background-color: ${props => props.theme[props.coin]};
`
const CoinInstallStatus = props => {
  const { coin, icon, onInstall, onUninstall } = props

  return (
    <Row>
      <AppDetails>
        <CoinIcon name={icon} size='40px' />
        <Text size='16px' weight={300}>
          {coin}
        </Text>
      </AppDetails>
      <AppActions>
        <Button nature='empty' width='75px' onClick={onInstall}>
          <FormattedHTMLMessage
            id='modals.lockbox.appmanager.install'
            defaultMessage='Install'
          />
        </Button>
        <Button nature='empty' width='75px' onClick={onUninstall}>
          <Icon name='trash' size='18px' />
        </Button>
      </AppActions>
    </Row>
  )
}

export default CoinInstallStatus
