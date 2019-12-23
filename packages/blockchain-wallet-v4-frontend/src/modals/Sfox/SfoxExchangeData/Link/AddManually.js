import { Field } from 'redux-form'
import { Form, SelectBoxBankAccountType, TextBox } from 'components/Form'
import { FormattedMessage } from 'react-intl'
import { required } from 'services/FormHelper'
import { spacing } from 'services/StyleService'
import { Text } from 'blockchain-info-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 25px;
  button {
    margin-top: 20px;
  }
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  button {
    margin-top: 0px;
  }
`

class AddManually extends Component {
  render () {
    const {
      handleFullName,
      handleAccountNumber,
      handleRoutingNumber,
      handleAccountType
    } = this.props
    return (
      <Form>
        <Container>
          <InputContainer>
            <Text size='14px' weight={500} style={spacing('mb-10')}>
              <FormattedMessage
                id='sfoxexchangedata.link.addmanually.accountholdername'
                defaultMessage='Full Name of Primary Account Holder'
              />
            </Text>
            <Field
              name='fullName'
              component={TextBox}
              validate={[required]}
              onChange={e => handleFullName(e)}
              placeholder='John Doe'
            />
          </InputContainer>
          <InputContainer>
            <Text size='14px' weight={500} style={spacing('mb-10')}>
              <FormattedMessage
                id='sfoxexchangedata.link.addmanually.bankaccountinformation'
                defaultMessage='Bank Account Information'
              />
            </Text>
            {/* <CheckImage name='check-helper' /> */}
            <Field
              name='routingNumber'
              component={TextBox}
              validate={[required]}
              onChange={e => handleRoutingNumber(e)}
              placeholder='Routing Number'
            />
            <Field
              name='accountNumber'
              component={TextBox}
              validate={[required]}
              onChange={e => handleAccountNumber(e)}
              placeholder='Account Number'
            />
          </InputContainer>
          <InputContainer>
            <Text size='14px' weight={500} style={spacing('mb-10')}>
              <FormattedMessage
                id='sfoxexchangedata.link.addmanually.accounttype'
                defaultMessage='Account Type'
              />
            </Text>
            <Field
              name='type'
              component={SelectBoxBankAccountType}
              validate={[required]}
              onChange={(e, val) => handleAccountType(e, val)}
            />
          </InputContainer>
        </Container>
      </Form>
    )
  }
}

AddManually.propTypes = {
  handleFullName: PropTypes.func.isRequired,
  handleAccountNumber: PropTypes.func.isRequired,
  handleRoutingNumber: PropTypes.func.isRequired,
  handleAccountType: PropTypes.func.isRequired
}

export default AddManually
