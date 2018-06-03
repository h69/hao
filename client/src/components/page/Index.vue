<template>
  <div class="index">
    <div v-for="(item, key) in items" v-bind:key="key" class="part">
      <p class="group"> {{ item.group }} </p>

      <table class="table">
        <tbody>
          <tr v-for="(item, key) in item.items" v-bind:key="key">
            <td class="title"><a :href="item.href">{{ item.title }}</a></td>
            <td class="content">{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      items:[]
    }
  },
  created: function () {
    var $this = this;

    this.$http.post('/api/get').then(function (response) { 
      $this.items = response.body;
    });
  }
};
</script>

<style>
div.index div.part {
  margin-bottom: 100px;
}

div.index p.group {
  font-size: 1.5em;
}

div.index table {
  border-collapse: collapse;
  width: 100%;
  font-size: 1.0em;
  word-break:break-all; 
}

div.index th, td {
  border-bottom: 1px solid #d8d8d8;
  padding: 20px;
}

div.index td.title {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
}

div.index a { 
  text-decoration: none;
}

div.index a:visited {   
  color: #409eff;   
}   
</style>
