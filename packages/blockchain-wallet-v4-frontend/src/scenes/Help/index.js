import { Button, Link, Text, TextGroup } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'
import { LinkContainer } from 'react-router-bootstrap'
import { Wrapper } from 'components/Public'
import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`
const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &:first-child {
    margin: 10px 16px 10px 0px;
  }
  > div:first-child {
    margin-bottom: 5px;
  }
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
  > div:last-child {
    margin-top: 18px;
  }
`

const Help = props => {
  return (
    <Wrapper>
      <Header>
        <Text size='20px' color='blue900' weight={600} capitalize>
          <FormattedMessage
            id='scenes.help.needsomehelp'
            defaultMessage='Need some help?'
          />
        </Text>
      </Header>
      <Row>
        <Left>
          <Text size='14px' color='gray-6' weight={600}>
            <FormattedMessage
              id='scenes.help.lostguid'
              defaultMessage="Don't know your Wallet ID?"
            />
          </Text>
          <Text size='12px' color='gray-6' weight={400}>
            <FormattedMessage
              id='scenes.help.lostguidrecover'
              defaultMessage='We can send you a reminder email right now.'
            />
          </Text>
        </Left>
        <Right>
          <LinkContainer to='/reminder'>
            <Button nature='light'>
              <FormattedMessage
                id='scenes.help.remind'
                defaultMessage='Remind Me'
              />
            </Button>
          </LinkContainer>
        </Right>
      </Row>
      <Row>
        <Left>
          <Text size='14px' color='gray-6' weight={600}>
            <FormattedMessage
              id='scenes.help.forgotpassword'
              defaultMessage='Forgot your password?'
            />
          </Text>
          <Text size='12px' color='gray-6' weight={400}>
            <FormattedMessage
              id='scenes.help.password.explain'
              defaultMessage='Use your 12 word recovery phrase to access your Wallet.'
            />
          </Text>
        </Left>
        <Right>
          <LinkContainer to='/recover'>
            <Button nature='light'>
              <FormattedMessage
                id='scenes.help.recover'
                defaultMessage='Recover Funds'
              />
            </Button>
          </LinkContainer>
        </Right>
      </Row>
      <Row>
        <Left>
          <Text size='14px' color='gray-6' weight={600}>
            <FormattedMessage
              id='scenes.help.2falost'
              defaultMessage='Lost your 2FA device?'
            />
          </Text>
          <Text size='12px' color='gray-6' weight={400}>
            <FormattedMessage
              id='scenes.help.2fa.lostexplain'
              defaultMessage='Reset your 2FA right now to gain access to your Wallet.'
            />
          </Text>
        </Left>
        <Right>
          <LinkContainer to='/reset-2fa'>
            <Button nature='light'>
              <FormattedMessage
                id='scenes.help.reset'
                defaultMessage='Reset 2FA'
              />
            </Button>
          </LinkContainer>
        </Right>
      </Row>
      <Footer>
        <LinkContainer to='/login'>
          <Button nature='primary' height='56px' fullWidth>
            <Text size='16px' color='white' weight={500}>
              <FormattedMessage
                id='scenes.help.back'
                defaultMessage='Go Back'
              />
            </Text>
          </Button>
        </LinkContainer>
        <TextGroup inline>
          <Text size='13px' color='gray-6' weight={500}>
            <FormattedMessage
              id='scenes.help.contact.stillneedhelp'
              defaultMessage='Still need help?'
            />
          </Text>
          <Link
            href='https://support.blockchain.com/'
            target='_blank'
            size='13px'
            weight={500}
          >
            <FormattedMessage
              id='scenes.help.contact'
              defaultMessage='Contact Support'
            />
          </Link>
        </TextGroup>
      </Footer>
    </Wrapper>
  )
}

export default Help
