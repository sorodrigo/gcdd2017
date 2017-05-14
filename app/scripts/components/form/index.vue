<template src="./form-template.html"></template>
<style lang="scss" src="./form-style.scss"></style>
<script>
  import 'vue-form-generator/dist/vfg.css';
  import capitalize from 'lodash/capitalize';
  import { mapState } from 'vuex';
  import Alert from '../alert';

  export default {
    name: 'form-component',
    created() {
      if (Object.keys(this.model).length === 0) this.fetch();
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
      };
    },
    computed: {
      ...mapState({
        model: ({ form }) => ({ ...form.model }),
        status: ({ form }) => form.status,
        error: ({ form }) => form.error,
      }),
      schema() {
        return this.$store.getters.getFormSchema;
      },
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
      throttle(callback, params) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          callback(...params);
        }, 2000);
      },
      onUpdateModel() {
        this.throttle(this.$store.dispatch, ['updateFormModel', {
          endpoint: this.datasource,
          id: this.id,
          model: this.model
        }]);
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
    }
  };
</script>
