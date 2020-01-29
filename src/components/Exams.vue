<template>
    <div class="wrapper">
        <div v-if="exams.length === 0" class="screen container">
            <fa-icon class="icon-folder-open icon" icon="folder-open"/>
            <div class="title">Hier ist nichts</div>
            <div class="line"></div>
            <div class="info">
                <p>Bisher keine Prüfungsergebnisse.</p>
            </div>
        </div>
        <div v-else class="list">
            <div class="container">
                <div v-for="exam in exams" :class="examClass(exam) + ' exam article'">
                    <div v-if="!exam.grade && exam.passed" class="grade icon">
                        <fa-icon icon="check"/>
                    </div>
                    <div v-else-if="!exam.grade && !exam.passed" class="grade icon">
                        <fa-icon icon="times"/>
                    </div>
                    <div v-else class="grade icon">{{exam.grade}}</div>
                    <div class="data">
                        <div class="title">{{exam.title}}</div>
                        <div class="info">
                            <span v-if="exam.date">{{exam.date}} &middot;&nbsp;</span>
                            <span v-if="exam.cp">{{exam.cp}} CP &middot;&nbsp;</span>
                            <span v-if="exam.try === 1">Erstversuch</span>
                            <span v-else-if="exam.try === 2">Zweitversuch</span>
                            <span v-else>Drittversuch</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="note">
            <div class="container">
                <p>Alle Angaben ohne Gewähr.</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            exams() {
                return this.$store.state.lsf.exams;
            }
        },
        methods: {
            examClass(exam) {
                return exam.passed ? 'passed' : 'failed'
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../colors";

    .exam {
        display: flex;
        align-items: center;
        padding: 1em 0.2em;

        .grade {
            width: 2.4em;
            text-align: center;
            font-size: 2em;
            flex-shrink: 0;
        }

        &.passed .grade {
            color: #26A65B;
        }

        &.failed .grade {
            color: $primary;
        }

        .data {
            border-left: 1px solid $border;
            padding: 0 1em;
        }

        .title {
            margin-bottom: 6px;
        }

        .info {
            font-size: 14px;
            color: $secondary;
        }
    }
</style>
