<template src="./table-template.html"></template>
<style lang="scss" src="./table-style.scss"></style>
<script>
  export default {
    name: 'table-component',
    created() {
      this.fetch();
    },
    props: {
      heading: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      getter: {
        type: String,
        required: true
      },
    },
    computed: {
      tableData() {
        return this.getter ? this.$store.getters[this.getter] : [];
      },
    },
    methods: {
      fetch() {
        if (!this.tableData.length) this.$store.dispatch(this.action);
      }
    },
    watch: {
      $route: 'fetch',
    }
  };
</script>
