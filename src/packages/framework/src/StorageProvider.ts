import { Platform } from 'react-native';
import LegacyStorage from '@react-native-community/async-storage-backend-legacy';
import AsyncStorageFactory from '@react-native-community/async-storage';

type MyModel = {
  test: string;
};

let legacyStorage;
let storage:any;

if (Platform.OS !== 'macos' ) {
  legacyStorage = new LegacyStorage();
  storage = AsyncStorageFactory.create<any>(legacyStorage, {});
}

export default storage;