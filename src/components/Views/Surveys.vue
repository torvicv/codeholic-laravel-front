<script>
import store from "../../store";
import Default from "../Layouts/Default.vue";
import SurveyCard from './SurveyCard.vue';

export default {
  name: "Surveys",
  components: {
    Default,
    SurveyCard,
  },
  data() {
    return {
      surveys: [],
    };
  },
  mounted() {
    store.dispatch("getSurveys").then((surveys) => {
      this.surveys = surveys;
    });
  },
  methods: {
    deleteSurvey(id) {
      store.dispatch("deleteSurvey", id).then(() => {
        store.dispatch("getSurveys").then((surveys) => {
          this.surveys = surveys;
        });
      });
    },
  },
};
</script>

<template>
  <Default title="Surveys">
    <div class="min-h-full">
      <div class="w-full">
        <router-link
          to="surveys/create"
          class="flex items-center bg-indigo-500 w-full justify-center text-white rounded-lg py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create survey
        </router-link>
      </div>
      <div class="grid grid-cols-3 gap-6 my-3">
        <div v-for="survey in surveys" :key="survey.id">
          <SurveyCard @delete="deleteSurvey" :survey="survey" />
        </div>
      </div>
    </div>
  </Default>
</template>
