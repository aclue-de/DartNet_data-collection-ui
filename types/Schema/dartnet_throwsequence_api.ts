type ImageLabel = {
  planeCoordinates: [Vector2];
  dartPonumbers: [Vector2];
};

type ImageLabelInput = {
  planeCoordinates: [Vector2Input];
  dartPonumbers: [Vector2Input];
};

type Mutation = {
  createThrowSequence(input: ThrowSequenceInput): ThrowSequence;
  deleteThrowSequence(id: string): Result;
};

type Query = {
  getThrowSequence(id: string): ThrowSequence;
  getThrowSequences: [ThrowSequence];
};

type Result = {
  status: String;
  message: String;
};

type Throw = {
  id: string;
  score: number;
  image: String;
  imageResolution: Vector2;
  imageLabel: ImageLabel;
};

type ThrowInput = {
  id: string;
  score: number;
  image: String;
  imageResolution: Vector2Input;
  imageLabel: ImageLabelInput;
};

type ThrowSequence = {
  id: string;
  isLabeled: boolean;
  playerName: String;
  throws: [Throw];
};

type ThrowSequenceInput = {
  isLabeled: boolean;
  playerName: String;
  throws: [ThrowInput];
};

type Vector2 = {
  x: number;
  y: number;
};

type Vector2Input = {
  x: number;
  y: number;
};
