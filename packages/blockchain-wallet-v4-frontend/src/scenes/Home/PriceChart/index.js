import React from 'react'
import styled from 'styled-components'

import Chart from './Chart'
import CoinFilters from './CoinFilters'
import CoinCurrentPrice from './CoinCurrentPrice'
import TimeFilters from './TimeFilters'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 100%;
  height: 470px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme['gray-1']};
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const TitleRow = styled(Row)`
  display: flex;
  flex-direction: column;
`
const PriceChart = () => (
  <Wrapper>
    <TitleRow>
      <CoinFilters />
      <CoinCurrentPrice />
    </TitleRow>
    <Row>
      <Chart />
      <TimeFilters />
    </Row>
  </Wrapper>
)

export default PriceChart
