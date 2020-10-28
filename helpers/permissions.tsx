/* Permissions */
import {Platform} from 'react-native';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';

// Permissions that are equivalent for both platforms
const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const PLATFORM_RECORDAUDIO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO
}

const PLATFORM_PHOTO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
}

// Not sure if this is needed if we're gonna save stuff internally, but here just in case
const PLATFORM_FILESYSTEM_PERMISSIONS = {
    ios: "", // No permission exists for reading external storage
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
}

const REQUEST_PERMISSION_TYPE = {
    camera: PLATFORM_CAMERA_PERMISSIONS,
    microphone: PLATFORM_RECORDAUDIO_PERMISSIONS,
    filesystem: PLATFORM_FILESYSTEM_PERMISSIONS,
    photo: PLATFORM_PHOTO_PERMISSIONS
}

const PERMISSION_TYPE = {
    camera: 'camera',
    microphone: 'microphone',
    filesystem: 'filesystem',
    photo: 'photo'
}

class AppPermissions {

    checkPermission = async (type): Promise<boolean> => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]

        // If we already have permission to do this, exit
        if (!permissions) {
            return true
        }
        try {
            const result = await check(permissions)

            if (result === RESULTS.GRANTED) 
                return true;

            return this.requestPermission(permissions); //Attempt to request permission
        } 

        catch (error) {
            console.log("checkPermission failed with error: ", error);
            return false;
        }
    }

    requestPermission = async (permissions): Promise<boolean> => {
        try {
            const result = await request(permissions); 
            return result === RESULTS.GRANTED;
        }

        catch (error)
        {
            console.log("requestPermission failed with error: ", error); 
            return false;
        }
    }
}

const Permission = new AppPermissions()
export {Permission, PERMISSION_TYPE};