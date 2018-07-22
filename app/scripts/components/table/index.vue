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
      prefetch: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        required: true
      },
      mapRelations: {
        type: Boolean
      },
      showCreate: {
        type: [Boolean, Object],
        default: true
      },
      showView: {
        type: [Boolean, Object],
        default: true
      },
      showEdit: {
        type: [Boolean, Object],
        default: true
      },
      showDelete: {
        type: [Boolean, Object],
        default: true
      }
    },
    computed: {
      ...mapState({
        user: state => (state.authentication.payload)
      }),
      fullData() {
        const getter = this.mapRelations ? 'getEntityWithRelations' : 'getEntity';
        return this.$store.getters[getter];
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
      tableColumns() {
        return [...this.columns, 'actions'];
      }
    },
    methods: {
      fetch() {
        if (this.tableData.length > 0 && this.prefetch.length === 0) return;
        const { entity } = this.$route.params;
        [entity, ...this.prefetch].forEach(dependency => this.$store.dispatch('fetchEntity', dependency));
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
