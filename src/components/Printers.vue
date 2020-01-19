<template>
    <div>
        <nav>
            <div class="bar container">
                <a href="mailto:info@hft-app.de?subject=Veraltete%20Druckerdaten">
                    <fa-icon icon="history"/> Veraltete Daten melden
                </a>
            </div>
        </nav>

        <div class="wrapper">
            <div class="list">
                <div class="container">
                    <div v-for="printer in printers" class="printer article">
                        <div class="title">{{printer.title}}</div>
                        <div class="data">
                            <div class="room info icon icon-prepend">
                                <fa-icon icon="map-marker-alt"/>
                                {{printer.room}}
                            </div>
                            <div class="size info icon icon-prepend">
                                <fa-icon icon="file-alt"/>
                                {{printer.sizes}}
                            </div>
                            <div class="type info icon icon-prepend">
                                <fa-icon icon="font"/>
                                {{printer.type}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="note">
                <div class="container">
                    <p>Druckerstandorte</p>
                    <p>© <a href="http://www.hft-stuttgart.de/" target="_blank">Hochschule für Technik Stuttgart</a></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import data from "../data/printers.json"

    export default {
        data() {
            return {
                printers: data,
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../colors';

    .list {
        padding-top: 60px;
    }

    .printer {
        padding: 10px 16px 12px;
        flex-direction: column;

        .title {
            padding-bottom: 12px;
        }

        .data {
            display: flex;
            justify-content: space-between;
            font-weight: 300;
            font-size: 14px;

            .info {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                & svg {
                    color: $primary;
                }
            }
        }
    }
</style>
