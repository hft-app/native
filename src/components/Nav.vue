<template>
  <div class="body">
    <header v-if="!$route.meta.hideNav">
      <div class="container">
        <a v-if="!!$route.meta.canGoBack" @click="$router.back()">
          <fa-icon class="menu icon" icon="arrow-left" />
        </a>
        <router-link v-else to="menu">
          <fa-icon class="menu icon" icon="bars" />
        </router-link>
        <div class="title">
          <span class="light">Hochschule </span>
          <span class="bold">für&nbsp;Technik</span>
        </div>
        <fa-icon class="refresh icon" :class="{'icon-spin': refreshing}" icon="sync-alt" @click="refresh" />
      </div>
    </header>
    <!--  <transition name="next">-->
    <router-view :class="{main: !$route.meta.hideNav}" />
    <!--</transition>-->

    <transition name="fly-bottom">
      <div v-if="error" class="toast" @click="error = null">
        <div class="inner">
          <div class="visual">
            <fa-icon class="icon" icon="exclamation-triangle" />
          </div>
          <div class="text">
            {{ $t('error.' + error.type) }}
          </div>
        </div>
      </div>
    </transition>

    <footer v-if="!$route.meta.hideNav">
      <div class="container">
        <router-link v-for="route in routes" :key="route.name"
                     v-slot="{navigate, isActive}" :to="route.link">
          <a :class="{active: isActive}" @click="navigate">
            <fa-icon class="icon" :icon="route.icon" />
            <span class="title">{{ $t('page.' + route.name + '.tab') }}</span>
          </a>
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {getErrorInfo} from '../stores/util';

  export default {
    data() {
      return {
        error: null,
        routes: [{
          icon: 'home',
          name: 'home',
          link: 'home'
        }, {
          icon: 'utensils',
          name: 'meals',
          link: 'meals'
        }, {
          icon: 'clock',
          name: 'lectures',
          link: 'timetable'
        }, {
          icon: 'calendar',
          name: 'events',
          link: 'events'
        }, {
          icon: 'graduation-cap',
          name: 'exams',
          link: 'exams'
        }]
      }
    },
    computed: mapState(['refreshing']),
    methods: {
      async refresh() {
        this.error = null;
        clearTimeout(this.$options.toastTimeout);
        try {
          await this.$store.dispatch('refresh', {force: true});
        } catch (e) {
          this.error = getErrorInfo(e);
          this.$options.toastTimeout = setTimeout(() => this.error = null, 2500)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../colors';

  .toast {
    position: fixed;
    z-index: 9999;
    width: 100%;
    bottom: 64px;

    .inner {
      position: relative;
      text-align: center;
      margin: 10px auto;
      min-height: 55px;
      width: 100%;
      max-width: 380px;
      background-color: #FFFFFFC0;
      backdrop-filter: blur(3px);
      box-shadow: $shadow;
      overflow: hidden;
      border-radius: 4px;
      display: flex;

      .visual {
        background-color: $primary;
        color: #FFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0.6em 0;
        width: 3.5em;
        overflow: hidden;

        .icon {
          width: 2em;
          height: 2em;
        }
      }

      .text {
        padding: 0.5em 0.8em;
        color: #666;
        text-align: left;
      }
    }
  }

  .fly-bottom-enter-active {
    animation: fly-bottom-in .4s;
    animation-timing-function: ease-out;
  }

  .fly-bottom-leave-active {
    animation: fly-bottom-in .4s reverse;
    animation-timing-function: ease-in;
  }

  @keyframes fly-bottom-in {
    0% {
      transform: translateY(200px);
    }

    100% {
      transform: translateY(0);
    }
  }

  p {
    margin: 0;
    line-height: 1.4;

    & + p {
      margin-top: 6px;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .body {
    max-height: 100%;
  }

  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 400px;
    padding: 0 15px;
  }

  .wrapper {
    flex-grow: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: $background;
    display: flex;
    flex-direction: column;
  }

  header {
    background: linear-gradient($primary, darken($primary, 3%));
    color: #FFF;
    z-index: 10;
    box-shadow: $shadow;
    font-size: 22px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    .container {
      position: relative;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    a {
      padding: 6px;
      line-height: 1;
    }

    .title {
      padding: 0 8px;
      font-weight: 300;
    }
  }

  .main {
    position: absolute;
    top: 60px;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow: scroll;
  }

  footer {
    background: #FFF;
    border-top: 1px solid $border;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .container {
      position: relative;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;

      .icon {
        font-size: 1.6em;
        padding-bottom: 2px;
        color: $icon;
        text-shadow: 1px 1px 1px #FFF;
      }

      .title {
        font-weight: 300;
        font-size: 0.8em;
        color: $secondary;
      }

      &.active svg, &.active span {
        color: $primary;
      }
    }
  }

  .next-leave-to {
    animation: leaveToLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 0;
  }

  .next-enter-to {
    animation: enterFromRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1;
  }

  .prev-leave-to {
    animation: leaveToRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1;
  }

  .prev-enter-to {
    animation: enterFromLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 0;
  }

  @keyframes leaveToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
      filter: brightness(0.5);
    }
  }

  @keyframes enterFromLeft {
    from {
      transform: translateX(-25%);
      filter: brightness(0.5);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes leaveToRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes enterFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
