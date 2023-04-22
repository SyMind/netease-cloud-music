<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { get } from 'svelte/store'
  import Taro from '@tarojs/taro'
  import { formatCount } from '../../../../utils/common'
  import * as song from '../../../../stores/song'
  import Loading from '../../../../components/Loading.svelte'

  let playListDetailInfo = get(song.playListDetailInfo)
  const unsubscribePlayListDetailInfo = song.playListDetailInfo.subscribe(value => {
    playListDetailInfo = value
  })

  let playListDetailPrivileges = get(song.playListDetailPrivileges)
  const unsubscribePlayListDetailPrivileges = song.playListDetailPrivileges.subscribe(value => {
    playListDetailPrivileges = value
  })

  onMount(() => {
    const { id = '', name = '' } = Taro.getCurrentInstance().router?.params || {};
    Taro.setNavigationBarTitle({
      title: name
    })
    song.getPlayListDetail(id)
  })

  onDestroy(() => {
    unsubscribePlayListDetailInfo()
    unsubscribePlayListDetailPrivileges()
  })

  function playSong(songId, playStatus) {
    if (playStatus === 0) {
      Taro.navigateTo({
        url: `/pages/packageA/pages/songDetail/index?id=${songId}`
      });
    } else {
      Taro.showToast({
        title: "暂无版权",
        icon: "none"
      });
    }
  }
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

  <t-view class="playList__header--more">
    <t-view class="playList__header--more__tag">
      标签：
      {#each playListDetailInfo.tags as tag (tag)}
        <t-text class="playList__header--more__tag__item">
          {tag}
        </t-text>
      {/each}
      {playListDetailInfo.tags.length === 0 ? "暂无" : ""}
    </t-view>
    <t-view class="playList__header--more__desc">
      简介：{playListDetailInfo.description || "暂无"}
    </t-view>
  </t-view>

  <t-view class="playList__content">
    <t-view class="playList__content__title">歌曲列表</t-view>
    {#if playListDetailInfo.tracks.length === 0}
      <Loading />
    {/if}
    <t-view class="playList__content__list">
      {#each playListDetailInfo.tracks as track, index (track.id)}
        <t-view
          class="playList__content__list__item"
          class:playList__content__list__item--disabled={playListDetailPrivileges[index].st === -200}
          on:tap={playSong(
            track.id,
            playListDetailPrivileges[index].st
          )}
        >
          <t-text class="playList__content__list__item__index">
            {index + 1}
          </t-text>
          <t-view class="playList__content__list__item__info">
            <t-view>
              <t-view class="playList__content__list__item__info__name">
                {track.name}
              </t-view>
              <t-view class="playList__content__list__item__info__desc">
                {track.ar[0] ? track.ar[0].name : ""} - {track.al.name}
              </t-view>
            </t-view>
            <t-text class="at-icon at-icon-chevron-right" />
          </t-view>
        </t-view>
      {/each}
    </t-view >
  </t-view >
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

  &--more {
    padding: 30px;
    font-size: 28px;
    color: #666;
    &__tag {
      &__item {
        font-size: 24px;
        margin-right: 20px;
        padding: 4px 16px;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 20px;
      }
    }
    &__desc {
      margin-top: 28px;
    }
  }
}

.playList__content {
  &__title {
    color: #666;
    font-size: 24px;
    background-color: #eeeff0;
    padding: 20px;
  }
  &__list {
    &__item {
      display: flex;
      align-items: center;
      overflow: hidden;
      &--disabled {
        color: #ccc;
      }
      &__index {
        font-size: 34px;
        color: #999999;
        width: 80px;
        text-align: center;
      }
      &__info {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        flex: 1;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        &__name {
          font-size: 34px;
        }
        &__desc {
          font-size: 24px;
          color: #888888;
          margin-top: 10px;
        }
        .at-icon {
          font-size: 30px;
          margin: 0 10px;
          padding: 15px;
          color: #888888;
        }
      }
    }
  }
}
</style>
