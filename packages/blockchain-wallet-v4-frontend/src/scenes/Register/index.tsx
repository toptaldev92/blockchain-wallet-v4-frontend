import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { find, propEq } from 'ramda'
import { formValueSelector } from 'redux-form'
import React from 'react'

import { actions, selectors } from 'data'
import { GoalsType } from 'data/goals/types'
import { RootState } from 'data/rootReducer'

import Register from './template'

class RegisterContainer extends React.PureComponent<PropsType, StateType> {
  state = {
    showForm: false
  }

  onSubmit = () => {
    const { authActions, email, password, language } = this.props
    authActions.register(email, password, language)
  }

  toggleForm = () => {
    this.setState({ showForm: true })
  }

  render () {
    const { data, goals, password, search } = this.props
    let busy = data.cata({
      Success: () => false,
      Failure: () => false,
      Loading: () => true,
      NotAsked: () => false
    })

    const passwordLength = (password && password.length) || 0
    const showWalletFormQuery = search.includes('showWallet')
    const isLinkAccountGoal = !!find(propEq('name', 'linkAccount'), goals)
    const isSimpleBuyGoal = !!find(propEq('name', 'simpleBuy'), goals)

    return (
      <Register
        busy={busy}
        isLinkAccountGoal={isLinkAccountGoal}
        isSimpleBuyGoal={isSimpleBuyGoal}
        onSubmit={this.onSubmit}
        password={password}
        passwordLength={passwordLength}
        showForm={this.state.showForm || showWalletFormQuery}
        toggleForm={this.toggleForm}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: selectors.auth.getRegistering(state),
  domainsR: selectors.core.walletOptions.getDomains(state),
  language: selectors.preferences.getLanguage(state),
  email: formValueSelector('register')(state, 'email'),
  goals: selectors.goals.getGoals(state),
  password: formValueSelector('register')(state, 'password') || '',
  pathname: selectors.router.getPathname(state),
  search: selectors.router.getSearch(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  alertActions: bindActionCreators(actions.alerts, dispatch),
  authActions: bindActionCreators(actions.auth, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type LinkStatePropsType = {
  data: any
  domainsR: any
  email: string
  goals: Array<{ data: any; id: string; name: GoalsType }>
  language: string
  password: string
  pathname: string
  search: string
}

type StateType = {
  showForm: boolean
}

export type PropsType = ConnectedProps<typeof connector>

export default connector(RegisterContainer)
