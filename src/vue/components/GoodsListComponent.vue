<script>
export default {
  data() {
    let back_url = this.$store.getters.getBackUrl; 
    console.log(this.$store.getters.getHorecamaId);
    return {
      api_url: back_url + "/api/goods/" + this.$store.getters.getHorecamaId + "/",
      goods: [
        { id: 1, photo_url: null, price: 12, description: "test", name: "hui" }
      ]
    };
  },

  methods: {
    getAllGoods: function() {
      this.$http.get(this.api_url).then(
        function(response) {
          console.log(response);
          this.goods = response.body.data;
        },
        function(error) {
          console.log(response);
          //error
        }
      );
    },
    back: function(id) {
      this.$store.commit('setView', 0);
    },
    buyButton: function(id) {
      this.$store.commit('setView', 2);
      this.$store.commit('setGoodId',id);
    }
  },
  created: function() {
    this.getAllGoods();
  }
};
</script>

