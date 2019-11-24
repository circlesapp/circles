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
	function startNotification() {
		if (Notification.permission == "granted") {
			navigator.serviceWorker.getRegistration().then(function(reg) {
				var options = {
					body: "circles. 서비스를 이용해주셔서 감사합니다.",
					icon: "logo_192.png",
					vibrate: [100, 50, 100]
				};
				reg!.showNotification("circles.", options);
			});
		}
	}
	Notification.requestPermission(function(status) {
		if (Notification.permission == "granted" && navigator) {
			startNotification();
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
