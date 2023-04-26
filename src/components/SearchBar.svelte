<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { InputProps } from '@tarojs/components'

  type $$Props = {
    class?: string;
    /**
     * 输入框当前值
     * @type {string}
     * @description 必填，开发者需要通过 onChange 事件来更新 value 值
     */
    value?: string
    /**
     * 输入框占位符
     * @type {string}
     */
    placeholder?: string
    /**
     * 最大输入长度
     * @type {number}
     * @default 140
     */
    maxLength?: number
    /**
     * 是否固定顶部
     * @type {boolean}
     * @default false
     */
    fixed?: boolean
    /**
     * 是否聚焦
     * @type {boolean}
     * @default false
     */
    focus?: boolean
    /**
     * 是否禁止输入
     * @type {boolean}
     * @default false
     */
    disabled?: boolean
    /**
     * 是否一直显示右侧按钮
     * @type {boolean}
     * @default false
     */
    showActionButton?: boolean
    /**
     * 右侧按钮文案
     * @type {string}
     * @default '搜索'
     */
    actionName?: string
    /**
     * 输入框输入类型
     * @description 可选择的值 'text', 'number', 'idcard', 'digit'
     * @type {('text'|'number'|'idcard'|'digit')}
     * @default 'text'
     */
    inputType?: InputProps['type']
  }

  let className: string = ''
  export { className as class }
  export let value = ''
  export let placeholder: string = ''
  export let maxLength = 140
  export let fixed = false
  let defaultFocus = false
  export { defaultFocus as focus }
  export let disabled = false
  export let showActionButton = false
  export let actionName = '搜索'
  export let inputType = 'text'

  let focus = defaultFocus;

  const dispatch = createEventDispatcher();

  const fontSize = 14

</script>

<t-view
  class={className}
  class:search-bar={true}
  class:search-bar--fixed={fixed}
>
  <t-view class='search-bar__input-cnt'>
    <t-view
      class='search-bar__placeholder-wrap'
      style:flex-grow={focus || value ? 0 : 1}
    >
      <t-text class='icon icon-search'></t-text>
      <t-text
        class='search-bar__placeholder'
        style:visibility={value.length ? 'hidden' : 'visible'}
      >
        {focus ? '' : placeholder}
      </t-text>
    </t-view>
    <t-input
      class='search-bar__input'
      type={inputType}
      confirmType='search'
      value={value}
      focus={focus}
      disabled={disabled}
      maxlength={maxLength}
      on:input={e => dispatch('input', e.detail)}
      on:focus={() => {
        focus = true
        dispatch('focus')
      }}
      on:blur={() => {
        focus = false
        dispatch('blur')
      }}
      on:confirm={() => dispatch('confirm')}
    />
    <t-view
      class='search-bar__clear'
      style:display={value.length ? 'flex' : 'none'}
      on:touch-start={() => {
        dispatch('change', '')
      }}
    >
      <t-text class='icon icon-close-circle'></t-text>
    </t-view>
  </t-view>
  <t-view
    class='search-bar__action'
    style:opacity={focus || value || showActionButton ? 1 : 0}
    style:margin-right={focus || value || showActionButton ? 0 : `-${(actionName.length + 1) * fontSize + fontSize / 2 + 10}px`}
    on:tap={() => dispatch('tap')}
  >
    {actionName}
  </t-view>
</t-view>

<style lang="scss">
  @import '../styles/variables.scss';
  @import '../styles/mixins/index.scss';

  $search-bar-font-size: 14PX;
  $search-bar-input-height: 30PX;
  $search-bar-input-padding: 25PX;
  $search-bar-btn-padding: 10PX;
  $search-bar-placeholder-padding: 12PX;
  $search-bar-input-bg-color: $color-bg-grey;
  $search-bar-input-color: $color-black-0;
  $search-bar-placholder-color: $color-grey-2;

  .search-bar {
    display: flex;
    align-items: center;
    padding: $spacing-v-sm $spacing-v-md;
    background-color: $color-bg;
    overflow: hidden;
    box-sizing: border-box;
    @include hairline-bottom();

    /* elements */
    &__input-cnt {
      position: relative;
      flex: 1;
      width: 100%;
      height: $search-bar-input-height;
      background-color: $search-bar-input-bg-color;
      border-radius: $search-bar-input-height * 0.5;
      overflow: hidden;
      display: flex;
    }

    &__placeholder-wrap {
      display: flex;
      align-self: center;
      align-items: center;
      justify-content: center;
      padding: 0 $search-bar-placeholder-padding;
      height: $search-bar-input-height;
      line-height: 0;
      vertical-align: middle;
      opacity: 1;
      transition: flex 0.3s;

      .icon {
        color: $search-bar-placholder-color;
        font-size: $search-bar-font-size;
        flex-shrink: 0;
      }
    }

    &__placeholder {
      margin-left: $search-bar-placeholder-padding;
      color: $search-bar-placholder-color;
      font-size: $search-bar-font-size;
      flex-shrink: 0;
    }

    &__input {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: $search-bar-input-height !important;
      padding: 0 $search-bar-input-padding + $search-bar-placeholder-padding;
      color: $search-bar-input-color;
      font-size: $search-bar-font-size !important;
      text-align: left;
      background-color: transparent;
      transition: width 0.3s;
      box-sizing: border-box;
    }

    &__clear {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      right: $search-bar-placeholder-padding;
      height: $search-bar-input-height;
      width: $search-bar-input-padding;
      color: $search-bar-placholder-color;
      font-size: $search-bar-font-size;
      line-height: 0;
      vertical-align: middle;
    }

    &__action {
      flex: none;
      display: block;
      margin-left: 10PX;
      padding: 0 $search-bar-btn-padding;
      height: $search-bar-input-height;
      color: $search-bar-btn-color;
      font-size: $search-bar-font-size;
      line-height: $search-bar-input-height;
      border-radius: 4PX;
      background-color: #d43c33;
      transition: margin-right 0.3s, opacity 0.3s;
      opacity: 0;
    }

    /* modifiers */
    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: $zindex-search-bar;
    }
  }
</style>
