import {
  blackBackground,
  clearSearch,
  getCustodians,
  getCustodiansLoading,
  getDarkMode,
  getEmailAsync,
  getEmailReceivers,
  getEmailSenders,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import ChartPicker from '../components/ChartPicker'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import XmitTypePicker from '../components/XmitTypePicker'

export default function TreeMapView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
  })

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={custodiansLoading}
        color={darkMode ? 'white' : 'black'}
        textContent={'Loading...'}
      />
      {custodians && (
        <>
          {chartLib === 'ECharts' && (
            <>
              {isSenders && (
                <TreeMapECharts
                  title="Senders"
                  search="from"
                  data={emailSenders}
                  handleClick={handleClick}
                />
              )}
              {!isSenders && (
                <TreeMapECharts
                  title="Receivers"
                  search="to"
                  data={emailReceivers}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
        </>
      )}
      <XmitTypePicker onChange={(value) => setIsSenders(value === 'Senders')} />
      <ChartPicker
        onChange={(value) => setChartLib(value)}
        chartNames={['ECharts']}
      />
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => handleClick('from', 'foo')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
