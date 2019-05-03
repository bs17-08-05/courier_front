<script>
export default {
  data() {
    return {
      api_url: this.$store.getters.getBackUrl + "/api/horecama/",
      back_url: this.$store.getters.getBackUrl,
      horecamas: [{'type': 'R', 'pk': 1, 'name': 'UUU', 'description': 'UUUUUU', 'photo_url': null, 'address':'test'}]
    };
  },

  methods: {
    getAllHorecama: function() {
      console.log(this.api_url);
      this.$http.get(this.api_url).then(
        function(response) {
          this.horecamas = response.body.data;
        },
        function(error) {
          //error
        }
      );
    },
    view_menu: function(id) {
      this.$store.commit('setView', 1);
      this.$store.commit('setHorecamaId', id);
    }
  },
  created: function() {
    this.getAllHorecama();
  }
};
</script>

