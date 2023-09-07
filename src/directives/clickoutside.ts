import { RendererElement, VNode, DirectiveBinding } from 'vue'
interface BindingInterface extends DirectiveBinding {
  expression?: any,
  instance: any
}

interface EventInterface extends Event {
  path?: Array<unknown>
}

function validate (binding: BindingInterface) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }
  return true
}

function isPopup (popupItem: RendererElement, elements: RendererElement) {
  if (!popupItem || !elements) { return false }
  for (let i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true
      }
      if (elements[i].contains(popupItem)) {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}

function isServer (vNode: any) {
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer
}

export default {
  beforeMount: function (el: RendererElement, binding: BindingInterface, vNode: VNode): void {
    if (!validate(binding)) return
    function handler (e: EventInterface) {
      if (!binding.instance) return
      const elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)
      if (el.contains(e.target) || isPopup(binding.instance.popupItem, elements)) return
      el.__vueClickOutside__.callback(e)
    }

    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    }
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
    !isServer(vNode) && document.addEventListener(clickHandler, handler)
  },

  updated: function (el: RendererElement, binding: BindingInterface): void {
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value
  },

  unmounted: function (el: RendererElement, binding: DirectiveBinding, vNode: VNode): void {
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
    !isServer(vNode) && el.__vueClickOutside__ && document.removeEventListener(clickHandler, el.__vueClickOutside__.handler)
    delete el.__vueClickOutside__
  }
}
