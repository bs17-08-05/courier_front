<template>
  <div class="container">
    <h2>Active orders</h2>
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
        <tr v-for="(order, index) in not_delivered_orders" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{order.user_name}}</td>
          <td>{{order.user_phone}}</td>
          <td>{{order.address}}</td>
          <td>{{order.price}}</td>
          <td><button class="btn btn-info" @click="delivered(order.id)">Delivered</button></td>
        </tr>
      </tbody>
    </table>
    <h2>Delivered orders</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User name</th>
          <th scope="col">Phone number</th>
          <th scope="col">Address</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in finished_orders" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{order.user_name}}</td>
          <td>{{order.user_phone}}</td>
          <td>{{order.address}}</td>
          <td>{{order.price}}</td>
        </tr>
      </tbody>
    </table>
    <a @click="$router.push('/')">Back to new orders</a>
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
      not_delivered_orders: [
        {
          user_name: "Test",
          user_phone: "Test",
          address: "Address",
          price: "123"
        }
      ],
      finished_orders:[] 
    };
  },
  mounted: function() {
    this.$http.get(this.$store.getters.getBackUrl + '/api/courier/get_not_delivered').then(response => {
      console.log(response.data);
      this.not_delivered_orders = response.data;
    }, response => {
      console.log('Connection error');
    });
    this.$http.get(this.$store.getters.getBackUrl + '/api/courier/get_delivered').then(response => {
      this.finished_orders = response.data;
    }, response => {
      console.log('Connection error');
    });
  },
    delivered(id) {
    methods: {
      this.$http.post(this.$store.getters.getBackUrl + '/api/courier/delivered/' + id + '/').then(response => {
        console.log('Nice');
      }, response => {
        console.log('Connection error');
      })
    }
  }
};
</script>
