<template src="./header-template.html"></template>
<style lang="scss" src="./header-style.scss"></style>
<script>
  import { mapState } from 'vuex';
  import { entities, auth } from 'app/datasource.schema.json';
  import NavMenu from 'components/nav-menu';

  export default {
    name: 'header-component',
    beforeRouteEnter(to, from, next) {
      next(vm => vm.readParams());
    },
    data() {
      return {
        expanded: false,
        hasAuth: !!auth
      };
    },
    computed: mapState({
      pages: state => Object.keys(state.entities.data),
      loggedIn: state => state.authentication.loggedIn
    }),
    methods: {
      readParams() {
        const { params } = this.$route;
        if (this.pages.includes(params.entity)) {
          this.expanded = typeof entities[params.entity] !== 'undefined';
        }
      },
      toggleSubmenu() {
        this.expanded = !this.expanded;
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.history.replace('/login');
      }
    },
    watch: {
      $route: 'readParams'
    },
    components: {
      NavMenu,
    },
  };
</script>
