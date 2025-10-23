var vueinst = new Vue({
    el: "#app",
    data: {
        viewType: "list",
        //show_list: true,
        sortVal: ""
    },
    methods: {
        onChange(event) {
            /*
            if (event.target.value == "list") {
                this.show_list = true
            }
            if (event.target.value == "grid") {
                this.show_list = false
            }*/
            addEvent();
        },
        removeFocus(event) {
            event.target.blur();
        }
    }
});