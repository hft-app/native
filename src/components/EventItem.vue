<template>
  <div class="event article">
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
</template>
<script>
  export default {
    props: {
      event: {
        type: Object,
        required: true
      }
    }
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
