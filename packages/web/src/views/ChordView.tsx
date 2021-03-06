import {
  clearSearch,
  getCustodiansLoading,
  getEmailAsync,
  getEmailSentByCustodian,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import ChordECharts from '../components/ECharts/ChordECharts'
import ChordHighcharts from '../components/Highcharts/ChordHighcharts'

export default function ChordView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const emailSentByCustodian = useSelector(getEmailSentByCustodian)
  const custodiansLoading = useSelector(getCustodiansLoading)

  function handleClick(from: string, to: string) {
    if (!from || !to) return
    dispatch(clearSearch())
    dispatch(setFrom(from.slice(0, from.search(/,/))))
    dispatch(setTo(to.slice(0, to.search(/,/))))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LoadingIndicator />}
      {!custodiansLoading && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <ChordHighcharts
            title="Custodian Interaction"
            data={emailSentByCustodian.data}
            nodes={emailSentByCustodian.nodes}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <ChordECharts
            title="Custodian Interaction"
            data={emailSentByCustodian.data}
            nodes={emailSentByCustodian.nodes}
            handleClick={handleClick}
          />
        </div>
      )}
      <button
        hidden
        onClick={() => handleClick('foo', 'bar')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
