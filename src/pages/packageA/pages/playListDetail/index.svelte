<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { get } from 'svelte/store'
  import Taro from '@tarojs/taro'
  import { formatCount } from '../../../../utils/common'
  import * as song from '../../../../stores/song'

  let playListDetailInfo = get(song.playListDetailInfo)
  const unsubscribe = song.playListDetailInfo.subscribe(value => {
    playListDetailInfo = value
  })

  onMount(() => {
    const { id = '', name = '' } = Taro.getCurrentInstance().router?.params || {};
    Taro.setNavigationBarTitle({
      title: name
    })
    song.getPlayListDetail({ id })
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<t-view>
  <t-view class="playList__header">
    <t-image
      class="playList__header__bg"
      src={playListDetailInfo.coverImgUrl}
    />
    <t-view class="playList__header__cover">
      <t-image
        class="playList__header__cover__img"
        src={playListDetailInfo.coverImgUrl}
      />
      <t-text class="playList__header__cover__desc">歌单</t-text>
      <t-view class="playList__header__cover__num">
        <t-text class="at-icon at-icon-sound" />
        {formatCount(playListDetailInfo.playCount)}
      </t-view>
    </t-view>
    <t-view class="playList__header__info">
      <t-view class="playList__header__info__title">
        {playListDetailInfo.name}
      </t-view>
      <t-view class="playList__header__info__user">
        <t-image
          class="playList__header__info__user_avatar"
          src={playListDetailInfo.creator.avatarUrl}
        />
        {playListDetailInfo.creator.nickname}
      </t-view>
    </t-view>
  </t-view>
</t-view>

<style lang="scss">
// .has-music-box {
//   padding-bottom: 120px;
// }

.playList__header {
  position: relative;
  width: 100%;
  height: 372px;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  padding: 60px 20px;
  color: #fff;
  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    filter: blur(20px);
    transform: scale(1.5);
    &:after {
      position: absolute;
      content: '';
      background-color: rgba(0,0,0,.5);
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }
  &__cover {
    position: relative;
    z-index: 2;
    margin-right: 32px;
    font-size: 24px;
    &__img {
      width: 252px;
      height: 252px;
    }
    &__desc {
      position: absolute;
      top: 20px;
      left: 0;
      padding: 0 16px;
      height: 34px;
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 34px;
      background-color: rgba(217,48,48,.8);
      border-top-right-radius: 34px;
      border-bottom-right-radius: 34px;
    }
    &__num {
      position: absolute;
      right: 5px;
      top: 0;
      font-weight: 700;
      z-index: 3;
      display: flex;
      align-items: center;
      .at-icon-sound {
        margin-right: 10px;
      }
    }
  }
  &__info {
    position: relative;
    z-index: 2;
    flex: 1;
    &__title {
      font-size: 34px;
      line-height: 1.3;
      line-height: 44px;
    }
    &__user {
      color: #ffffffcc;
      font-size: 28px;
      display: flex;
      align-items: center;
      margin-top: 40px;
      &_avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>
