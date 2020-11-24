import React from 'react'
import styled from 'styled-components'

import { BlockchainLoader } from 'blockchain-info-components'

interface Props {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const Loading: React.FC<Props> = () => {
  return (
    <Wrapper>
      <BlockchainLoader width='80px' height='80px' />
    </Wrapper>
  )
}

export default Loading
