<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  type LrcType = {
    scroll: boolean;
    nolyric: boolean;
    uncollected: boolean;
    lrclist: {
      lrc_text: string;
      lrc_sec: number;
    }[];
  }

  type $$Props = {
    lrc: LrcType;
    lrcIndex: number;
    showLyric: boolean;
  }

  export let lrc: LrcType;
  export let lrcIndex: number;
  export let showLyric: boolean;
</script>

<t-view
  class="song__lyric"
  class:song__lyric--hidden={!showLyric}
  style:overflow={lrc.scroll && !lrc.nolyric && !lrc.uncollected ? "auto" : "hidden"}
  on:tap={() => dispatch('tap')}
>
  <t-view
    class="song__lyric__wrap"
    style:transform="translateY(-{(lrcIndex * 100) / lrc.lrclist.length}%)"
  >
    {#if lrc.nolyric && !lrc.uncollected}
      <t-view class="song__lyric__notext">纯音乐，无歌词</t-view>
    {/if}
    {#if lrc.scroll && !lrc.nolyric && !lrc.uncollected}
      <t-view class="song__lyric__notext">*歌词不支持滚动*</t-view>
    {/if}
    {#if lrc.uncollected && !lrc.nolyric}
      <t-view class="song__lyric__notext">暂无歌词</t-view>
    {/if}
    {#each lrc.lrclist as item, index}
      <t-view
        key={item.lrc_sec}
        class="song__lyric__text"
        class:song__lyric__text--current={index === lrcIndex && !lrc.scroll}
        class:song__lyric__text_siblings2={
          index === lrcIndex - 7 ||
          index === lrcIndex + 7 ||
          index === lrcIndex - 6 ||
          index === lrcIndex + 6}
        class:song__lyric__text_siblings1={index === lrcIndex - 5 || index === lrcIndex + 5}
        data-time={item.lrc_sec}
      >
        {item.lrc_text}
      </t-view>
    {/each}
  </t-view>
</t-view>

<style lang="scss">
.song__lyric {
  position: absolute;
  left: 60px;
  top: 20px;
  right: 60px;
  bottom: 260px;
  text-align: center;
  overflow: hidden;
  color: #fff;
  z-index: 3;
  &--hidden {
    opacity: 0;
    z-index: -1;
    pointer-events:none;
  }
  &__wrap {
    top: 50%;
    position: absolute;
    font-size: 40px;
    width: 100%;
    transition: all ease 1s;
    text-align: center;
    transform: translateY(-50%);
  }
  &__text {
    line-height: 1.2;
    word-break: break-all;
    opacity: .5;
    height: 72px;
    overflow: hidden;
    transition: all ease .5s;
    width: 100%;
    text-align: center;
    font-size: 28px;
    &--current {
      opacity: 1;
      font-size: 32px;
    }
    &_siblings1 {
      opacity: .3;
    }
    &_siblings2 {
      opacity: .1;
    }
  }
}
</style>
