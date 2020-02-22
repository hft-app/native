<template>
  <div class="fullscreen">
    <div class="photo">
      <img :src="'https://sws2.maxmanager.xyz/assets/' + (meal.photo? meal.photo:
             'fotos/musikhochschule/Speisefotos/0-1/27816947m_dummy_speisen.jpg')"
           :alt="$t('page.meals.imageNotLoaded')">
      <fa-icon icon="times" class="lu-icon lu-times-circle close" @click="$router.back()" />
    </div>
    <div class="data">
      <div class="title">{{ meal.title }}</div>
      <div class="price">{{ meal.price }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      meal: {
        type: Object,
        required: true
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
      }
    }

    .data {
      padding: 2em;

      .title {
        padding-bottom: 2em;
        font-weight: 300;
        font-size: 1.4em;
      }

      .price {
        text-align: right;
        font-weight: 500;
        font-size: 1.5em;
      }
    }
  }
</style>
