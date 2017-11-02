<template src="./header-template.html"></template>
<style lang="scss" src="./header-style.scss"></style>
<script>
  import NavMenu from 'components/nav-menu';
  import datasource from 'datasource';

  export default {
    name: 'header-component',
    beforeRouteEnter(to, from, next) {
      next(vm => vm.readParams());
    },
    data() {
      return {
        expanded: false,
        pages: Object.keys(datasource)
      };
    },
    methods: {
      readParams() {
        const { params } = this.$route;
        if (params.datasource in datasource) {
          this.expanded = datasource[params.datasource].management || false;
        }
      },
      toggleSubmenu() {
        this.expanded = !this.expanded;
      },
    },
    watch: {
      $route: 'readParams'
    },
    components: {
      NavMenu,
    },
  };
</script>
