<template>
  <v-app>
    <v-layout align-center justify-center fill-height>
      <v-container align-center text-xs-center>
          <h2 class="text-uppercase" style="color: #388E3C">Sign in</h2>
          <v-form ref="logForm">
            <v-text-field v-model="phone" label="Phone" :mask="'+7##########'" success></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[rules.required]"
              success
            ></v-text-field>
            <v-btn @click="signin()" style="color: #388E3C" class>Sing in</v-btn>
            <v-alert
              v-model="error"
              type="error"
              transition="scale-transition"
            >Incorect login or password</v-alert>
          </v-form>
          <a @click.stop="$router.push('/signup')">Sing up</a>
      </v-container>
    </v-layout>
  </v-app>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      phone: "",
      password: "",
      error: "",
      rules: {
        email: val => {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            !val || re.test(String(val).toLowerCase()) || "Некорректный ввод"
          );
        },
        required: val => !!val || "Это поле обязательное для заполнения"
      }
    };
  },

  methods: {
    signin: function() {
      let data = {
        phone_number: this.phone,
        password: this.password
      };
      this.$http
        .post(this.$store.getters.getAuthUrl + "/auth/signin", data)
        .then(
          response => {
            let r = response.body;
            let token = r["token"];
            let refresh_token = r["refresh_token"];
            let session_id = r["session_id"];
            this.$store.commit("setTokens", token, refresh_token);
            localStorage.setItem("sessionId", session_id);
            localStorage.setItem("token", token);
          },
          response => {
            console.log(response);
            this.error = response.body["error"];
          }
        );
    }
  }
};
</script>
