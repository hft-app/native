<template>
    <div class="body">
        <header v-if="!$route.meta.hideNav">
            <div class="container">
                <a v-if="$route.path === '/menu'" @click="$router.back()">
                    <fa-icon class="menu icon" icon="arrow-left"/>
                </a>
                <router-link v-else to="menu">
                    <fa-icon class="menu icon" icon="bars"/>
                </router-link>
                <div class="title">
                    <span class="light">Hochschule </span>
                    <span class="bold">für&nbsp;Technik</span>
                </div>
                <fa-icon :class="'refresh icon' + (refreshing? ' icon-spin':'')" icon="sync-alt" @click="refresh"/>
            </div>
        </header>

        <router-view class="main"/>

        <footer v-if="!$route.meta.hideNav">
            <div class="container">
                <router-link v-for="route in routes" v-bind:key="route.name"
                             :to="route.link" v-slot="{navigate, isActive}">
                    <a :class="isActive ? 'active' : ''" @click="navigate">
                        <fa-icon class="icon " :icon="route.icon"/>
                        <span class="title">{{route.name}}</span>
                    </a>
                </router-link>
            </div>
        </footer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                refreshing: false,
                routes: [{
                    icon: "home",
                    name: "Start",
                    link: "start"
                }, {
                    icon: "utensils",
                    name: "Mensa",
                    link: "meals"
                }, {
                    icon: "clock",
                    name: "Kurse",
                    link: "timetable"
                }, {
                    icon: "calendar",
                    name: "Termine",
                    link: "events"
                }, {
                    icon: "graduation-cap",
                    name: "Noten",
                    link: "exams"
                }]
            }
        },

        methods: {
            async refresh() {
                this.refreshing = true;
                await this.$store.dispatch("refresh");
                this.refreshing = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../colors';

    $sqrt2: 1.4142;


    p {
        margin: 0;
        line-height: 1.4;

        & + p {
            margin-top: 6px;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
    }


    .container {
        margin: 0 auto;
        width: 100%;
        max-width: 400px;
        padding: 0 15px;
    }

    .wrapper {
        flex-grow: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background-color: $background;
        display: flex;
        flex-direction: column;
    }

    header {
        background: linear-gradient($primary, darken($primary, 3%));
        color: #FFF;
        z-index: 10;
        box-shadow: $shadow;
        font-size: 22px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        .container {
            position: relative;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        a {
            padding: 6px;
            line-height: 1;
        }

        .title {
            padding: 0 8px;
            font-weight: 300;
        }
    }

    .main {
        margin-top: 60px;
        margin-bottom: 60px;
    }

    footer {
        background: #FFF;
        border-top: 1px solid $border;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        .container {
            position: relative;
            height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        a {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 20%;

            .icon {
                font-size: 1.6em;
                padding-bottom: 2px;
                color: $icon;
                text-shadow: 1px 1px 1px #FFF;

            }

            .title {
                font-weight: 300;
                font-size: 0.8em;
                color: $secondary;
            }

            &.active svg, &.active span {
                color: $primary;
            }
        }
    }
</style>
