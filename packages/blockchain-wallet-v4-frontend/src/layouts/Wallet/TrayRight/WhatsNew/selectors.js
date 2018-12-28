import { filterAnnouncements } from 'services/WhatsNewService/WhatsNewContent'
import { selectors } from 'data'
import moment from 'moment'

export const getData = state => {
  const lastViewed = selectors.core.kvStore.whatsNew
    .getLastViewed(state)
    .getOrElse(
      moment()
        .subtract(2, 'months')
        .unix()
    )
  const userCountry = selectors.core.settings
    .getCountryCode(state)
    .getOrElse(null)
  const userKycState = selectors.modules.profile
    .getUserKYCState(state)
    .getOrElse(null)

  return {
    latestAnnouncements: filterAnnouncements(
      lastViewed,
      userCountry,
      userKycState
    )
  }
}
