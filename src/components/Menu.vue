<template>
  <div class="wrapper">
    <div class="dashboard">
      <div class="widget">
        <div class="container">
          <h5>{{ $t('page.menu.linkedAccount') }}</h5>
        </div>
        <div class="menu">
          <div class="container">
            <a class="target logout item" @click="logout">
              <fa-icon class="teal badge icon" icon="id-badge" />
              <div class="title grow">
                <p class="displayname">{{ fullname }}</p>
                <p class="action">{{ $t('page.menu.unlinkAccount') }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div v-for="group in groups" :key="group.name" class="widget">
        <div class="container">
          <h5>{{ $t('page.menu.' + group.name) }}</h5>
        </div>
        <div class="menu">
          <div class="container">
            <span v-for="item in group.items" :key="item.url">
              <a class="item" :href="item.url" @click="navigate(item)">
                <fa-icon class="square icon" :class="group.color" :icon="item.icon" />
                <span class="title">{{ $t('page.menu.' + item.title) }}</span>
                <fa-icon class="arrow icon" icon="chevron-right" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="note">
      <div class="container">
        <p>HFT App v{{ version }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {version} from '../../package.json'

  export default {
    data() {
      const groups = [{
        name: 'otherContents',
        color: 'red',
        items: [
          {
            to: 'subjects',
            icon: 'book',
            title: 'selectCourses'
          }, {
            to: 'tips',
            icon: 'lightbulb',
            title: 'tips'
          }, {
            to: 'printers',
            icon: 'print',
            title: 'printerLocations'
          }, {
            to: 'professors',
            icon: 'list-ul',
            title: 'professorIndex'
          }
        ]
      }, {
        name: 'supportApp',
        color: 'green',
        items: [
          {
            action: () => {
              const shareMessage = this.$t('page.menu.shareMessage');
              if (window.plugins) {
                window.plugins.socialsharing.shareWithOptions({
                  message: shareMessage,
                  url: 'https://hft-app.de'
                });
              } else {
                window.open(`mailto:?to=&subject=${
                  encodeURIComponent(shareMessage)
                }&body=${
                  encodeURIComponent('https://hft-app.de')
                }`)
              }
            },
            icon: 'share-alt',
            title: 'inviteFriends'
          }, {
            url: 'mailto:info@hft-app.de?subject=Feedback',
            icon: 'star',
            title: 'sendFeedback'
          }, {
            url: 'https://github.com/hft-app',
            icon: 'puzzle-piece',
            title: 'contribute',
          }
        ]
      }, {
        name: 'information',
        color: 'blue',
        items: [
          {
            to: 'imprint',
            icon: 'bullhorn',
            title: 'imprint',
          }, {
            to: 'licenses',
            icon: 'handshake',
            title: 'licenses',
          }
        ]
      }];

      if (typeof cordova !== 'undefined' && cordova.plugin.studentid) {
        groups[0].items.push({
          to: 'balance',
          icon: 'money-check-alt',
          title: 'checkBalance'
        })
      }

      return {
        version,
        groups
      };
    },
    computed: mapState('lsf', ['fullname']),
    methods: {
      logout() {
        this.$store.dispatch('lsf/logout');
        this.$router.push('/');
      },
      navigate(item) {
        if (item.to) {
          this.$router.push(item.to)
        } else if (item.action) {
          item.action()
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "../colors";

  .dashboard {
    padding: 30px 0;

    .widget + .widget {
      margin-top: 2em;
    }

    h5 {
      margin: 0 0 12px;
      color: $secondary;
      font-weight: 500;
    }

    .menu {
      border-width: 1px 0;
      border-style: solid;
      border-color: $border;
      background-color: #FFF;

      .item {
        padding: 12px 6px;
        display: flex;
        align-items: center;

        & + .item {
          border-top: 1px solid #F1F2F3;
        }
      }

      .square {
        flex-shrink: 0;
        border-radius: 6px;
        margin-right: 12px;
        width: 30px;
        height: 30px;
        display: flex;
        padding: 5px;
        color: #FFF;
      }

      .badge {
        color: #FFF;
        display: flex;
        font-size: 2em;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin-right: 16px;
        flex-shrink: 0;
        padding: 10px;
      }

      .title {
        flex-grow: 1;

        .displayname {
          font-size: 1.2em;
          font-weight: 500;
          padding-bottom: 3px;
        }

        .action {
          color: $secondary;
          font-size: 0.9em;
        }
      }

      .arrow {
        color: $icon;
        font-size: 24px;
        line-height: 1;
      }
    }
  }
</style>
