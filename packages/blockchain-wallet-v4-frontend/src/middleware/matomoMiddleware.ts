import { equals, includes, path, prop } from 'ramda'

import { StepActionsPayload } from 'data/types'

const PAYLOAD = ['payload']
const NAME = ['payload', 'name']
const TYPE = ['payload', 'type']
const PROPS = ['payload', 'props']
const FORM = ['meta', 'form']
const FIELD = ['meta', 'field']
const LOCATION = ['payload', 'location', 'pathname']
const _ERROR = ['payload', '_error']

const WhitelistActionTypesEnum = {
  '@@redux-form/CHANGE': '@@redux-form/CHANGE',
  '@@redux-form/INITIALIZE': '@@redux-form/INITIALIZE',
  '@@redux-form/SET_SUBMIT_SUCCEEDED': '@@redux-form/SET_SUBMIT_SUCCEEDED',
  '@@redux-form/STOP_SUBMIT': '@@redux-form/STOP_SUBMIT',
  '@@redux-form/START_SUBMIT': '@@redux-form/START_SUBMIT',
  '@@router/LOCATION_CHANGE': '@@router/LOCATION_CHANGE',
  '@CORE.SET_ACCOUNT_ARCHIVED': '@CORE.SET_ACCOUNT_ARCHIVED',
  '@CORE.SET_ACCOUNT_LABEL': '@CORE.SET_ACCOUNT_LABEL',
  '@CORE.SET_DEFAULT_ACCOUNT': '@CORE.SET_DEFAULT_ACCOUNT',
  '@CORE.SET_EMAIL_VERIFIED': '@CORE.SET_EMAIL_VERIFIED',
  '@EVENT.KYC.INITIALIZE_VERIFICATION': '@EVENT.KYC.INITIALIZE_VERIFICATION',
  '@EVENT.KYC.UPDATE_EMAIL': '@EVENT.KYC.UPDATE_EMAIL',
  '@EVENT.BORROW.SET_STEP': '@EVENT.BORROW.SET_STEP',
  '@EVENT.SET_SB_STEP': '@EVENT.SET_SB_STEP',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SHOW_MODAL: 'SHOW_MODAL'
}

type WhitelistActions = keyof typeof WhitelistActionTypesEnum

// keep alphabetized
const TYPE_WHITELIST = Object.keys(WhitelistActionTypesEnum)

const EVENT_ACTION_BLACKLIST = ['ShowXPub']

const formatEvent = x => (typeof x !== 'string' ? JSON.stringify(x) : x)

const sanitizeEvent = (
  nextCategory: WhitelistActions,
  nextAction,
  nextName
) => {
  switch (nextCategory) {
    case '@@router/LOCATION_CHANGE':
      return [nextCategory, formatEvent(nextAction.split('/')[1])]
    case '@EVENT.KYC.UPDATE_EMAIL':
      return [nextCategory]
    case '@EVENT.SET_SB_STEP':
      const sbAction = nextAction as StepActionsPayload
      switch (sbAction.step) {
        case 'ORDER_SUMMARY':
        case 'CHECKOUT_CONFIRM':
          return [
            nextCategory,
            formatEvent({
              step: sbAction.step,
              inputCurrency: sbAction.order.inputCurrency,
              outputCurrency: sbAction.order.outputCurrency,
              paymentType: sbAction.order.paymentType
            })
          ]
        default:
          return [nextCategory, formatEvent(sbAction.step)]
      }
    default:
      return [nextCategory, formatEvent(nextAction), formatEvent(nextName)]
  }
}

let lastEvent = []

const matomoMiddleware = () => () => next => action => {
  try {
    const nextCategory: WhitelistActions = prop('type', action)
    const nextAction: string | undefined =
      path(FORM, action) ||
      path(NAME, action) ||
      path(TYPE, action) ||
      path(LOCATION, action) ||
      path(PAYLOAD, action)
    const nextName =
      path(FIELD, action) || path(_ERROR, action) || path(PROPS, action)
    const logEvent = includes(action.type, TYPE_WHITELIST)
    const nextEvent = sanitizeEvent(nextCategory, nextAction, nextName)

    if (
      logEvent &&
      !equals(nextEvent, lastEvent) &&
      !includes(nextAction, EVENT_ACTION_BLACKLIST)
    ) {
      // console.info('EVENT', nextEvent) // uncomment to assist with debugging
      const frame = document.getElementById('matomo-iframe')
      frame &&
        // @ts-ignore
        frame.contentWindow &&
        // @ts-ignore
        frame.contentWindow.postMessage(
          {
            method: 'trackEvent',
            messageData: nextEvent
          },
          '*'
        )

      // @ts-ignore
      lastEvent = nextEvent
    }
  } catch (e) {
    /* eslint-disable-next-line */
    console.log(e)
  }

  return next(action)
}

export default matomoMiddleware
