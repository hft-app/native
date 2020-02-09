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
        <fa-icon :class="'refresh icon' + (refreshing? ' icon-spin':'')" icon="sync-alt" @click="refresh" />
      </div>
    </header>
    <!--  <transition name="next">-->
    <router-view class="main" />
    <!--</transition>-->

    <footer v-if="!$route.meta.hideNav">
      <div class="container">
        <router-link v-for="route in routes" :key="route.name"
                     v-slot="{navigate, isActive}" :to="route.link">
          <a :class="isActive ? 'active' : ''" @click="navigate">
            <fa-icon class="icon " :icon="route.icon" />
            <span class="title">{{ route.name }}</span>
          </a>
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        routes: [{
          icon: 'home',
          name: 'Start',
          link: 'home'
        }, {
          icon: 'utensils',
          name: 'Mensa',
          link: 'meals'
        }, {
          icon: 'clock',
          name: 'Kurse',
          link: 'timetable'
        }, {
          icon: 'calendar',
          name: 'Termine',
          link: 'events'
        }, {
          icon: 'graduation-cap',
          name: 'Noten',
          link: 'exams'
        }]
      }
    },
    computed: mapState({refreshing: state => state.refreshing}),
    methods: {
      async refresh() {
        await this.$store.dispatch('refresh');
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../colors';

  $sqrt2: 1.4142;


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
