import './main.scss'
import React from 'react'
import App from './App.tsx'
import store from './store/store.ts'
import { App as AntdApp, ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { THEME_PROPS } from './utils/constants/theme/theme.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ReduxProvider store={store}>
        <ConfigProvider theme={THEME_PROPS}>
          <AntdApp
            message={{}}
            notification={{}}
          >
            <App />
          </AntdApp>
        </ConfigProvider>
      </ReduxProvider>
    </Router>
  </React.StrictMode>,
)
