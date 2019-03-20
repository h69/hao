<template>
  <div class="admin">
    <el-table :data="data">
      <el-table-column label="Tag">
        <template slot-scope="scope">
          <el-input v-model="scope.row.tag" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="Title">
        <template slot-scope="scope">
          <el-input v-model="scope.row.title" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="Href">
        <template slot-scope="scope">
          <el-input v-model="scope.row.href" spellcheck="false"></el-input>
        </template>
      </el-table-column>

      <el-table-column width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="onAdd(scope)">Add</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button class="submit" type="primary" @click="onSubmit">Submit</el-button>
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
        tag: '',
        title: '',
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
      if (process.env.NODE_ENV === "development") {
        this.$message({ message: 'Test', type: 'info' });
        return
      }

      var params = {
        data: this.data,
        p: this.$route.query.p
      };
 
      var $this = this;
      this.$http.post('/api/submit', params).then(function (response) { 
        if (response.body == 'forbidden') {
          $this.$message({ message: 'Forbidden', type: 'error' });
          return;
        }

        if (response.body == 'success') {
          $this.$message({ message: 'Success', type: 'success' });
        } else {
          $this.$message({ message: 'Failure', type: 'error' });
        }
      });
    }
  },
  created: function () {
    if (process.env.NODE_ENV === "development") {
      this.data = require('../test/data.json')
      return
    }

    var params = {
      p: this.$route.query.p
    };

    var $this = this;
    this.$http.post('/api/getData', params).then(function (response) { 
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
