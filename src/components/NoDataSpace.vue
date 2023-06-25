<template>
    <div class="container">
        <span class="title"><slot name="title"></slot></span>
    </div>
</template>
<script>
export default {
    name:'NoDataSpace'
}
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 300px;
    background-image: url('../assets/img/NoData.png');
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .title{
        color: black;
    font-size: 30px;
    font-weight: 400;
    font-family: cursive;
    }
}
</style>