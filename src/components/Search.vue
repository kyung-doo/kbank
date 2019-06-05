<template>
  <section id="searchResult">
      <div class="contents_box">
          <h3>Timeseries Hub 내 <span>'{{keyword}}'</span> 에 대한 검색결과</h3>
          <ul class="resultNum clearfix">
              <li v-for="item in searchData" :key="item.agency_id"><b>{{item.agency_id}} : </b><span>{{item.count}}</span>건</li>
          </ul>
          <div class="resultList">
            <dl v-for="item in searchData" :key="item.agency_id">
                <dt>- {{item.agency_id}} ({{item.count}}건)</dt>
                <dd v-for="list in item.dataset" :key="list.dataset_id">
                    <a href="#">{{list.dataset_nm}}</a>
                </dd>
              </dl>
          </div>
      </div>
  </section>
</template>

<script>
import data from '../../static/search.json'

export default {
    name: 'Search',
    props:['keyword'],
    data () {
      return {
        searchData: data
      }
    },

    created () {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
