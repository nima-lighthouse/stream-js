export default class StreamImageStore {
  constructor(client, token) {
    this.client = client;
    this.token = token;
  }

  // React Native does not auto-detect MIME type, you need to pass that via contentType
  // param. If you don't then Android will refuse to perform the upload
  upload(uri, name, contentType) {
    return this.client.upload('images/', uri, name, contentType);
  }

  delete(uri) {
    return this.client.delete({
      url: `images/`,
      qs: { url: uri },
      signature: this.token,
    });
  }

  process(uri, options) {
    const params = Object.assign(options, { url: uri });
    if (Array.isArray(params.crop)) {
      params.crop = params.crop.join(',');
    }

    return this.client.get({
      url: `images/`,
      qs: params,
      signature: this.token,
    });
  }

  thumbnail(uri, w, h, { crop, resize } = { crop: 'center', resize: 'clip' }) {
    return this.process(uri, { w, h, crop, resize });
  }
}
