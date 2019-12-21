/* eslint-disable no-console */

import { register } from "register-service-worker";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

let applicationServerKey = "BOv3hzFFm8Vac3tXPsNT9CmOEBvJA3kUfJ3C0QMI33VaeN8Gl8hs9GBcg1xtECK53YeF7dm9Dzc8YQfdmno8z28";
function pushReady() {
	navigator.serviceWorker.getRegistration().then(function(reg) {
		reg!.pushManager
			.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
			})
			.then((data: PushSubscription) => {
				localStorage.setItem("circles.pushSubscription", JSON.stringify(data.toJSON()));
			});
	});
}
function startNotification() {
	navigator.serviceWorker.getRegistration().then(function(reg) {
		var options = {
			body: "circles. 서비스를 이용해주셔서 감사합니다.",
			icon: "logo_192.png",
			vibrate: [100, 50, 100]
		};
		reg!.showNotification("circles.", options);
	});
}
if (process.env.NODE_ENV === "production") {
	register(`${process.env.BASE_URL}sw.js`, {
		ready() {
			console.log("App is being served from cache by a service worker.\n" + "For more details, visit https://goo.gl/AFskqB");
		},
		registered(reg: ServiceWorkerRegistration) {
			try {
				if ("Notification" in window) {
					if (Notification.permission == "granted") {
						pushReady();
						startNotification();
					}
				}
			} catch (err) {}
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
