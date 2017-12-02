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
      fullData() {
        return this.getter && this.$store.getters[this.getter];
      },
      tableData() {
        return this.fullData.table || this.fullData.data || [];
      },
    },
    methods: {
      fetch() {
        if (this.tableData.length) return;

        this.actions.forEach(action => this.$store.dispatch(action.type, action.payload));
      },
      getRow(row) {
        const trueRow = this.fullData.table
          ? this.fullData.data.find(r => r.id === row.id)
          : row;
        return trueRow;
      },
      view(row) {
        this.$store.dispatch('setFormModel', {
          entity: this.$route.params.entity,
          model: this.getRow(row),
          isReadOnly: true
        });

        this.$router.push(`${this.$route.fullPath}/view/${row.id}`);
      },
      create() {
        const firstRow = { ...this.fullData.data[0] };
        const model = Object.keys(firstRow)
          .reduce((acc, key) => {
            if (key === 'id') return acc;
            const initialValue = {
              boolean: false,
              string: '',
              number: 0,
              object: null
            }[typeof firstRow[key]];
            return { ...acc, [key]: initialValue };
          }, {});
        this.$store.dispatch('setFormModel', {
          model,
          entity: this.$route.params.entity
        });

        this.$router.push(`${this.$route.fullPath}/new`);
      },
      edit(row) {
        this.$store.dispatch('setFormModel', {
          entity: this.$route.params.entity,
          model: this.getRow(row)
        });

        this.$router.push(`${this.$route.fullPath}/edit/${row.id}`);
      },
      remove(row) {
        this.$store.dispatch('setModal', {
          open: true,
          header: false,
          footer: false,
          autoSize: true,
          content: Alert,
          props: {
            title: `Are you sure you want to delete ${this.$route.params.entity} with id ${row.id || ''}?`,
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
                callback: () => {
                  this.$store.dispatch('removeEntityRow', {
                    id: row.id,
                    entity: this.$route.params.entity
                  });
                  this.$store.dispatch('resetModal');
                }
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
