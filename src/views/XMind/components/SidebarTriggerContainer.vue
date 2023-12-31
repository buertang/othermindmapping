<template>
  <div
    @contextmenu.stop
    :class="{ 'is-hidden': !visible }"
    class="sidebar-trigger-container">
    <div class="sidebar-trigger-title">
      <p>{{ modalTitle }}
        <a-popover placement="bottomRight" overlayClassName="edgestylemodal">
          <template #content>
            <div class="style-list">
              <div class="style-list-item"
                @click="updateEdgeStyle(item.value)"
                :class="{ active: currentEdgeStyle === item.value, disabled: structure === 'kht' }"
                v-for="item in edgeStyleList"
                :key="item.value">
                <img :src="item.img" alt="">
              </div>
            </div>
          </template>
          <a-button
            v-show="currentId === 'jiegou'"
            type="link"
            size="small">分支样式</a-button>
        </a-popover>
      </p>
      <i class="ri-close-fill" @click="closeModal"></i>
    </div>
    <div class="sidebar-trigger-content">
      <NodeStyleSet
        v-show="currentId === 'style'"
        :isRoot="!currentSubject?.parent"
        :subjectStyle="subjectStyle" />
      <div class="theme-modal" v-show="currentId === 'zhuti'">
        <div
          @click="updateTheme(item.theme)"
          :class="{ active: currentTheme === item.theme }"
          class="theme-modal-item"
          v-for="item in themes"
          :key="item.theme">
          <img :src="item.img" alt="theme">
        </div>
      </div>
      <div class="structure-modal" v-show="currentId === 'jiegou'">
        <div
          @click="updateStructure(item.structure)"
          :class="{ active: currentStructure === item.structure }"
          class="structure-modal-item"
          v-for="item in structures"
          :key="item.structure">
          <img :src="item.img" alt="structure">
        </div>
      </div>
      <div class="shortcut-modal" v-show="currentId === 'kuaijiejian'">
        <div
          v-for="(item, index) in shortcuts"
          :key="index"
          class="shortcut-modal-item">
          <i :class="item.icon"></i>
          <p>{{ item.name }}</p>
          <span>{{ item.keyname }}</span>
        </div>
      </div>
    </div>
    <div class="sidebar-trigger-menu">
      <div
        v-for="item in triggerMenu"
        :key="item.id"
        @click="updateMenuModal(item.id, item.disabled)"
        :class="{ active: currentId === item.id, disabled: item.disabled }"
        class="sidebar-trigger-menu-item">
        <i :class="item.icon"></i>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from '../utils'
import NodeStyleSet from './NodeStyleSet.vue'
import { ref, defineComponent, computed, watch } from 'vue'

export default defineComponent({
  components: { NodeStyleSet },
  props: {
    theme: String,
    structure: String,
    edgeStyle: String,
    currentSubject: {
      type: Object,
      default: () => null
    }
  },
  setup (props, context) {
    const visible = ref(false)
    const currentId = ref(null)
    const currentTheme = ref(props.theme)
    const currentStructure = ref(props.structure)
    const currentEdgeStyle = ref(null)
    const triggerMenu = [
      { name: '样式', id: 'style', icon: 'ri-quill-pen-line' },
      { name: '主题', id: 'zhuti', icon: 'ri-t-shirt-line' },
      { name: '结构', id: 'jiegou', icon: 'ri-node-tree' },
      { name: '快捷键', id: 'kuaijiejian', icon: 'ri-keyboard-box-line' },
      { name: '问题反馈', id: 'wentifankui', icon: 'ri-feedback-line' }
    ]
    const themes = [
      { name: '彩虹色系', theme: 'primary', img: require('@/assets/images/xmind/primary.png') },
      { name: '简约系', theme: 'simplicity', img: require('@/assets/images/xmind/simplicity.png') },
      { name: '蓝黑基础版', theme: 'blueBlackBasic', img: require('@/assets/images/xmind/blueBlackBasic.png') },
      { name: '卡通版', theme: 'cartoon', img: require('@/assets/images/xmind/cartoon.png') },
      { name: '深紫色系', theme: 'deepPurple', img: require('@/assets/images/xmind/deepPurple.png') },
      { name: '黑色单色', theme: 'singleBlack', img: require('@/assets/images/xmind/singleBlack.png') },
      { name: '浅蓝色系', theme: 'lightBlue', img: require('@/assets/images/xmind/lightBlue.png') }
    ]

    const structures = [
      { name: '逻辑结构图', structure: 'ljjgt', img: require('@/assets/images/xmind/ljjgt.svg') },
      { name: '思维导图', structure: 'swdt', img: require('@/assets/images/xmind/swdt.svg') },
      { name: '组织架构图', structure: 'zzjgt', img: require('@/assets/images/xmind/zzjgt.svg') },
      { name: '括号图', structure: 'kht', img: require('@/assets/images/xmind/kht.svg') }
    ]

    const shortcuts = [
      { name: '插入同级主题', icon: 'ri-flow-chart', keyname: 'Enter' },
      { name: '插入子主题', icon: 'ri-node-tree', keyname: 'Tab' },
      { name: '上移主题', icon: 'ri-arrow-up-line', keyname: 'Ctrl + ↑' },
      { name: '下移主题', icon: 'ri-arrow-down-line', keyname: 'Ctrl + ↓' },
      { name: '剪切主题', icon: 'ri-scissors-cut-line', keyname: 'Ctrl + X' },
      { name: '拷贝主题', icon: 'ri-copyright-line', keyname: 'Ctrl + C' },
      { name: '编辑主题', icon: 'ri-translate-2', keyname: '左键双击' },
      { name: '粘贴主题', icon: 'ri-file-copy-2-line', keyname: 'Ctrl + V' },
      { name: '删除主题', icon: 'ri-delete-bin-4-line', keyname: 'Delete' },
      { name: '删除概要', icon: 'ri-delete-column', keyname: 'Delete' },
      { name: '画布回退', icon: 'ri-reply-line', keyname: 'Ctrl + Z' },
      { name: '画布前进', icon: 'ri-share-forward-line', keyname: 'Ctrl + Y' },
      { name: '全选主题', icon: 'ri-checkbox-multiple-line', keyname: 'Ctrl + A' },
      { name: '选中状态切换', icon: 'ri-checkbox-indeterminate-line', keyname: 'Atrl + 左键' },
      { name: '多选主题', icon: 'ri-check-double-line', keyname: '左键 + 拖动' },
      { name: '平移画布', icon: 'ri-drag-move-line', keyname: 'Ctrl + 左键' },
      { name: '缩放画布', icon: 'ri-fullscreen-exit-line', keyname: 'Ctrl + 鼠标滚动' }
    ]

    const edgeStyleList = [
      { img: require('@/assets/images/xmind/1.png'), value: '1' },
      { img: require('@/assets/images/xmind/2.png'), value: '2' },
      { img: require('@/assets/images/xmind/3.png'), value: '3' },
      { img: require('@/assets/images/xmind/4.png'), value: '4' }
    ]

    const modalTitle = computed(() => {
      return triggerMenu.find(o => o.id === currentId.value)?.name
    })

    const subjectStyle = computed(() => {
      if (props.currentSubject) {
        const c = props.currentSubject.style
        const { lineStyle, margin, textStyle } = c
        return {
          fontFamily: textStyle.fontFamily || "黑体, SimHei, 'Heiti SC'",
          fontSize: textStyle.fontSize,
          fontWeight: textStyle.fontWeight || 'normal',
          fontStyle: textStyle.fontStyle || 'normal',
          textDecoration: textStyle.textDecoration || 'none',
          textDirection: textStyle.textDirection || 'hor',
          align: textStyle.align || 'left',
          textColor: textStyle.color,
          strokeColor: c.stroke,
          strokeStyle: c.strokeStyle || 'solid',
          strokeWidth: c.strokeWidth,
          borderRadius: isEmpty(c.rx) ? 4 : c.rx,
          backgroundColor: c.fill,
          lineStyle: lineStyle.dot || 'solid',
          lineWidth: lineStyle.lineWidth,
          lineColor: lineStyle.fill,
          verticalInner: margin._t,
          horizontalInner: margin._l,
          horizontalOutter: isEmpty(c.spacing) ? 22 : c.spacing
        }
      }
      return null
    })

    function updateTheme (theme) {
      if (currentTheme.value === theme) return
      currentTheme.value = theme
      context.emit('update-theme', theme)
    }

    function updateStructure (structure) {
      const prevStructure = currentStructure.value
      if (prevStructure === structure) return
      currentStructure.value = structure
      context.emit('update-structure', structure, prevStructure)
    }

    function updateMenuModal (id, disabled) {
      if (id === 'wentifankui') {
        return window.open('https://gimi.zdxblog.cn/feedback')
      }
      if (currentId.value === id || disabled) return
      visible.value = true
      currentId.value = id
    }

    function updateEdgeStyle (value) {
      if (value === currentEdgeStyle.value || currentStructure.value === 'kht') return
      context.emit('update-edge-style', value)
    }

    function closeModal () {
      visible.value = false
      currentId.value = null
    }

    watch(() => props.edgeStyle, newVal => {
      currentEdgeStyle.value = newVal
    }, { immediate: true, deep: true })

    return {
      currentTheme,
      currentStructure,
      currentEdgeStyle,
      visible,
      currentId,
      triggerMenu,
      themes,
      structures,
      shortcuts,
      edgeStyleList,
      modalTitle,
      subjectStyle,
      updateTheme,
      updateStructure,
      closeModal,
      updateMenuModal,
      updateEdgeStyle
    }
  }
})
</script>

<style lang="less">
.sidebar-trigger-container {
  position: fixed;
  height: 85vh;
  width: 320px;
  bottom: 0;
  right: 0;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
  flex-direction: column;
  transition: .2s;
  z-index: 99;
  &.is-hidden {
    transform: translateX(320px);
  }
  .sidebar-trigger-title {
    height: 42px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    align-items: center;
    padding: 0 12px;
    p {
      color: #000;
      font-size: 14px;
      span {
        font-size: 12px;
        color: #096bda;
        font-family: 'fangzhengheiti';
        cursor: pointer;
      }
    }
    i {
      color: #4c4c4c;
      font-size: 18px;
      cursor: url('~@/assets/images/pointer.png'), auto;
    }
  }
  .sidebar-trigger-content {
    height: 0;
    flex: 1;
    overflow-y: scroll;
    padding: 12px 20px;
    &::-webkit-scrollbar {
      display: none;
    }
    .theme-modal, .structure-modal {
      &-item {
        cursor: url('~@/assets/images/pointer.png'), auto;
        margin-top: 20px;
        transition: .2s;
        overflow: hidden;
        border: 2px solid transparent;
        border-radius: 4px;
        &:hover {
          box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
        }
        &.active {
          box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
          border: 2px solid #0caef6;
        }
        img {
          display: block;
          width: 80%;
          margin: 12px auto;
        }
        &.theme-modal {
          &-item {
            width: 49%;
          }
        }
      }
      &.theme-modal {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
    .shortcut-modal {
      &-item {
        display: flex;
        height: 38px;
        align-items: center;
        p {
          flex: 1;
          color: #4c4c4c;
          font-size: 12px;
        }
        i {
          font-size: 18px;
          margin-right: 8px;
        }
        span {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
  .sidebar-trigger-menu {
    position: absolute;
    bottom: 240px;
    left: 0;
    transform: translateX(-115%);
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
    padding: 12px;
    &-item {
      text-align: center;
      cursor: url('~@/assets/images/pointer.png'), auto;
      color: #4c4c4c;
      user-select: none;
      i {
        font-size: 16px;
      }
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      p {
        font-size: 12px;
      }
      &.active {
        color: #409eff;
      }
      &.disabled {
        opacity: .6;
        cursor: not-allowed;
      }
    }
  }
}
.edgestylemodal {
  width: 170px;
  .style-list {
    display: flex;
    flex-wrap: wrap;
    &-item {
      margin: 6px;
      cursor: url('~@/assets/images/pointer.png'), auto;
      padding: 8px;
      transition: .3s;
      &:hover {
        box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
      }
      &.active {
        box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
      }
      &.disabled {
        cursor: not-allowed;
        box-shadow: none;
      }
      img {
        display: block;
        width: 18px;
      }
    }
  }
}
</style>
