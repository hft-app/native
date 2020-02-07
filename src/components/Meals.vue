<template>
    <div class="wrapper meals">
        <nav>
            <div class="container bar">
                <fa-icon icon="chevron-left" @click="prevDay" :class='dateIndex > 0?"active":""'/>
                {{$d(date, 'short')}}
                <fa-icon icon="chevron-right" @click="nextDay" :class='dateIndex < dates.length - 1?"active":""'/>
            </div>
        </nav>
        <div v-if="!meals || !meals.length" class="screen container">
            <fa-icon class="icon" icon="utensils"/>
            <div class="title">{{$t('page.meals.nothingToEat')}}</div>
            <div class="line"></div>
            <div class="info">
                <p>{{$t('page.meals.notLoaded')}}</p>
                <p>{{$t('page.meals.tryLater')}}</p>
            </div>
        </div>
        <div v-else class="wrapper">
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
                                    <fa-icon icon="info-circle"/>{{meal.additives}}</span>
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
                    <p>&copy; <a href="https://www.studierendenwerk-stuttgart.de/" target="_blank">Studierendenwerk
                        Stuttgart</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dateIndex: 0,
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
            date() {
                return this.dates[this.dateIndex];
            },
            meals() {
                return this.$store.state.sws.meals[this.date.toISOString().substr(0, 10)]
            },
            dates() {
                const dates = [];
                for (let dateStr in this.$store.state.sws.meals) {
                    const date = new Date(dateStr);
                    if (date.valueOf() >= new Date().valueOf() - 863E5) {
                        dates.push(date);
                    }
                }
                return dates;
            }
        },

        methods: {
            prevDay() {
                if (this.dateIndex > 0)
                    this.dateIndex--;
            },
            nextDay() {
                if (this.dateIndex < this.dates.length - 1)
                    this.dateIndex++
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../colors';

    .active {
        color: $primary;
    }

    .list {
        padding-top: 60px !important;
    }

    .photo {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

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
        font-size: 13px;
        color: $secondary;
        font-weight: 300;
    }

    .price {
        text-align: right;
        font-weight: 500;
        font-size: 20px;
    }

</style>
