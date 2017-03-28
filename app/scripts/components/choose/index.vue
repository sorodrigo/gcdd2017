<template src="./choose-template.html"></template>
<style lang="scss" src="./choose-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'choose-component',
    created() {
      if (!this.courses.length) this.$store.dispatch('getCourses');
      if (!this.degrees.length) this.$store.dispatch('getDegrees');
    },
    data() {
      return {
        columns: ['id', 'name', 'grade', 'theory_credits', 'practical_credits']
      };
    },
    computed: {
      ...mapState({
        courses: state => state.courses.list,
        degrees: state => state.degrees.list
      })
    }
  };
</script>
