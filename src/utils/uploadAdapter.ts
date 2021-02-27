import axios, { AxiosResponse } from 'axios';
import apiRoutes from '../constants/apiRoutes';
import { getAccessToken } from './localStorageUtils';

type SuccessCb = (resourceId: string) => void;

class UploadAdapter {
  private readonly loader: any;

  private readonly successCb: SuccessCb;

  constructor(loader: any, successCb: SuccessCb) {
    this.loader = loader;
    this.successCb = successCb;
  }

  /**
   * Uploads resource to the server
   */
  public async upload(): Promise<{ default: string }> {
    const formData: FormData = new FormData();

    formData.append('file', await this.loader.file);

    const {
      data: { filename, _id },
    }: AxiosResponse<{ filename: string, _id: string }> = await axios.post(
      apiRoutes.resourceUpload,
      formData,
      { headers: { Authorization: getAccessToken() } },
    );

    this.successCb(_id);

    return { default: apiRoutes.uploads(filename) };
  }
}

export default (successCb: SuccessCb) => function CustomUploadAdapterPlugin(editor: any) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = (
    loader: any,
  ) => new UploadAdapter(loader, successCb);
};

export type UploadAdapterType = (editor: any) => void;
