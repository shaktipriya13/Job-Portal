import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// BrowserRouter enables the functionality of routing
import { Provider } from 'react-redux'
import store from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  // state managemnt comes first then routing and then componnts
  // redux only understands store,so it is imp. to give
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
