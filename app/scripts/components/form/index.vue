<template src="./form-template.html"></template>
<style lang="scss" src="./form-style.scss"></style>
<script>
  import 'vue-form-generator/dist/vfg.css';
  import capitalize from 'lodash/capitalize';
  import cloneDeep from 'lodash/cloneDeep';
  import VueFormGenerator from 'vue-form-generator';
  import { mapState } from 'vuex';

  import Alert from '../alert';

  export default {
    name: 'form-component',
    created() {
      if (!this.model) this.fetch();
    },
    props: {
      datasource: {
        type: String,
        required: true,
      },
      action: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        timeout: null,
        dispatchUpdate: false
      };
    },
    computed: {
      ...mapState({
        model: ({ form }) => form.model,
        status: ({ form }) => form.status,
        error: ({ form }) => form.error,
      }),
      schema() {
        const schema = cloneDeep(this.$store.getters.getFormSchema);
        let fields = [];
        if (schema.fields) {
          fields = schema.fields.map((field) => {
            if ('dispatch' in field) {
              return { ...field, set: this.buildDispatch(field) };
            }
            return field;
          });
        }
        return { fields };
      },
      heading() {
        return capitalize(`${this.action} ${this.datasource}`);
      }
    },
    methods: {
      buildDispatch({ model, dispatch }) {
        const set = (changes) => {
          this.dispatchUpdate = true;
          this.$store.dispatch('updateFormModel', {
            endpoint: this.datasource,
            id: this.id,
            model: { ...this.model, [model]: changes }
          });
        };
        return (m, v) => set(dispatch(m, v));
      },
      fetch() {
        this.$store.dispatch('getFormModel', {
          endpoint: this.datasource,
          id: this.id,
        });
      },
      throttle(callback, params) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          callback(...params);
        }, 2000);
      },
      onUpdateModel() {
        if (!this.dispatchUpdate) {
          this.throttle(this.$store.dispatch, ['updateFormModel', {
            endpoint: this.datasource,
            id: this.id,
            model: this.model
          }]);
        }
        this.dispatchUpdate = false;
        this.resetSuccess();
      },
      resetSuccess() {
        setTimeout(() => (this.$store.dispatch('setFormStatus', false)), 4500);
      }
    },
    watch: {
      $route: 'fetch',
    },
    components: {
      Alert,
      'vue-form-generator': VueFormGenerator.component,
    }
  };
</script>
