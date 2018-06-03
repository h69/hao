<template>
  <div class="admin">
    <el-table :data="items">
      <el-table-column label="Group">
        <template slot-scope="scope">
          <el-input v-model="scope.row.group" @input="onGroup(scope)" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template slot-scope="scope">
          <el-input v-model="scope.row.title" @input="onTitle(scope)" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="Href">
        <template slot-scope="scope">
          <el-input v-model="scope.row.href"  @input="onHref(scope) " spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="Content">
        <template slot-scope="scope">
          <el-input v-model="scope.row.content" @input="onContent(scope)" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column width="80">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="onDelete(scope)">删除</el-button>
      </template>
     </el-table-column>
    </el-table>

    <el-button class="write" size="mini" icon="el-icon-upload" @click="onWrite">同步<i ></i></el-button>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data: function () {
    return {
      items: []
    };
  },
  methods: {
    getDefaultData: function () {
      return { 
        group: '',
        title: '',
        href: '', 
        content: '' 
      };
    },
    onGroup: function (scope) {
      if (scope.$index == this.items.length - 1) {
        this.items.push(this.getDefaultData());
      }
    },
    onTitle: function (scope) {
      if (scope.$index == this.items.length - 1) {
        this.items.push(this.getDefaultData());
      }
    },
    onHref: function (scope) {
      if (scope.$index == this.items.length - 1) {
        this.items.push(this.getDefaultData());
      }
    },
    onContent: function (scope) {
      if (scope.$index == this.items.length - 1) {
        this.items.push(this.getDefaultData());
      }
    },
    onDelete: function (scope) {
      this.items.splice(scope.$index, 1);

      if (this.items.length == 0) {
         this.items.push(this.getDefaultData());
      }
    },
    onWrite: function () {
      var params = {
        items: this.items,
        token: this.$route.query.token
      };
 
      var $this = this;
      this.$http.post('/api/write', params).then(function (response) { 
        if (response.body == 'forbidden') {
          $this.$notify({ message: '无访问权限' });
          return;
        }

        if (response.body == 'success') {
          $this.$notify({ message: '同步成功' });
        } else {
          $this.$notify({ message: '同步失败' });
        }
      });
    }
  },
  created: function () {
    var params = {
      token: this.$route.query.token
    };

    var $this = this;
    this.$http.post('/api/read', params).then(function (response) { 
      if (response.body == 'forbidden') {
        $this.$notify({ message: '无访问权限' });
        return;
      } else {
        $this.$notify({ message: '验证通过' });
      }

      if (response.body == undefined || response.body == '') {
        $this.items.push($this.getDefaultData());
      } else {
        $this.items = response.body;
      }
    });
  }

};
</script>

<style>
div.admin div.part {
  margin-bottom: 100px;
}

div.admin p.group {
  font-size: 2.0em;
}

div.admin a { 
  text-decoration: none;
}

div.admin a:visited {   
  color: #409eff;   
}   

div.admin .write {
  margin-top: 50px;
  float: right;
}
</style>
