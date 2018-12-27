import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { Link, Icon, TooltipHost } from 'blockchain-info-components'

const rotation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const SpinningIcon = styled(Icon)`
  animation: ${({ rotating, animateTime }) =>
    rotating && `${rotation} ${animateTime}s linear`};
`

const RefreshIcon = ({ handleRefresh, rotating, animateTime }) => (
  <TooltipHost id='refresh.tooltip'>
    <Link
      size='14px'
      weight={300}
      color='white'
      uppercase
      onClick={handleRefresh}
      data-e2e='refreshLink'
    >
      <SpinningIcon
        name='refresh'
        size='16px'
        color='white'
        cursor
        rotating={rotating}
        animateTime={animateTime}
      />
    </Link>
  </TooltipHost>
)

RefreshIcon.propTypes = {
  handleRefresh: PropTypes.func.isRequired
}

export default RefreshIcon
