import { Box } from '../AirdropInfo'
import { CampaignInfoType, TagsType } from 'data/types'
import { Icon, Text } from 'blockchain-info-components'
import { KycStatesType } from 'data/components/identityVerification/types'
import { LinkDispatchPropsType } from '..'
import { StxDateOrAmount, StxFooterCta, StxHeader, StxInfo, StxStatus } from './model'
import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  align-items: center;
`
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 26px;
  min-height: 50px;
  > div {
    width: 50%;
  }
`

export type Props = {
  userCampaignsInfoResponseList: Array<CampaignInfoType>,
  kycState: KycStatesType,
  tags: TagsType
}

const StxAirdrop = (props: Props & LinkDispatchPropsType) => {
  const stxCampaign = props.userCampaignsInfoResponseList.find(
    (campaign: CampaignInfoType) => campaign.campaignName === 'BLOCKSTACK'
  )

  if (!stxCampaign) return null

  return (
    <Box>
      <div>
        <Header>
          <Icon name='stx' color='stx' size='32px' />
          <Text
            size='20px'
            color='grey800'
            weight={600}
            style={{ marginLeft: '16px' }}
          >
            <StxHeader stxCampaign={stxCampaign} />
          </Text>
        </Header>

        <StxInfo stxCampaign={stxCampaign} />
        <StatusContainer>
          <div>
            <StxStatus {...props} />
          </div>
          <StxDateOrAmount stxCampaign={stxCampaign} />
        </StatusContainer>
        <div style={{ marginTop: '26px' }}>
          <StxFooterCta {...props} />
        </div>
      </div>
    </Box>
  )
}

export default StxAirdrop
