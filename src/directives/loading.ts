import { RendererElement, DirectiveBinding } from 'vue'
const loadSvg = require('@/assets/images/loading.svg')
const loadingDirective = {
  beforeMount (el: RendererElement, binding: DirectiveBinding): void {
    el.style.position = 'relative'
    const loadingWrap = document.createElement('div')
    loadingWrap.className = 'loading-fallback'
    el.loadingWrap = loadingWrap
    el.appendChild(loadingWrap)
    toggleLoading(el, binding)
  },

  updated (el: RendererElement, binding: DirectiveBinding): void {
    toggleLoading(el, binding)
  },

  unmounted (el: RendererElement): void {
    el.loadingWrap && el.removeChild(el.loadingWrap)
  }
}

const toggleLoading = (el: RendererElement, binding: DirectiveBinding): void => {
  const loadingWrap = el.loadingWrap
  if (binding.value) {
    loadingWrap.innerHTML = `<div class="inner"><img src=${loadSvg} /></div>`
    loadingWrap.style.display = 'block'
  } else {
    loadingWrap.innerHTML = ''
    loadingWrap.style.display = 'none'
  }
}

export default loadingDirective
