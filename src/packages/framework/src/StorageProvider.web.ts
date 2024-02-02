import WebStorage from '@react-native-community/async-storage-backend-web';
import AsyncStorageFactory from '@react-native-community/async-storage';

const webStorage = new WebStorage(); // see storage options below

const storage = AsyncStorageFactory.create<any>(webStorage, {});

export default storage;
