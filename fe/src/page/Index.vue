<template>
  <div class="index">
    <!-- Logo -->
    <div class="logo">
      <span class="blue">h</span>
      <span class="red">a</span>
      <span class="yellow">o</span>  
    </div>

    <!-- Search -->
    <el-input class="search" placeholder="" spellcheck="false" autofocus="true" v-model="input" @keyup.enter.native="onSearch">
      <el-select v-model="engine" slot="prepend" placeholder="Select" @change="onSearch(false)">
        <el-option-group label="Search">
          <el-option label="Google" value="google"></el-option>
          <el-option label="Baidu" value="baidu"></el-option>
          <el-option label="Bing" value="bing"></el-option>
        </el-option-group>

        <el-option-group label="Program">
          <el-option label="GitHub" value="github"></el-option>
          <el-option label="SegmentFault" value="segmentfault"></el-option>
          <el-option label="StackOverflow" value="stackoverflow"></el-option>
        </el-option-group>

        <el-option-group label="Design">
          <el-option label="Dribbble" value="dribbble"></el-option>
          <el-option label="IconFont" value="iconfont"></el-option>
          <el-option label="Huaban" value="huaban"></el-option>
        </el-option-group>

        <el-option-group label="Knowledge">
          <el-option label="Zhihu" value="zhihu"></el-option>
          <el-option label="Baike" value="baike"></el-option>
          <el-option label="WiKi" value="wiki"></el-option>
        </el-option-group>

        <el-option-group label="Hot">
          <el-option label="Twitter" value="twitter"></el-option>
          <el-option label="Weibo" value="weibo"></el-option>
          <el-option label="Toutiao" value="toutiao"></el-option>
        </el-option-group>

        <el-option-group label="Video">
          <el-option label="YouTube" value="youtube"></el-option>
          <el-option label="Tencent" value="v"></el-option>
          <el-option label="Bilibili" value="bilibili"></el-option>
        </el-option-group>
      </el-select>
      
      <el-button slot="append" icon="el-icon-search" @click="onSearch(true)"></el-button>
    </el-input>

    <!-- Website -->
    <el-tabs class="website" v-model="currentTabName" @tab-click="onTabClick">
      <el-tab-pane v-for="(item, index) in data" :key="index" :label="item.tag">
        <el-row v-for="row in Math.ceil(item.data.length / cols)" :key="row">
          <el-col v-for="col in cols" :key="col" v-if="(col - 1) + (row - 1) * cols < item.data.length" :span="24 / cols">
            <a target="_blank" :href="item.data[(col - 1) + (row - 1) * cols].href"><i class="el-icon-document"></i>{{ item.data[(col - 1) + (row - 1) * cols].title }}</a>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      engine: '',
      input: '',
      currentTabName: '',
      cols: 3,
      data: []
    }
  },
  created: function () {
    if (process.env.NODE_ENV === "development") {
      this.data = this.parse(require('../test/data.json'))
      return
    }

    var $this = this;

    this.$http.post('/api/getData').then(function (response) { 
      $this.data = $this.parse(response.body);

      if (window.localStorage.getItem('currentTabName')) {
        $this.currentTabName = window.localStorage.getItem('currentTabName') > $this.data.length - 1 ? '0' : window.localStorage.getItem('currentTabName');
      } else {
        $this.currentTabName = '0';
      }
      window.localStorage.setItem('currentTabName', $this.currentTabName);
    });

    this.engine = window.localStorage.getItem('engine');
    if (!this.engine) {
      this.engine = 'google'
    }
  },
  methods: {
    onSearch: function (click) {
      if (click || this.input) {
        if (this.engine === 'google') {
          this.goto('https://www.google.com/search?q=');
        } else if (this.engine === 'baidu') {
          this.goto('https://www.baidu.com/s?wd=');
        } else if (this.engine === 'bing') {
          this.goto('https://cn.bing.com/search?q=');
        } else if (this.engine === 'github') {
          this.goto('https://www.github.com/search?q=');
        } else if (this.engine === 'segmentfault') {
          this.goto('https://segmentfault.com/search?q=');
        } else if (this.engine === 'stackoverflow') {
          this.goto('https://stackoverflow.com/search?q=');
        } else if (this.engine === 'dribbble') {
          this.goto('https://dribbble.com/search?q=');
        } else if (this.engine === 'iconfont' ) {
          this.goto('http://www.iconfont.cn/search/index?q=')
        } else if (this.engine === 'huaban') {
          this.goto('http://huaban.com/search/?q=');
        } else if (this.engine === 'zhihu') {
          this.goto('https://www.zhihu.com/search?q=');
        } else if (this.engine === 'baike') {
          this.goto('https://baike.baidu.com/item/');
        } else if (this.engine === 'wiki') {
          this.goto('https://zh.wikipedia.org/wiki/');
        } else if (this.engine === 'twitter') {
          this.goto('https://twitter.com/search?q=');
        } else if (this.engine === 'weibo') {
          this.goto('https://s.weibo.com/weibo?q=');
        } else if (this.engine === 'toutiao') {
          this.goto('https://www.toutiao.com/search/?keyword=');
        } else if (this.engine === 'youtube') {
          this.goto('https://www.youtube.com/results?search_query=');
        } else if (this.engine === 'v') {
          this.goto('https://v.qq.com/x/search/?q=');
        } else if (this.engine === 'bilibili') {
          this.goto('https://search.bilibili.com/all?keyword=');
        }
      } 
      
      window.localStorage.setItem('engine', this.engine);
    },
    onTabClick: function () {
      window.localStorage.setItem('currentTabName', this.currentTabName);
    },
    goto: function (url) {
      window.open(url + this.input);
    },
    parse: function (rows) {
      let data = []
      
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].tag && rows[i].title && rows[i].href) {
          let flag = true;
          
          for (let j = 0; j < data.length; j++) {
            if (data[j].tag === rows[i].tag) {
              data[j].data.push({
                title: rows[i].title,
                href: rows[i].href
              });
              flag = false;
              break;
            } 
          }

          if (flag) {
            data.push({
              tag: rows[i].tag,
              data: [{
                title: rows[i].title,
                href: rows[i].href
              }]
            });
          }
        }
      }

      return data
    },
  }
};
</script>

<style>
.index .logo {
  margin-top: 50px;
  text-align: center;
}

.index .logo span {
  font-family: Anurati;
  font-size: 80px;
}

.index .blue {
  color: #4285f4;
}

.index .red {
  color: #EA4335;
}

.index .yellow {
  color: #FBBC05;
}

.index .search {
  margin-top: 50px;
}

.index .search .el-input-group__prepend {
  background-color: #fff;
  width: 70px;
}

.index .search .el-input-group__append {
  background-color: #fff;
}

.index .search > .el-input__inner,
.index .search > .el-input__inner:hover,
.index .search > .el-input__inner:focus {
  border: 1px solid #dcdfe6;
  border-right: none;
}

.index .website {
  margin-top: 50px;
}

.index .website .el-col {
  padding: 10px;
}

.index .website .el-col:hover {
  background: #F5F5F5;
}

.index .website i {
  margin-right: 10px;
}

.index .website a,
.index .website a:link,
.index .website a:visited,
.index .website a:hover,
.index .website a:active {
  display: block;   
  white-space: nowrap;
  text-decoration: none;
  overflow: hidden;   
  text-overflow: ellipsis;
  word-break: keep-all; 
  color: #000;
}
</style>
