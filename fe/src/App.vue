<template>
  <div class="app">
    <el-row>
      <el-col :xs="3" :sm="4" :md="5" :lg="6" :xl="7"><div class="placeholder"></div></el-col>
      <el-col :xs="18" :sm="16" :md="14" :lg="12" :xl="10">
        <div>
          <div class="placeholder"></div>
          <router-view></router-view>
        </div>
      </el-col>
      <el-col :xs="3" :sm="4" :md="5" :lg="6" :xl="7"><div class="placeholder"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@font-face {
  font-family: Anurati;
  src: url('./assets/Anurati-Regular.otf');
}

* {
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

.placeholder {
  height: 50px;
}
</style>
