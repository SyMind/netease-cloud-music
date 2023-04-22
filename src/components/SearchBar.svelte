<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher();
</script>

<t-view class="seach-bar" on:tap={() => dispatch('tap')}>
  <t-view class="input">
    <t-icon class="icon" type="search" size={14} color="#999" />
    <t-view class="text">搜索</t-view>
  </t-view>
</t-view>

<style lang="scss">
.seach-bar {
  position: relative;
  padding: 12px 18px;
  &::after {
    content: "";
    position: absolute;
    transform-origin: center;
    box-sizing: border-box;
    pointer-events: none;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    border: 0 solid #d6e4ef;
    transform: scale(0.5);
    border-bottom-width: 1PX;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    border-bottom-style: solid;
    border-bottom-color: rgb(214, 228, 239);
  }
}
.input {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12PX;
  height: 30PX;
  border-radius: 15PX;
  background-color: #F7F7F7;
}
.text {
  margin-left: 12PX;
  color: #999;
  font-size: 14PX;
}
</style>
