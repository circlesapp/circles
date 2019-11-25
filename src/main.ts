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
	if (Notification)
		Notification.requestPermission(function(status) {
			if (Notification.permission == "granted" && navigator) {
			}
		});
} catch (err) {
	console.log(err);
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
