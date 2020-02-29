import { FlyoutWrapper } from 'components/Flyout'
import { LinkDispatchPropsType, OwnProps, SuccessStateType } from '.'
import ActionButton from './ActionButton'
import Header from './Header'
import Info from './Info'
import React from 'react'
import styled from 'styled-components'
import Summary from './Summary'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export type Props = OwnProps & SuccessStateType & LinkDispatchPropsType

const Success: React.FC<Props> = props => {
  // debugging
  // props.loan.status = 'PENDING_CLOSE'
  // props.loan.collateralisationRatio = 1.3

  if (!props.offer) return null

  return (
    <Wrapper>
      <FlyoutWrapper>
        <Header {...props} />
        <Info {...props} />
        <Summary {...props} />
      </FlyoutWrapper>
      <FlyoutWrapper style={{ paddingTop: '0px' }}>
        <ActionButton {...props} />
      </FlyoutWrapper>
    </Wrapper>
  )
}

export default Success
