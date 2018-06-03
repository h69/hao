<template>
  <el-row>
    <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="5"><div class="margin"></div></el-col>
    <el-col :xs="22" :sm="20" :md="18" :lg="16" :xl="14">
      <div>
        <div class="placeholder"></div>
        <router-view></router-view>
      </div>
    </el-col>
    <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="5"><div class="margin"></div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
* {
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

.margin {
  height: 1px;
}

.placeholder {
  height: 50px;
}
</style>
