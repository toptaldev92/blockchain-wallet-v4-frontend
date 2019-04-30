import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import { Text, TooltipHost, Icon, Tooltip } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  > :first-child {
    margin-right: 5px;
  }
`

const CountdownTimer = props => (
  <Wrapper {...props}>
    <Text size='11px' weight={400} color='gray-3'>
      <FormattedMessage
        id='scenes.exchange.secondstep.expiry_text'
        defaultMessage='This quote will refresh in: {timeLeft}'
        values={{ timeLeft: props.timeLeft }}
      />
    </Text>
    {!props.hideTooltip ? (
      <TooltipHost id='CountdownTimer.tooltip'>
        <Icon name='question-in-circle' />
      </TooltipHost>
    ) : null}
    <Tooltip id='CountdownTimer.tooltip'>
      <FormattedMessage
        id='scenes.exchange.secondstep.expiry.tooltip1'
        defaultMessage='This rate will expire after {time}.'
        values={{ time: props.tooltipExpiryTime }}
      />
      <FormattedMessage
        id='scenes.exchange.secondstep.expiry.tooltip2'
        defaultMessage='If that happens please restart your trade.'
      />
    </Tooltip>
  </Wrapper>
)

CountdownTimer.propTypes = {
  timeLeft: PropTypes.string
}

CountdownTimer.defaultProps = {
  timeLeft: 'N/A'
}

export default CountdownTimer
