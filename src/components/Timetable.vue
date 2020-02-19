<template>
  <div v-if="!days.length" class="wrapper">
    <div class="screen container">
      <fa-icon class="icon-thumbs-up icon" icon="thumbs-up" />
      <div class="title">Pure Freizeit</div>
      <div class="line" />
      <div class="info">
        <p>Keine Vorlesungen in nächster Zeit.</p>
      </div>
      <router-link class="button" to="subjects">Zur Kursauswahl</router-link>
    </div>
  </div>
  <div v-else class="wrapper">
    <div class="timetable">
      <div class="sticky col">
        <div v-if="nowPosition > 0 && nowPosition < 1" class="now"
             :style="'top:' + nowPosition*100 + '%'" />
        <div class="r6 block">
          <div class="start">8:00</div>
          <div class="index">1</div>
          <div class="end">9:30</div>
        </div>
        <div class="r1 break" />
        <div class="r6 block">
          <div class="start">9:45</div>
          <div class="index">2</div>
          <div class="end">11:15</div>
        </div>
        <div class="r1 break" />
        <div class="r6 block">
          <div class="start">11:30</div>
          <div class="index">3</div>
          <div class="end">13:00</div>
        </div>
        <div class="r4 break" />
        <div class="r6 block">
          <div class="start">14:00</div>
          <div class="index">4</div>
          <div class="end">15:30</div>
        </div>
        <div class="r1 break" />
        <div class="r6 block">
          <div class="start">15:45</div>
          <div class="index">5</div>
          <div class="end">17:15</div>
        </div>
        <div class="r1 break" />
        <div class="r6 block">
          <div class="start">17:30</div>
          <div class="index">6</div>
          <div class="end">19:00</div>
        </div>
      </div>
      <div v-for="day in days" :key="day.date" class="col">
        <div class="head">
          <div class="day">{{ $d(day.date, 'weekday') }}</div>
          <div class="date">{{ $d(day.date, 'day') }}</div>
        </div>
        <table>
          <tbody>
            <tr v-for="row in day.table" :class="row.type">
              <td v-for="cell in row.cells" :rowspan="cell.rowspan" :colspan="cell.colspan"
                  :class="cell.title? 'occupied' :''">
                <TimetableItem v-if="cell.title" :lecture="cell" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import TimetableItem from './TimetableItem.vue';

  export default {
    components: {TimetableItem},
    data() {
      return {
        now: Date.now()
      }
    },
    computed: {
      days() {
        const lectures = this.$store.state.lsf.lectures;
        let days = [];

        // Create timetable for the next 3 weeks
        for (let i = 0; i < 21; i++) {
          const start = new Date();
          start.setDate(start.getDate() + i);
          start.setHours(0, 0, 0);

          // Filter loadLectures for current day
          const today = lectures.filter(lecture =>
            Math.floor(lecture.start / 864E5) === Math.floor(start.valueOf() / 864E5));
          if (!today.length) {
            continue;
          }

          // Add day to timetable
          if (today.length > 0) days.push({
            table: new Table(today, this.$root.$t).render(),
            date: start,
          });
        }
        return days;
      },
      nowPosition() {
        return (this.now % 864E5 * 0.001 / 3600 - 7) / 11
      }
    },
    created() {
      this.$options.interval = setInterval(() => {
        this.now = Date.now();
      }, 15 * 60 * 1000)
    },
    beforeDestroy() {
      clearInterval(this.$options.interval)
    }
  }

  class Table {
    // Construct with loadLectures
    constructor(lectures = []) {

      // Load loadLectures
      this.lectures = lectures;

      // Setup grid
      this.grid = [];
      for (let x = 0; x < 12; x++) this.grid[x] = [];

      // Place loadLectures
      for (const lecture of this.lectures) this.place(lecture);
    }

    // Occupy grid space
    occupy(x, y, colspan, rowspan) {
      for (let dx = 0; dx < colspan; dx++) {
        for (let dy = 0; dy < rowspan; dy++) {
          this.grid[x + dx][y + dy] = false;
        }
      }
    }

    // Overlapping condition
    overlap(a, b) {
      return Math.max(a.start, b.start) < Math.min(a.end, b.end);
    }

    // Render timetable
    render() {
      let tableRows = [];

      // Traverse rows (time)
      for (let y = 0; y < 44; y++) {
        const type = (y <= 20 && y % 7 < 6) || (y >= 24 && (y - 24) % 7 < 6) ? 'block' : '';
        let row = {type, cells: []};

        // Traverse cols (overlap buffer)
        for (var x = 0; x < 12; x++) {

          // Measure and fill gap
          var dx = 0;
          while (x + dx < 12 && typeof this.grid[x + dx][y] == 'undefined') dx++;
          x += dx;
          if (dx > 0) row.cells.push({colspan: dx});
          // Render lecture
          else if (this.grid[x][y]) {
            row.cells.push(this.grid[x][y]);
          }

        }
        tableRows.push(row);
      }

      return tableRows;
    }

    // Place lecture
    place(lecture) {

      // Get lecture date
      const date = lecture.start;
      const morning = new Date(date);
      morning.setHours(8, 0, 0);

      // Only check loadLectures starting in the current time segment
      const y = (lecture.start - morning.valueOf()) / (60 * 15 * 1000);

      lecture.rowspan = (lecture.end - lecture.start) / (60 * 15 * 1000);
      if (y < 0 || y > 48) return false;

      // Col traversal (overlap buffer)
      for (let x = 0; x < 12; x++) {

        // Position is occupied
        if (typeof this.grid[x][y] !== 'undefined') continue;

        // Find overlapping loadLectures
        let overlapping = 0;
        for (const index in this.lectures) {
          const test = this.lectures[index];

          // Devide the remaining space among not yet placed loadLectures
          if (!test.placed && this.overlap(test, lecture)) overlapping++;
        }
        lecture.colspan = (12 - x) / overlapping;

        // Occupy grid space
        this.occupy(x, y, lecture.colspan, lecture.rowspan);

        // Place lecture
        this.grid[x][y] = lecture;
        lecture.placed = true;
        return true;
      }
    }
  }
</script>

<style lang="scss">
  @import '../colors';

  .timetable {
    $height: 13px;
    display: flex;

    .col {
      white-space: normal;
      flex-shrink: 0;
      height: (44*$height) + 50px;

      .head {
        height: 54px;
        background-color: rgba(#FFF, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        z-index: 1;

        .day {
          font-size: 14px;
          font-weight: 500;
        }

        .date {
          font-size: 12px;
          color: $secondary;
        }
      }

      table {
        table-layout: fixed;
        border-collapse: collapse;
        min-width: 100%; // Strange hack, 100% ^= infinity

        tr {
          height: $height;

          &.block {
            background-color: #F4F6F8;
          }

          td.occupied {
            position: relative;
            min-width: 120px;

            &[colspan="12"] {
              min-width: 140px;
            }
          }
        }
      }
    }

    .sticky {
      position: sticky;
      position: -webkit-sticky;
      left: 0;
      width: 50px;
      background-color: $background;
      border-right: 1px solid $border;
      z-index: 2;
      padding-top: 50px;

      .block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      .r6 {
        height: 78px;
      }

      .r1 {
        height: 13px;
      }

      .r4 {
        height: 52px;
      }

      .start, .end {
        font-weight: 200;
        font-size: 0.6em;
        color: #AAA;
      }

      .index {
        font-size: 1.8em;
        font-weight: 200;
      }

      .now {
        position: absolute;
        top: -10px;
        height: 1px;
        width: 100%;
        background-color: $primary;

        &::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 0;
          border-style: solid;
          border-width: 5px 0 5px 7.071px;
          border-color: transparent transparent transparent $primary
        }
      }
    }
  }
</style>
