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
                <div v-for="exam in exams" :class=" exam.status + ' exam article'">
                    <div v-if="!exam.grade && exam.status === 'passed'" class="grade icon">
                        <fa-icon icon="check"/>
                    </div>
                    <div v-else-if="!exam.grade && exam.status === 'failed'" class="grade icon">
                        <fa-icon icon="times"/>
                    </div>
                    <div v-else class="grade icon">{{exam.grade}}</div>
                    <div class="data">
                        <div class="title">{{exam.title}}</div>
                        <div class="info">{{exam.info}}</div>
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
        data() {
            return {
                exams: [{
                    "title": "PVL Kommunikationssysteme",
                    "grade": null,
                    "status": "failed",
                    "cp": "0,0",
                    "try": "1",
                    "date": "",
                    "info": "abd"
                }, {
                    "title": "PVL Theoretische Informatik",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "PVL Software-Technik",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "PVL Datenstrukturen und Algorithmen",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "Bachelor-Vorprüfung",
                    "grade": "1,2",
                    "status": "passed",
                    "cp": "60,0",
                    "try": "1",
                    "date": "11.07.2019"
                }, {
                    "title": "Internet-Programmierung",
                    "grade": null,
                    "status": "passed",
                    "cp": "5,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "PVL Informatik-Projekt 1",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "Informatik-Projekt 1",
                    "grade": "1,0",
                    "status": "passed",
                    "cp": "9,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "PVL Programmieren 2",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": "08.07.2019"
                }, {
                    "title": "Programmieren 2",
                    "grade": "1,3",
                    "status": "passed",
                    "cp": "7,0",
                    "try": "1",
                    "date": "11.07.2019"
                }, {
                    "title": "Lineare Algebra",
                    "grade": "1,3",
                    "status": "failed",
                    "cp": "3,0",
                    "try": "1",
                    "date": "16.07.2019"
                }, {
                    "title": "Vorleistung Mathematik 2",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": "08.07.2019"
                }, {
                    "title": "Mathematik 2",
                    "grade": "1,3",
                    "status": "passed",
                    "cp": "5,0",
                    "try": "1",
                    "date": "08.07.2019"
                }, {
                    "title": "Fremdsprachen",
                    "grade": null,
                    "status": "passed",
                    "cp": "2,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "Arbeitstechniken im Studium",
                    "grade": null,
                    "status": "passed",
                    "cp": "2,0",
                    "try": "1",
                    "date": "08.02.2019"
                }, {
                    "title": "Betriebswirtschaftslehre",
                    "grade": "1,0",
                    "status": "passed",
                    "cp": "4,0",
                    "try": "1",
                    "date": "31.01.2019"
                }, {
                    "title": "Programmieren 1",
                    "grade": null,
                    "status": "passed",
                    "cp": "8,0",
                    "try": "1",
                    "date": "08.02.2019"
                }, {
                    "title": "PVL Einführung in die Informatik",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": ""
                }, {
                    "title": "Einführung in die Informatik",
                    "grade": "1,7",
                    "status": "passed",
                    "cp": "5,0",
                    "try": "1",
                    "date": "06.02.2019"
                }, {
                    "title": "Vorleistung Diskrete Mathematik",
                    "grade": null,
                    "status": "passed",
                    "cp": "0,0",
                    "try": "1",
                    "date": "08.02.2019"
                }, {
                    "title": "Diskrete Mathematik",
                    "grade": "1,3",
                    "status": "passed",
                    "cp": "5,0",
                    "try": "1",
                    "date": "29.01.2019"
                }, {
                    "title": "Mathematik 1",
                    "grade": null,
                    "status": "passed",
                    "cp": "5,0",
                    "try": "1",
                    "date": "08.02.2019"
                }, {
                    "title": "Erzielte CP GS",
                    "grade": null,
                    "status": "passed",
                    "cp": "60,0",
                    "try": "",
                    "date": ""
                }]
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
