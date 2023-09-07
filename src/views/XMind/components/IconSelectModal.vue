<template>
  <div class="tiezhi-iconselect-modal">
    <div class="modal-title">
      <p>{{ typeName === 'tiezhi' ? '贴纸选择' : '标记选择' }} <em>双击插入标记</em></p>
      <i class="ri-close-line" @click="closeModal"></i>
    </div>
    <div class="content" v-if="typeName === 'tiezhi'">
      <div class="tiezhi-block">
        <div
          @dblclick="selectTiezhiIcon(item)"
          class="tiezhi-icon-item"
          v-for="item in tiezhiIcons"
          :key="item.icon">
          <svg aria-hidden="true" width="36" height="36">
            <use :xlink:href="`#${item.icon}`" />
          </svg>
        </div>
      </div>
    </div>
    <div class="content" v-if="typeName === 'mark'">
      <div class="mark-block" v-for="item in markIcons" :key="item.type">
        <p>{{ item.typeName }}</p>
        <div class="mark-list">
          <div
            @dblclick="selectTiezhiIcon({ ...itemName, type: item.type })"
            class="mark-icon-item"
            v-for="itemName in item.icons"
            :key="itemName.icon">
            <svg aria-hidden="true" width="28" height="28">
              <use :xlink:href="`#${itemName.icon}`" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { tiezhiIcons, markIcons } from '../config'
export default defineComponent({
  props: {
    typeName: {
      type: String,
      default: 'tiezhi'
    }
  },
  setup (_props, context) {
    function closeModal () {
      context.emit('close')
    }

    function selectTiezhiIcon (iconItem) {
      context.emit('select-tiezhi-icon', iconItem)
    }

    return {
      tiezhiIcons,
      markIcons,
      closeModal,
      selectTiezhiIcon
    }
  }
})
</script>

<style lang="less">
.tiezhi-iconselect-modal {
  position: fixed;
  top: 80px;
  right: 100px;
  background: #fff;
  width: 290px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 0px 18px 5px rgba(0,0,0,0.1);
  .modal-title {
    display: flex;
    height: 42px;
    border-bottom: 1px solid #f1f1f1;
    justify-content: space-between;
    padding: 0 12px;
    align-items: center;
    p {
      color: #000;
      font-size: 14px;
      font-weight: bold;
      em {
        font-size: 12px;
        color: #999;
        font-weight: normal;
        font-style: normal;
        transform: scale(.8);
        position: relative;
        left: -5px;
        top: 1px;
        display: inline-block;
      }
    }
    i {
      color: #999;
      cursor: url('~@/assets/images/pointer.png'), auto;
      font-size: 18px;
    }
  }
  .content {
    height: 560px;
    padding: 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .tiezhi-block {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      .tiezhi-icon-item {
        margin: 12px;
        cursor: url('~@/assets/images/pointer.png'), auto;
      }
    }
    .mark-block {
      margin-bottom: 12px;
      p {
        color: #4c4c4c;
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 8px;
        user-select: none;
      }
      .mark-list {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        .mark-icon-item {
          margin: 2px 5px;
          cursor: url('~@/assets/images/pointer.png'), auto;
        }
      }
    }
  }
}
</style>
