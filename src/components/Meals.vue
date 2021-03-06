<template>
  <div class="wrapper meals">
    <nav>
      <div class="container bar">
        <fa-icon icon="chevron-left" :class="{active: dateIndex > 0}" @click="prevDay" />
        {{ $d(date, 'short') }}
        <fa-icon icon="chevron-right" :class="{active: dateIndex < dates.length - 1}" @click="nextDay" />
      </div>
    </nav>
    <div v-if="!meals || !meals.length" class="screen container">
      <fa-icon class="icon" icon="utensils" />
      <div class="title">{{ $t('page.meals.noDataTitle') }}</div>
      <div class="line" />
      <div class="info">
        <p>{{ $t('page.meals.noDataInfo') }}</p>
        <p>{{ $t('page.meals.tryLater') }}</p>
      </div>
    </div>
    <div v-else class="wrapper">
      <div class="list">
        <div class="container">
          <div v-for="meal in meals" class="article">
            <router-link :to="{name: 'mealpicture', params: {meal}}" class="meal">
              <div :style="'background-image: url(\'https://sws2.maxmanager.xyz/assets/' + (meal.photo? meal.photo:
                     'fotos/dummies/foto-kommt-noch.jpg') +'\')'"
                   :alt="$t('page.meals.imageNotLoaded')" loading="lazy" class="photo" />
              <div class="data">
                <div class="title">{{ meal.title }}</div>
                <span v-if="meal.attributes" class="info">
                  <fa-icon icon="info-circle" class="icon-prepend" />{{ meal.attributes }}
                </span>
                <div class="price">{{ meal.price }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div id="legend" class="legend">
        <div class="container">
          <div class="title"><span>{{ $t('page.meals.allergens') }}</span></div>
          <div class="columns">
            <table>
              <tr v-for="(key, value) in allergens" :key="key">
                <th>{{ key }}</th>
                <td>{{ value }}</td>
              </tr>
            </table>
          </div>

          <div class="title"><span>{{ $t('page.meals.additives') }}</span></div>
          <div class="columns">
            <table>
              <tr v-for="(key, value) in additives" :key="key">
                <th>{{ key }}</th>
                <td>{{ value }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="note">
        <div class="container">
          <p>Speisefotos und Speiseplan</p>
          <p>
            &copy;<a href="https://www.studierendenwerk-stuttgart.de/" target="_blank">
              Studierendenwerk Stuttgart</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mealAttributes from '../data/meal-attributes.json'

  export default {
    data() {
      return {
        dateIndex: 0,
        ...mealAttributes
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

  .legend {
    padding-top: 20px;
    color: $secondary;

    .title {
      text-align: center;
      position: relative;
      margin-bottom: 1em;

      span {
        padding: 0 0.5em;
        background-color: #FAFBFC;
        position: relative;
        font-weight: 300;
        font-size: 1.2em;
      }

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        top: 55%;
        left: 0;
        height: 1px;
        background: linear-gradient(to right, rgba($border, 0) 0, $border 20%, $border 80%, rgba($border, 0) 100%);
        box-shadow: 1px 1px 1px #FFF;
      }
    }

    .columns {
      column-count: 2;
      font-size: 0.8em;
      padding-bottom: 28px;
    }

    table {
      border-collapse: collapse;
      width: 100%;

      th {
        text-align: right;
      }

      td {
        padding: 0.5em 0.8em;
      }
    }
  }


  .meal {
    display: flex;
    flex: 1;

    &::before {
      position: absolute;
      color: $border;
      font-size: 30px;
    }

    .photo {
      width: 130px;
      height: 130px;
      background-size: cover;
      background-position-x: center;
    }

    .data {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px 14px;
      justify-content: space-between;
    }

    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 210px;
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
  }
</style>
