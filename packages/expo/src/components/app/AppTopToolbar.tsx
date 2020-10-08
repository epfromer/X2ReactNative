import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Header, Icon, ThemeContext } from 'react-native-elements'
import { useHistory, useLocation } from 'react-router-native'
import { routeNames } from '../../router/RouteSwitch'

export default function AppTopToolbar() {
  const location = useLocation()
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    header: {
      color: 'white',
      fontSize: 20,
    },
    button: {
      backgroundColor: theme.Header.containerStyle.backgroundColor,
    },
  })

  const GoBackIconButton = () => (
    <Button
      onPress={() => history.goBack()}
      buttonStyle={styles.button}
      icon={<Icon name="navigate-before" size={25} color="white" />}
    />
  )

  const HomeIconButton = () => (
    <Button
      onPress={() => history.push('/')}
      buttonStyle={styles.button}
      icon={<Icon name="home" size={25} color="white" />}
    />
  )

  // console.log(location.pathname)

  return (
    <Header
      placement="center"
      leftComponent={<GoBackIconButton />}
      centerComponent={{
        text: routeNames[location.pathname],
        style: styles.header,
      }}
      rightComponent={<HomeIconButton />}
    />
  )
}
