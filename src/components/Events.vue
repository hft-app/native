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
          <EventItem v-for="event in events" :key="event" :event="event" />
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
  import EventItem from './EventItem.vue';

  export default {
    components: {
      EventItem
    },
    computed: mapState({
      events: state => state.hft.events.filter(event =>
        event.endDate && event.endDate + 864E5 >= new Date().valueOf() || event.startDate >= new Date().valueOf())
    })
  }

</script>
