import {Drivers, Storage} from '@ionic/storage';

const store = new Storage({
    name: 'app_db',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
export default store

