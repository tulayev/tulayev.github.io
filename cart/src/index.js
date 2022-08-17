import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './stores/store'
import { Provider } from 'react-redux' 
import './assets/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)