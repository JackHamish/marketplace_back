import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage';
import { Injectable } from '@nestjs/common';
@Injectable()
export class StorageService {
  private storage: FirebaseStorage;

  constructor() {
    this.storage = getStorage();
  }

  async save(file: Express.Multer.File, path: string) {
    const timestamp = Date.now();
    const name = file.originalname.split('.')[0];
    const type = file.originalname.split('.')[1];
    const fileName = `${name}_${timestamp}.${type}`;

    const fileRef = ref(this.storage, `${path}/${fileName}`);

    const uploaded = await uploadBytes(fileRef, file.buffer);

    return {
      url: await getDownloadURL(uploaded.metadata.ref!),
      dbRef: uploaded.metadata.fullPath,
    };
  }

  async delete(path: string) {
    const fileRef = ref(this.storage, path);
    return await deleteObject(fileRef);
  }
}
