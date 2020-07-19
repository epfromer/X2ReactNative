import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import PieECharts from '../components/ECharts/PieECharts'
import { fetchAndCache, getEmailReceivers, getEmailSenders } from './../store'
import { RootState } from './../store/types'

// https://docs.nativebase.io/Components.html#picker-def-headref

export default function PieView() {
  const dispatch = useDispatch()
  const [isSenders, setIsSenders] = useState(true)
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  const emailReceivers = useSelector((state: RootState) =>
    getEmailReceivers(state)
  )
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  function handleClick(search: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: search,
      value: `(${value})`,
    })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  function handleSendersReceivers(value: string) {
    setIsSenders(value === 'Senders')
  }

  return (
    <>
      <AppHeader title="Pie" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && <Spinner color={themePrimaryColor} />}
        {contacts && isSenders && (
          <PieECharts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
        )}
        {contacts && !isSenders && (
          <PieECharts
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
        )}
        <Form>
          <Picker
            note
            mode="dropdown"
            selectedValue={isSenders ? 'Senders' : 'Receivers'}
            onValueChange={handleSendersReceivers}
          >
            <Picker.Item label="Senders" value="Senders" />
            <Picker.Item label="Receivers" value="Receivers" />
          </Picker>
        </Form>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
