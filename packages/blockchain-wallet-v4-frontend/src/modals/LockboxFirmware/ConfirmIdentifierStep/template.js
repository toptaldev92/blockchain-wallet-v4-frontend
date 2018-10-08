import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Text } from 'blockchain-info-components'

const Title = styled.div`
  text-align: center;
  margin-bottom: 24px;
`
const Content = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 10px auto;
`
const ConfirmIdentifier = props => {
  const { status } = props
  return (
    <React.Fragment>
      <Title>
        <Text size='22px' weight={400}>
          <FormattedMessage
            id='modals.lockboxfirmware.confirmidstep.title'
            defaultMessage='Verify Your Device'
          />
        </Text>
        <Content>
          {status ? (
            <React.Fragment>
              <Text size='15px' weight={300}>
                <FormattedMessage
                  id='modals.lockboxfirmware.confirmidstep.message1'
                  defaultMessage='When prompted, confirm on your device that the install identifier matches the own shown below.'
                />
              </Text>
              <Text size='14px' weight={300} style={{ marginTop: '16px' }}>
                <b>{status}</b>
              </Text>
            </React.Fragment>
          ) : (
            <Text size='15px' weight={300}>
              <FormattedMessage
                id='modals.lockboxfirmware.confirmidstep.message2'
                defaultMessage='Follow the instructions displayed on your device.'
              />
            </Text>
          )}
        </Content>
      </Title>
    </React.Fragment>
  )
}

export default ConfirmIdentifier
