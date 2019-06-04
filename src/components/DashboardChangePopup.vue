<template>
    <div class="modal" tabindex="-1">
        <div class="modal-m">
          <div class="modal-content">
              <div class="modal-header">
                  <h1>그래프 순서변경</h1>
                  <button type="button" class="close" @click="closePopup">
                      <img src="/static/img/btn_popClose.png" alt="닫기">
                  </button>
              </div>
              <div class="modal-body">
                <draggable
                  class="graph-list list-group gray-box"
                  :list="dashBoardData"
                  ghost-class="ghost"
                  tag="ul">
                  <li class="series-item" v-for="(item, i) in dashBoardData" :key="i">
                      <span class="icon"><i class="fas fa-bars"></i></span>
                      <p class="tit" :title="item.series_nm">{{ item.graphName }}</p>
                      <p class="itemMenu">
                          <a class="list-del" @click="removeAt(i)"><i class="far fa-trash-alt"></i></a>
                      </p>
                  </li>
                </draggable>
                <p class="tC mT20">
                  <button type="button" class="btn btn-m btn-default" @click="savePopup">저장</button>
                  <button type="button" class="btn btn-m btn-white-line" @click="closePopup">취소</button>
                </p>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: 'DashboardChangePopup',
    components: {
      draggable
    },
    props: ['data','idx'],
    data () {
        return {
          dashBoardData: JSON.parse(JSON.stringify(this.data)).reverse(),
        }
    },

    methods: {
      closePopup () {
        this.$emit('close')
      },

      removeAt ( idx ) {
        this.dashBoardData.splice(idx, 1)
      },

      savePopup () {
        this.$store.state.myDashboard[this.idx].data = this.dashBoardData.reverse()
        this.closePopup()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
