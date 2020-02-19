<template>
  <div v-hash-color="lecture.title" class="lecture">
    <div class="title">
      {{ lecture.title }}
    </div>
    <div class="time">
      {{ $d(lecture.start, 'time') }} - {{ $d(lecture.end, 'time') }}
    </div>
    <div class="info">
      <div v-if="lecture.professor" class="professor data icon-prepend icon">
        <fa-icon icon="user-alt" />
        {{ lecture.professor }}
      </div>
      <div v-if="lecture.room" class="room data icon-prepend icon">
        <fa-icon icon="map-marker-alt" />
        {{ lecture.room }}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      lecture: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .lecture {
    $padding: 1px;
    position: absolute;
    top: $padding;
    left: $padding;
    right: $padding;
    bottom: $padding;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 3px;

    .title {
      font-size: 12px;
      padding: 5px 6px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      font-weight: 500;
    }

    .time {
      font-size: 10px;
      padding: 4px 6px 0;
    }

    .info {
      font-size: 10px;
      display: flex;
      justify-content: space-between;
      padding: 0 6px 5px;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .professor {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .room {
      flex-shrink: 0;
    }

    .data + .data {
      padding-left: 1em;
    }

    .data:only-child {
      margin-left: auto;
    }
  }
</style>
