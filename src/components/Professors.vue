<template>
  <div class="wrapper">
    <nav>
      <div class="container">
        <label>
          <fa-icon class="icon icon-prepend icon-search" icon="search" />
          <input v-model="filter" class="search" :placeholder="$t('page.professors.search')">
        </label>
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <div v-if="filteredProfessors.length === 0" class="screen container">
        <fa-icon class="icon-address-card-o icon" icon="address-card" />
        <div class="title">Keine Professoren</div>
        <div class="line" />
        <div class="info">
          <p>Es wurde kein Professor gefunden.</p>
        </div>
      </div>
      <div v-else class="wrapper">
        <div class="list">
          <div class="container">
            <transition-group name="list-complete" tag="p">
              <div v-for="professor in filteredProfessors" :key="professor.email"
                   class="professor article">
                <div class="title">{{ professor.name }}</div>
                <div class="data">
                  <div class="infos">
                    <div>
                      <fa-icon class="room icon-prepend icon-fw icon"
                               icon="map-marker-alt" />
                      {{ professor.room }}
                    </div>
                    <div>
                      <fa-icon class="time icon-prepend icon-fw icon"
                               icon="calendar-alt" />
                      {{ professor.time }}
                    </div>
                  </div>

                  <div class="actions">
                    <a class="icon icon-phone green" :href="'tel:' +professor.phone">
                      <fa-icon icon="phone" />
                    </a>
                    <a class="icon icon-envelope blue" :href="'mailto:'+professor.email">
                      <fa-icon icon="envelope" />
                    </a>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <div class="note">
          <div class="container">
            <p>{{ $t('page.professors.title') }}</p>
            <p>
              &copy; <a href="http://www.hft-stuttgart.de/" target="_blank">Hochschule für Technik Stuttgart</a>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import data from '../data/professors.json'

  export default {
    data() {
      return {
        professors: data,
        filter: ''
      }
    },

    computed: {
      filteredProfessors() {
        if (this.filter !== '') {
          const filter = this.filter.toLowerCase();
          return this.professors.filter(professor => professor.name.toLowerCase().indexOf(filter) !== -1);
        } else {
          return this.professors
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../colors';

  .list {
    padding-top: 60px;
    padding-bottom: 20px;
  }

  .list-complete-item {
    transition: all 0.6s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(60px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .professor {
    display: flex;
    flex-direction: column;
    padding: 8px 14px 12px;
    transition: all 1s;

    &.hidden {
      display: none;
    }

    .title {
      font-size: 1.2em;
      padding-bottom: 8px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .data {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .actions {
        display: flex;

        a {
          color: #FFF;
          height: 2em;
          width: 2em;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1.2em;
          margin-left: 0.5em;

          &.lu-phone::before {
            font-size: 1.2em;
          }
        }
      }

      .infos {
        font-size: 0.8em;
        overflow: hidden;
        font-weight: 300;

        div {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          .icon {
            color: $primary;
          }

          & + div {
            margin-top: 4px;
          }
        }
      }
    }
  }
</style>
