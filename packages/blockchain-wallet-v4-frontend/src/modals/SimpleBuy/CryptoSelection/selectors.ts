import { ExtractSuccess } from 'core/types'
import { lift } from 'ramda'
import { SBCheckoutFormValuesType } from 'data/types'
import { selectors } from 'data'

export const getData = state => {
  const eligibilityR = selectors.components.simpleBuy.getSBFiatEligible(state)
  const formValues = selectors.form.getFormValues('simpleBuyCheckout')(
    state
  ) as SBCheckoutFormValuesType
  const invitationsR = selectors.core.settings.getInvitations(state)
  const pairsR = selectors.components.simpleBuy.getSBPairs(state)
  const userDataR = selectors.modules.profile.getUserData(state)
  const emailVerifiedR = selectors.core.settings.getEmailVerified(state)

  return lift(
    (
      eligibility: ExtractSuccess<typeof eligibilityR>,
      invitations: ExtractSuccess<typeof invitationsR>,
      pairs: ExtractSuccess<typeof pairsR>,
      userData: ExtractSuccess<typeof userDataR>,
      emailVerified: ExtractSuccess<typeof emailVerifiedR>
    ) => ({
      orderType: formValues ? formValues.orderType : 'BUY',
      eligibility,
      invitations,
      pairs,
      userData,
      emailVerified
    })
  )(eligibilityR, invitationsR, pairsR, userDataR, emailVerifiedR)
}
