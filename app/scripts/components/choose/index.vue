<template src="./choose-template.html"></template>
<style lang="scss" src="./choose-style.scss"></style>
<script>

  export default {
    name: 'choose-component',
    created() {
      fetch('/api/professors')
        .then(res => res.json())
        .then((data) => { this.tableData = data; });
    },
    data() {
      return {
        tableData: [],
        columns: ['name', 'last_name']
      };
    }
  };
</script>
