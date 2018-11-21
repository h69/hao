<template>
  <div class="admin">
    <el-table :data="data">
      <el-table-column label="网站标签">
        <template slot-scope="scope">
          <el-input v-model="scope.row.label" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="网站名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="网站地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.href" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="onAdd(scope)">添加</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button class="submit" type="primary" @click="onSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data: function () {
    return {
      data: []
    };
  },
  methods: {
    getDefaultData: function () {
      return { 
        label: '',
        name: '',
        href: '', 
      };
    },
    onAdd: function (scope) {
      this.data.splice(scope.$index + 1, 0, this.getDefaultData());
    },
    onDelete: function (scope) {
      this.data.splice(scope.$index, 1);

      if (this.data.length == 0) {
        this.data.push(this.getDefaultData());
      }
    },
    onSubmit: function () {
      var params = {
        data: this.data,
        p: this.$route.query.p
      };
 
      var $this = this;
      this.$http.post('/api/submit', params).then(function (response) { 
        if (response.body == 'forbidden') {
          $this.$message({ message: '无访问权限', type: 'error' });
          return;
        }

        if (response.body == 'success') {
          $this.$message({ message: '提交成功', type: 'success' });
        } else {
          $this.$message({ message: '提交失败', type: 'error' });
        }
      });
    }
  },
  created: function () {
    var params = {
      p: this.$route.query.p
    };

    var $this = this;
    this.$http.post('/api/getAdminData', params).then(function (response) { 
      if (response.body == 'forbidden') {
        $this.$message({ message: '无访问权限', type: 'error' });
        return;
      } 

      if (response.body == undefined || response.body.length === 0) {
        $this.data.push($this.getDefaultData());
      } else {
        $this.data = response.body;
      }
    });
  }
};
</script>

<style>
.admin .submit {
  margin-top: 50px;
  margin-bottom: 50px;
  float: right;
}
</style>
