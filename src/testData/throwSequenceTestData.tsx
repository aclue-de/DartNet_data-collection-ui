import { IThrowSequence } from "../interfaces/labeling/data/IThrowSequence";
import { IThrow } from "../interfaces/labeling/data/IThrow";
import { throwSequence_1_throw_0_base46 } from "./imagesBase64/throwSequence_1_throw_0_base46";
import { throwSequence_1_throw_1_base46 } from "./imagesBase64/throwSequence_1_throw_1_base46";
import { throwSequence_1_throw_2_base46 } from "./imagesBase64/throwSequence_1_throw_2_base46";
import { throwSequence_1_throw_3_base46 } from "./imagesBase64/throwSequence_1_throw_3_base46";
import { TEST_IMAGE_HEIGHT, TEST_IMAGE_WIDTH } from "../config";
import generatePlaneCoordinates from "./factories/generatePlaneCoordinates";
import generateDartPointCoordinates from "./factories/generateDartPointHandles";

const images: string[] = [
  throwSequence_1_throw_0_base46,
  throwSequence_1_throw_1_base46,
  throwSequence_1_throw_2_base46,
  throwSequence_1_throw_3_base46,
];

export function CreateThrowSequencesCompleted(count: number): boolean[] {
  const throwSequencesCompleted: boolean[] = [];
  for (let i = 0; i < count; i++) {
    throwSequencesCompleted.push(false);
  }
  return throwSequencesCompleted;
}

export function CreateThrowSequences(count: number): IThrowSequence[] {
  const throwSequences: IThrowSequence[] = [];
  for (let i = 0; i < count; i++) {
    const throwSequence = CreateThrowSequence(i);
    throwSequences.push(throwSequence);
  }
  return throwSequences;
}

export function CreateThrowSequence(i: number): IThrowSequence {
  const throws: IThrow[] = CreateThrows();
  return {
    id: i,
    playerName: "Tim",
    throws,
  };
}

function CreateThrows(): IThrow[] {
  const throws: IThrow[] = [];
  for (let i = 0; i < 3; i++) {
    // @ts-ignore Compiler is dumb
    const newThrow = CreateThrow(i + 1);
    throws.push(newThrow);
  }
  return throws;
}

function CreateThrow(throwId: 1 | 2 | 3): IThrow {
  const planeCoordinates = generatePlaneCoordinates(TEST_IMAGE_WIDTH, TEST_IMAGE_HEIGHT);
  const dartPoints = generateDartPointCoordinates(TEST_IMAGE_WIDTH, TEST_IMAGE_HEIGHT);
  return {
    id: throwId,
    score: throwId * 13,
    image: images[throwId],
    imageResolution: {
      x: TEST_IMAGE_WIDTH,
      y: TEST_IMAGE_HEIGHT,
    },
    imageLabel: {
      planeCoordinates,
      dartPoints,
    },
  };
}
