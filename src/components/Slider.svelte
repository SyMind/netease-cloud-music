<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  type $$Props = {
    percent: number;
  }

  export let percent: number = 0

  function handleChange(e) {
    dispatch('change', e)
  }

  function handleChanging(e) {
    dispatch('changing', e)
  }
</script>

<t-view class="slider">
  <t-slider
    value={percent}
    block-size={15}
    active-color="#d43c33"
    on:change={handleChange}
    on:changing={handleChanging}
  />
</t-view>

<style lang="scss">
.slider {
  position: absolute;
  width: 100%;
  bottom: 160px;
}
</style>
