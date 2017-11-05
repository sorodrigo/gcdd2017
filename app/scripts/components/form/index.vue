<template src="./form-template.html"></template>
<style lang="scss" src="./form-style.scss"></style>
<script>
  import 'vue-form-generator/dist/vfg.css';
  import capitalize from 'lodash/capitalize';
  import VueFormGenerator from 'vue-form-generator';
  import { mapState, mapGetters } from 'vuex';
  import debounce from 'lodash/debounce';

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
        formOptions: {
          validateDebounceTime: 500,
          validateAfterChanged: true,
        },
      };
    },
    computed: {
      ...mapState({
        model: ({ form }) => ({ ...form.model }),
        status: ({ form }) => form.status,
        error: ({ form }) => form.error,
      }),
      ...mapGetters({
        schema: 'getFormSchema'
      }),
      heading() {
        return capitalize(`${this.action} ${this.datasource}`);
      }
    },
    methods: {
      fetch() {
        this.$store.dispatch('getFormModel', {
          endpoint: this.datasource,
          id: this.id,
        });
      },
      onValidated: debounce(function debouncedOnValidate(valid) {
        if (valid) {
          this.$store.dispatch('updateFormModel', {
            endpoint: this.datasource,
            id: this.id,
            model: this.model
          });
          this.resetSuccess();
        }
      }, 1500),
      resetSuccess() {
        setTimeout(() => (this.$store.dispatch('setFormStatus', false)), 4500);
      }
    },
    watch: {
      $route: 'fetch',
      model() {
        this.$store.dispatch('setEntityRow', {
          entity: this.datasource,
          row: this.model
        });
      }
    },
    components: {
      Alert,
      'vue-form-generator': VueFormGenerator.component,
    }
  };
</script>
