import {
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  useGetThrowSequenceNextUnlabeledQuery,
  usePostImageLabelsQuery,
} from "./labelingApiSlice";
import ThrowImageLabeling from "./geometry/ThrowImageLabeling";
import { useState } from "react";
import { DART_COUNT } from "../../config";
import { IImageLabel } from "../../interfaces/labeling/data/IImageLabel";
import { IVector2 } from "../../interfaces/shared/math/IVector2";
import { IThrow } from "../../interfaces/labeling/data/IThrow";

const Root = styled("div")(() => ({
  height: "inherit",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Header = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: theme.spacing(5),
}));

const Content = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const ArrowIconButton = styled(IconButton)(() => ({
  width: 60,
  height: 60,
  alignSelf: "center",
  margin: 40,
}));

/*Iterate over throws and get imageLabels*/
function GetImageLabels(throws: IThrow[]): IImageLabel[] {
  const newImageLabels = throws.map((t) => t.imageLabel).values();
  return Array.from(newImageLabels);
}

interface IErrorData {
  status: number;
  data: string;
}

let imageLabelsForReset: IImageLabel[];
/*
Interactive Labeling of Throw Images in a Throw Sequence.
PlaneCoordinates are to be placed for later perspective calculations
DartPoints are to be placed to make the AI recognize dart arrow tips
Each throw has its own images and after DART_COUNT images a new
Sequence is fetched and imagLabels placed are sent to the server to be saved.
The user may also reset Positions or hide DartPointer in case somebody did not hit the board.
*/
function ThrowSequenceLabeling() {
  /*State*/
  const [shouldFetchNextThrowSequence, setShouldFetchNextThrowSequence] =
    useState(true);
  const [imageLabelsToBeSent, setImageLabelsToBeSent] = useState<IImageLabel[]>(
    []
  );
  const [throwSequenceId, setThrowSequenceId] = useState(-1);
  const [throws, setThrows] = useState<IThrow[]>([]);
  let [currentThrowId, setCurrentThrowId] = useState(0);
  const [imageLabels, setImageLabel] = useState<IImageLabel[]>([]);

  /*Get next ThrowSequence*/
  const getThrowSequenceQuery = useGetThrowSequenceNextUnlabeledQuery(
    throwSequenceId,
    {
      skip: !shouldFetchNextThrowSequence,
    }
  );
  const { data, status: gotNewThrowSequence } = getThrowSequenceQuery;
  const getThrowSequenceError = getThrowSequenceQuery.error as IErrorData;

  /*Set next ThrowSequence & populate state*/
  const setNextThrowSequence = gotNewThrowSequence === "fulfilled";
  if (setNextThrowSequence && data) {
    currentThrowId = 0;
    setThrowSequenceId(data.throwSequence.id);
    setCurrentThrowId(currentThrowId);
    setThrows(data.throwSequence.throws);
    const newImageLabels = GetImageLabels(data.throwSequence.throws);
    setImageLabel(newImageLabels);
    imageLabelsForReset = newImageLabels;
    setShouldFetchNextThrowSequence(false);
  } else if (gotNewThrowSequence === "rejected") {
    alert(getThrowSequenceError.data);
    setShouldFetchNextThrowSequence(false);
  }

  const sendImageLabels =
    !!imageLabelsToBeSent && imageLabelsToBeSent.length > 0;

  const postImageLabelsQuery = usePostImageLabelsQuery(
    { throwSequenceId, imageLabels: imageLabelsToBeSent },
    { skip: !sendImageLabels }
  );
  const { status: postImageLabelsStatus } = postImageLabelsQuery;
  const postImageLabelsError = postImageLabelsQuery.error as IErrorData;

  if (sendImageLabels && postImageLabelsStatus === "fulfilled") {
    setImageLabelsToBeSent([]);
  } else if (postImageLabelsStatus === "rejected") {
    alert(postImageLabelsError.data);
  }

  /*Waiting for data*/
  if (!imageLabels || imageLabels.length === 0) {
    return (
      <Root>
        <CircularProgress />
      </Root>
    );
  }

  const { id: throwId, image, imageResolution } = throws[currentThrowId];
  /*Update State to send ImageLabels & fetch new ThrowSequence*/
  const DisplayNextThrow = () => {
    let nextThrowId = currentThrowId + 1;
    nextThrowId %= DART_COUNT;
    const displayNextThrowSequence = nextThrowId === 0;

    setCurrentThrowId(nextThrowId);

    if (displayNextThrowSequence) {
      setImageLabelsToBeSent(imageLabels);
      setShouldFetchNextThrowSequence(true);
    }
  };

  /*Display a previous Throw of the same ThrowSequence*/
  const DisplayPreviousThrow = () => {
    const previousThrowId = currentThrowId - 1;
    setCurrentThrowId(previousThrowId);
    const lastIndex = imageLabels.length - 1;
    if (lastIndex >= 0) {
      setCurrentThrowId(previousThrowId);
    }
  };

  /*Update Position of PlaneCoordinate in ImageLabels state*/
  const UpdatePlaneCoordinate = (pos: IVector2, i: number): void => {
    const newImageLabels = [...imageLabels];
    const newImageLabel = { ...newImageLabels[currentThrowId] };
    const newPlaneCoordinates = [
      ...newImageLabels[currentThrowId].planeCoordinates,
    ];

    newPlaneCoordinates[i] = pos;
    newImageLabel.planeCoordinates = newPlaneCoordinates;
    newImageLabels[currentThrowId] = newImageLabel;
    setImageLabel(newImageLabels);
  };

  /*Update Position of DartPoint in ImageLabels state*/
  const UpdateDartPoint = (pos: IVector2, i: number): void => {
    const newImageLabels = [...imageLabels];
    const newImageLabel = { ...newImageLabels[currentThrowId] };
    const newDartPoints = [...newImageLabels[currentThrowId].dartPoints];

    newDartPoints[i] = pos;
    newImageLabel.dartPoints = newDartPoints;
    newImageLabels[currentThrowId] = newImageLabel;
    setImageLabel(newImageLabels);
  };

  /*Reset ImageLabel positions to values from initial fetch*/
  const Reset = (): void => {
    if (!imageLabelsForReset) {
      return;
    }
    setImageLabel(imageLabelsForReset);
  };

  const previousButtonDisabled = currentThrowId === 0;
  return (
    <Root>
      {/*Descriptions of ThrowSequence & Throw*/}
      <Header>
        <Typography variant={"h2"} color={"primary"}>
          {"Labeling"}
        </Typography>
        <Typography
          variant={"h4"}
          color={"primary"}
        >{`ThrowSequence ${throwSequenceId}`}</Typography>
        <Typography
          variant={"h5"}
          color={"primary"}
        >{`Throw ${throwId}`}</Typography>
      </Header>

      {/*Buttons & Interactive Labeling*/}
      <Content>
        {/*Display Previous Throw Button*/}
        <ArrowIconButton
          size="large"
          disabled={previousButtonDisabled}
          onClick={DisplayPreviousThrow}
        >
          <ArrowBackIosIcon
            color={previousButtonDisabled ? "disabled" : "primary"}
            sx={{ fontSize: "2em" }}
          />
        </ArrowIconButton>

        {/*Move colored Handles on Image to create Data for AI*/}
        <ThrowImageLabeling
          imageBase64={image}
          imageResolution={imageResolution}
          imageLabel={imageLabels[currentThrowId]}
          updatePlaneCoordinate={UpdatePlaneCoordinate}
          updateDartPoint={UpdateDartPoint}
          reset={Reset}
        />

        {/*Display Next Throw Button*/}
        <ArrowIconButton
          size="large"
          disabled={false}
          onClick={DisplayNextThrow}
        >
          <ArrowForwardIosIcon color="primary" sx={{ fontSize: "2em" }} />
        </ArrowIconButton>
      </Content>
    </Root>
  );
}

export default ThrowSequenceLabeling;
