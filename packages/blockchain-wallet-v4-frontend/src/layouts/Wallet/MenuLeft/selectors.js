import { createDeepEqualSelector } from 'services/ReselectHelper'
import { lift } from 'ramda'
import { selectors } from 'data'
import { STATUS } from 'react-joyride/lib'

export const getData = createDeepEqualSelector(
  [
    selectors.components.layoutWallet.getMenuOpened,
    selectors.components.layoutWallet.getLockboxOpened,
    selectors.components.onboarding.getWalletTourVisibility,
    selectors.auth.getFirstLogin,
    selectors.exchange.getCanTrade,
    selectors.router.getPathname,
    selectors.core.kvStore.lockbox.getDevices,
    selectors.core.kvStore.whatsNew.getHasSkippedTour,
    selectors.core.settings.getCountryCode,
    selectors.core.settings.getInvitations,
    selectors.core.walletOptions.getAdsBlacklist,
    selectors.core.walletOptions.getAdsUrl,
    selectors.modules.profile.getUserKYCState
  ],
  (
    menuOpened,
    lockboxOpened,
    walletTourVisibility,
    firstLogin,
    canTradeR,
    pathname,
    lockboxDevicesR,
    hasSkippedTourR,
    countryCodeR,
    invitationsR,
    adsBlacklistR,
    adsUrlR,
    userKYCState
  ) => {
    const transform = (canTrade, lockboxDevices, countryCode, invitations) => {
      return {
        adsBlacklist: adsBlacklistR.getOrElse([]),
        adsUrl: adsUrlR.getOrElse(''),
        canTrade,
        countryCode,
        hasRunWalletTour: walletTourVisibility === STATUS.FINISHED,
        hasSkippedTour: hasSkippedTourR.getOrElse(false),
        invitations,
        firstLogin,
        lockboxDevices,
        lockboxOpened,
        menuOpened,
        pathname,
        userKYCState: userKYCState.getOrElse(null)
      }
    }

    return lift(transform)(
      canTradeR,
      lockboxDevicesR,
      countryCodeR,
      invitationsR
    )
  }
)
