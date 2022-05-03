import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { RootState } from './store';
import VueGtag from 'vue-gtag-next';
import { Store } from 'vuex';
import { Socket } from 'socket.io-client';
import socketIo from '@/modules/socket-io';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
    $socket: Socket;
  }
}

socketIo.init();

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

createApp(App)
  .use(store)
  .use(router)
  .provide('$socket', socketIo.socket)
  .use(VueGtag, {
    config: { id: 'UA-117534654-3' },
  })
  .mount('#app');
