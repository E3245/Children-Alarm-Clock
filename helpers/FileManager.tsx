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
    static WriteJSONToDisk = async (key: string, payload: any, bMerge: boolean) => {
        try {
            const toStr = JSON.stringify(payload); // One-Step conversion to string

            let value;

            if (bMerge) {
                // Query the key and see if it already exists
                value = await FileManager.ReadJSONData(key);
            }

            if (bMerge && value !== null) // Object exists and Merge is set, attempt to merge existing items
            {
                // Merge the data together
                await AsyncStorage.mergeItem(key, toStr); // Todo: Insert Error Callback function
                Alert.alert('Data successfully saved!');
            }
            else // Object does not exist or Merge is not set
            {
                // Store the data in storage
                await AsyncStorage.setItem(key, toStr); // Todo: Insert Error Callback function  
                Alert.alert('Data successfully saved!');
            }

        } catch (eror) {
            Alert.alert('Failed with error: ', eror);
        }

    };
    
    //
    // inputs:
    //  * key: must be one of the unique IDs that are set in this document or saved somewhere in another file
    //
    static ReadJSONData = async (key: string) => {
        return new string(output => {
            try {
                const jsonValue = await AsyncStorage.getItem(key);  // Todo: Insert Error Callback function
                //console.log(jsonValue);
                return jsonValue != null ? JSON.parse(jsonValue) : null;    // One-Step conversion to JSON
            } catch (eror) {
                Alert.alert('Failed with error: ', eror);
            } 
        });
        }
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
            await AsyncStorage.multiRemove(key);  // Todo: Insert Error Callback function
            Alert.alert('Data successfully saved!');
        } catch (eror) {
            Alert.alert('Failed with error: ', eror);
        }  
    };
}
