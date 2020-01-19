<template>
    <div class="meals wrapper">
        <nav>
            <div class="container bar">
                <fa-icon icon="chevron-left" @click="prevDay"/>
                {{$d(date, 'short')}}
                <fa-icon icon="chevron-right" @click="nextDay"/>
            </div>
        </nav>
        <div v-if="!meals || !meals.length">
            <div class="screen container">
                <fa-icon class="icon" icon="utensils"/>
                <div class="title">Nichts zu essen</div>
                <div class="line"></div>
                <div class="info">
                    <p>Es wurden keine Gerichte geladen.</p>
                    <p>Bitte versuche es später erneut.</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="wrapper">
                <div class="list">
                    <div class="container">
                        <div v-for="meal in meals" class="meal article">
                            <div class="photo">
                                <img :src="'https://sws2.maxmanager.xyz/assets/' + (meal.photo? meal.photo: 'fotos/musikhochschule/Speisefotos/0-1/27816947m_dummy_speisen.jpg')"
                                     alt="Bild konnte nicht geladen werden">
                            </div>
                            <div class="data">
                                <div class="title">{{meal.title}}</div>
                                <span v-if="meal.additives" href="#legend" class="info">
                                    <fa-icon icon="info-circle"/>
                                    {{meal.additives}}</span>
                                <div class="price" v-html="meal.price"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legend" id="legend">
                    <div class="container">
                        <div class="title">Allergene</div>
                        <div class="columns">
                            <table>
                                <tr v-for="(key, value) in allergens">
                                    <th>{{key}}</th>
                                    <td>{{value}}</td>
                                </tr>
                            </table>
                        </div>

                        <div class="title">Zusatzstoffe</div>
                        <div class="columns">
                            <table>
                                <tr v-for="(key, value) in additives">
                                    <th>{{key}}</th>
                                    <td>{{value}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="note">
                    <div class="container">
                        <p>Speisefotos und Speiseplan</p>
                        <p>© <a href="https://www.studierendenwerk-stuttgart.de/" target="_blank">Studierendenwerk
                            Stuttgart</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date: new Date(),
                allergens: {
                    'Ei': 'Ei',
                    'En': 'Erdnuss',
                    'Fi': 'Fisch',
                    'GlW': 'Weizen',
                    'GlD': 'Dinkel',
                    'GlKW': 'Khorsan-Weizen',
                    'GlR': 'Roggen',
                    'GlG': 'Gerste',
                    'GlH': 'Hafer',
                    'Kr': 'Krebstiere (Krusten- und Schalentiere)',
                    'La': 'Milch und Laktose',
                    'Lu': 'Lupine',
                    'NuM': 'Mandeln',
                    'NuH': 'Haselnüsse',
                    'NuW': 'Walnüsse',
                    'NuC': 'Cashewnüsse',
                    'NuPe': 'Pecanüsse',
                    'NuPa': 'Paranüsse',
                    'NuPi': 'Pistazien',
                    'NuMa': 'Macadamianüsse',
                    'Se': 'Sesam',
                    'Sf': 'Senf',
                    'Sl': 'Sellerie',
                    'So': 'Soja',
                    'Sw': 'Schwefeloxid ("SO2") und Sulfite',
                    'Wt': 'Weichtiere',
                },
                additives: {
                    1: 'mit Konservierungsstoffen',
                    2: 'mit Farbstoffen',
                    3: 'mit Antioxodationsmitteln',
                    4: 'mit Geschmacksverstärkern',
                    5: 'geschwefelt',
                    6: 'gewachst',
                    7: 'mit Phosphaten',
                    8: 'mit Süßungsmitteln',
                    9: 'enthält eine Phenylaninquelle',
                    10: 'geschwärzt',
                    11: 'mit Alkohol',
                }
            }
        },

        computed: {
            meals() {
                return this.$store.state.sws.meals[this.date.toISOString().substr(0, 10)]
            }
        },

        methods: {
            prevDay() {
                this.date = new Date(this.date.valueOf() - 864E5);
            },
            nextDay() {
                this.date = new Date(this.date.valueOf() + 864E5);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../colors';

    .screen, .list {
        margin-top: 60px;
    }

    .meals {
        display: flex;
    }

    .photo {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        //        @extend .icon, .icon-spin, .icon-circle-o-notch;

        &::before {
            position: absolute;
            color: $border;
            font-size: 30px;
        }

        img {
            width: 130px;
            height: 130px;
            position: relative;
        }
    }

    .data {
        display: flex;
        flex-direction: column;
        padding: 10px 14px;
        justify-content: space-between;
        flex-grow: 1;
    }

    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .info {
        font-size: 14px;
        color: $secondary;
        font-weight: 300;

        // @extend .icon-info-circle;
    }

    .price {
        text-align: right;
        font-weight: 500;
        font-size: 20px;
    }

</style>
