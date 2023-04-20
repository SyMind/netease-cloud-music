<script lang="ts">
  import { onMount } from 'svelte'
  import Taro from '@tarojs/taro';
  import Loading from '../../components/Loading.svelte'
  import SearchBar from '../../components/SearchBar.svelte'
  import api from '../../services/api'

  interface RecommendPlay {
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
  }

  interface RecommendDj {
    name: string;
    picUrl: string;
  }

  let bannerList = []
  let recommendPlayList: RecommendPlay[] = []
  let recommendDj: RecommendDj[] = []

  onMount(() => {
    api.get("/banner", { type: 1 }).then(({ data }) => {
      if (data.banners) {
        bannerList = data.banners
      }
    })

    api.get('/personalized').then(({ data }) => {
      if (data.result) {
        recommendPlayList = data.result
      }
    })

    api.get('/personalized/djprogram').then(({ data }) => {
      if (data.result) {
        recommendDj = data.result
      }
    })
  })

  $: showLoading = !recommendPlayList.length && !recommendDj.length

  function wip() {
    Taro.showToast({
      title: "正在开发中，敬请期待",
      icon: "none"
    });
  }
</script>

<t-view class="container">
  <Loading fullPage={true} hide={!showLoading} />

  <SearchBar />

  <t-swiper
    circular={true}
    indicator-dots={true}
    autoplay={true}
    class="banner_list"
    indicator-color="#999"
    indicator-active-color="#d43c33"
  >
    {#each bannerList as { targetId, pic } (targetId)}
      <t-swiper-item class="banner_list__item">
        <t-image class="banner_list__item__img" src={pic} />
      </t-swiper-item>
    {/each}
  </t-swiper>

  <t-view class="handle_list">
    <t-view
      class="handle_list__item"
      on:tap={wip}
    >
      <t-view class="handle_list__item__icon-wrap">
      </t-view>
      <t-text class="handle_list__item__text">每日推荐</t-text>
    </t-view>
    <t-view
      class="handle_list__item"
      on:tap={wip}
    >
      <t-view class="handle_list__item__icon-wrap">
      </t-view>
      <t-text class="handle_list__item__text">排行榜</t-text>
    </t-view>
  </t-view>

  <t-view class="recommend_playlist">
    <t-view class="recommend_playlist__title">推荐歌单</t-view>
    <t-view class="recommend_playlist__content">
      {#each recommendPlayList as item (item.id)}
        <t-view
          class="recommend_playlist__item"
          on:tap={this.goDetail.bind(this, item)}
        >
          <t-image
            src={`${item.picUrl}?imageView&thumbnail=250x0`}
            class="recommend_playlist__item__cover"
          />
          <t-view class="recommend_playlist__item__cover__num">
            <t-text class="at-icon at-icon-sound" />
            {item.playCount < 10000
              ? item.playCount
              : `${Number(item.playCount / 10000).toFixed(0)}万`}
          </t-view>
          <t-view class="recommend_playlist__item__title">
            {item.name}
          </t-view>
        </t-view>
      {/each}
    </t-view>
  </t-view>
</t-view>

<style lang="scss">
@import "../../base.scss";

.container {
  padding-bottom: 120px;
}
// .has_music_box {
//   padding-bottom: 220px;
// }
.banner_list {
  height: 375px;
  margin-top: 20px;
  &__item__img {
    width: 92%;
    height: 375px;
    position: relative;
    left: 4%;
    border-radius: 20px;
  }
}
.handle_list {
  overflow: hidden;
  margin-top: 40px;
  padding: 0 40px;
  &__item {
    width: 20%;
    float: left;
    text-align: center;
    &__icon-wrap {
      background-color: $primary-color;
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin: 0 auto;
    }
    // &__icon {
    //   margin-left: 5px;
    // }
    &__text {
      font-size: 24px;
    }
  }
}
.recommend_playlist {
  padding: 40px;
  overflow: hidden;
  &__title {
    margin-bottom: 30px;
  }
  &__item {
    position: relative;
    width: 32%;
    float: left;
    margin-bottom: 30px;
    &:nth-child(3n-1) {
      margin: 0 2% 30px 2%;
    }
    &__cover__num {
      font-size: 20px;
      position: absolute;
      right: 10px;
      top: 0;
      font-weight: 700;
      z-index: 3;
      display: flex;
      align-items: center;
      color: #fff;
      .at-icon-sound {
        margin-right: 10px;
      }
    }
    &__cover {
      display: block;
      width: 100%;
      height: 200px;
      border-radius: 12px;
      box-shadow: 0px 0px 20px #8F8F8F;
    }
    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 26px;
      margin-top: 10px;
      height: 72px;
    }
  }
}
</style>
