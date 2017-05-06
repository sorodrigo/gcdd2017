<template src="./table-template.html"></template>
<style lang="scss" src="./table-style.scss"></style>
<script>
  import Alert from '../alert';

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
      },
      remove(row) {
        this.$store.dispatch('setModal', {
          open: true,
          header: false,
          footer: false,
          autoSize: true,
          content: Alert,
          props: {
            title: `Are you sure you want to delete ${row.name}?`,
            subtitle: 'This action cannot be undone',
            actions: [
              {
                name: 'Cancel',
                type: 'warning',
                callback: () => this.$store.dispatch('resetModal')
              },
              {
                name: 'Delete',
                type: 'danger',
                callback: () => console.warn(row)
              }
            ],
          },
        });
      }
    },
    watch: {
      $route: 'fetch',
    }
  };
</script>
