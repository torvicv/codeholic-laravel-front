<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Default from "../Layouts/Default.vue";
import QuestionEditor from '../Editor/QuestionEditor.vue';
import { v4 as uuidv4 } from 'uuid';
import store from "../../store";
import axiosClient from "../../axios";

export default {
  components: {
    Default,
    QuestionEditor
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const changeImage = ref(false);
    const image_url = ref(null);
    const model = ref({
      title: '',
      status: false,
      description: null,
      image: null,
      expire_date: null,
      questions: [],
    });
    const response = store.dispatch('getSurvey', route.params.id)
      .then(resp => {
        model.value = resp.data;
      });
    return {
      route,
      model,
      router,
      changeImage,
      image_url
    };
  },
  methods: {
    saveSurvey() {
      console.log(this.model);
      this.model.status = Boolean(this.model.status);
      store.dispatch('updateSurvey', this.model)
        .then(({data}) => {
          this.router.push({
            name: "SurveyEdit",
            params: {
              id: data.data.id
            }
          });
      });
    },
    onChangeImage() {
      this.changeImage = !this.changeImage;
    },
    onImageChoose(ev) {
      const file = ev.target.files[0];
      this.model.image = file;
      const reader = new FileReader();
      reader.onload = (ev) => {
        // this.model.image = reader.result;
        this.image_url = reader.result;
      };
      reader.readAsDataURL(file);
    },
    addQuestion(index) {
      const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data: {}
      }
      this.model.questions.splice(index, 0, newQuestion);
        console.log(this.model);
    },
    deleteQuestion(question) {
      this.model.questions = this.model.questions.filter(q => q!== question);
    },
    questionsChange(question) {
      this.model.questions = this.model.questions.map(q => {
        if (q.id === question.id) {
          return JSON.parse(JSON.stringify(question));
        }
        return q;
      });
    }
  },
};
</script>

<template>
  <Default title="Create survey">
    <form @submit.prevent="saveSurvey" enctype="multipart/form-data">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 gap-x-6 gap-y-8">
            <div class="sm:col-span-4">
              <label
                for="title"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Title</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
                >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autocomplete="title"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="title"
                    v-model="model.title"
                  />
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="description"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Description</label
              >
              <div class="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  v-model="model.description"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="w-2/5">
                <label
                  for="status"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div class="mt-2">
                  <select
                    id="status"
                    name="status"
                    v-model="model.status"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="true">Active</option>
                    <option value="false">No active</option>
                  </select>
                </div>
              </div>
              <div class="w-2/5">
                <label
                  for="expire_date"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Expire Date</label
                >
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
                  >
                    <input
                      type="date"
                      name="expire_date"
                      id="expire_date"
                      autocomplete="expire_date"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="expire date"
                      v-model="model.expire_date"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="photo"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Photo</label
              >
              <div class="mt-2 flex items-center gap-x-3">
                <!--<svg
                  class="h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>-->
                <img :src="image_url" :alt="model.title" v-if="image_url" class="w-12 h-12" />
                <img :src="model.image" :alt="model.title" v-else class="w-12 h-12" />
                <button
                  @click="onChangeImage"
                  type="button"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div class="col-span-full" v-if="!changeImage">
              <label
                for="cover-photo"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Cover photo</label
              >
              <div
                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
              >
                <div class="text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      for="image"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        class="sr-only"
                        @click="onChangeImage"
                        @change="onImageChoose"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-3">
        <button class="flex items-center bg-black text-white py-2 px-3 rounded-md">
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
              Add Question
        </button>
      </div>

      <div>
        <div v-if="model.questions.length === 0">
            You don't have any questions created yet.
        </div>
      </div>

      <div v-for="(question, index) in model.questions" :key="question.id">
        <QuestionEditor
        :question="question"
        :index="index"
        @change="changeQuestion"
        @add-question="addQuestion"
        @delete-question="deleteQuestion"
        />
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </Default>
</template>
