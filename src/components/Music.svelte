<script lang="ts">
  import { onDestroy } from 'svelte'
  import { get } from 'svelte/store'
  import Taro from '@tarojs/taro'
  import * as song from '../stores/song'

  const backgroundAudioManager = Taro.getBackgroundAudioManager()

  let currentSongInfo = get(song.currentSongInfo)
  const unsubscribeCurrentSongInfo = song.currentSongInfo.subscribe(value => {
    currentSongInfo = value
  })

  let isPlaying = get(song.isPlaying)
  const unsubscribeIsPlaying = song.isPlaying.subscribe(value => {
    isPlaying = value
  })

  // let canPlayList = get(song.canPlayList)
  // const unsubscribeCanPlayList = song.canPlayList.subscribe(value => {
  //   canPlayList = value
  // })

  onDestroy(() => {
    unsubscribeCurrentSongInfo()
    unsubscribeIsPlaying()
    // unsubscribeCanPlayList()
  })

  function goDetail() {
    const { id } = currentSongInfo;
    Taro.navigateTo({
      url: `/pages/packageA/pages/songDetail/index?id=${id}`
    });
  }

  function switchPlayStatus() {
    if (isPlaying) {
      backgroundAudioManager.pause();
      song.updatePlayStatus(false)
    } else {
      backgroundAudioManager.play();
      song.updatePlayStatus(true)
    }
  }
</script>

{#if currentSongInfo.name}
  <t-view class="music">
    <t-image
      class="music__pic"
      class:circling={isPlaying}
      src={currentSongInfo.al.picUrl}
    />
    <t-view class="music__info" onClick={goDetail}>
      <t-view class="music__info__name">{currentSongInfo.name}</t-view>
      <t-view class="music__info__desc">
        {currentSongInfo.ar[0] ? currentSongInfo.ar[0].name : ""} -{" "}
        {currentSongInfo.al.name}
      </t-view>
    </t-view>
    <t-view class="music__icon--play">
      <t-text
        class="icon music__icon"
        class:icon-play={isPlaying}
        class:icon-pause={!isPlaying}
        on:tap={switchPlayStatus}
      />
    </t-view>
    <!-- <AtIcon
      value="playlist"
      size="30"
      color="#FFF"
      className="icon_playlist"
      onClick={() => setIsOpened(true)}
    ></AtIcon> -->
    <!-- <AtFloatLayout
      isOpened={isOpened}
      title="播放列表"
      scrollY
      onClose={() => setIsOpened(false)}
    >
      <t-view className="music__playlist">
        {canPlayList.map(item => (
          <t-view
            key={item.id}
            className={classnames({
              music__playlist__item: true,
              current: item.current
            })}
          >
            <t-view
              className="music__playlist__item__info"
              onClick={() => playSong(item.id)}
            >
              {`${item.name} - ${item.ar[0] ? item.ar[0].name : ""}`}
            </t-view>
            <t-view className="music__playlist__item__close">
              <AtIcon value="chevron-right" size="16" color="#ccc" />
            </t-view>
          </t-view>
        ))}
      </t-view>
    </AtFloatLayout> -->
  </t-view>
{/if}

<style lang="scss">
@import '../base.scss';

.music {
  position: fixed;
  width: 96%;
  padding: 10px;
  bottom: 20px;
  left: 2%;
  background: #8d949a;
  color: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 10px;
  align-items: center;
  z-index: 10000;
  &__pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &__info {
    flex: 1;
    overflow: hidden;
    &__name {
      width: 100%;
      font-size: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &__desc {
      width: 100%;
      font-size: 22px;
      margin-top: 10px;
      color: #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &__icon {
    font-size: 30px;
    color: #fff;
    &--play {
      padding: 0 10px;
    }
  }
  &__playlist {
    color: #323232;
    &__item {
      display: flex;
      padding: 15px 10px;
      align-items: center;
      &.current {
        color: $primary-color
      }
      &__info {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &__close {
        padding: 6px;
      }
    }
  }
}
.circling {
  animation: circling 20s infinite linear;
  &.z-pause {
    animation-play-state: paused;
  }
}

@keyframes circling {
  0% {
      transform: rotate(0deg)
  }
  to {
      transform: rotate(1turn)
  }
}
</style>
