<template>
  <div ref="xmindContext" class="xmind-context-menu">
    <ul>
      <li
        @click="contextMenuClick(item)"
        :class="{
          'x_disabled': item.disabled,
          'x_warning': item.warning,
          'has-child': item.children?.length
        }"
        v-for="item in contextMenus"
        :key="item.operate">
          <p>
            {{ item.name }}
            <span>{{ item.shortKey }}</span>
            <i v-if="item.children?.length" class="ri-arrow-right-s-fill"></i>
          </p>
          <ul class="ul-item-children" v-if="item.children?.length">
            <li
              @click="contextMenuClick(itemName)"
              :class="{
                'x_disabled': itemName.disabled,
                'x_warning': itemName.warning
              }"
              v-for="itemName in item.children"
              :key="itemName.operate">
              <p>{{ itemName.name }} <span>{{ itemName.shortKey }}</span></p>
            </li>
          </ul>
        </li>
    </ul>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    node: {
      type: Object,
      default: () => {
        return {}
      }
    },
    batchNodes: {
      type: Array,
      default: () => []
    },
    copyNode: {
      type: Object,
      default: () => null
    },
    copyStyle: {
      type: Object,
      default: () => null
    },
    type: String
  },
  setup (props, context) {
    const xmindContext = ref(null)
    const contextMenus = computed(() => {
      if (props.type === 'single') {
        return [
          {
            name: '插入',
            children: [
              {
                name: '标记',
                disabled: false,
                operate: 'insert-biaoji'
              },
              {
                name: '贴纸',
                disabled: false,
                operate: 'insert-tiezhi'
              },
              {
                name: '图片',
                disabled: false,
                operate: 'insert-tupian'
              },
              {
                name: '标签',
                disabled: false,
                operate: 'insert-tag'
              },
              {
                name: '备注',
                disabled: false,
                operate: 'insert-beizhu'
              },
              {
                name: '超链接',
                disabled: false,
                operate: 'insert-link'
              },
              {
                name: '同级主题',
                disabled: !props.node.parent,
                operate: 'insert-brother',
                shortKey: 'Enter'
              },
              {
                name: '子主题',
                disabled: false,
                operate: 'insert-child',
                shortKey: 'Tab'
              }
            ]
          },
          {
            name: '上移',
            disabled: !props.node.parent,
            operate: 'up',
            shortKey: 'Ctrl + ↑'
          },
          {
            name: '下移',
            disabled: !props.node.parent,
            operate: 'down',
            shortKey: 'Ctrl + ↓'
          },
          {
            name: '剪切',
            disabled: !props.node.parent,
            operate: 'cut',
            shortKey: 'Ctrl + X'
          },
          {
            name: '拷贝',
            disabled: false,
            operate: 'copy',
            shortKey: 'Ctrl + C'
          },
          {
            name: '样式复制',
            disabled: false,
            operate: 'copy-style'
          },
          {
            name: '引用样式',
            disabled: !props.copyStyle,
            operate: 'reference-style'
          },
          {
            name: '粘贴',
            disabled: !props.copyNode,
            operate: 'past',
            shortKey: 'Ctrl + V'
          },
          {
            name: '删除',
            children: [
              {
                name: '贴纸',
                disabled: !props.node.data.tiezhi,
                operate: 'delete-tiezhi',
                warning: true
              },
              {
                name: '图片',
                disabled: !props.node.data.imageInfo,
                operate: 'delete-pic',
                warning: true
              },
              {
                name: '超链接',
                disabled: !props.node.data.link,
                operate: 'delete-link',
                warning: true
              },
              {
                name: '概要',
                disabled: !props.node.data.summary,
                operate: 'delete-summary',
                warning: true
              },
              {
                name: '节点',
                disabled: !props.node.parent,
                operate: 'delete',
                warning: true,
                shortKey: 'Delete'
              }
            ]
          },
          {
            name: '收起子主题',
            disabled: !(props.node.children && props.node.children.length),
            operate: 'no-expand'
          },
          {
            name: '清空子主题',
            disabled: !(props.node.children && props.node.children.length),
            operate: 'clear-children',
            warning: true,
            visible: ['single']
          }
        ]
      } else {
        return [
          {
            name: '插入',
            children: [
              {
                name: '同级主题',
                disabled: !props.batchNodes.length,
                operate: 'insert-brother',
                shortKey: 'Enter'
              },
              {
                name: '子主题',
                disabled: !props.batchNodes.length,
                operate: 'insert-child',
                shortKey: 'Tab'
              },
              {
                name: '贴纸',
                disabled: !props.batchNodes.length,
                operate: 'insert-tiezhi'
              }
            ]
          },
          {
            name: '删除',
            children: [
              {
                name: '主题',
                disabled: !props.batchNodes.length,
                operate: 'delete',
                warning: true,
                shortKey: 'Delete'
              },
              {
                name: '贴纸',
                disabled: !props.batchNodes.length,
                operate: 'delete-tiezhi',
                warning: true
              },
              {
                name: '图片',
                disabled: !props.batchNodes.length,
                operate: 'delete-pic',
                warning: true
              },
              {
                name: '超链接',
                disabled: !props.batchNodes.length,
                operate: 'delete-link',
                warning: true
              },
              {
                name: '概要',
                disabled: !props.batchNodes.length,
                operate: 'delete-summary',
                warning: true
              }
            ]
          },
          {
            name: '引用样式',
            disabled: !props.batchNodes.length || !props.copyStyle,
            operate: 'reference-style'
          },
          {
            name: '收起所有',
            disabled: false,
            operate: 'noexpand-all'
          },
          {
            name: '展开所有',
            disabled: false,
            operate: 'expand-all'
          },
          {
            name: '画布局中',
            disbaled: false,
            operate: 'canvas-center'
          }
        ]
      }
    })

    function contextMenuClick (menuItem) {
      if (menuItem.disabled || menuItem.children?.length) return
      context.emit('context-click', menuItem.operate, props.type)
    }

    return {
      contextMenus,
      xmindContext,
      contextMenuClick
    }
  }
})
</script>

<style lang="less" scoped>
.xmind-context-menu {
  position: fixed;
  z-index: 999;
  box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
  padding: 12px 0;
  border-radius: 2px;
  background: #fff;
  ul {
    li {
      height: 36px;
      width: 180px;
      position: relative;
      user-select: none;
      &.has-child {
        &::after {
          content: "";
          width: 5px;
          height: 100%;
          position: absolute;
          top: 0;
          right: -5px;
          background: transparent;
        }
      }
      &:hover {
        .ul-item-children {
          display: block;
        }
      }
      p {
        height: 100%;
        white-space: nowrap;
        color: #000;
        padding: 0 18px;
        font-size: 12px;
        cursor: url('~@/assets/images/pointer.png'), auto;
        letter-spacing: 0.5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: #999;
          font-size: 12px;
        }
        .ri-arrow-right-s-fill {
          font-size: 16px;
          color: #4c4c4c;
        }
      }
      &:hover {
        background: #f5f5f5;
      }
      &.x_disabled {
        opacity: .5;
        cursor: not-allowed;
      }
      &.x_warning {
        p {
          color: #cd1c1c;
        }
      }
    }
    &.ul-item-children {
      position: absolute;
      right: -5px;
      top: 0;
      transform: translateX(100%);
      box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
      padding: 6px 0;
      border-radius: 2px;
      background: #fff;
      display: none;
      li {
        height: 30px;
        width: 150px;
        position: relative;
      }
    }
  }
}
</style>
