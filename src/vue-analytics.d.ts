declare module "vue-analytics" {
  import _Vue, { PluginFunction } from "vue";

  export default class VueAnalytics {
    static install(Vue: typeof _Vue, options: any): void;
    analyticsMiddleware: any;
    onAnalyticsReady: any;
    event: any;
    ecommerce: any;
    set: any;
    page: any;
    query: any;
    screenview: any;
    time: any;
    require: any;
    exception: any;
    social: any;
    disable: any;
    enable: any;
  }

  module "vue/types/options" {
    interface ComponentOptions<V extends _Vue> {
      ga?: VueAnalytics;
    }
  }

  module "vue/types/vue" {
    interface Vue {
      $ga: VueAnalytics;
    }
  }
}
