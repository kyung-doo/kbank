<template>
  <div class="main">
      <div>
        <div style="height:80px" />
        <input type="text" />
        <button v-on:click="clickSearch">검색</button>
      </div>
  </div>
</template>

<script>


export default {
    name: 'Main',

    methods: {
        clickSearch () {
            this.$router.push('Search')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
      
      text-align: center;
  }
</style>
