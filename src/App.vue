<template>
  <div>
    <notifications group="courier" position="bottom right"/>
    <notification-component></notification-component>
    <!-- Nav bar -->
    <router-view></router-view>
  </div>
</template>

<style>
a:link {
  text-decoration: none;
}
</style>

<script>
import Signin from "./components/Signin.vue";
import Signup from "./components/Signup.vue";
import MainPage from "./components/MainPage.vue";
import NotifiactionComponent from "./components/NotificationComponent.vue";

export default {
  components: {
    "signin-component": Signin,
    "signup-component": Signup,
    "main-page": MainPage,
    "notification-component": NotifiactionComponent,
  },
  created: function() {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      let url = this.$store.getters.getAuthUrl;
      this.$http
        .get(url + "/auth/get_tokens", { params: { session_id: sessionId } })
        .then(
          response => {
            console.log(response.body);
            this.$store.commit(
              "setTokens",
              response.body.token,
              response.body.refresh_token
            );
          },
          response => {
            this.$router.push('/sigin')
          }
        );
    } else {
      this.$router.push('/signin')
    }
  }
};
</script>