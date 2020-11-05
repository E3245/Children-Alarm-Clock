// Basic class that peforms reads and writes into internal storage
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Key values that shall not be changed for any reason, or else existing data will be orphaned!
export const ALARM_STORAGE_KEY = '@ALARM_STORAGE_KEY';
export const TIMER_STORAGE_KEY = '@TIMER_STORAGE_KEY';
export const SETTINGS_STORAGE_KEY = '@SETTINGS_STORAGE_KEY';

//
// inputs:
//  * key: must be one of the unique IDs that are set in this document or saved somewhere in another file
//  * payload: any, but preferably a JSON object
//

export class FileManager {
  static WriteJSONToDisk = async (
    key: string,
    payload: any,
    bMerge: boolean,
  ) => {
    try {
      const toStr = JSON.stringify(payload); // One-Step conversion to string

      let value;

      if (bMerge) {
        // Query the key and see if it already exists
        value = await FileManager.ReadJSONData(key);
      }

      if (bMerge && value !== null) {
        // Object exists and Merge is set, attempt to merge existing items
        // Merge the data together
        await AsyncStorage.mergeItem(key, toStr); // Todo: Insert Error Callback function
        // Alert.alert('Data successfully saved!');
      } // Object does not exist or Merge is not set
      else {
        // Store the data in storage
        await AsyncStorage.setItem(key, toStr); // Todo: Insert Error Callback function
        // Alert.alert('Data successfully saved!');
      }
    } catch (eror) {
      Alert.alert('FileManager: Failed with error: ', eror);
    }
  };

  //
  // inputs:
  //  * key: must be one of the unique IDs that are set in this document or saved somewhere in another file
  //
  // To retrieve data, you must do this:
  /*
        const MyAsyncFunction = async () => {
            await FileManager.ReadJSONData(ALARM_STORAGE_KEY).then(token => {console.log(token)});
        }
    */
  static ReadJSONData = async (key: string) => {
    let thenProm: string = await Promise.resolve(AsyncStorage.getItem(key)) // Attempt to resolve the promise
      .then((token) => {
        return token;
      })
      .catch((error) => {
        return error;
      });

    console.log('FileManager: ReadJSONData: ' + thenProm);

    return JSON.parse(thenProm);
    //console.log(jsonValue);
  };

  //
  // inputs:
  //  * key: an array of keys that will be used to delete data from the internal storage
  //
  // This requires a string of keys, even if you plan on deleting contents of a single key
  // Alternative to calling AsyncStorage's clear() function and wiping all data
  //
  static ClearData = async (key: Array<string>) => {
    try {
      await AsyncStorage.multiRemove(key); // Todo: Insert Error Callback function
      //   Alert.alert('Data successfully saved!');
    } catch (eror) {
      Alert.alert('FileManager: Failed with error: ', eror);
    }
  };
}
