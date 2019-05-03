<template>
  <v-app>
    <v-layout align-center justify-center fill-height>
      <v-container align-center text-xs-center>
        <h2 class="text-uppercase" style="color: #388E3C">Registration</h2>
        <v-form ref="regForm">
          <v-text-field v-model="user_name" label="Name" :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="phone" label="Phone" :mask="'+7##########'"></v-text-field>
          <v-text-field v-model="address" label="Address" :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="pass1" label="Password" type="password" :rules="[rules.required]"></v-text-field>
          <v-text-field
            v-model="pass2"
            label="Confirm password"
            type="password"
            :rules="[rules.required]"
          ></v-text-field>
          <v-btn @click="signup" style="color: #388E3C">Sing up</v-btn>
          <a @click="$router.push('/signin')">Have account?</a>
        </v-form>
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
      user_name: "",
      pass1: "",
      pass2: "",
      email: "",
      rules: {
        required: val => !!val || "Required"
      }
    };
  },

  methods: {
    signup: function(e) {
      e.preventDefault();
      let data = {
        password: this.pass1,
        phone_number: this.phone,
        user_name: this.user_name,
        address: this.address,
        type: 'CO'
      };
      this.$http
        .post(this.$store.getters.getAuthUrl + "/auth/signup", data)
        .then(
          response => {
            let r = response.body;
            let token = r["token"];
            let refresh_token = r["refresh_token"];
            let session_id = r["session_id"];
            this.$store.commit("setTokens", token, refresh_token);
            localStorage.setItem("sessionId", session_id);
            localStorage.setItem("token", token);
            this.$router.push('/');
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
