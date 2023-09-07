import { defineStore, createPinia } from 'pinia'

const pinia = createPinia()

export const xmindMap = defineStore('XMindMap', {
  state: () => ({
    openThumb: Boolean(Number(localStorage.getItem('openThumb'))),
    readOnly: Boolean(Number(localStorage.getItem('readOnly'))),
    immersion: false
  })
})

export default pinia
