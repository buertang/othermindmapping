<template>
  <div class="tiezhi-iconselect-modal">
    <div class="modal-title">
      <div class="ul-type">
        <span
          @click="typeName = 'mark'"
          :class="{ active: typeName === 'mark' }">
          <i class="ri-star-smile-line"></i>
        </span>
        <span
          @click="typeName = 'tiezhi'"
          :class="{ active: typeName === 'tiezhi' }">
          <i class="ri-landscape-line"></i>
        </span>
        <em>双击插入</em>
      </div>
      <i class="ri-close-line" @click="closeModal"></i>
    </div>

    <div class="content" v-if="typeName === 'tiezhi'">
      <div class="image-marker-list">
        <div
          class="image-marker-list-item"
          v-for="item in imageMarkers"
          :key="item.name">
          <p>{{ item.name }}</p>
          <div class="list-item_value">
            <div
              v-for="itemName in item.children"
              :key="itemName.src"
              class="image-marker"
              @dblclick="selectTiezhiIcon(itemName.src)">
              <img :src="itemName.src" alt="">
            </div>
          </div>
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
            <svg aria-hidden="true" width="24" height="24">
              <use :xlink:href="`#${itemName.icon}`" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { imageMarkers, markIcons } from '../config'
export default defineComponent({
  setup (_props, context) {
    const typeName = ref('mark')

    function closeModal () {
      context.emit('close')
    }

    function selectTiezhiIcon (iconItem) {
      context.emit('select-tiezhi-icon', iconItem)
    }

    return {
      typeName,
      imageMarkers,
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
    i {
      color: #999;
      cursor: url('~@/assets/images/pointer.png'), auto;
      font-size: 18px;
    }
    .ul-type {
      span {
        display: inline-block;
        padding: 0 20px;
        line-height: 22px;
        border-radius: 4px;
        margin-right: 12px;
        &.active {
          background-color: rgb(242,242,242);
        }
        cursor: pointer;
        i {
          color: #000;
          text-align: center;
          font-size: 16px;
          position: relative;
          top: 2px;
        }
      }
      em {
        font-size: 12px;
        color: #999;
        font-weight: normal;
        font-style: normal;
        transform: scale(.8);
        position: relative;
        left: -5px;
        top: 4px;
        display: inline-block;
        letter-spacing: 1px;
      }
    }
  }
  .content {
    height: 560px;
    padding: 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .image-marker-list {
      &-item {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        p {
          font-size: 13px;
          color: #1D1F20;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .list-item_value {
          display: flex;
          flex-wrap: wrap;
          .image-marker {
            width: 20%;
            border-radius: 4px;
            margin-top: 6px;
            &:hover {
              background: rgb(242,242,242);
            }
            img {
              height: 42px;
              display: block;
              margin: 0 auto;
              cursor: url('~@/assets/images/pointer.png'), auto;
            }
          }
        }
      }
    }
    .mark-block {
      margin-bottom: 12px;
      p {
        color: #1D1F20;
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 8px;
        user-select: none;
      }
      .mark-list {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        .mark-icon-item {
          margin: 2px 4px;
          cursor: url('~@/assets/images/pointer.png'), auto;
        }
      }
    }
  }
}
</style>
