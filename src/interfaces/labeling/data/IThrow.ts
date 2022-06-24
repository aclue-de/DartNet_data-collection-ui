import { IVector2 } from "../../shared/math/IVector2";
import { IImageLabel } from "./IImageLabel";

export interface IThrow {
  id: 1 | 2 | 3;
  score: number;
  image: string;
  imageResolution: IVector2;
  imageLabel: IImageLabel;
};