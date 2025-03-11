import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageManager {
  public setItem = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in AsyncStorage', error);
    }
  };

  public getItem = async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from AsyncStorage', error);
      return null;
    }
  };

  public removeItem = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage', error);
    }
  };

  public clear = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
    }
  };
}

const asyncStorageManager = new AsyncStorageManager();

export default asyncStorageManager;
