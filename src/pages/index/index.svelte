<script lang="ts">
  import { onMount } from 'svelte'
  import Loading from '../../components/Loading.svelte'
  import api from '../../services/api'

  let showLoading = true

  let recommendPlayList = []
  let recommendDj = []

  onMount(() => {
    api
      .get("/banner", {
        type: 1
      })
      .then(({ data }) => {
        if (data.banners) {
          this.setState({
            bannerList: data.banners
          })
        }
      })
  })

if (recommendPlayList.length || recommendDj.length) {
  this.setState({
    showLoading: false
  });
}
</script>

<t-view class="container">
  <Loading fullPage hide={!showLoading} />
</t-view>

<style lang="scss">
.container {
  padding-bottom: 120px;
}
</style>
