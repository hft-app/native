<template>
    <div>
        <nav>
            <div class="container">
                <label>
                    <fa-icon class="icon icon-prepend icon-search" icon="search"/>
                    <input v-model="filter" class="search" placeholder="Suchen...">
                </label>
            </div>
        </nav>

        <div class="wrapper">
            <div class="list">
                <div class="container">

                    <div class="professor article" v-for="professor in filteredProfessors" v-bind:key="professor.email">
                        <div class="title">{{professor.name}}</div>
                        <div class="data">
                            <div class="infos">
                                <div class="room icon-prepend icon-fw icon">{{professor.room}}</div>
                                <div class="time icon-prepend icon-fw icon">{{professor.time}}</div>
                            </div>

                            <div class="actions">
                                <a class="icon icon-phone green" :href="'tel:' +professor.phone">
                                    <fa-icon icon="phone"/>
                                </a>
                                <a class="icon icon-envelope blue" :href="'mailto:'+professor.email">
                                    <fa-icon icon="envelope"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="note">
                <div class="container">
                    <p>Professorenverzeichnis</p>
                    <p>© <a href="http://www.hft-stuttgart.de/" target="_blank">Hochschule für Technik Stuttgart</a></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import data from "../data/professors.json"

    export default {
        data() {
            return {
                professors: data,
                filter: ""
            }
        },

        computed: {
            filteredProfessors() {
                if (this.filter !== "") {
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
    }

    .professor {
        display: flex;
        flex-direction: column;
        padding: 8px 14px 12px;

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

                    &::before {
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
