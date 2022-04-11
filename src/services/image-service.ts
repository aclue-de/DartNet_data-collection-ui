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
    const response = axios.get("https://reshape.sport1.de/c/t/61df2ed2-cfd6-4b0e-a177-715d645ae283/1200x675", { responseType: "arraybuffer" });
    return response.then((resp) => resp.data);

    // const url = [this.piUrl, this.newImageRoute].join("/");
    // const response = axios.get(url, { responseType: "arraybuffer" });
    // return response.then((resp) => resp.data);
  }
}
