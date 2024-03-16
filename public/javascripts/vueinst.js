var vueinst = new Vue({
    el: "#app",
    data: {
        key: "",
        show_list: true
    },
    methods: {
        onChange(event) {
            if (event.target.value == "list") {
                this.show_list = true
            }
            if (event.target.value == "grid") {
                this.show_list = false
            }
        }
    }
});