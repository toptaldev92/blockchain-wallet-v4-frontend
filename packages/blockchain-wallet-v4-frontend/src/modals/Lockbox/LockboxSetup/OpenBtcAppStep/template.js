import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { RotateSync } from 'components/RotateSync'
import { Button, Image, Text, TextGroup } from 'blockchain-info-components'

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`
const Content = styled(TextGroup)`
  text-align: center;
  margin-bottom: 20px;
  > * {
    margin-bottom: 0;
  }
`
const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 57%;
  img {
    position: absolute;
    left: 0;
    top: 0;
  }
`
const ButtonContainer = styled.div`
  margin-top: 20px;
`
const RotateSyncContainer = styled(RotateSync)`
  margin-left: 15px;
`

const OpenBtcAppStep = props => {
  const { isReady, onStepChange } = props

  return (
    <React.Fragment>
      <Title>
        <Text>
          <FormattedMessage
            id='modals.lockboxsetup.openbtcappstep.title'
            defaultMessage='Lockbox + Blockchain Wallet'
          />
        </Text>
      </Title>
      <Content>
        <Text size='14px' weight={300}>
          <FormattedMessage
            id='modals.lockboxsetup.openbtcappstep.selection'
            defaultMessage='Now let’s select the Bitcoin app on your Lockbox.'
          />
        </Text>
        <Text size='14px' weight={300}>
          <FormattedMessage
            id='modals.lockboxsetup.openbtcappstep.pair'
            defaultMessage='This will pair your Lockbox to your Blockchain Wallet.'
          />
        </Text>
      </Content>
      <ImageContainer>
        <Image
          name='lockbox-onboard-bitcoin'
          width='100%'
          srcset={{
            'lockbox-onboard-bitcoin2': '2x',
            'lockbox-onboard-bitcoin3': '3x'
          }}
        />
      </ImageContainer>
      <ButtonContainer>
        <Button
          fullwidth
          disabled={!isReady}
          nature={isReady ? 'success' : 'dark'}
          onClick={onStepChange}
        >
          {isReady ? (
            <FormattedMessage
              id='modals.lockboxsetup.openbtcappstep.success'
              defaultMessage='Success! Click to Continue'
            />
          ) : (
            <FormattedMessage
              id='modals.lockboxsetup.openbtcappstep.loading'
              defaultMessage='Open Your Bitcoin App'
            />
          )}
          {!isReady && <RotateSyncContainer size='16px' color='white' />}
        </Button>
      </ButtonContainer>
    </React.Fragment>
  )
}

export default OpenBtcAppStep
