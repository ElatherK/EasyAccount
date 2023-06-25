<template>
    <div class="container">
        <div class="header">
            <div class="icon">
                <a-avatar>User</a-avatar>
            </div>
            <div class="nav">
                <div @click="jump('view-account')" :class="[activeKey=='view-account'?'active':'normal']">查看账单</div>
                <div @click="jump('account-analysis')" :class="[activeKey=='account-analysis'?'active':'normal']">账单分析</div>
                <div @click="jump('add-account')" :class="[activeKey=='add-account'?'active':'normal']">增加账单</div>
            </div>
            <div class="func"></div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:'HomeView',
    data(){
        return{
            activeKey:'view-account'
        }
    },
    methods:{
        jump(key){
            this.activeKey = key
            this.$router.push({
                name:this.activeKey
            })
        }
    },
    mounted(){
        console.log(this.$route);
        this.$router.push({
            name:this.activeKey
        })
    }
}
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    .header{
        background-color: #1e1b29;
        height: 124px;
        border-bottom: solid gray 1px;
        display: flex;
        justify-content:space-around;
        align-items: center;
        .nav{
            display: flex;
            gap:75px;
            div {
                color:#999;
                cursor: pointer;
            }
            .active{
              font-size: 25px;
            }
            .normal{
                font-size: 18px;
            }
        }
    }
    
}
</style>