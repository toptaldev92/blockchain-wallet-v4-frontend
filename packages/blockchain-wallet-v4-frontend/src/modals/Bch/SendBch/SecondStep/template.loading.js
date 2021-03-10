import React from 'react'
import { SkeletonRectangle } from 'blockchain-info-components'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 470px;
  box-sizing: border-box;
`

export default props => {
  return (
    <Wrapper>
      <SkeletonRectangle height='20px' width='30%' />
      <SkeletonRectangle
        height='40px'
        width='100%'
        style={{ 'margin-top': '15px' }}
      />
      <SkeletonRectangle
        height='20px'
        width='30%'
        style={{ 'margin-top': '30px' }}
      />
      <SkeletonRectangle
        height='40px'
        width='100%'
        style={{ 'margin-top': '15px' }}
      />
      <SkeletonRectangle
        height='20px'
        width='30%'
        style={{ 'margin-top': '15px' }}
      />
      <SkeletonRectangle
        height='40px'
        width='100%'
        style={{ 'margin-top': '15px' }}
      />
      <SkeletonRectangle
        height='80px'
        width='100%'
        style={{ 'margin-top': '40px' }}
      />
    </Wrapper>
  )
}
