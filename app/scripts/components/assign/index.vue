<template src="./assign-template.html"></template>
<style lang="scss" src="./assign-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'assign-component',
    created() {
      if (!this.courses.length) this.$store.dispatch('getCourses');
      if (!this.degrees.length) this.$store.dispatch('getDegrees');
    },
    data() {
      return {
        columns: ['id', 'name', 'year', 'estimate', 'valid']
      };
    },
    computed: {
      ...mapState({
        courses: state => state.courses.list,
        degrees: state => state.degrees.list.map(degree => ({
          ...degree,
          valid: JSON.stringify(degree.valid)
        }))
      })
    }
  };
</script>
