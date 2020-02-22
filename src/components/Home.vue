<template>
  <div class="wrapper">
    <div class="dashboard">
      <router-link v-if="lectures.length > 0" class="widget" to="timetable">
        <h5 class="container">{{ $t('page.home.nextLectures') }}</h5>
        <div v-for="lecture in lectures" v-hash-color="lecture.title" class="lecture">
          <div class="container">
            <div v-if="lecture.start < now" class="start">  {{ $t('page.home.currently') }}</div>
            <div v-else-if="Math.floor(lecture.start/864E5) === Math.floor(now/864E5)" class="start">
              {{ $d(lecture.start, 'time') }}
            </div>
            <div v-else-if="Math.floor(lecture.start/864E5) === Math.floor(now/864E5) + 1" class="start">
              {{ $t('page.home.tomorrow') }}
            </div>
            <div v-else class="start">{{ $d(lecture.start, 'day') }}</div>

            <div class="title">{{ lecture.title }}</div>
            <div class="data">
              <div v-if="lecture.professor" class="info">
                <fa-icon icon="user-alt" />
                {{ lecture.professor }}
              </div>
              <div v-if="lecture.room" class="info">
                <fa-icon icon="map-marker-alt" />
                {{ lecture.room }}
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <div v-if="events.length > 0" class="widget">
        <h5 class="container">{{ $t('page.home.nextEvents') }}</h5>
        <div class="container">
          <EventItem v-for="event in events" :key="event" :event="event" />
        </div>
      </div>
    </div>
    <div class="note">
      <div class="container">
        <p>{{ $t('page.home.lastRefresh') }}</p>
        <p>{{ $tc('page.home.lastRefreshDuration', Math.floor(lastRefresh / 36E5)) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import EventItem from './EventItem.vue';

  export default {
    components: {
      EventItem
    },
    data() {
      return {
        now: Date.now()
      }
    },
    computed: {
      lectures() {
        return this.$store.state.lsf.lectures
          .filter(lecture => lecture.end > this.now)
          .slice(0, 2)
      },
      events() {
        return this.$store.state.hft.events
          .filter(event => event.endDate &&
            event.endDate + 864E5 >= this.now || event.startDate >= this.now)
          .slice(0, 3)
      },
      lastRefresh() {
        return Math.max(this.now - this.$store.state.lastRefresh, 0)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../colors";

  .widget {
    display: block;

    &.widget {
      margin-top: 2em
    }
  }

  h5 {
    padding-bottom: 0.8em;
    color: $secondary;
    font-weight: 500;
    font-size: 0.9em;
  }

  .lecture {
    padding: 0.8em 0;
    color: #FFF;

    &.lecture {
      margin-top: 1px;
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .start {
      flex-shrink: 0;
      padding: 4px 6px 3px;
      border-radius: 100px;
      font-size: 0.6em;
      background-color: $background;
      color: $text;
    }

    .title {
      flex-grow: 1;
      padding: 0 0.8em;
      font-weight: 500;
    }

    .data {
      text-align: right;
      font-weight: 300;
      font-size: 0.8em;
      flex-shrink: 0;

      .info + .info {
        margin-top: 0.5em;
      }
    }
  }

  .note {
    margin-top: 30px;
  }
</style>
