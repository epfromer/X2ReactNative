import {
  Contact,
  emailServer,
  getContactsAsync,
  selectContacts,
  selectContactsLoading,
  selectDarkMode,
  setDarkMode,
} from '@klonzo/common'
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import ColorPickerDlg from '../components/ColorPickerDlg'

export default function AppSettingsView() {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [colorPickerDefault, setColorPickerDefault] = useState('')
  const [colorPickerItem, setColorPickerItem] = useState('')
  const [colorPickerDlgOpen, setColorPickerDlgOpen] = useState(false)
  const contactsLoading = useSelector(selectContactsLoading)
  const contacts = useSelector(selectContacts)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contactContainer: {
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      paddingTop: 5,
      paddingLeft: 15,
      color: darkMode ? 'white' : 'black',
    },
    text: {
      marginTop: 5,
      color: darkMode ? 'white' : 'black',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
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
  })

  const handleColorChosen = (color: string) => {
    setColorPickerDlgOpen(false)
    const url = `${emailServer}/contacts/${colorPickerItem}`
    const payload = {
      method: 'PUT',
      body: JSON.stringify({ color }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, payload)
      .then(() => getContactsAsync())
      .catch((error) => console.error('AppSettingsView', error))
  }

  const chooseColor = (item: string, defaultColor: string) => {
    setColorPickerItem(item)
    setColorPickerDefault(defaultColor)
    setColorPickerDlgOpen(true)
  }

  const renderContact = (contact: Contact) => (
    <View style={styles.contactContainer} key={contact._id}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.text}>{contact.name}</Text>
        </View>
        <View>
          <Button
            buttonStyle={
              { backgroundColor: contact.color, width: 100, height: 30 } as any
            }
            onPress={() => chooseColor(contact._id, contact.color)}
            testID={contact._id}
          />
        </View>
      </View>
    </View>
  )

  const DarkModeSwitch = () => (
    <View style={styles.itemRow}>
      <Text style={styles.text}>Dark mode {darkMode ? 'on' : 'off'}</Text>
      <Switch
        value={darkMode}
        onValueChange={() => dispatch(setDarkMode(darkMode ? false : true))}
      />
    </View>
  )

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ColorPickerDlg
          open={colorPickerDlgOpen}
          defaultColor={colorPickerDefault}
          onClose={handleColorChosen}
          onCancel={() => setColorPickerDlgOpen(false)}
        />
        <ScrollView>
          <DarkModeSwitch />
          <Spinner visible={contactsLoading} textContent={'Loading...'} />
          {contacts && contacts.map((contact) => renderContact(contact))}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
