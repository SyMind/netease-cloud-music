<script lang="ts">
  import Taro from '@tarojs/taro'
  import api from '../../../../services/api'
  import Loading from '../../../../components/Loading.svelte'
  import SearchBar from '../../../../components/SearchBar.svelte'

  let searchValue = ''
  let historyList: any[] = []
  let hotList: any[] = []

  api.get('/search/hot/detail', {}).then((res) => {
    if (res.data && res.data.data) {
      hotList = res.data.data
    }
  })

  function goResult(keyword: string) {
    // setKeywordInHistory(keyword)
    Taro.navigateTo({
      url: `/pages/packageA/pages/searchResult/index?keywords=${keyword}`
    })
  }
</script>

<t-view class='search'>
  <SearchBar
    placeholder='搜一下'
    value={searchValue}
    focus={true}
    fixed={true}
    on:change={() => {}}
    on:tap={() => {}}
    on:confirm={() => {}}
  />

  <t-scroll-view class='search_content' scroll-y={true}>
    <!-- {#if historyList.length}
      <t-view class='search__history'>
        <t-view class='search__history__title'>
          <t-text class='search__history__title__label'>
            搜索历史
          </t-text>
          <AtIcon prefixClass='fa' value='trash-o' size='20' color='#cccccc' class='search__history__title__icon' onClick={this.clearKeywordInHistory.bind(this)}></AtIcon>
        </t-view>
        <t-scroll-view class='search__history__list' scroll-x={true}>
          {#each historyList as keyword}
            <t-text class='search__history__list__item' key={keyword} onClick={this.goResult.bind(this, keyword)}>{keyword}</t-text>
          {/each}
        </t-scroll-view>
      </t-view>
    {/if} -->

    <t-view class='search__hot'>
      <t-view class='search__history__title'>
        <t-text class='search__history__title__label'>
          热搜榜
        </t-text>
      </t-view>

      {#if !hotList.length}
        <Loading />
      {/if}

      <t-view class='search__hot__list'>
        {#each hotList as item, index (item.searchWord)}
          <t-view
            class='search__hot__list__item flex flex-align-center'
            on:tap={() => goResult(item.searchWord)}
          >
            <t-view
              class="search__hot__list__item__index"
              class:spec={index <= 2}
            >
              {index + 1}
            </t-view>
            <t-view class='search__hot__list__item__info'>
              <t-view class="flex flex-align-center">
                <t-text
                  class="search__hot__list__item__info__title"
                  class:spec={index <= 2}
                >
                  {item.searchWord}
                </t-text>
                <t-text class='search__hot__list__item__info__score'>
                  {item.score}
                </t-text>
                {#if item.iconUrl}
                  <t-image
                    src={item.iconUrl}
                    mode="widthFix"
                    class="search__hot__list__item__info__icon"
                    class:spec={item.iconType === 5}
                  />
                {/if}
              </t-view>
              <t-view class='search__hot__list__item__info__desc'>
                {item.content}
              </t-view>
            </t-view>
          </t-view>
        {/each}
      </t-view>
    </t-view>
  </t-scroll-view>
</t-view>

<style lang="scss">
  .search {
    color: #232323;
    position: relative;
    height: 100%;

    &_content {
      padding: 108px 36px 24px 36px;
      height: 100%;
      box-sizing: border-box;
    }
    &__history__list {
      width: 100%;
      height: 60px;
      white-space: nowrap;
      margin: 30px 0;
      &__item {
        padding: 10px 30px;
        font-size: 24px;
        background-color: #f8f8f8;
        color: #616161;
        border-radius: 30px;
        margin-right: 20px;
        display: inline-block;
      }
    }
    &__history__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__label {
        font-size: 32px;
      }
      &__icon {
        padding: 15px;
      }
    }
    &__hot {
      margin-top: 10px;
      &__list__item {
        margin: 30px 0;
      }
      &__list__item__index {
        font-size: 36px;
        font-weight: 700;
        margin-right: 40px;
        color: #9e9e9e;
        &.spec {
          color: #f13745;
        }
      }
      &__list__item__info {
        flex: 1;
        &__title {
          font-size: 36px;
          color: #4a4a4c;
          &.spec {
            font-weight: 700;
            color: #333237;
          }
        }
        &__score {
          font-size: 28px;
          color: #bbbbbb;
          margin-left: 20px;
        }
        &__icon {
          max-width: 60px;
          margin-left: 40px;
          &.spec {
            max-width: 30px;
          }
        }
        &__desc {
          font-size: 26px;
          color: #cccccc;
          margin-top: 10px;
        }
      }
    }
  }
</style>
