import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
var __photo: String[][] = [];
export function usePhotoGallery() {
    var [ph, setPh] = useState([]);
    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        let base64Data: string;
        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = file.data;
        } else {
            base64Data = await base64FromPath(photo.webPath!);
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });
        console.log(__photo);
        __photo.push([base64Data, __photo.length + 1 + ""])
        // console.log(__photo);
        if (isPlatform('hybrid')) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            // Use webPath to display the new image instead of base64 since it's
            // already loaded into memory
            return {
                filepath: fileName,
                webviewPath: photo.webPath,
            };
        }
    };
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    useEffect(() => {
        const loadSaved = async () => {

            const { value } = await Preferences.get({ key: PHOTO_STORAGE });
            const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];
            // If running on the web...
            if (!isPlatform('hybrid')) {
                for (let photo of photosInPreferences) {
                    const file = await Filesystem.readFile({
                        path: photo.filepath,
                        directory: Directory.Data,
                    });
                    // Web platform only: Load the photo as base64 data
                    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
            }
            setPhotos(photosInPreferences);
        };
        loadSaved();
    }, []);
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            quality: 100,
        });
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(photo, fileName);
        const newPhotos = [
            savedFileImage,
            ...photos,
        ];
        setPhotos(newPhotos);
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
    };

    return {
        photos,
        takePhoto,
        __photo,
    };

}

export function supAll() {
    var photo: String[][] = [];
    __photo = photo;
    return photo;
}

export function supPhoto(id: String) {
    var photo: String[][] = [];
    var i = 1;
    for (let index = 0; index < __photo.length; index++) {
        if (__photo[index][1] != id) {
            photo.push([__photo[index][0], i + ""]);
            i++;
        }
    }
    __photo = photo;
    return photo;
}

export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    });
}
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}