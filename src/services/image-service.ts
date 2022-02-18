import axios, { AxiosInstance } from "axios";

export class ImageService {
  public readonly piUrl: string;
  private newImageRoute = "new-image";

  constructor(piUrl: string, baseUrl = "") {
    this.piUrl = piUrl;
  }

  /**
   * newImage
   */
  public async newImage() {
    const url = [this.piUrl, this.newImageRoute].join("/");
    const response = axios.get(url);
    return response.then((resp) => resp.data);
  }
}
