import { FiatType } from 'core/types'

// State
export type PreferencesState = {
  coinDisplayed: boolean
  culture: string
  language: string
  sbFiatCurrency: undefined | FiatType
  showAirdropClaimModal: boolean
  showBackupReminder: boolean
  showInterestInfoBox: boolean
  showKycCompleted: boolean
  showKycGetStarted: boolean
  showLockboxSoftwareDownload: boolean
  showNoneOrGoldBanner: boolean
  showSwapBanner: boolean
  showSwapUpgradeModal: boolean
  showUpgradeForStxAirdropModal: boolean
  theme: string
  totalBalancesDropdown: {
    lockbox: boolean
    pending: boolean
    wallet: boolean
    watchOnly: boolean
  }
}
