<template>
  <div class="wrapper">
    <div v-if="events.length === 0" class="screen container">
      <fa-icon class="icon-calendar icon" icon="calendar-alt" />
      <div class="title">{{ $t('page.events.noDataTitle') }}</div>
      <div class="line" />
      <div class="info">
        <p>{{ $t('page.events.noDataInfo') }}</p>
      </div>
    </div>

    <div v-else class="wrapper">
      <div class="list">
        <div class="container">
          <div v-for="event in events" class="event article">
            <a class="date">
              <fa-icon class="icon-prepend icon" icon="calendar-alt" />
              <span v-if="event.startDate <= new Date().valueOf()" v-t="'page.events.currently'" />
              <span v-else>{{ $d(event.startDate, 'day') }}</span>
              <span v-if="event.endDate">&hyphen; {{ $d(event.endDate, 'day') }}</span>
            </a>
            <div v-if="event.title" class="title">
              <p>{{ event.title }}</p>
            </div>
            <div v-if="event.description" class="description">
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="note">
        <div class="container">
          <p>
            &copy; <a href="http://www.hft-stuttgart.de/" target="_blank">Hochschule für Technik Stuttgart</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      events: state => state.hft.events.filter(event =>
        event.endDate && event.endDate + 864E5 >= new Date().valueOf() || event.startDate >= new Date().valueOf())
    })
  }

</script>
<style lang="scss" scoped>
  @import '../colors';

  .event {
    padding: 12px 16px;
    flex-direction: column;

    .date {
      color: $primary;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 13px;
    }

    .title {
      margin-top: 10px;
    }

    .description {
      margin-top: 6px;
    }
  }
</style>
