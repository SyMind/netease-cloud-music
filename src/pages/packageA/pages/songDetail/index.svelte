<script lang="ts">
  import { get } from 'svelte/store'
  import { onMount, onDestroy } from 'svelte'
  import Taro from '@tarojs/taro'
  import * as song from '../../../../stores/song'

  type LrcType = {
    scroll: boolean;
    nolyric: boolean;
    uncollected: boolean;
    lrclist: {
      lrc_text: string;
      lrc_sec: number;
    }[];
  }

  let currentSongInfo = get(song.currentSongInfo)
  const unsubscribeCurrentSongInfo = song.currentSongInfo.subscribe(value => {
    currentSongInfo = value
  })

  let playMode = get(song.playMode)
  const unsubscribePlayMode = song.playMode.subscribe(value => {
    playMode = value
  })

  let isPlaying = false
  let lrc: LrcType = {
    scroll: false,
    nolyric: false,
    uncollected: false,
    lrclist: []
  }
  let lrcIndex = 0
  let playPercent = 0
  let lyricVisible = false
  let star = false

  let playModeImg = require("../../../../assets/images/song/icn_loop_mode.png");
  if (playMode === "one") {
    playModeImg = require("../../../../assets/images/song/icn_one_mode.png");
  } else if (playMode === "shuffle") {
    playModeImg = require("../../../../assets/images/song/icn_shuffle_mode.png");
  }

  function updateLrc(currentPosition: number) {
    lrcIndex = 0
    if (lrc && !lrc.scroll && lrc.lrclist && lrc.lrclist.length > 0) {
      lrc.lrclist.forEach((item, index) => {
        if (item.lrc_sec <= currentPosition) {
          lrcIndex = index
        }
      })
    }
  }

  function updateProgress(currentPosition) {
    const { dt } = currentSongInfo
    playPercent = Math.floor((currentPosition * 1000 * 100) / dt)
  }

  // 循环播放当前歌曲
  function getCurrentSong() {

  }

  // 随机播放歌曲
  function getShuffleSong() {

  }

  // 获取下一首
  function getNextSong() {

  }

  function changePlayMode() {
    if (playMode === "loop") {
      song.playMode.set('one')
      Taro.showToast({
        title: "单曲循环",
        icon: "none",
        duration: 2000
      });
    } else if (playMode === "one") {
      song.playMode.set('shuffle')
      Taro.showToast({
        title: "随机播放",
        icon: "none",
        duration: 2000
      });
    } else {
      song.playMode.set('loop')
      Taro.showToast({
        title: "列表循环",
        icon: "none",
        duration: 2000
      });
    }
    song.changePlayMode(playMode)
  }

  // 获取上一首
  function getPrevSong() {

  }

  function pauseMusic() {

  }

  function playMusic() {

  }

  function likeMusic() {

  }

  // 根据播放模式进行播放
  function playByMode(playMode: string) {
    switch (playMode) {
      case "one":
        getCurrentSong();
        break;
      case "shuffle":
        getShuffleSong();
        break;
      // 默认按列表顺序播放
      default:
        getNextSong();
    }
  }

  function showLyric() {
    lyricVisible = true
  }

  onMount(() => {
    const { id = '' } = Taro.getCurrentInstance().router?.params || {}
    song.getSongInfo(id)

    const backgroundAudioManager = Taro.getBackgroundAudioManager()
    backgroundAudioManager.onTimeUpdate(() => {
      Taro.getBackgroundAudioPlayerState({
        success(res) {
          if (res.status !== 2) {
            updateLrc(res.currentPosition)
            updateProgress(res.currentPosition)
          }
        }
      })
    })
    backgroundAudioManager.onPause(() => {
      isPlaying = false
    })
    backgroundAudioManager.onPlay(() => {
      isPlaying = true
    })
    backgroundAudioManager.onEnded(() => {
      const { playMode } = this.props.song
      const routes = Taro.getCurrentPages()
      const currentRoute = routes[routes.length - 1].route
      // 如果在当前页面则直接调用下一首的逻辑，反之则触发nextSong事件
      if (currentRoute === "pages/packageA/pages/songDetail/index") {
        playByMode(playMode)
      } else {
        Taro.eventCenter.trigger("nextSong")
      }
    })
  })

  onDestroy(() => {
    unsubscribeCurrentSongInfo()
    unsubscribePlayMode()
  })
</script>

<t-view class="container">
  <t-image class="song__bg" src={currentSongInfo.al.picUrl} />
  <t-view
    class="song__music"
    class:song__music--hidden="{showLyric}"
  >
    <t-view
      class="song__music__main"
      class:song__music__main--playing="{isPlaying}"
    >
      <t-image
        class="song__music__main--before"
        src={require("../../../../assets/images/aag.png")}
      />
      <t-view class="song__music__main__cover">
        <t-view
          class="song__music__main__img circling"
          class:z-pause="{!isPlaying}"
        >
          <t-image
            class="song__music__main__img__cover"
            src={currentSongInfo.al.picUrl}
          />
        </t-view>
      </t-view>
    </t-view>
    <t-view
      class="song__music__lgour"
      onClick={showLyric}
    >
      <t-view
        class="song__music__lgour__cover circling"
        class:z-pause="{!isPlaying}"
      />
    </t-view>
  </t-view>
  <!-- <Slider
    percent={playPercent}
    onChange={this.percentChange.bind(this)}
    onChanging={this.percentChanging.bind(this)}
  />
  <Lyric
    lrc={lrc}
    lrcIndex={lrcIndex}
    showLyric={showLyric}
    onTrigger={() => this.hiddenLyric()}
  /> -->
  <t-view class="song__bottom">
    <t-view class="song__operation">
      <t-image
        src={playModeImg}
        class="song__operation__mode"
        onClick={changePlayMode}
      />
      <t-image
        src={require("../../../../assets/images/ajh.png")}
        class="song__operation__prev"
        onClick={getPrevSong}
      />
      {#if isPlaying}
        <t-image
          src={require("../../../../assets/images/ajd.png")}
          class="song__operation__play"
          onClick={pauseMusic}
        />
      {:else}
        <t-image
          src={require("../../../../assets/images/ajf.png")}
          class="song__operation__play"
          onClick={playMusic}
        />
      {/if}
      <t-image
        src={require("../../../../assets/images/ajb.png")}
        class="song__operation__next"
        onClick={getNextSong}
      />
      <t-image
        src={
          star
            ? require("../../../../assets/images/song/play_icn_loved.png")
            : require("../../../../assets/images/song/play_icn_love.png")
        }
        class="song__operation__like"
        onClick={likeMusic}
      />
    </t-view>
  </t-view>
</t-view>

<style lang="scss">
.container {
  overflow: hidden;
}
.song__bg {
  transform: scale(1.2);
  transform-origin: center top;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter:blur(30px) brightness(.8);
  overflow: hidden;
  z-index: -1;
  transition: opacity .3s linear;
  &:after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
  }
}
.song__music {
  position: relative;
  width: 592px;
  height: 592px;
  margin: 140px auto 0;
  &.hidden {
    display: none;
  }
  &__main {
    position: relative;
    width: 100%;
    height: 100%;
    &--playing {
      .song__music__main--before {
        transform: rotate(0deg);
      }
    }
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      background: url(//s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48) no-repeat;
      background-size: contain;
    }
    &--before {
      position: absolute;
      width: 222px;
      height: 366px;
      top: -200px;
      left: 240px;
      background-size: contain;
      background-repeat: no-repeat;
      transform-origin: 60px 60px;
      z-index: 5;
      transition: all 1.5s;
      transform: rotate(-20deg);
    }
    &__cover {
      position: absolute;
      width: 368px;
      height: 368px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      overflow: hidden;
      &__img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        background: url(//s3.music.126.net/m/s/img/disc_default.png?7c9b3ad…) no-repeat;
        background-size: contain;
        &__cover {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &__lgour {
    position: absolute;
    width: 592px;
    height: 592px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    &__cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 3;
      background: url(//s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a2bc62e1ab3f51f135fc459577) no-repeat;
      background-size: contain;
    }
  }
}
.song__bottom {
  position: absolute;
  padding: 40px 0;
  bottom: 0;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
}
.song__operation {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &__mode {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 30px;
    top: 14px;
  }
  &__prev {
    width: 60px;
    height: 60px;
  }
  &__play {
    width: 120px;
    height: 120px;
    margin: 0 50px;
  }
  &__next {
    width: 60px;
    height: 60px;
  }
  &__like {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 40px;
    top: 14px;
  }
}
</style>
