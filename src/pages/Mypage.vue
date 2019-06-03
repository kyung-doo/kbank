<template>
  <div class="mypage">

    <div class="contents_box">
      <div class="contentsBlock blockWhite">
        <div class="contentHead">
            <h2><i class="fas fa-user-alt mR5"></i> <span>이상민</span> 님의 마이페이지</h2>
            <p class="location"><i class="fas fa-home" style="margin:0;"></i> <i class="fas fa-angle-right"></i> 마이페이지 <i class="fas fa-angle-right"></i> 데이터 <i class="fas fa-angle-right"></i> 생산</p>
        </div>
        <div class="contentArticle clearfix">

          <div class="leftCon">
            <p class="setup"><a class="btn btn-s btn-default"><i class="fas fa-cog mR5"></i> 나의 통계 카테고리 관리</a></p>
            <ul class="lnb">
                <li class="">
                    <a @click="clickMain(0)">데이터</a>
                    <ul>
                      <li :class="{'active':i===0}" v-for="(list, i) in myDataList" :key="list.id">
                        <a @click="clickList(0,i)">⋅ {{ list.title }} ({{list.data.length}})</a>
                      </li>
                    </ul>
                </li>
                <li class="">
                    <a @click="clickMain(1)">그래프</a>
                    <ul>
                      <li v-for="(list, i) in myGraphList" :key="list.id">
                        <a @click="clickList(1,i)">⋅ {{ list.title }} ({{list.data.length}})</a>
                      </li>
                    </ul>
                </li>
                <li class="">
                    <a @click="clickMain(2)">대시보드</a>
                    <ul>
                      <li v-for="(list, i) in myDashboardList" :key="list.id">
                        <a @click="clickList(2,i)">⋅ {{ list.title }} ({{list.data.length}})</a>
                      </li>
                    </ul>
                </li>
            </ul>
          </div>

          <div class="rightCon">
            <div v-if="active1 === 0">
              <div class="titleBlock clearfix">
                  <h3><i class="far fa-folder-open"></i> - {{myDataList[active2].title}}</h3>

                  <p class="dataBtn">
                      <button type="button" class="btn btn-xs btn-white-line btn-short">삭제</button>
                      <button type="button" class="btn btn-xs btn-white-line btn-short">수정</button>
                  </p>
              </div>
              <table class="table-default">
                <colgroup>
                    <col style="width:60px;">
                    <col style="width:60px;">
                    <col style="width:120px;">
                    <col style="width:px;">
                    <col style="width:120px;">
                    <col style="width:120px;">
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" :id="'chk-'+active1+'-'+active2+'all'" class="input-check" v-model="checkAll"><label :for="'chk-'+active1+'-'+active2+'all'"><span class="hide">전체 선택</span></label></th>
                        <th>번호</th>
                        <th>구분</th>
                        <th>통계표명</th>
                        <th>최종갱신일</th>
                        <th>스크랩일</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, i) in setDataList" :key="i+1+((currentPage-1)*10)">
                    <td><input type="checkbox" :id="'chk-'+active1+'-'+active2+'-'+i" class="input-check" v-model="checked" :value="i"><label :for="'chk-'+active1+'-'+active2+'-'+i"><span class="hide">check</span></label></td>
                    <td>{{i+1+((currentPage-1)*10)}}</td>
                    <td>데이터</td>
                    <td class="text-left"><a>{{list.nick ? list.nick : list.series_nm}}</a></td>
                    <td>2019-03-29</td>
                    <td>2019-04-23</td>
                  </tr>
                  <tr v-if="setDataList.length == 0">
                    <td colspan="6" style="text-align:center">리스트가 없습니다.</td>
                  </tr>
                </tbody>
              </table>

              <paginate
                key="dataPage"
                ref="paginate"
                :page-count="totalPage"
                :click-handler="pageChange"
                prev-text="<i class='fas fa-angle-left'>"
                next-text="<i class='fas fa-angle-right'>"
                :first-last-button="true"
                first-button-text="<i class='fas fa-angle-double-left'>"
                last-button-text="<i class='fas fa-angle-double-right'>"
                :no-li-surround="true"
                :container-class="'paging'">
              </paginate>

              <div class="bbsSearch">
                  <select name="" id="">
                      <option value="">제목</option>
                  </select>
                  <input type="text">
                  <button type="submit" class="btn btn-m btn-default btn-short"><i class="fas fa-search mR5"></i> 검 색</button>
              </div>

            </div>

            <div v-else-if="active1 === 1">
              <div class="titleBlock clearfix">
                  <h3><i class="far fa-folder-open"></i> - {{myGraphList[active2].title}}</h3>

                  <p class="dataBtn">
                      <button type="button" class="btn btn-xs btn-white-line btn-short">삭제</button>
                      <button type="button" class="btn btn-xs btn-white-line btn-short">수정</button>
                      <button type="button" class="btn btn-xs btn-blue btn-short"><i class="fas fa-download mR5"></i> 대쉬보드에 추가</button>
                  </p>
              </div>
              <table class="table-default">
                <colgroup>
                    <col style="width:60px;">
                    <col style="width:60px;">
                    <col style="width:120px;">
                    <col style="width:px;">
                    <col style="width:120px;">
                    <col style="width:120px;">
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" :id="'chk-'+active1+'-'+active2+'all'" class="input-check" v-model="checkAll"><label :for="'chk-'+active1+'-'+active2+'all'"><span class="hide">전체 선택</span></label></th>
                        <th>번호</th>
                        <th>구분</th>
                        <th>통계표명</th>
                        <th>최종갱신일</th>
                        <th>스크랩일</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, i) in setDataList" :key="i+1+((currentPage-1)*10)">
                    <td><input type="checkbox" :id="'chk-'+active1+'-'+active2+'-'+i" class="input-check" v-model="checked" :value="i"><label :for="'chk-'+active1+'-'+active2+'-'+i"><span class="hide">check</span></label></td>
                    <td>{{i+1+((currentPage-1)*10)}}</td>
                    <td>그래프</td>
                    <td class="text-left"><a @click="clickGraph(i+((currentPage-1)*10))">{{ list.graphName }}</a></td>
                    <td>2019-03-29</td>
                    <td>2019-04-23</td>
                  </tr>
                  <tr v-if="setDataList.length == 0">
                    <td colspan="6" style="text-align:center">리스트가 없습니다.</td>
                  </tr>
                </tbody>
              </table>

              <paginate
                key="graphPage"
                ref="paginate"
                :page-count="totalPage"
                :click-handler="pageChange"
                prev-text="<i class='fas fa-angle-left'>"
                next-text="<i class='fas fa-angle-right'>"
                :first-last-button="true"
                first-button-text="<i class='fas fa-angle-double-left'>"
                last-button-text="<i class='fas fa-angle-double-right'>"
                :no-li-surround="true"
                :container-class="'paging'">
              </paginate>

              <div class="bbsSearch">
                  <select name="" id="">
                      <option value="">제목</option>
                  </select>
                  <input type="text">
                  <button type="submit" class="btn btn-m btn-default btn-short"><i class="fas fa-search mR5"></i> 검 색</button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>


    <!-- graph-pop -->
    <transition name="popup-ani">
      <Graph-popup 
        v-if="showGraphData"
        :idx1="active2"
        :idx2="selectGraphIdx"
        :data="showGraphData"
        @close="closeGraphPopup"  />
    </transition>
    <!-- //graph-pop -->

  </div>
</template>

<script>

import Paginate from 'vuejs-paginate'
import GraphPopup from '../components/GraphPopup'

export default {
  name: 'Mypage',


  components:{
    Paginate,
    GraphPopup
  },

  data() {
    return {
      myDataList: this.$store.state.myData,
      myGraphList: this.$store.state.myGraph,
      myDashboardList: this.$store.state.myDashboard,
      active1:0,
      active2:0,
      totalPage:1,
      currentPage:1,
      checked:[],
      mainSize:[],
      showGraphData: null,
      selectGraphIdx:0
    }
  },

  computed: {
    setDataList () {
      let data
      if(this.active1 === 0) {
        data = this.myDataList[this.active2].data.slice().reverse();
      } else if(this.active1 === 1) {
        data = this.myGraphList[this.active2].data.slice().reverse();
      }
      return data.slice(10*(this.currentPage-1), 10*(this.currentPage))
    },
    
    checkAll : {
      get () {
        if(this.setDataList.length === 0) return false
        return this.setDataList ? this.checked.length == this.setDataList.length : false;
      },
      set ( value ) {
        let checked = [];
        if( value ){
          this.setDataList.forEach(function ( item, i ) {
            checked.push(i);
          });
        }
        this.checked = checked;
      }
    
    }
  },

  mounted () {
    this.setPageNum()
    this.$el.querySelectorAll('.lnb > li').forEach( ( el ) => {
      el.style.height = el.offsetHeight+'px'
      this.mainSize.push(el.offsetHeight)
    })
  },

  methods : {
    
    clickMain ( idx ) {
      if(this.$el.querySelectorAll('.lnb > li')[idx].classList[0] == 'active') {
        this.$el.querySelectorAll('.lnb > li')[idx].classList.remove('active')
        this.$el.querySelectorAll('.lnb > li')[idx].style.height = this.mainSize[idx]+'px'
      } else {
        this.$el.querySelectorAll('.lnb > li')[idx].classList.add('active')
        this.$el.querySelectorAll('.lnb > li')[idx].style.height= '50px'
      }
    },

    clickList (idx1, idx2) {
      this.active1 = idx1
      this.active2 = idx2
      this.$el.querySelectorAll('.lnb > li').forEach( ( el1, i ) => {
        if(i == this.active1) {
          el1.querySelectorAll('ul > li').forEach( ( el2, j ) => {
            if(j == this.active2) {
              el2.classList.add("active")
            } else {
              el2.classList.remove("active")
            }
          });
        } else {
          el1.querySelectorAll('ul > li').forEach( ( el2, j ) => {
            el2.classList.remove("active")
         });
        }
      });
      this.checked = []
      this.currentPage = 1;
      this.setPageNum()
      
    },
    
    pageChange (page) {
      this.checked = []
      this.currentPage = page
    },

    

    setPageNum () {
      if(this.active1 === 0){
        const len = this.myDataList[this.active2].data.length
        this.totalPage = Math.ceil(len / 10)
      } else if(this.active1 === 1) {
        const len = this.myGraphList[this.active2].data.length
        this.totalPage = Math.ceil(len / 10)
      }
      this.$refs.paginate.selectFirstPage()
    },

    clickGraph ( idx ){
      const data = this.myGraphList[this.active2].data.slice().reverse()[idx];
      this.selectGraphIdx = this.$store.state.myGraph[this.active2].data.length-idx-1
      this.showGraphData = data
    },

    closeGraphPopup ( update ) {
      this.showGraphData = null
      if(update) {
        this.myGraphList = this.$store.state.myGraph
        const active = this.active2
        this.active2 = -1
        this.active2 = active
        this.$forceUpdate()
      }
    }
  }

  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .mypage{
      position: absolute;
      left:0;
      top:0;
      width:100%;
  } */

  a{
    cursor:pointer;
  }
/* ul{
  padding:0;
  margin:0;
  list-style: none;
}
.menu-con{
  float:left;
  width:200px;
  text-align: left;
  border:solid 1px #ccc;
  margin-left:50px;
}
.menu-con a{
  cursor: pointer;
}
.menu-con > ul > li > ul{
  margin-left:20px;
}
.menu-con > ul > li{
  padding:10px;
}
.menu-con > ul > li > ul > li{
  padding:10px;
}

.menu-con > ul > li.active .main-title{
  background-color:#ccc;
}

.menu-con > ul > li > ul > li.active .sub-title{
  background-color:#ccc;
}

.tabe-con {
  float:left;
  width:1000px;
  margin-left:50px;
}
table th,
table td{
  text-align:left;
  border-top: solid 1px #ccc;
  border-bottom:solid 1px #ccc;
  padding:10px 0;
}
table td a{
  cursor:pointer;
}
table td a:hover {
  text-decoration: underline;
} */


</style>
