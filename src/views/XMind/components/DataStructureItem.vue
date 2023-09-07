<template>
  <div class="data-structure">
    <div
      class="data-structure-item"
      v-for="item in dataList"
      :key="item._id">
      <div
        class="subject-item"
        :style="{ paddingLeft: `${depth * 20 + 12}px` }"
        :class="{ root: depth === 0, fc: depth === 1 }">
        <i
          @click="toggleExpand(item._id)"
          class="ri-arrow-right-s-fill"
          :class="{ 'is-leaf': !item.children || !item.children.length, 'is-leaf-noexpand': noExpands.includes(item._id) }"></i>
        <div class="subject-item-right">
          <img v-if="item.imageInfo" :src="item.imageInfo.url" alt="">
          <svg
            v-if="item.tiezhi"
            aria-hidden="true"
            width="42"
            height="42">
            <use :xlink:href="`#${item.tiezhi}`" />
          </svg>
          <div class="text-modal">
            <div class="svg-icon-block">
              <div
                v-for="(itemName, idx) in item.marks"
                :style="{ left: `${idx * 12}px` }"
                :key="itemName.icon">
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16">
                  <use :xlink:href="`#${itemName.icon}`" />
                </svg>
              </div>
            </div>
            <div class="name-block"
              :style="{ 'padding-left': `${item.marks?.length * 12 + 8}px` }">
              <p :title="item.text">{{ item.text || '--' }}</p>
              <a
                v-if="item.link"
                :href="item.link"
                :title="item.link"
                target="blank"
                class="ri-send-plane-line"></a>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="{ 'item-children-noexpand': noExpands.includes(item._id) }"
        v-if="item.children && item.children.length"
        class="data-structure-item-children">
        <DataStructure
          :depth="depth + 1"
          :dataList="item.children" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'DataStructure',
  props: {
    dataList: Array,
    depth: Number
  },
  setup () {
    const noExpands = ref([])
    function toggleExpand (id) {
      const idx = noExpands.value.findIndex(k => k === id)
      if (idx === -1) {
        noExpands.value.push(id)
      } else {
        noExpands.value.splice(idx, 1)
      }
    }

    return {
      noExpands,
      toggleExpand
    }
  }
})
</script>

<style lang="less">
.data-structure {
  &-item {
    .subject-item {
      font-size: 14px;
      color:#4c4c4c;
      padding: 10px 6px 10px 0;
      cursor: default;
      display: flex;
      align-items: center;
      &:hover {
        background: #f5f5f5;
      }
      & > i {
        cursor: url('~@/assets/images/pointer.png'), auto;
        margin-right: 5px;
        transform: rotate(90deg);
        &.is-leaf {
          opacity: 0;
          pointer-events: none;
        }
        &.is-leaf-noexpand {
          transform: rotate(0);
        }
      }
      &-right {
        flex: 1;
        width: 0;
        img {
          display: block;
          width: 60px;
          margin-bottom: 6px;
        }
        .text-modal {
          display: flex;
          align-items: center;
          .svg-icon-block {
            height: 16px;
            position: relative;
            div {
              position: absolute;
              top: 0;
              background: #fff;
              border-radius: 50%;
              overflow: hidden;
              svg {
                display: block;
              }
            }
          }
          .name-block {
            flex: 1;
            width: 0;
            display: flex;
            align-items: center;
            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            a {
              position: relative;
              top: 0px;
              margin-left: 8px;
              color: #4c4c4c;
            }
          }
        }
      }
    }
    .data-structure-item-children {
      &.item-children-noexpand {
        display: none;
      }
    }
  }
}
</style>
