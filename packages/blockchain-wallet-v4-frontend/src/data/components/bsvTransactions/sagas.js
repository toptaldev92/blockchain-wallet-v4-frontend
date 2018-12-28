import { select, put } from 'redux-saga/effects'
import { equals, path, prop } from 'ramda'
import { actions, selectors } from 'data'

export default () => {
  const logLocation = 'components/bsvTransactions/sagas'

  const initialized = function*() {
    try {
      const defaultSource = 'all'
      const initialValues = {
        source: defaultSource,
        status: '',
        search: ''
      }
      yield put(actions.form.initialize('transactions', initialValues))
      yield put(actions.core.data.bsv.fetchTransactions('', true))
    } catch (e) {
      yield put(actions.logs.logErrorMessage(logLocation, 'initialized', e))
    }
  }

  const loadMore = function*() {
    try {
      const formValues = yield select(
        selectors.form.getFormValues('transactions')
      )
      const source = prop('source', formValues)
      const onlyShow = equals(source, 'all')
        ? ''
        : source.xpub || source.address
      yield put(actions.core.data.bsv.fetchTransactions(onlyShow, false))
    } catch (e) {
      yield put(actions.logs.logErrorMessage(logLocation, 'loadMore', e))
    }
  }

  const formChanged = function*(action) {
    try {
      const form = path(['meta', 'form'], action)
      const field = path(['meta', 'field'], action)
      const payload = prop('payload', action)
      if (!equals('transactions', form)) return

      switch (field) {
        case 'source':
          const onlyShow = equals(payload, 'all')
            ? ''
            : payload.xpub || payload.address
          yield put(actions.core.data.bsv.fetchTransactions(onlyShow, true))
      }
    } catch (e) {
      yield put(actions.logs.logErrorMessage(logLocation, 'formChanged', e))
    }
  }

  return {
    initialized,
    formChanged,
    loadMore
  }
}
