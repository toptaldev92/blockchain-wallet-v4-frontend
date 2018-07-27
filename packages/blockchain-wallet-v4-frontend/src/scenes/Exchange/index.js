import React from 'react'
import styled from 'styled-components'

import media from 'services/ResponsiveService'

import KYCBanner from 'components/IdentityVerification/KYCBanner'
import Shapeshift from './Shapeshift'
import Info from './Info'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  @media (min-width: 992px) {
    flex-direction: row;
  }

  ${media.mobile`
    align-items: center;
    padding: 10px;
  `};
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`
const ColumnLeft = styled(Column)`
  align-items: flex-end;
  margin-right: 10px;
  & > :first-child {
    margin-bottom: 10px;
  }
  @media (min-width: 992px) {
    width: 60%;
  }

  ${media.mobile`
    margin-right: 0;
  `};
`
const ColumnRight = styled(Column)`
  padding: 0;
  margin-bottom: 10px;
  box-sizing: border-box;
  @media (min-width: 992px) {
    width: 40%;
  }
`
const Exchange = () => (
  <Wrapper>
    <KYCBanner outsideOfProfile={true} />
    <Container>
      <ColumnLeft>
        <Shapeshift />
      </ColumnLeft>
      <ColumnRight>
        <Info />
      </ColumnRight>
    </Container>
  </Wrapper>
)

export default Exchange
