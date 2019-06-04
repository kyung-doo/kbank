<template>
    <div class="category-menu">
        <h2 class="title sub-title clearfix">
            <span class="fL" v-if="type === 'data'"><i class="fas fa-chart-pie mR5"></i> 데이터</span>
            <span class="fL" v-else><i class="fas fa-chart-bar mR5"></i> 그래프</span>
            <button class="btn btn-default btn-xs fR" v-show="!isEdit" @click="clickEditor">편집</button>
            <button class="btn btn-white-line btn-xs fR" v-show="isEdit" @click="compEditor">완료</button>
            <button class="btn btn-default btn-xs fR" v-show="isEdit" @click="addMenuList">카테고리 추가</button>
        </h2>
        <div class='menu-area gray-box' data-simplebar>
            <draggable
                ref="drag1"
                :class="['list-group','menu-sort']"
                :list="menuData"
                handle=".icon"
                ghost-class="ghost"
                tag="ul" 
                @change="onDropArea">
                
                <li class="menu-item" v-for="(item, i) in menuData" :key="item.title">
                    <span class="icon" v-show="isEdit"><i class="fas fa-bars"></i></span>
                    <input type="checkbox" class="input-check" :id="'chk-'+i" v-model="checkList" :value="i" v-show="!isEdit">
                    <label :for="'chk-'+i" v-show="!isEdit">{{ item.title }}</label>
                    <input type="text" maxlength="10" placeholder="이름을 입력해 주세요" v-model.lazy="item.title" v-show="isEdit">
                    <span class="item_btn" v-show="isEdit">
                        <button class="del-btn mL10" @click="clickDel(i)"><i class="far fa-trash-alt"></i></button>
                    </span>
                </li>
                
            </draggable>
        </div>
    </div>
</template>

<script>

import draggable from "vuedraggable";

export default {
    name: 'CategoryMenu',
    components: {
        draggable
    },
    props: ["type"],
    data () {
        return {
            menuData:[],
            checkList:[],
            isEdit: false
        }
    },

    created () {
        if(this.type==='data') {
            this.menuData = JSON.parse(JSON.stringify(this.$store.state.myData))
        } else if(this.type === 'graph') {
            this.menuData = JSON.parse(JSON.stringify(this.$store.state.myGraph))
        } else if(this.type === 'dashboard') {
            this.menuData = JSON.parse(JSON.stringify(this.$store.state.myDashboard))
        }
    },

    methods : {
        addMenuList () {
            this.menuData.push({
                title: '카테고리'+ (this.menuData.length+1),
                data:[]
            })
        },

        clickEditor () {
            this.checkList = []
            this.isEdit = true
        },

        compEditor () {
            this.isEdit = false
            if(this.type==='data') {
                this.$store.commit('setMyData', this.menuData)
            } else if(this.type === 'graph') {
                this.$store.commit('setMyGraph', this.menuData)
            } else if(this.type === 'dashboard') {
                this.$store.commit('setMyDashboard', this.menuData)
            }
        },

        clickDel ( idx ) {
            this.checkList = []
            this.menuData.splice(idx, 1);
        },

        onDropArea ( e ) {

        },

        getSelectCategory() {
            return this.checkList;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
