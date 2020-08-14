<template>
  <div class="fullscreen">
    <div class="photo">
      <img :src="'https://sws2.maxmanager.xyz/assets/' + (meal.photo? meal.photo:
             'fotos/dummies/foto-kommt-noch.jpg')"
           :alt="$t('page.meals.imageNotLoaded')">
      <fa-icon icon="times" class="lu-icon lu-times-circle close" @click="$router.back()" />
    </div>
    <div class="data">
      <div class="title">{{ meal.title }}</div>
      <div class="price">{{ meal.price }}&ThinSpace;&euro;</div>
      <ul v-if="attributesList.length" class="info">
        <li v-for="item in attributesList">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import mealAttributes from '../data/meal-attributes.json'

  export default {
    props: {
      meal: {
        type: Object,
        required: true
      }
    },

    computed: {
      attributesList() {
        if (this.meal.attributes === '')
          return [];
        return this.meal.attributes.split(/, /g)
          .map(attr => {
            const additive = mealAttributes.additives[attr];
            if(additive) return additive;
            const allergen = mealAttributes.allergens[attr];
            if(allergen) return allergen;
            const characteristic = mealAttributes.characteristic[attr];
            if(characteristic) return characteristic;
            return attr;
          })
      }
    },

    created() {
      // go back if the user return from history
      if (!this.meal) this.$router.back();
    }
  }
</script>
<style lang="scss" scoped>
  @import '../colors';

  .fullscreen {
    margin: 0 auto;
    width: 100%;
    max-width: 400px;

    .photo {
      position: relative;

      img {
        width: 100%;
      }

      .close {
        position: absolute;
        right: 0.5em;
        top: 0.5em;
        font-size: 2em;
        background-color: $icon;
        color: #FFF;
        border-radius: 0.5em;
        width: 0.9em;
        height: 0.9em;
        padding: 0.15em;
        cursor: pointer;
      }
    }

    .data {
      padding: 2em;

      .title {
        padding-bottom: 1.4em;
        font-weight: 300;
        font-size: 1.4em;
      }

      .info {
        font-size: 1.2em;
        color: $secondary;
        font-weight: 300;
        padding-left: 18px;
      }

      .price {
        text-align: right;
        font-weight: 500;
        font-size: 1.5em;
      }
    }
  }
</style>
