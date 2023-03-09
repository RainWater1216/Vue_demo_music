var app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherL: [],

    },
    methods: {
        search: function (enter) {
            var that = this;
            //    console.log(this.city)
            axios.get('http://ajax-api.itheima.net/api/weather?city=' + this.city)
                .then(function (response) {
                    console.log(response.data.data.data);
                    that.weatherL = response.data.data.data;
                })
                .catch(function (err) {

                })
        },
        changecity: function (city) {
            console.log(city);
            this.city = city;
            this.search();
        }
    }
})