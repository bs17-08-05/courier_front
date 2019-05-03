<template></template>

<script>
export default {
  created: function() {
    const socket = new WebSocket(
      this.$store.getters.getBackWsUrl + "/courier/notification"
    );

    let vm = this;
    // Listen for messages
    socket.addEventListener("message", function(event) {
      vm.$notify({
        group: "courier",
        title: "New order",
        text: event.data
      });
      console.log(event.data);
    });
  }
};
</script>


