<template>
  <div class="search">
    <div style="height:80px" />
    <h1> Timeseries Hub 검색 결과</h1>
    <div class="list-con">
      <ul>
        <li v-for="item in searchData" :key="item.id">
          <span>{{item.agency_id}} ( {{item.count}}건 )</span>
          <ul>
            <li v-for="list in item.dataset" :key="list.id">
              {{list.dataset_nm}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import data from '../../static/search.json'

export default {
    name: 'Search',

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
  .search{
      text-align: left;
      margin-left:100px;
  }
</style>
