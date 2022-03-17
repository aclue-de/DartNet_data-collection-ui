import axios from "axios";

export class ImageService {
  public readonly piUrl: string;

  private newImageRoute = "new-image";

  constructor(piUrl: string) {
    this.piUrl = piUrl;
  }

  /**
   * newImage
   */
  public async newImage() {
    const url = [this.piUrl, this.newImageRoute].join("/");
    const response = axios.get(url, { responseType: "arraybuffer" });
    return response.then((resp) => resp.data);
  }
}
