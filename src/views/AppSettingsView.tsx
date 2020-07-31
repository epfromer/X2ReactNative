import { Button, Spinner, Text } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import ColorPickerDlg from '../components/ColorPickerDlg'
import { saveAppSettings, setReduxState } from '../store/'
import { Contact, RootState } from '../store/types'

export default function AppSettingsView() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const [colorPickerDefault, setColorPickerDefault] = useState('')
  const [colorPickerItem, setColorPickerItem] = useState('')
  const [colorPickerDlgOpen, setColorPickerDlgOpen] = useState(false)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )

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
      marginLeft: 15,
      marginRight: 15,
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
    if (colorPickerItem === 'themePrimaryColor') {
      setReduxState('themePrimaryColor', color)
      saveAppSettings()
    }
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
            small
            style={{ backgroundColor: contact.color, width: 100 } as any}
            onPress={() => chooseColor(contact.name, contact.color)}
          >
            <Text>&nbsp;</Text>
          </Button>
        </View>
      </View>
    </View>
  )

  return (
    <>
      <AppHeader title="Settings" />
      <SafeAreaView style={styles.container}>
        <ColorPickerDlg
          open={colorPickerDlgOpen}
          defaultColor={colorPickerDefault}
          onClose={handleColorChosen}
        />
        <ScrollView>
          <Text style={styles.title}>Colors</Text>
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.text}>Primary Interface</Text>
            </View>
            <View>
              <Button
                small
                style={
                  { backgroundColor: themePrimaryColor, width: 100 } as any
                }
                onPress={() =>
                  chooseColor('themePrimaryColor', themePrimaryColor)
                }
              >
                <Text>&nbsp;</Text>
              </Button>
            </View>
          </View>
          {contactsLoading && (
            <View style={styles.loading}>
              <Spinner color={themePrimaryColor} />
            </View>
          )}
          {contacts && contacts.map((contact) => renderContact(contact))}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}