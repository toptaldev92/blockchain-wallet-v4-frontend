import React from 'react'
import { filter } from 'ramda'
import styled from 'styled-components'
import AddressRow from '../../Btc/AddressRow'
import { FormattedMessage } from 'react-intl'
import { SettingDescription, SettingHeader } from 'components/Setting'
import {
  Icon,
  Table,
  TableHeader,
  TableCell,
  Text
} from 'blockchain-info-components'

const Wrapper = styled.section`
  box-sizing: border-box;
`
const ImportedAddressesSettingHeader = SettingHeader.extend`
  justify-content: flex-start;
  margin-top: 30px;
`
const WarningWrapper = styled.div`
  display: flex;
  .warning-icon {
    margin-right: 7px;
    float: left;
  }
`

const Success = props => {
  const { importedAddresses, search } = props

  const isMatch = address =>
    !search || address.addr.toLowerCase().indexOf(search) > -1

  const importedAddressesTableRows = filter(isMatch, importedAddresses).map(
    address => {
      return <AddressRow key={address.addr} address={address} coin='BSV' />
    }
  )

  return (
    <Wrapper>
      <ImportedAddressesSettingHeader>
        <FormattedMessage
          id='scenes.settings.addresses.bsv.importedaddresses.title'
          defaultMessage='Imported Bitcoin SV Addresses'
        />
      </ImportedAddressesSettingHeader>
      <SettingDescription>
        <WarningWrapper>
          <Icon
            name='alert-filled'
            size='22px'
            className={'warning-icon'}
            color='brand-yellow'
          />
          <FormattedMessage
            id='scenes.settings.addresses.bsv.importedaddresses.description'
            defaultMessage='Imported funds are not protected by your backup phrase. To ensure these funds are secured, please transfer them directly into your wallet.'
          />
        </WarningWrapper>
      </SettingDescription>
      {importedAddressesTableRows.length > 0 && (
        <Table>
          <TableHeader>
            <TableCell width='50%'>
              <Text size='13px' weight={500}>
                <FormattedMessage
                  id='scenes.settings.addresses.bsv.importedaddresses.address'
                  defaultMessage='Address'
                />
              </Text>
            </TableCell>
            <TableCell width='30%'>
              <Text size='13px' weight={500}>
                <FormattedMessage
                  id='scenes.settings.addresses.bsv.importedaddresses.balance'
                  defaultMessage='Balance'
                />
              </Text>
            </TableCell>
          </TableHeader>
          {importedAddressesTableRows}
        </Table>
      )}
    </Wrapper>
  )
}

export default Success
