import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { store } from '@klonzo/common'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

const AppWithPickers = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>
)

ReactDOM.render(<AppWithPickers />, document.getElementById('root'))
