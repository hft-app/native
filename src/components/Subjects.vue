<template>
  <div>
    <nav>
      <div class="bar container">
        <a @click="$router.back()">Abbrechen</a>
        <a class="save" @click="next">Weiter</a>
      </div>
    </nav>

    <div class="wrapper">
      <div class="dashboard">
        <div class="widget">
          <div class="container">
            <h5>Kurse auswählen</h5>
          </div>
          <form class="subjects" method="POST" action="?submit">
            <div class="container">
              <div v-for="subject in subjects" :key="subject.name" class="item">
                <div class="header">
                  <label>
                    <div class="icon icon-fw icon-prepend checkbox">
                      <input v-model="subject.selected" type="checkbox">
                      <span class="name">{{ subject.name }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="note">
        <div class="container">
          <p>Vorlesungsverzeichnis</p>
          <p>
            &copy; <a href="http://www.hft-stuttgart.de/" target="_blank">
              Hochschule für Technik Stuttgart</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Client} from '../stores/lsf'

  export default {
    data() {
      return {
        selected: '',
        subjects: [],
      }
    },
    computed: {
      selectedSubjects() {
        return this.subjects.filter(subject => subject.selected)
      }
    },
    async created() {
        this.subjects = await Client.loadSubjects();
    },
    methods: {
      next() {
        this.$router.push({name: 'courses', params: {selectedSubjects: this.selectedSubjects}})
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../colors";

  .subjects {
    border-width: 1px 0;
    border-style: solid;
    border-color: $border;
    background-color: #FFF;

    .item {
      padding: 8px 6px;

      &.active {
        .courses {
          display: block;
        }
      }

      & + .item {
        border-top: 1px solid #F1F2F3;
      }
    }

    .checkbox {
      display: flex;
      align-items: center;

      &::before {
        font-size: 20px;
        flex-shrink: 0;
      }
    }

    .header {
      display: flex;

      span.name {
        font-weight: 500;
      }

      span.amount {
        font-weight: 300;
        color: $secondary;
        padding-left: 6px;
      }

      input {
        height: 25px;
        width: 25px;
      }
    }

    .courses {
      display: none;
      padding-left: 34px;

      label {
        display: block;
        padding: 8px 0;
      }
    }
  }
</style>
