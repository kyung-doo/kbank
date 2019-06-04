<template>
    <div class="modal" tabindex="-1">
        <div class="modal-m">
          <div class="modal-content">
              <div class="modal-header">
                  <h1>대시보드 추가</h1>
                  <button type="button" class="close" @click="closePopup">
                      <img src="/static/img/btn_popClose.png" alt="닫기">
                  </button>
              </div>
              <div class="modal-body">
                <Category-menu ref="dataCategory" type="dashboard" />

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
import CategoryMenu from '../components/CategoryMenu'

export default {
    name: 'DashboardAddPopup',
    components: {
      CategoryMenu
    },
    props: ['data'],
    data () {
        return {
          
        }
    },

    methods: {
      closePopup () {
        this.$emit('close')
      },

      savePopup () {
        const selectList = this.$refs.dataCategory.getSelectCategory()
        if(selectList.length > 0) {
            this.data.forEach(( item ) => {
                
            })  
            const datas = this.$store.state.myDashboard;
            selectList.forEach( ( idx ) => {
                datas[idx].data = datas[idx].data.concat(this.data.reverse())
            })
            this.$store.commit('setMyDashboard', datas)
            alert('저장되었습니다.')
            this.closePopup()
        } else {
          alert('카테고리를 선택해 주세요.')
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
