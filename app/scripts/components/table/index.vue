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
        type: [String, Array],
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
        if (this.tableData.length) return;

        if (Array.isArray(this.action)) {
          this.action.forEach(action => this.$store.dispatch(action));
        } else {
          this.$store.dispatch(this.action);
        }
      },
      edit(row) {
        console.log(row);
      }
    },
    watch: {
      $route: 'fetch',
    }
  };
</script>
