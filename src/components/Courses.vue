<template>
  <div>
    <nav>
      <div class="bar container">
        <a @click="$router.go(-2)">{{ $t('page.common.cancel') }}</a>
        <a v-if="!saving" :class="{disabled: selectedCourses.length === 0}" @click="save">
          {{ $t('page.courses.save') }}
        </a>
        <a v-else class="disabled">{{ $t('page.courses.saving') }}</a>
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
                      <span class="name">{{ subject.name }}</span>
                      <span class="amount">({{ subject.courses.length }})</span>
                    </div>
                  </label>
                </div>
                <div v-for="course in subject.courses" class="courses">
                  <label>
                    <input v-model="course.selected" type="checkbox" value="on">
                    <span class="checkbox course-name">{{ course.name }}</span>
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
        subjects: [],
        saving: false
      }
    },
    computed: {
      selectedCourses() {
        // XXX flatMap isn't supported in older browsers https://caniuse.com/#feat=array-flat
        // return this.subjects.flatMap(subject => subject.courses.filter(course => course.selected))
        let courses = [];
        for (const subject of this.subjects) {
          courses.push(...subject.courses.filter(course => course.selected))
        }
        return courses;
      }
    },
    async created() {
      const selectedSubjects = this.$store.state.lsf.selectedSubjects;
      const selectedCourses = new Set(this.$store.state.lsf.selectedCourses.map(course => course.id));
      this.subjects = await Promise.all(selectedSubjects.map(async subject => {
        const courses = await Client.loadCoursesBySubject(subject);
        courses.forEach(course => {
          if (selectedCourses.has(course.id)) course.selected = true
        });
        return {courses, ...subject}
      }));
    },
    methods: {
      async save() {
        try {
          this.saving = true;
          await this.$store.dispatch('lsf/selectCourses', this.selectedCourses.map(course => ({
            id: course.id,
            subjectId: course.subjectId
          })));
          this.$router.push('timetable')
        } finally {
          this.saving = false;
        }
      }
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

      label {
        padding: 8px 0;
      }

      span.name {
        font-weight: 500;
      }

      span.amount {
        font-weight: 300;
        color: $secondary;
        padding-left: 6px;
      }

      .arrow {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: $icon;
        font-size: 26px;
      }
    }

    .courses {
      padding-left: 34px;

      .course-name {
        font-size: 16px;
      }

      label {
        display: flex;
        padding: 8px 0;
      }
    }
  }
</style>
