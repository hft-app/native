<template>
    <div v-if="!days.length" class="wrapper">
        <div class="screen container">
            <div class="icon-thumbs-up icon"></div>
            <div class="title">Pure Freizeit</div>
            <div class="line"></div>
            <div class="info">
                <p>Keine Vorlesungen in nächster Zeit.</p>
            </div>
            <router-link class="button" to="courses">Zur Kursauswahl</router-link>
        </div>
    </div>
    <div v-else class="wrapper">
        <div class="timetable">
            <div v-for="day in days" class="col">
                <div class="head">
                    <div class="day">{{$d(day.date, 'weekday')}}</div>
                    <div class="date">{{$d(day.date, 'day')}}</div>
                </div>
                <table>
                    <tbody>
                    <tr v-for="row in day.table" :class="row.type">
                        <td v-for="cell in row.cells" :rowspan="cell.rowspan" :colspan="cell.colspan"
                            :class="cell.title? 'occupied' :''">
                            <TimetableItem v-if="cell.title" :event="cell"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import TimetableItem from "./TimetableItem.vue";

    export default {
        components: {TimetableItem},
        computed: {
            days() {
                const colors = ['green', 'blue', 'orange', 'red', 'yellow', 'teal', 'purple', 'pink'];

                const lectures = this.$store.state.lsf.lectures;
                let days = [];

                // Create timetable for the next 3 weeks
                for (let i = 0; i < 21; i++) {
                    const start = new Date();
                    start.setDate(start.getDate() + i);
                    start.setHours(0, 0, 0);

                    // Filter lectures for current day
                    const today = lectures.filter(lecture =>
                        Math.floor(lecture.start / 864E5) === Math.floor(start.valueOf() / 864E5));
                    if (!today.length) {
                        continue;
                    }
                    console.log(today);

                    // Calculate color hash
                    let column = today.map(lecture => {
                        let hash = lecture.title.charCodeAt(0) + lecture.title.charCodeAt(1);
                        let color = colors[hash % colors.length];
                        return {color, ...lecture}
                    });

                    // Add day to timetable
                    if (today.length > 0) days.push({
                        table: new Table(column, this.$root.$t).render(),
                        date: start,
                    });
                }
                return days;
            }
        }
    }

    class Table {
        // Construct with lectures
        constructor(lectures = []) {

            // Load lectures
            this.lectures = lectures;

            // Setup grid
            this.grid = [];
            for (var x = 0; x < 12; x++) this.grid[x] = [];

            // Place lectures
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

            // Only check lectures starting in the current time segment
            const y = (lecture.start - morning.valueOf()) / (60 * 15 * 1000);

            lecture.rowspan = (lecture.end - lecture.start) / (60 * 15 * 1000);
            if (y < 0 || y > 48) return false;

            // Col traversal (overlap buffer)
            for (let x = 0; x < 12; x++) {

                // Position is occupied
                if (typeof this.grid[x][y] !== 'undefined') continue;

                // Find overlapping lectures
                var overlapping = 0;
                for (var index in this.lectures) {
                    var test = this.lectures[index];

                    // Devide the remaining space among not yet placed lectures
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

        .lecture {
            $padding: 1px;
            position: absolute;
            top: $padding;
            left: $padding;
            right: $padding;
            bottom: $padding;
            color: #FFF;
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
    }
</style>
