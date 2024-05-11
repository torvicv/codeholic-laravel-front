<script>
import Auth from '../Layouts/Auth.vue';
import store from '../../store';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

export default {
  name: "Register",
  components: {
    Auth
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: reactive({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }),
      router: useRouter()
    };
  },
  methods: {
    register(ev) {
      ev.preventDefault();
      store.dispatch("register", this.form)
        .then((res) => {
          this.router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          this.errors.name = err.response.data.errors.name;
          this.errors.email = err.response.data.errors.email;
          this.errors.password = err.response.data.errors.password;
          this.errors.password_confirmation = err.response.data.errors.password_confirmation;
        });
    }
  }
};
</script>

<template>
  <Auth>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="register">
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Full name</label
            >
            <div class="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                v-model="form.name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p v-for="error in errors.name" v-if="errors.name" class="text-sm text-red-600">{{ error }}</p>
          </div>
          
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="form.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p v-for="error in errors.email" v-if="errors.email" class="text-sm text-red-600">{{ error }}</p>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="form.password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p v-for="error in errors.password" v-if="errors.password" class="text-sm text-red-600">{{ error }}</p>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label
                for="password_confirmation"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm Password</label
              >
            </div>
            <div class="mt-2">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autocomplete="current-password_confirmation"
                required
                v-model="form.password_confirmation"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p v-for="error in errors.password_confirmation" v-if="errors.password_confirmation" class="text-sm text-red-600">{{ error }}</p>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
        <div>
          <p class="mt-6 text-center text-sm text-gray-600">
            Already have an account? 
            <router-link to="Login">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </Auth>
</template>
