<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  type $$Props = {
    /**
     * 控制是否出现在页面上
     * @default false
     */
    isOpened?: boolean
    /**
     * 元素的标题
     */
    title?: string
    /**
     * 是否垂直滚动
     * @default true
     */
    scrollY?: boolean
    /**
     * 是否水平滚动
     * @default false
     */
    scrollX?: boolean
  }

  export let isOpened = false;
  export let title: string | undefined = undefined;
  export let scrollY = true;
  export let scrollX = false;

  const dispatch = createEventDispatcher();

  function handleClose() {
    isOpened = false
    dispatch('close')
  }
</script>

<t-view
  class="float-layout"
  class:float-layout--active={isOpened}
  on:touch-move={e => e.stopPropagation()}>

  <t-view class='float-layout__overlay' on:tap={handleClose} />
  <t-view class='float-layout__container layout'>
    {#if title}
      <t-view class='layout-header'>
        <t-text class='layout-header__title'>{title}</t-text>
        <t-view class='layout-header__btn-close' on:tap={handleClose} />
      </t-view>
    {/if}
    <t-view class='layout-body'>
      <t-scroll-view
        class='layout-body__content'
        scroll-y={scrollY}
        scroll-x={scrollX}
      >
        <slot></slot>
      </t-scroll-view>
    </t-view>
  </t-view>
</t-view>

<style lang="scss">
  $hd: 2; // 基本单位

  $color-bg: #FFF;
  $spacing-v-md: 9px * $hd;
  $line-height-zh: 1.5;
  $color-bg-grey: #F7F7F7;
  $color-text-base: #333;
  $font-size-lg: 16px * $hd;
  $spacing-h-sm: 5px * $hd;
  $color-grey-3: #CCC;
  $font-size-base: 14px * $hd;

  $zindex-float-layout: 810;
  $float-layout-timer: 300ms;
  $float-layout-height-min: 600px;
  $float-layout-height-max: 950px;
  $float-layout-header-bg-color: $color-bg-grey;
  $float-layout-title-color: $color-text-base;
  $float-layout-title-font-size: $font-size-lg;
  $float-layout-btn-color: $color-grey-3;

  /**
    * 通用的遮罩
    */
  @mixin overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba($color: #000, $alpha: 0.3);
  }

  @mixin line($num: 1) {
    overflow: hidden;
    text-overflow: ellipsis;

    @if ($num == 1) {
      white-space: nowrap;
    } @else {
      display: -webkit-box;
      -webkit-line-clamp: $num;

      /* autoprefixer: off */
      -webkit-box-orient: vertical;
    }
  }

  .float-layout {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    visibility: hidden;
    z-index: $zindex-float-layout;
    transition: visibility $float-layout-timer cubic-bezier(0.36, 0.66, 0.04, 1);

    /* elements */
    &__overlay {
      @include overlay;

      opacity: 0;
      transition: opacity 150ms ease-in;
    }

    &__container {
      position: absolute;
      bottom: 0;
      width: 100%;
      min-height: $float-layout-height-min;
      max-height: $float-layout-height-max;
      background-color: $color-bg;
      transform: translate3d(0, 100%, 0);
      transition: transform $float-layout-timer cubic-bezier(0.36, 0.66, 0.04, 1);
    }

    /* modifiers */
    &--active {
      visibility: visible;

      .float-layout__overlay {
        opacity: 1;
      }

      .float-layout__container {
        transform: translate3d(0, 0, 0);
      }
    }
  }

  .layout {
    &-header {
      position: relative;
      padding: $spacing-v-md;
      line-height: $line-height-zh;
      background-color: $float-layout-header-bg-color;

      &__title {
        @include line(1);

        color: $float-layout-title-color;
        font-size: $float-layout-title-font-size;
        display: block;
        padding-right: 80px;
      }

      &__btn-close {
        position: absolute;
        padding: $spacing-h-sm;
        top: 50%;
        right: $spacing-v-md;
        width: 40px;
        height: 100%;
        line-height: 1;
        transform: translate(0, -50%);

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          display: inline-block;
          width: 36px;
          height: 2PX;
          border-radius: 1PX;
          background: $float-layout-btn-color;
        }

        &::before {
          transform: translate3d(-50%, -50%, 0) rotate(45deg);
        }

        &::after {
          transform: translate3d(-50%, -50%, 0) rotate(-45deg);
        }
      }
    }

    &-body {
      font-size: $font-size-base;
      max-height: 828px;
      min-height: 514px;

      &__content {
        max-height: 798px;
        min-height: 484px;
      }
    }
  }
</style>
