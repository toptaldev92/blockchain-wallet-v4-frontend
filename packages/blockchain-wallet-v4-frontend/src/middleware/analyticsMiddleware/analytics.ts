import type { AnalyticsPayload } from 'middleware/analyticsMiddleware/types'
import { AnalyticsKey } from 'middleware/analyticsMiddleware/types'
import { generateUniqueUserId } from 'middleware/analyticsMiddleware/utils'
import { v4 } from 'uuid'

import queuevent from 'utils/queuevent'

const analytics = queuevent<AnalyticsKey, AnalyticsPayload>({
  queueCallback: async (rawEvents) => {
    const res = await fetch('/wallet-options-v4.json')
    const options = await res.json()

    const analyticsURL = `${options.domains.api}/events/publish`

    const id = rawEvents.find((event) => event.payload.id)?.payload.id

    const randomId = v4()

    const nabuId = rawEvents.find((event) => event.payload.nabuId)?.payload.nabuId || null

    const context = {
      traits: {
        nabu_id: nabuId
      }
    } as const

    const events = rawEvents.map((event) => {
      const name = event.key

      const { id, nabuId, originalTimestamp, type, ...properties } = event.payload

      return {
        id: generateUniqueUserId(id || randomId),
        nabuId,
        name,
        originalTimestamp,
        properties,
        type
      }
    })

    await fetch(analyticsURL, {
      body: JSON.stringify({
        context,
        events,
        id: generateUniqueUserId(id || randomId),
        platform: 'WALLET'
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  },
  queueName: 'analytics'
})

export default analytics
