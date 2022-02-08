import XTable from "./XTable";
import XSelect from './XSelect';
import XRadio from './XRadio';

export default {
    install: function (Vue) {
        Vue.component('XTable', XTable);
        Vue.component("XSelect", XSelect);
        Vue.component("XRadio", XRadio);

    }
}