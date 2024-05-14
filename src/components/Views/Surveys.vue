<script>
import Default from "../Layouts/Default.vue";

export default {
  name: "Surveys",
  components: {
    Default,
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
    </div>
  </Default>
</template>
