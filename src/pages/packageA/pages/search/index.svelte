<script>
  import SearchBar from '../../../../components/SearchBar'

  let searchValue = ''
</script>

<t-view class='search'>
  <!-- <SearchBar
    actionName='搜一下'
    value={searchValue}
    onChange={this.searchTextChange.bind(this)}
    onActionClick={this.searchResult.bind(this)}
    onConfirm={this.searchResult.bind(this)}
    focus={true}
    class='search__input'
    fixed={true}
  /> -->
  <!-- <t-scroll-view class='search_content' scroll-y={true}>
    {#if historyList.length}
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
    {/if}

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
        {#each hotList as item, index}
          <t-view
            class='search__hot__list__item flex flex-align-center'
            key={item.searchWord}
            onClick={this.goResult.bind(this, item.searchWord)}
          >
            <t-view class={
              classnames({
                search__hot__list__item__index: true,
                spec: index <= 2
              })
            }>
              {index + 1}
            </t-view>
            <t-view class='search__hot__list__item__info'>
              <t-view class="flex flex-align-center">
                <t-text class={
                  classnames({
                    search__hot__list__item__info__title: true,
                    spec: index <= 2
                  })
                }>
                  {item.searchWord}
                </t-text>
                <t-text class='search__hot__list__item__info__score'>
                  {item.score}
                </t-text>
                {#if item.iconUrl}
                  <t-image
                    src={item.iconUrl}
                    mode="widthFix"
                    class={
                      classnames({
                        search__hot__list__item__info__icon: true,
                        spec: item.iconType === 5
                      })
                    }
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
  </t-scroll-view> -->
</t-view>
