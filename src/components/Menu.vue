<template>
    <div class="wrapper">
        <div class="dashboard">
            <div class="widget">
                <div class="container">
                    <h5>Verknüpftes Konto</h5>
                </div>
                <div class="menu">
                    <div class="container">
                        <a class="target logout item" @click="logout">
                            <fa-icon class="teal badge icon" icon="id-badge"/>
                            <div class="title grow">
                                <p class="displayname">{{displayname}}</p>
                                <p class="action">Kontoverknüpfung aufheben</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="widget" v-for="group in groups" v-bind:key="group.name">
                <div class="container">
                    <h5>{{group.name}}</h5>
                </div>
                <div class="menu">
                    <div class="container">
                        <span v-for="item in group.items" v-bind:key="item.url">
                            <a class="item" :href="item.url" @click="navigate(item)">
                                <fa-icon :class="'square icon ' +  group.color" :icon="item.icon"/>
                                <span class="title">{{item.title}}</span>
                                <fa-icon class="arrow icon" icon="chevron-right"/>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="note">
            <div class="container">
                <p>HFT App v{{version}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        methods: {
            logout() {
                this.$store.dispatch("lsf/logout");
                this.$router.push("/");
            },
            navigate(item) {
                if (item.to) {
                    this.$router.push(item.to)
                } else if (item.action) {
                    item.action()
                }
            }
        },
        computed: mapState({
            displayname: state => state.lsf.fullname
        }),
        data() {
            const groups = [{
                name: 'Weitere Inhalte',
                color: 'red',
                items: [
                    {
                        to: 'courses',
                        icon: 'book',
                        title: 'Kurse auswählen'
                    }, {
                        to: 'tips',
                        icon: 'lightbulb',
                        title: 'Tipps und Tricks'
                    }, {
                        to: 'printers',
                        icon: 'print',
                        title: 'Druckerstandorte'
                    }, {
                        to: 'professors',
                        icon: 'list-ul',
                        title: 'Professorenverzeichnis'
                    }
                ]
            }, {
                name: 'App unterstützen',
                color: 'green',
                items: [
                    {
                        action: () => {
                            if (window.plugins) {
                                window.plugins.socialsharing.shareWithOptions({
                                    message: "Lad dir jetzt die neue HFT App",
                                    url: "https://hft-app.de"
                                });
                            } else {
                                window.open(`mailto:?to=&subject=${encodeURIComponent("Lad dir jetzt die neue HFT App")}&body=${encodeURIComponent("https://hft-app.de")}`)
                            }
                        },
                        icon: 'share-alt',
                        title: 'Freunde einladen'
                    }, {
                        url: 'mailto:info@hft-app.de?subject=Feedback',
                        icon: 'star',
                        title: 'Feedback senden'
                    }, {
                        url: 'https://github.com/hft-app',
                        icon: 'puzzle-piece',
                        title: 'Selbst mitwirken',
                        blank: true
                    }
                ]
            }, {
                name: 'Informationen',
                color: 'blue',
                items: [
                    {
                        url: 'https://luniversity.de/info/terms',
                        icon: 'handshake',
                        title: 'Nutzungsbedingungen',
                        blank: true
                    }, {
                        url: 'https:://luniversity.de/info/imprint',
                        icon: 'bullhorn',
                        title: 'Impressum',
                        blank: true
                    }, {
                        url: 'https://luniversity.de/info/privacy',
                        icon: 'shield-alt',
                        title: 'Datenschutzrichtlinien',
                        blank: true
                    }
                ]
            }];

            if (typeof cordova !== 'undefined' && cordova.plugin.mifare) {
                groups[0].items.push({
                    to: 'credit',
                    icon: 'money-check-alt',
                    title: 'Guthaben überprüfen'
                })
            }

            return {
                version: "2.0.1",
                groups
            };
        }
    }
</script>
<style lang="scss" scoped>
    @import "../colors";

    .dashboard {
        padding: 30px 0;

        .widget + .widget {
            margin-top: 2em;
        }

        h5 {
            margin: 0 0 12px;
            color: $secondary;
            font-weight: 500;
        }

        .menu {
            border-width: 1px 0;
            border-style: solid;
            border-color: $border;
            background-color: #FFF;

            .item {
                padding: 12px 6px;
                display: flex;
                align-items: center;

                & + .item {
                    border-top: 1px solid #F1F2F3;
                }
            }

            .square {
                flex-shrink: 0;
                border-radius: 6px;
                margin-right: 12px;
                width: 30px;
                height: 30px;
                display: flex;
                padding: 5px;
                color: #FFF;
            }

            .badge {
                color: #FFF;
                display: flex;
                font-size: 2em;
                width: 60px;
                height: 60px;
                border-radius: 30px;
                margin-right: 16px;
                flex-shrink: 0;
                padding: 10px;
            }

            .title {
                flex-grow: 1;

                .displayname {
                    font-size: 1.2em;
                    font-weight: 500;
                    padding-bottom: 3px;
                }

                .action {
                    color: $secondary;
                    font-size: 0.9em;
                }
            }

            .arrow {
                color: $icon;
                font-size: 24px;
                line-height: 1;

            }
        }
    }
</style>
