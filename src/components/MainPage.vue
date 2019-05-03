<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User name</th>
          <th scope="col">Phone number</th>
          <th scope="col">Address</th>
          <th scope="col">Price</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{order.user_name}}</td>
          <td>{{order.user_phone}}</td>
          <td>{{order.address}}</td>
          <td>{{order.price}}</td>
          <td><button class="btn btn-info" @click="acceptOrder(order.id)">Accept</button></td>
        </tr>
      </tbody>
    </table>
    <a @click="$router.push('/my_orders')">My orders</a>
  </div>
</template>

<style>
.container {
  margin-top: 7%;
}
</style>

<script>
export default {
  data: function() {
    return {
      orders: [
        {
          user_name: "Test",
          user_phone: "Test",
          address: "Address",
          price: "123"
        }
      ]
    };
  },
  mounted: function() {
    this.$http.get(this.$store.getters.getBackUrl + '/courier/get_active_orders').then(response => {
      console.log(response.data);
      this.orders = response.data;
    }, response => {
      console.log('Connection error');
    });
  },
  methods: {
    acceptOrder(id) {
      console.log(id);
      this.$http.post(this.$store.getters.getBackUrl + '/courier/order/' + id + '/').then(response => {
        console.log('Nice');
      }, response => {
        console.log('Connection error');
      })
    }
  }
};
</script>
