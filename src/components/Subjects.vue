<template>
  <div class="wrapper">
    <nav>
      <div class="bar container">
        <a @click="$router.back()">{{ $t('page.common.cancel') }}</a>
        <a :class="{disabled: selectedSubjects.length === 0}" @click="next">Weiter</a>
      </div>
    </nav>

    <div v-if="error" class="screen container">
      <fa-icon class="icon" icon="exclamation-triangle" />
      <div class="title">Ups</div>
      <div class="line" />
      <div class="info">
        <p class="error">{{ $t('error.' + error.type) }}</p>
      </div>
    </div>
    <div v-else-if="!subjects || !subjects.length" class="screen container">
      <fa-icon class="icon icon-spin" icon="sync-alt" />
      <div class="title">{{ $t('page.subjects.loadingTitle') }}</div>
      <div class="line" />
      <div class="info">
        <p>{{ $t('page.subjects.loadingInfo') }}</p>
      </div>
    </div>
    <div v-else class="wrapper">
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
  import {getErrorInfo} from '../stores/util';

  export default {
    data() {
      return {
        subjects: [],
        error: null
      }
    },
    computed: {
      selectedSubjects() {
        return this.subjects.filter(subject => subject.selected)
      }
    },
    async created() {
      try {
        this.subjects = await Client.loadSubjects();
      } catch (e) {
        console.error(e);
        this.error = getErrorInfo(e);
      }
      this.$store.state.lsf.selectedSubjects.forEach(subject => {
        const foundSubject = this.subjects.find(s =>
          s.id === subject.id && s.parallelId === subject.parallelId);
        if (foundSubject) {
          foundSubject.selected = true
        }
      })
    },
    methods: {
      next() {
        if (this.selectedSubjects.length > 0) {
          this.$store.commit('lsf/selectedSubjects', this.selectedSubjects);
          this.$router.push('courses');
        }
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

  .error {
    white-space: pre;
  }
</style>
