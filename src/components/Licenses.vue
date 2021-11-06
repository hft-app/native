<template>
  <div v-once class="wrapper">
    <div class="list">
      <div class="container">
        <div v-for="license in licenses" class="license">
          <div class="title">
            {{ license.library }}
          </div>
          <pre>{{ license.text }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        licenses: [{
          library: 'fontawesome',
          text: require('raw-loader!@fortawesome/fontawesome-svg-core/LICENSE.txt').default
        }, {
          library: 'vue-fontawesome',
          text: require('raw-loader!@fortawesome/vue-fontawesome/LICENSE.txt').default
        }, {
          library: 'vue-18n',
          text: require('raw-loader!vue-i18n/LICENSE').default
        }, {
          library: 'vue-router',
          text: require('raw-loader!vue-router/LICENSE').default
        }, {
          library: 'vue',
          text: require('raw-loader!vue/LICENSE').default
        }, {
          library: 'vuex',
          text: require('raw-loader!vuex/LICENSE').default
        }, {
          library: 'vuex-persist',
          text: require('raw-loader!vuex-persist/LICENSE.md').default
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../colors";

  .license {
    .title {
      font-weight: bold;
    }

    pre {
      font-size: 12px;
      white-space: pre-wrap;
    }

    + .license {
      margin-top: 24px;
    }
  }

</style>
