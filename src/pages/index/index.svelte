<script lang="ts">
  import { onMount } from 'svelte'
  import Taro from '@tarojs/taro';
  import Loading from '../../components/Loading.svelte'
  import SearchBar from '../../components/SearchBar.svelte'
  import api from '../../services/api'

  let bannerList = []
  let recommendPlayList = []
  let recommendDj = []

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
    {#each bannerList as { targetId, pic }}
      <t-swiper-item class="banner_list__item" key={targetId}>
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
</style>
