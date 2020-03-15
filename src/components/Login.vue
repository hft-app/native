<template>
  <div>
    <header>
      <div class="container">
        <h1>
          <span class="light">Hochschule </span>
          <span class="bold">für&nbsp;Technik</span>
        </h1>
      </div>
    </header>

    <section>
      <div class="container">
        <div class="icons">
          <div class="icon">
            <fa-icon class="icon-lock" icon="id-badge" />
          </div>
          <div class="icon">
            <fa-icon class="icon-id-badge" icon="lock" />
          </div>
        </div>

        <div class="info">
          <span v-if="error" v-t="'error.' + error.type" class="error" />
          <div v-else>
            <p v-t="'page.login.prompt'" />
            <p v-t="'page.login.security'" />
          </div>
        </div>

        <form :class="{shaking: invalidCreds}" @submit.prevent="login">
          <div class="group">
            <input v-model="username" required name="username" type="text"
                   :placeholder="$t('page.login.username')">
            <input v-model="password" required name="password" type="password"
                   :placeholder="$t('page.login.password')">
          </div>
          <button v-t="loginIn? 'page.login.loginIn' : 'page.login.login'" name="submit"
                  :class="{active: loginIn}" />
        </form>
      </div>
    </section>

    <footer>
      <div class="container">
        <span>
          <a href="https://github.com/luniverse/hft-app" title="GitHub Repository" target="_blank"
             class="icon icon-prepend icon-github-alt">hft-app</a> &middot;
          <a href="https:://luniversity.de/info/imprint" title="Impressum" target="_blank">Impressum</a>
        </span>
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
        invalidCreds: false,
        username: '',
        password: '',
        error: null
      }
    },

    computed: mapState({loginIn: state => state.refreshing}),

    methods: {
      async login() {
        try {
          this.invalidCreds = false;
          await this.$store.dispatch('refresh', {
            credentials: {
              username: this.username,
              password: this.password
            },
            force: true
          });
          await this.$router.push('/home')
        } catch (e) {
          const errorInfo = getErrorInfo(e);
          this.error = errorInfo;
          if (errorInfo.type === 'invalidCreds') {
            this.invalidCreds = true;
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../colors';

  @keyframes Shake {
    0%, 100% {
      margin: 0;
    }
    25% {
      margin: 0 -4px 0 4px;
    }
    75% {
      margin: 0 4px 0 -4px;
    }
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  button, input {
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;

    &.underlined {
      text-decoration: underline;
    }
  }

  .container {
    padding: 0 15px;
    margin: 0 auto;
    width: 100%;
    max-width: 310px;

    @media screen and (min-width: 700px) {
      max-width: 500px;
    }
  }

  header {
    padding: 40px 0;

    h1 {
      margin: 0;
      color: $primary;
      font-size: 2.2em;
      text-align: center;
      text-shadow: 1px 1px 1px #FFF;

      span.light {
        font-weight: 200;
      }

      span.bold {
        font-weight: 400;
      }
    }
  }

  section {
    .icons {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        color: $background;
        background-color: $primary;
        margin: 0 -6px;
        border: 3px solid $background;
        z-index: 2;

        & + span {
          z-index: 1;
        }

        .icon-lock {
          width: 2em;
          height: 2em;
        }

        .icon-id-badge {
          width: 1.7em;
          height: 1.7em;
        }
      }
    }

    .info {
      font-size: 0.8em;
      line-height: 1.4;
      color: $gray;
      text-align: center;

      .error {
        white-space: pre;
      }

      p {
        margin: 0;
      }

      p + p {
        margin-top: 0.5em;
      }
    }

    form {
      margin: 0 auto;
      padding-top: 30px;
      max-width: 270px;
      width: 100%;

      &.shaking .group {
        animation: Shake 0.2s 2;
      }

      input[type="text"], input[type="password"], button {
        border: none;
        border-radius: inherit;
        outline: none;
        padding: 0.7em 0.8em;
        margin: 0;
        width: 100%;
        background: #FFF;
        position: relative;
        -webkit-appearance: none;
      }

      input[type="text"], input[type="password"] {
        border: 1px solid #DDDFE2;
        color: $text;
        z-index: 1;

        &:focus {
          border-color: #007AFF;
          z-index: 2;
        }

        &[name="username"] {
          border-radius: 6px 6px 0 0;
          margin-bottom: -1px;
        }

        &[name="password"] {
          border-radius: 0 0 6px 6px;
        }
      }

      label {
        margin: 1.2em 0 1.6em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $gray;
        font-weight: 300;
        font-size: 0.6em;

        input[type="checkbox"] {
          margin-right: 1em;
        }
      }

      button {
        border-radius: 6px;
        background: linear-gradient($primary, darken($primary, 8%));
        color: $background;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        font-weight: 300;
        margin-top: 10px;

        &.active {
          opacity: 0.6;
          pointer-events: none;
        }
      }
    }
  }

  footer {
    font-size: 12px;
    color: $gray;
    text-align: center;
    padding: 40px 0;
  }
</style>
