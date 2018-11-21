<template>
  <div class="browser">
    <el-tabs type="border-card">
      <div class="search">
        <el-input  placeholder="请输入搜索内容" v-model="input" spellcheck="false"></el-input>
      </div>

      <el-tab-pane label="Google">
        <iframe :src="'https://www.google.com/search?q=' + q"></iframe>
      </el-tab-pane>

      <el-tab-pane label="百度">
        <iframe :src="'https://www.baidu.com/s?wd=' + q"></iframe>
      </el-tab-pane>

      <el-tab-pane label="必应">
        <iframe :src="'https://cn.bing.com/search?q=' + q"></iframe>
      </el-tab-pane>

      <el-tab-pane label="搜狗">
        <iframe :src="'https://www.sogou.com/web?query=' + q"></iframe>
      </el-tab-pane>

      <el-tab-pane label="知乎">
        <iframe :src="'https://www.zhihu.com/search?q=' + q"></iframe>
      </el-tab-pane>

      <el-tab-pane label="KM">
        <iframe :src="'https://km.oa.com/search?q=' + q"></iframe>
      </el-tab-pane>

      <el-tab-pane label="GitHub">
        <iframe :src="'https://www.github.com/search?q=' + q"></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      q: '',
      input: ''
    }
  },
  created: function () {
    this.q = this.input = this.$route.query.q;
  },
  methods: {
  
  }
};
</script>

<style>
.browser .el-tabs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.browser .search {
  border-bottom: 1px solid #e4e7ed;
}

.browser .search .el-input__inner{
  border: none;
}

.browser .el-tabs__content {
  padding: 0;
  height: 100%;
}

.browser .el-tab-pane {
  height: calc(100% - 80px);
}

.browser iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
