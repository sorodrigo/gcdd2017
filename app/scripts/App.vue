<template>
  <div id="app">
    <header class="l-header">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view></router-view>
    </main>
    <footer class="l-footer">
      <router-view></router-view>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/settings';

  .l-header {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: transparent;
  }

  .l-main {
    position: relative;
  }

  .l-footer {
    min-height: $footer-height;
    position: relative;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

