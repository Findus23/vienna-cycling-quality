import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {initMatomo, matomo} from "./matomo.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
initMatomo()
if (matomo) {
    matomo.customURL = window.location.protocol + '//' +
        window.location.hostname + "/"
    matomo.trackPageview()
}
