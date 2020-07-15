<template>
  <div v-once class="wrapper">
    <div class="list">
      <div class="container">
        <a v-for="(tip, index) of tips" :key="index"
           class="tip article" :href="tip.link" target="_blank">
          <div class="strip" :class="tip.color">
            <fa-icon :icon="tip.icon" />
          </div>
          <div class="text">
            <div class="title">{{ $t("page.tips." + tip.name + ".title") }}</div>
            <div class="description">
              <p>{{ $t("page.tips." + tip.name + ".description") }}</p>
            </div>
          </div>
          <div class="arrow">
            <fa-icon v-if="tip.link" icon="chevron-right" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        tips: [
          {
            name: 'pushMail',
            icon: 'envelope',
            color: 'red',
            link: 'https://confluence.hft-stuttgart.de/display/DFST/Clienteinrichtung+mit+Autodiscover'
          },
          {
            name: 'eduroam',
            icon: 'rss',
            color: 'orange',
            link: 'https://confluence.hft-stuttgart.de/display/DFST/Internet+und+WLAN#InternetundWLAN-Eduroam'
          },
          {
            name: 'datesExport',
            icon: 'calendar-plus',
            color: 'yellow',
          },
          {
            name: 'msOffice',
            icon: 'file-alt',
            color: 'blue',
            link: 'https://confluence.hft-stuttgart.de/display/DFST/Microsoft+Office+365+Installation'
          }
        ]
      }
    }
  }
</script>
<style lang="scss">
  @import '../colors';

  .tip {
    display: flex;

    .strip {
      padding: 0.5em 0;
      color: #FFF;
      font-size: 1.6em;
      width: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .text {
      flex-grow: 1;
      padding: 12px 16px;
    }

    .title {
      margin-bottom: 8px;
    }

    .description {
      font-size: 14px;
      color: $secondary;
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 0.5em;;
      color: $icon;
      flex-shrink: 0;
    }
  }
</style>
