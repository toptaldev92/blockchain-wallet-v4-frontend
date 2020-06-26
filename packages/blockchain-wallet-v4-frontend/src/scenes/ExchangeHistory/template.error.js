import { Text } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`

export default props => (
  <Wrapper>
    <Text size='12px' weight={400} color='red600'>
      {props.children}
    </Text>
  </Wrapper>
)
