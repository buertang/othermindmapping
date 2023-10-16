<template>
  <div class="nodestyleset-modal">
    <el-config-provider :locale="zhCn">
      <!-- 节点样式设置 -->
      <div v-show="subjectStyle">
        <div class="style-block">
          <p class="set-title">文字</p>
          <div class="modal">
            <p>字体</p>
            <a-select
              @change="handlerUpdateStyle($event, 'fontFamily')"
              v-model:value="fontFamily"
              size="middle"
              placeholder="请选择"
              style="width: 200px"
              dropdownClassName="font-family-select"
            >
              <a-select-option
                v-for="item in FONTFAMILYOPTIONS"
                :value="item.value"
                :key="item.value">
                <span :style="{ 'font-family': item.value, 'line-height': '30px' }">{{ item.label }}</span>
              </a-select-option>
            </a-select>
          </div>
          <div class="modal">
            <div class="c">
              <p>字号</p>
              <a-select
                @change="handlerUpdateStyle($event, 'fontSize')"
                v-model:value="fontSize"
                :options="FONTSIZEOPTIONS"
                size="middle"
                placeholder="请选择"
                style="width: 100px"
              >
              </a-select>
            </div>
            <div class="c">
              <p>划线</p>
              <a-select
                @change="handlerUpdateStyle($event, 'textDecoration')"
                v-model:value="textDecoration"
                :options="TEXTDECARATIONOPTIONS"
                size="middle"
                placeholder="请选择"
                style="width: 100px"
              >
              </a-select>
            </div>
          </div>
          <div class="modal">
            <div class="c">
              <p>颜色</p>
              <el-color-picker
                :teleported="false"
                @active-change="handlerUpdateStyle($event, 'textColor')"
                v-model="textColor"
                show-alpha
                :predefine="predefineColors" />
            </div>
            <div class="c">
              <div
                @click="handlerUpdateStyle(fontWeight === 'bold' ? 'normal' : 'bold', 'fontWeight')"
                title="加粗"
                class="font"
                :class="{ active: fontWeight === 'bold' }">
                <span class="ri-bold"></span>
              </div>
              <div
                @click="handlerUpdateStyle(fontStyle === 'italic' ? 'normal' : 'italic', 'fontStyle')"
                title="斜体"
                class="font"
                :class="{ active: fontStyle === 'italic' }">
                <span class="ri-italic"></span>
              </div>
            </div>
          </div>
          <div class="modal">
            <p>文本方向</p>
            <a-radio-group
              @change="handlerUpdateStyle($event.target.value, 'textDirection')"
              v-model:value="textDirection"
              size="small"
              button-style="solid">
              <a-radio-button value="hor" style="font-size: 12px;">横向</a-radio-button>
              <a-radio-button value="ver" style="font-size: 12px;">竖向</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="style-block">
          <p class="set-title">边框</p>
          <div class="modal w_50">
            <div class="c">
              <p>颜色</p>
              <el-color-picker
                :teleported="false"
                @active-change="handlerUpdateStyle($event, 'strokeColor')"
                v-model="strokeColor"
                show-alpha
                :predefine="predefineColors" />
            </div>
            <div class="c">
              <p>样式</p>
              <a-select
                @change="handlerUpdateStyle($event, 'strokeStyle')"
                v-model:value="strokeStyle"
                :options="STROKESTYLEOPTIONS"
                size="middle"
                placeholder="请选择"
                style="width: 100px"
              >
              </a-select>
            </div>
            <div class="c">
              <p>宽度</p>
              <a-select
                @change="handlerUpdateStyle($event, 'strokeWidth')"
                v-model:value="strokeWidth"
                :options="STROKEWIDTHOPTIONS"
                size="middle"
                placeholder="请选择"
                style="width: 100px"
              >
              </a-select>
            </div>
            <div class="c">
              <p>圆角</p>
              <a-select
                @change="handlerUpdateStyle($event, 'borderRadius')"
                v-model:value="borderRadius"
                :options="BORDERRADIUSOPTIONS"
                size="middle"
                placeholder="请选择"
                style="width: 100px"
              >
              </a-select>
            </div>
          </div>
        </div>
        <div class="style-block">
          <p class="set-title">背景</p>
          <div class="modal">
            <p>颜色</p>
            <el-color-picker
              :teleported="false"
              @active-change="handlerUpdateStyle($event, 'backgroundColor')"
              v-model="backgroundColor"
              show-alpha
              :predefine="predefineColors" />
          </div>
        </div>
        <div class="style-block">
          <p class="set-title">线条</p>
          <div class="modal w_50">
            <div class="c">
              <p>颜色</p>
              <el-color-picker
                :teleported="false"
                @active-change="handlerUpdateStyle($event, 'lineColor')"
                v-model="lineColor"
                show-alpha
                :predefine="predefineColors" />
            </div>
            <div class="c">
              <p>样式</p>
              <a-select
                @change="handlerUpdateStyle($event, 'lineStyle')"
                v-model:value="lineStyle"
                :options="STROKESTYLEOPTIONS"
                size="middle"
                placeholder="请选择"
                style="width: 100px"
              >
              </a-select>
            </div>
          </div>
          <div class="modal">
            <div class="c">
              <p>尺寸</p>
              <a-select
                @change="handlerUpdateStyle($event, 'lineWidth')"
                v-model:value="lineWidth"
                size="middle"
                placeholder="请选择"
                style="width: 200px"
              >
              <a-select-opt-group
                v-for="item in EDGELINESIZEOPTIONS.slice(0, isRoot ? 2 : 1)"
                :key="item.label"
                :label="item.label">
                <a-select-option
                  v-for="itemName in item.options"
                  :key="itemName.value"
                  :value="itemName.value">{{ itemName.label }}</a-select-option>
              </a-select-opt-group>
              </a-select>
            </div>
          </div>
        </div>
        <div class="style-block">
          <p class="set-title">节点边距</p>
          <div class="modal">
            <p>垂直内边距</p>
            <div style="width: 200px">
              <a-slider
                @afterChange="handlerUpdateStyle($event, 'verticalInner')"
                :max="200"
                v-model:value="verticalInner"/>
            </div>
          </div>
          <div class="modal">
            <p>水平内边距</p>
            <div style="width: 200px">
              <a-slider
                @afterChange="handlerUpdateStyle($event, 'horizontalInner')"
                :max="100"
                v-model:value="horizontalInner"/>
            </div>
          </div>
          <div class="modal">
            <p>水平外边距</p>
            <div style="width: 200px">
              <a-slider
                @afterChange="handlerUpdateStyle($event, 'horizontalOutter')"
                :max="200"
                :min="15"
                v-model:value="horizontalOutter"/>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-subjectnode" v-show="!subjectStyle">
        <a-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          :image-style="{ height: '60px' }"
        >
          <template #description>
            <p style="font-size: 12px;margin-top: 18px;">请选择一个节点</p>
          </template>
        </a-empty>
      </div>
    </el-config-provider>
  </div>
</template>

<script>
import mitter from '../mitt'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import {
  predefineColors,
  FONTFAMILYOPTIONS,
  FONTSIZEOPTIONS,
  STROKESTYLEOPTIONS,
  STROKEWIDTHOPTIONS,
  BORDERRADIUSOPTIONS,
  TEXTDECARATIONOPTIONS,
  EDGELINESIZEOPTIONS
} from '../config'
export default defineComponent({
  components: { ElConfigProvider },
  props: {
    subjectStyle: {
      type: Object,
      default: () => null
    },
    isRoot: Boolean
  },
  setup (props) {
    const styleObject = reactive({
      fontFamily: null, // 字体
      fontSize: 12, // 字号
      fontWeight: 'normal', // 是否粗体
      fontStyle: 'normal', // 是否斜体
      textDecoration: 'none', // 划线
      textColor: null, // 文字颜色
      textDirection: 'hor', // 文本方向
      strokeColor: null, // 边框颜色
      strokeStyle: null, // 边框样式
      strokeWidth: 0, // 边框宽度
      borderRadius: 0, // 圆角
      backgroundColor: null, // 背景色
      lineColor: null, // 线条颜色
      lineStyle: null, // 连线样式
      lineWidth: null, // 连线尺寸
      verticalInner: 10, // 垂直内边距
      horizontalInner: 20, // 水平内边距
      horizontalOutter: 22 // 水平外边距
    })

    function handlerUpdateStyle (filedValue, filedName) {
      if ([
        'fontWeight',
        'fontStyle',
        'textColor',
        'strokeColor',
        'lineColor',
        'backgroundColor'
      ].includes(filedName)) {
        styleObject[filedName] = filedValue
      }
      mitter.emit('update-subject-style', { filedValue, filedName })
    }

    watch(() => props.subjectStyle, newVal => {
      if (newVal) {
        Object.assign(styleObject, newVal)
      }
    }, { deep: true })

    return {
      zhCn,
      predefineColors,
      FONTFAMILYOPTIONS,
      FONTSIZEOPTIONS,
      STROKESTYLEOPTIONS,
      STROKEWIDTHOPTIONS,
      BORDERRADIUSOPTIONS,
      TEXTDECARATIONOPTIONS,
      EDGELINESIZEOPTIONS,
      ...toRefs(styleObject),
      handlerUpdateStyle
    }
  }
})
</script>

<style lang="less">
.nodestyleset-modal {
  .style-block {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .set-title {
      font-size: 14px;
      color: #000;
      line-height: 24px;
      font-weight: 600;
      font-family: fangzhengheiti;
    }
    .modal {
      display: flex;
      align-items: center;
      margin-top: 16px;
      &.w_50 {
        flex-wrap: wrap;
        justify-content: space-between;
        .c {
          width: 46%;
          margin-right: 0 !important;
          margin-bottom: 8px;
        }
      }
      .c {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-right: 15px;
        }
        .font {
          width: 50px;
          line-height: 28px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          margin-right: 12px;
          border: 1px solid #f1f1f1;
          &.active {
            background-color: #eee;
          }
          span {
            font-size: 18px;
            vertical-align: middle;
            color: #2c3e50;
          }
        }
      }
      p {
        font-size: 12px;
        margin-right: 8px;
        color: #4c4c4c;
        flex-shrink: 0;
      }
    }
  }
  .empty-subjectnode {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
