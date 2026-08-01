import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import { AppRouterProvider } from './app/app-router-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouterProvider />
  </React.StrictMode>

)
