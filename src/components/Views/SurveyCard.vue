<script>
import { useRouter } from "vue-router";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
export default {
  data() {
    return {
      trash: Trash,
      edit: Edit,
      router: useRouter(),
      dateSurvey: new Date(this.survey.expire_date).toLocaleDateString('es-ES')
    };
  },
  props: {
    survey: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteSurvey() {
      this.$emit("delete", this.survey.id);
    },
    editSurvey() {
      this.router.push({
        name: "SurveyEdit",
        params: {
          id: this.survey.id,
        },
      });
    },
  },
};
</script>

<template>
  <div
    class="shadow-[0_0_8px_#cccccc60] p-4 rounded-md text-slate-100 hover:shadow-[0_0_8px_#ccccccBB] hover:scale-[1.05]"
  >
    <div class="flex flex-col md:flex-row items-center justify-around my-2">
      <img :src="survey.image" :alt="survey.title" class="w-24 h-24" />
      <h1 class="font-bold text-xl text-slate-500">{{ survey.title }}</h1>
    </div>
    <div class="flex justify-around bg-slate-800 px-2 py-3">
      <div class="flex items-center">
        {{ dateSurvey }}
      </div>
    </div>
    <div class="flex flex-start bg-slate-900 px-2 py-3">
      {{ survey.description }}
    </div>
    <div class="flex justify-between p-3 bg-slate-950">
      <div
        class="p-2"
        :class="
          survey.status
            ? 'text-green-600'
            : 'text-red-600'
        "
      >
        {{ survey.status ? "Activo" : "No Activado" }}
      </div>
      <div class="flex items-center gap-3">
        <button type="button" @click="editSurvey">
          <img class="w-8 h-8" :src="edit" title="edit icon" alt="edit icon" />
        </button>
        <button type="button" @click="deleteSurvey">
          <img
            class="w-8 h-8"
            :src="trash"
            title="trash icon"
            alt="trash icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>
