import NewService from '../core/apisService';

class UploadsService extends NewService {
  constructor(props = {}) {
    super(props);
  }

  // actGetUploads = (params) => {
  //   return this.get(this.apiUlr() + '/uploads', params);
  // };

  // actGetUploadById = (id, params) => {
  //   console.log('actGetUploadById', id);
  //   return this.get(this.apiUlr() + `/uploads/${id}`, params);
  // };

  actPostUpload = (params) => { // for base64
    return this.post(this.apiUlr() + '/uploads', params);
  };

  actUploadPicture = (formData, options) => { // for form-data
    return this.post(this.apiUlr() + '/api/image/upload', formData, options);
  };

  // actUpdateUpload = (id, params) => {
  //   return this.put(this.apiUlr() + `/uploads/${id}`, params);
  // };

  // actDeleteUpload = (id) => {
  //   return this.delete(this.apiUlr() + `/uploads/${id}`);
  // };
}

export default UploadsService;
