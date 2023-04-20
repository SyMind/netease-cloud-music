<script lang="ts">
  import { onMount } from 'svelte'
  import Loading from '../../components/Loading.svelte'
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
</script>

<t-view class="container">
  <Loading fullPage={true} hide={!showLoading} />

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
</t-view>

<style lang="scss">
@import "../../base.scss";

.container {
  padding-bottom: 120px;
}
.has_music_box {
  padding-bottom: 220px;
}
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
</style>
