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
      actions: {
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
      showEdit: {
        type: Boolean,
        required: true
      },
      showDelete: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      tableData() {
        return this.getter ? this.$store.getters[this.getter] : [];
      },
    },
    methods: {
      fetch() {
        if (this.tableData.length) return;

        this.actions.forEach(action => this.$store.dispatch(action.type, action.payload));
      },
      create() {
        const model = Object.assign({}, this.tableData[0]);
        Object.keys(model).forEach((field) => {
          model[field] = null;
        });
        this.$store.dispatch('setFormModel', {
          datasource: this.$route.params.datasource,
          model
        });

        this.$router.push(`${this.$route.fullPath}/new`);
      },
      edit(row) {
        this.$store.dispatch('setFormModel', {
          datasource: this.$route.params.datasource,
          model: row
        });

        this.$router.push(`${this.$route.fullPath}/edit/${row.id.toString()}`);
      },
      remove(row) {
        this.$store.dispatch('setModal', {
          open: true,
          header: false,
          footer: false,
          autoSize: true,
          content: Alert,
          props: {
            title: `Are you sure you want to delete ${row[this.columns[1]]}?`,
            subtitle: 'This action cannot be undone.',
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
