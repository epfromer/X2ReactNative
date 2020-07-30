import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import PrimaryColorPicker from '../components/PrimaryColorPicker'
import { RootState } from '../store/types'
import { saveAppSettings, setReduxState } from '../store/'

export default function AppSettingsView() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    picker: {
      height: 200,
    },
    title: {
      fontSize: 15,
      paddingTop: 5,
      paddingLeft: 15,
      color: darkMode ? 'white' : 'black',
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

  const saveSetting = (setting: string, value: string | number | boolean) => {
    setReduxState(setting, value)
    saveAppSettings()
  }

  return (
    <>
      <AppHeader title="Settings" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Interface Color</Text>
          <View style={styles.picker}>
            <PrimaryColorPicker
              defaultColor={themePrimaryColor}
              onChange={(color: string) =>
                saveSetting('themePrimaryColor', color)
              }
            />
          </View>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
          <Text style={styles.title}>text</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
