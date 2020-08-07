import { Picker } from '@react-native-community/picker'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import BarECharts from '../components/ECharts/BarECharts'
import BarVictory from '../components/Victory/BarVictory'
import { RootState } from '../store/types'
import { clearSearch, fetchAndCache, setReduxState } from './../store/actions'
import { getEmailReceivers, getEmailSenders } from './../store/selectors'

// https://docs.nativebase.io/Components.html#picker-def-headref

interface Props {
  route: any
  navigation: any
}
export default function BarView({ navigation }: Props) {
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  const emailReceivers = useSelector((state: RootState) =>
    getEmailReceivers(state)
  )

  function handleClick(key: string, value: string) {
    clearSearch()
    setReduxState(key, `(${value})`)
    fetchAndCache('emails')
    navigation.navigate('SearchView')
  }

  return (
    <>
      <AppHeader title="Bar" />
      <SafeAreaView style={styles.container}>
        <Spinner visible={contactsLoading} textContent={'Loading...'} />
        {contacts && (
          <>
            {chartLib === 'ECharts' && (
              <>
                {isSenders && (
                  <BarECharts
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <BarECharts
                    title="Receivers"
                    search="to"
                    data={emailReceivers}
                    handleClick={handleClick}
                  />
                )}
              </>
            )}
            {chartLib === 'Victory' && (
              <>
                {isSenders && (
                  <BarVictory
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <BarVictory
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
        <Picker
          selectedValue={isSenders ? 'Senders' : 'Receivers'}
          onValueChange={(value) => setIsSenders(value === 'Senders')}
          style={styles.picker}
        >
          <Picker.Item label="Senders" value="Senders" />
          <Picker.Item label="Receivers" value="Receivers" />
        </Picker>
        <Picker
          selectedValue={chartLib}
          onValueChange={(value: string) => setChartLib(value)}
          style={styles.picker}
        >
          <Picker.Item label="ECharts" value="ECharts" />
          <Picker.Item label="Victory" value="Victory" />
        </Picker>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 150,
  },
})