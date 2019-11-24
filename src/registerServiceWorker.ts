/* eslint-disable no-console */

import { register } from "register-service-worker";

function displayNotification() {
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

if (process.env.NODE_ENV === "production") {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready() {
			console.log("App is being served from cache by a service worker.\n" + "For more details, visit https://goo.gl/AFskqB");
		},
		registered() {
			displayNotification();
			console.log("Service worker has been registered.");
		},
		cached() {
			console.log("Content has been cached for offline use.");
		},
		updatefound() {
			console.log("New content is downloading.");
		},
		updated() {
			console.log("New content is available; please refresh.");
		},
		offline() {
			console.log("No internet connection found. App is running in offline mode.");
		},
		error(error) {
			console.error("Error during service worker registration:", error);
		}
	});
}
