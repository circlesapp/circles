import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { RootState } from './store';
import VueGtag from 'vue-gtag-next';
import { Store } from 'vuex';
import VueSocketIOExt from 'vue-socket.io-extended';
import io, { Socket } from 'socket.io-client';

try {
  if ('Notification' in window) {
    if (Notification.permission == 'granted') {
      console.log('Notification granted');
    } else if (Notification.permission == 'denied') {
      console.log('Notification denied');
    } else {
      Notification.requestPermission(function (status) {});
    }
  }
} catch (err) {
  console.log('No Notification');
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
    $socket: Socket;
  }
}

createApp(App)
  .use(store)
  .use(router)
  .use(VueSocketIOExt, io('https://circles.hyunwoo.dev/'))
  .use(VueGtag, {
    config: { id: 'UA-117534654-3' },
  })
  .mount('#app');
