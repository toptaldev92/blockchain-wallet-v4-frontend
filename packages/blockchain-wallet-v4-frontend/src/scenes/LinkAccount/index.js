import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Image, Text } from 'blockchain-info-components'
import { Wrapper } from 'components/Public'
import media from 'services/ResponsiveService'

const InfoWrapper = styled(Wrapper)`
  width: 360px;
  height: 100%;
  margin-right: 16px;
  padding: 0px;
`
const InnerWrapper = styled.div`
  padding: 40px;
  ${media.mobile`
    padding: 20px;
  `}
`
const Footer = styled(InnerWrapper)`
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid ${props => props.theme['grey100']};
  > div {
    margin-left: 8px;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ListHeader = styled(Text)`
  font-size: 14px;
  margin-top: 20px;
  font-weight: 500;
`
const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 0px;
  margin-top: 8px;
`
const ListItem = styled.li`
  margin-top: 8px;
`

const PitLogo = styled(Image)`
  margin-right: 16px;
`

const LinkAccount = () => {
  return (
    <InfoWrapper>
      <InnerWrapper>
        <Header>
          <Text size='20px' color='brand-primary' weight={700}>
            <FormattedMessage
              id='scenes.linkaccount.authorize'
              defaultMessage='Authorize The PIT to connect to your Blockchain Wallet'
            />
          </Text>
        </Header>
        <ListHeader color='green500'>
          <FormattedMessage
            id='scenes.linkaccount.pit_will_be_able_to'
            defaultMessage='The PIT will be able to:'
          />
        </ListHeader>
        <List>
          <ListItem>
            <Text weight={500} color='gray-6' size='14px'>
              <FormattedMessage
                id='scenes.linkaccount.share_levels2'
                defaultMessage='Share your Gold or Silver status'
              />
            </Text>
          </ListItem>
          <ListItem>
            <Text weight={500} color='gray-6' size='14px'>
              <FormattedMessage
                id='scenes.linkaccount.share_addresses'
                defaultMessage='Exchange crypto addresses so you don’t have to copy and paste'
              />
            </Text>
          </ListItem>
        </List>
        <ListHeader color='red500'>
          <FormattedMessage
            id='scenes.linkaccount.pit_will_not_be_able_to'
            defaultMessage='The PIT will not be able to:'
          />
        </ListHeader>
        <List>
          <ListItem>
            <Text weight={500} color='gray-6' size='14px'>
              <FormattedMessage
                id='scenes.linkaccount.view_pw'
                defaultMessage='View your Wallet password, recovery phrase, or private keys'
              />
            </Text>
          </ListItem>
        </List>
      </InnerWrapper>
      <Footer>
        <PitLogo name='the-pit-logo' height='42px' />
        <div>
          <Text size='20px' color='brand-primary' weight={600}>
            The PIT
          </Text>
          <Text
            weight={500}
            color='gray-6'
            size='12px'
            style={{ marginTop: '4px' }}
          >
            <FormattedMessage
              id='scenes.linkaccount.by_blockchain'
              defaultMessage='Brought to you by Blockchain'
            />
          </Text>
        </div>
      </Footer>
    </InfoWrapper>
  )
}

export default LinkAccount
