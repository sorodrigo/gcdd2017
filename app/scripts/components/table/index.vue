<template src="./table-template.html"></template>
<style lang="scss" src="./table-style.scss"></style>
<script>
  import { mapState } from 'vuex';
  import get from 'lodash/get';
  import Alert from '../alert';
  import tableSchema from '../../table.schema.json';

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
      showView: {
        type: [Boolean, Object],
        default: true
      },
      showEdit: {
        type: [Boolean, Object],
        required: true
      },
      showDelete: {
        type: [Boolean, Object],
        required: true
      }
    },
    computed: {
      ...mapState({
        user: state => (state.authentication.payload)
      }),
      fullData() {
        return this.getter && this.$store.getters[this.getter];
      },
      tableData() {
        const tableData = this.fullData.table && this.fullData.table.map((row) => {
          let newRow = {};
          Object.entries(row).forEach(([key, value]) => {
            const config = tableSchema[this.$route.params.entity][key];
            if (config && config.format && value) {
              // can't be null only undefined
              const locale = config.format[0] || undefined;
              const options = config.format[1] || undefined;
              const isDate = !!config.format[2];
              let formattedValue = value.toLocaleString(locale, options);
              if (isDate) {
                formattedValue = (new Date(value)).toLocaleDateString(locale, options);
              }
              newRow = {
                ...newRow,
                [key]: formattedValue
              };
            } else {
              newRow = { ...newRow, [key]: value };
            }
          });
          return newRow;
        });
        return tableData || this.fullData.data || [];
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
      canPerform(action) {
        if (typeof action === 'boolean') return action;
        return get(this.user, action.path) === action.value;
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
