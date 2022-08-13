import './app.css'
import App from './App.svelte'

import { registerSW } from "virtual:pwa-register";

const app = new App({
  target: document.getElementById('app')
})

if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}

export default app
