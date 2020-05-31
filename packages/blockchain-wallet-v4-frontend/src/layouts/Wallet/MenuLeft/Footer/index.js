import { actions, model } from 'data'
import { bindActionCreators } from 'redux'
import { Button, Icon, Link, Text } from 'blockchain-info-components'
import { connect } from 'react-redux'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

const { ADS_EVENTS } = model.analytics

const Wrapper = styled.div`
  text-align: center;
`
const AdsButton = styled(Button)`
  width: 100%;
  margin: 4px auto;
  margin-top: 12px;
  transition: background 0.3s;
  line-height: normal;
  span > span:not(:first-child) {
    color: ${props => props.theme.blue600};
  }
  &:hover {
    span:first-child {
      color: ${props => props.theme.grey800};
    }
  }
`
const ButtonText = styled(Text)`
  display: flex;
  white-space: nowrap;
  align-items: center;
`
const ArrowIcon = styled(Icon)`
  margin-left: 4px;
  margin-top: 2px;
  font-size: 16px;
`

const Footer = ({ actions, countryCode }) => {
  if (countryCode === 'US') {
    return (
      <Wrapper>
        <Text color='grey400' size='12px' weight={500}>
          <FormattedMessage
            id='layouts.wallet.menuleft.footer.adtax'
            defaultMessage='Offer by LukkaTax'
          />
        </Text>
        <AdsButton
          height='48px'
          onClick={() => actions.logEvent(ADS_EVENTS.CLICK_AD_TAX)}
        >
          <Link
            href='https://diy.lukkatax.com/?referralCode=1blockchain'
            rel='noopener noreferrer'
            target='_blank'
          >
            <ButtonText color='grey500' size='14px' weight={500}>
              <span>💰</span>
              <FormattedHTMLMessage
                id='layouts.wallet.menuleft.footer.adtaxsave'
                defaultMessage='Save this tax season'
              />
              <ArrowIcon name='arrow-right' color='blue600' />
            </ButtonText>
          </Link>
        </AdsButton>
      </Wrapper>
    )
  } else {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.analytics, dispatch)
})

export default connect(null, mapDispatchToProps)(Footer)
