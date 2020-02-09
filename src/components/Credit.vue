<template>
  <div class="wrapper">
    <div v-if="notSupported" class="screen container">
      <fa-icon class="icon-folder-open icon" icon="money-check-alt" />
      <div class="title">Uh no!</div>
      <div class="line" />
      <div class="info">
        <p>NFC nicht unterstützt oder nicht aktiviert.</p>
      </div>
    </div>
    <div v-if="!balance && !notSupported" class="screen container">
      <fa-icon class="icon-folder-open icon" icon="money-check-alt" />
      <div class="title">Studentenausweis benötigt</div>
      <div class="line" />
      <div class="info">
        <p>Bitte lege den Studentenausweis auf die Rückseite deines Gerätes.</p>
      </div>
    </div>
    <div v-else-if="!notSupported" class="list">
      <div class="container">
        <div class="balance">{{ $n(balance, {style: 'currency', currency: 'EUR'}) }}</div>
      </div>
    </div>

    <div class="note">
      <div class="container">
        <p>{{ $t('page.common.noWarranty') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        notSupported: false,
        balance: null
      }
    },
    created() {
      const mifare = cordova.plugin.mifare;
      mifare.subscribeTag(() => {
        mifare.auth([{sector: 1, keyA: 'rIe+g5JO'}], () => {
          mifare.read([4], result => {
            let balanceBlock = window.atob(result['4']);
            this.balance = (balanceBlock.charCodeAt(0) | balanceBlock.charCodeAt(1) * 256) / 100;
          }, console.log)
        }, console.error);
      }, (error) => {
        console.log(error);
        this.notSupported = true;
      })
    },
    destroyed() {
      cordova.plugin.mifare.unsubscribeTag();
    }
  }
</script>

<style scoped>
  .balance {
    color: #26A65B;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    padding: 30px;
  }
</style>
