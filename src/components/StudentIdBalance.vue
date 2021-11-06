<template>
  <div class="wrapper">
    <div v-if="errorNotSupported || errorRead" class="screen container">
      <fa-icon class="icon-folder-open icon" icon="money-check-alt" />
      <div class="title">{{ $t('page.error.title') }}</div>
      <div class="line" />
      <div class="info">
        <p v-if="errorNotSupported">{{ $t('page.balance.errorNotSupported') }}</p>
        <p v-else>{{ $t('page.balance.errorRead') }}</p>
      </div>
    </div>
    <div v-else-if="!balance" class="screen container">
      <fa-icon class="icon-folder-open icon" icon="money-check-alt" />
      <div class="title">{{ $t('page.balance.idRequired') }}</div>
      <div class="line" />
      <div class="info">
        <p>{{ $t('page.balance.intro') }}</p>
      </div>
    </div>
    <div v-else class="list">
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
        errorNotSupported: false,
        errorRead: false,
        balance: null
      }
    },
    created() {
      const studentid = cordova.plugin.studentid;
      const subscribe = () => {
        studentid.subscribe(async () => {
          try {
            const result = await studentid.read()
            this.balance = result.balance;
            this.errorRead = false;
          } catch (error) {
            this.errorRead = true;
            console.error(error);
          }
          subscribe();
        }, (error) => {
          this.errorNotSupported = true;
          console.error(error);
        })
      }
      subscribe()
    },
    destroyed() {
      cordova.plugin.studentid.unsubscribe();
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
