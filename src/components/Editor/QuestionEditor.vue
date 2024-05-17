<script>
import { ref } from "vue";
import store from "../../store";
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    question: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  emit: ["change", "deleteQuestion", "addQuestion"],
  data() {
    return {
      model: ref(JSON.parse(JSON.stringify(this.question))),
      ind: this.index,
      questionTypes: store.state.questionTypes,
    };
  },
  methods: {
    upperCaseFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    shouldHaveOptions() {
      return ["select", "radio", "checkbox"].includes(this.model.type);
    },
    getOptions() {
      return this.model.data.options;
    },
    setOptions(options) {
      this.model.data.options = options;
    },
    addOption() {
      this.setOptions([...this.getOptions(), { uuid: uuidv4(), text: "" }]);
      this.dataChange();
    },
    removeOption(op) {
      this.setOptions(this.getOptions().filter((opt) => opt !== op));
      this.dataChange();
    },
    typeChange() {
      if (this.shouldHaveOptions()) {
        this.setOptions(this.getOptions() || []);
      }
      this.dataChange();
    },
    dataChange() {
      const data = this.model.value;
      if (!this.shouldHaveOptions()) {
        delete data.data.options;
      }
      this.$emit("change", data);
    },
    addQuestion() {
      this.$emit("addQuestion", this.ind + 1);
    },
    deleteQuestion() {
      this.$emit("deleteQuestion", this.question);
    },
  },
};
</script>

<template>
  <div class="">
    <div class="flex justify-between">
      <h3 class="text-lg font-bold">{{ ind + 1 }}. {{ model.question }}</h3>
      <div class="flex gap-4">
        <button
          type="button"
          @click="addQuestion"
          class="flex items-center bg-black text-white py-2 px-3 rounded-md"
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
          Add
        </button>
        <button
          type="button"
          @click="deleteQuestion"
          class="flex items-center bg-black text-white py-2 px-3 rounded-md"
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-3">
      <div class="mt-3 col-span-9">
        <label
          for="'question_text_'+model.data"
          class="block text-sm font-medium text-gray-700"
        >
          Question Text
        </label>
        <input
          type="text"
          :name="'question_text_' + model.data"
          :id="'question_text_' + model.data"
          v-model="model.question"
          @change="dataChange"
          class="w-full"
        />
      </div>
      <div class="mt-3 col-span-3">
        <label
          for="question_type"
          class="block text-sm font-medium text-gray-700"
        >
          Question Text
        </label>
        <select
          name="question_type"
          id="question_type"
          v-model="model.type"
          @change="typeChange"
          class="w-full"
        >
          <option :key="type" :value="type" v-for="type in questionTypes">
            {{ upperCaseFirst(type) }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <div v-if="shouldHaveOptions" class="mt-2">
        <h4
          class="text-sm font-semibold mb-1 flex justify-between items-center"
        >
          Options
          <button type="button" @click="addOption" class="flex items-center bg-">
            Add Option
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
          </button>
        </h4>
      </div>
    </div>
    <div v-if="!model.data.options">You don't have any options defined.</div>
    <div
      v-for="(option, index) in model.data.options"
      :key="option.uuid"
      class="flex items-center mb-1"
    >
      <span class="w-6 text-sm"> {{ index + 1 }} </span>
      <input
        type="text"
        v-model="option.text"
        @change="dataChange"
        class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
      />
      <button type="button" @click="removeOption(option)" class="">
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
