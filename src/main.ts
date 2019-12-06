import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
	id: "UA-117534654-3"
});

try {
	if ("Notification" in window) {
		if (Notification.permission == "granted") {
			console.log("Notification granted");
		} else if (Notification.permission == "denied") {
			console.log("Notification denied");
		} else {
			Notification.requestPermission(function(status) {});
		}
	}
} catch (err) {}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
