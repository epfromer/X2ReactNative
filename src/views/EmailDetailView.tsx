import {
  Spinner,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Header,
  Title,
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Highlighter from 'react-native-highlight-words'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { getEmailById } from '../store'
import { REACT_APP_EMAIL_SERVER } from '../store/env'
import { Email, RootState } from '../store/types'

interface Props {
  route: any
  navigation: any
}
export default function EmailDetailView({ route, navigation }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const [loading, setLoading] = useState(false)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = useSelector((state: RootState) =>
    getEmailById(state, route.params.id)
  )
  const allText = useSelector((state: RootState) => state.allText)
  const to = useSelector((state: RootState) => state.to)
  const from = useSelector((state: RootState) => state.from)
  const subject = useSelector((state: RootState) => state.subject)
  const body = useSelector((state: RootState) => state.body)
  const highlightedTerms: Array<string> = []
  if (allText) highlightedTerms.push(allText)
  if (to) highlightedTerms.push(to)
  if (from) highlightedTerms.push(from)
  if (subject) highlightedTerms.push(subject)
  if (body) highlightedTerms.push(body)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    emailHeader: {
      height: 30,
    },
    title: {
      fontSize: 20,
      padding: 10,
      color: darkMode ? 'white' : 'black',
    },
    fields: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'normal',
      color: darkMode ? 'white' : 'black',
    },
    fieldBold: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    body: {
      fontSize: 15,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
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

  function doFetch() {
    setLoading(true)
    const url = `${REACT_APP_EMAIL_SERVER}/email/${route.params.id}`
    console.log(url)
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setEmail(json))
      .catch((err) => console.error('fetch error', err))
      .then(() => setLoading(false))
  }

  useEffect(() => {
    cachedEmail ? setEmail(cachedEmail) : doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedEmail])

  function highlight(str: string) {
    let s = str
    if (!s) return ''
    return (
      <Highlighter
        highlightStyle={{ backgroundColor: 'yellow' } as any}
        searchWords={highlightedTerms}
        textToHighlight={str}
      />
    )
  }

  function EmailHeader() {
    return (
      <View style={styles.emailHeader}>
        <Grid>
          <Row>
            <Col>
              <Button transparent onPress={() => console.log('foo')}>
                <Icon type="MaterialIcons" name="brightness-7" />
              </Button>
            </Col>
            <Col>
              <Button transparent onPress={() => console.log('foo')}>
                <Icon type="MaterialIcons" name="brightness-7" />
              </Button>
            </Col>
          </Row>
        </Grid>
      </View>
    )
  }

  return (
    <>
      <AppHeader title="Email Detail" />
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
        {email && (
          <View>
            <EmailHeader />
            <ScrollView>
              <Text style={styles.title}>{highlight(email.subject)}</Text>
              <Text style={styles.fieldBold}>
                Sent: <Text style={styles.fields}>{email.sent}</Text>
              </Text>
              {email.fromContact ? (
                <Text style={styles.fieldBold}>
                  From:{' '}
                  <Text style={styles.fields}>{highlight(email.from)}</Text>{' '}
                  (named contact:{' '}
                  <Text style={styles.fields}>{email.fromContact}</Text>)
                </Text>
              ) : (
                <Text style={styles.fieldBold}>
                  From:{' '}
                  <Text style={styles.fields}>{highlight(email.from)}</Text>
                </Text>
              )}
              {email.toContact ? (
                <Text style={styles.fieldBold}>
                  To: <Text style={styles.fields}>{highlight(email.to)}</Text>{' '}
                  (named contact:{' '}
                  <Text style={styles.fields}>{email.toContact}</Text>)
                </Text>
              ) : (
                <Text style={styles.fieldBold}>
                  To: <Text style={styles.fields}>{highlight(email.to)}</Text>
                </Text>
              )}
              <Text style={styles.fieldBold}>
                CC: <Text style={styles.fields}>{highlight(email.cc)}</Text>
              </Text>
              <Text style={styles.fieldBold}>
                BCC: <Text style={styles.fields}>{highlight(email.bcc)}</Text>
              </Text>
              <Text style={styles.body}>{highlight(email.body)}</Text>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </>
  )
}
