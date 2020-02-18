import { actions, model, selectors } from 'data'
import { bindActionCreators, compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { LoanType, OfferType } from 'core/types'
import { RootState } from 'data/rootReducer'
import AddCollateral from './AddCollateral'
import BorrowDetails from './BorrowDetails'
import BorrowForm from './BorrowForm'
import EndBorrowForm from './EndBorrowForm'
import Flyout, { duration, FlyoutChild } from 'components/Flyout'
import modalEnhancer from 'providers/ModalEnhancer'
import React, { PureComponent } from 'react'

const { BORROW_STEPS } = model.components.borrow

type LinkStatePropsType =
  | {
      offer: OfferType
      step: 'CHECKOUT'
    }
  | {
      loan: LoanType
      offer: OfferType
      step: 'DETAILS' | 'ADD_COLLATERAL' | 'END_BORROW'
    }

type LinkDispatchPropsType = {
  borrowActions: typeof actions.components.borrow
}
export type OwnProps = {
  close: () => void
  position: number
  total: number
  userClickedOutside: boolean
}

type Props = OwnProps & LinkDispatchPropsType & LinkStatePropsType

type State = { direction: 'left' | 'right'; show: boolean }

class Borrow extends PureComponent<Props, State> {
  state: State = { show: false, direction: 'left' }

  componentDidMount () {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
  }

  componentDidUpdate (prevProps) {
    if (this.props.step === prevProps.step) return
    if (BORROW_STEPS[this.props.step] > BORROW_STEPS[prevProps.step]) {
      /* eslint-disable */
      this.setState({ direction: 'left' })
    } else {
      this.setState({ direction: 'right' })
      /* eslint-enable */
    }
  }

  handleClose = () => {
    this.setState({ show: false })
    setTimeout(this.props.close, duration)
  }

  render () {
    const { position, total } = this.props
    return (
      <Flyout
        position={position}
        in={this.state.show}
        direction={this.state.direction}
        userClickedOutside={this.props.userClickedOutside}
        onClose={this.handleClose}
        data-e2e='borrowModal'
        total={total}
      >
        {this.props.step === 'CHECKOUT' && (
          <FlyoutChild>
            <BorrowForm {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'DETAILS' && (
          <FlyoutChild>
            <BorrowDetails {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'ADD_COLLATERAL' && (
          <FlyoutChild>
            <AddCollateral {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
        {this.props.step === 'END_BORROW' && (
          <FlyoutChild>
            <EndBorrowForm {...this.props} handleClose={this.handleClose} />
          </FlyoutChild>
        )}
      </Flyout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  loan: selectors.components.borrow.getLoan(state),
  offer: selectors.components.borrow.getOffer(state),
  step: selectors.components.borrow.getStep(state)
})

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  borrowActions: bindActionCreators(actions.components.borrow, dispatch)
})

const enhance = compose<any>(
  modalEnhancer('BORROW_MODAL', { transition: duration }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(Borrow)
