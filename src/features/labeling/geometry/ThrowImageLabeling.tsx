import { useState } from "react";
import { Layer, Ring, Stage } from "react-konva";
import { IVector2 } from "../../../interfaces/shared/math/IVector2";
import { Button, styled } from "@mui/material";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import { IImageLabel } from "../../../interfaces/labeling/data/IImageLabel";
import {
  DART_POINT_COLORS,
  HANDLE_INNER_RADIUS,
  HANDLE_OUTER_RADIUS,
  PLANE_COORDINATE_COLOR,
} from "../../../config";
import getAddOrDeleteDartHandleButtons from "./getAddOrDeleteHandleButton";

const Root = styled("div")(({}) => ({}));

const ImageContainer = styled("div")(({}) => ({}));

const StageOverlay = styled(Stage)(() => ({
  position: "absolute",
}));

const ButtonRow = styled("div")(() => ({
  display: "flex",
  placeContent: "space-evenly",
}));

interface IProps {
  imageBase64: string;
  imageResolution: IVector2;
  imageLabel: IImageLabel;
  updatePlaneCoordinate: (pos: IVector2, i: number) => void;
  updateDartPoint: (pos: IVector2, i: number) => void;
  reset: () => void;
}

{
  /*Hide DartPoints with values of null or positions of -1*/
}
function generateDartPointVisibilities(dartPoints: IVector2[]): boolean[] {
  if (!dartPoints) {
    return [];
  }
  const visibilities: boolean[] = [];
  for (const dartPoint of dartPoints) {
    let isDisplayed = true;
    isDisplayed = isDisplayed && !!dartPoint;
    isDisplayed = isDisplayed && dartPoint.x !== -1 && dartPoint.y !== -1;
    visibilities.push(isDisplayed);
  }
  return visibilities;
}

function ImageLabels({
  imageBase64,
  imageResolution,
  imageLabel,
  updatePlaneCoordinate,
  updateDartPoint,
  reset,
}: IProps) {
  /*Store visibilities*/
  const [dartPointVisibilities, setDartPointVisibilities] = useState(() => {
    return generateDartPointVisibilities(imageLabel?.dartPoints);
  });

  /*Clamp target position to stay inside Canvas & call update in parent component*/
  const handleDragEnd = (
    e: Konva.KonvaEventObject<DragEvent>,
    updatePos: (pos: IVector2) => void
  ) => {
    const baseX = e.target.x();
    const baseY = e.target.y();
    const x = Math.min(Math.max(baseX, 0), imageResolution.x);
    const y = Math.min(Math.max(baseY, 0), imageResolution.y);

    updatePos({ x, y });
  };

  /*Toggles display of points*/
  const toggleHandleVisibility = (i: number) => {
    dartPointVisibilities[i] = !dartPointVisibilities[i];
    setDartPointVisibilities([...dartPointVisibilities]);
    updateDartPoint({ x: -1, y: -1 }, i);
  };

  if (!imageLabel) {
    return null;
  }

  return (
    <Root id={"labelImageRoot"}>
      {/*Render geometric Handles on a Canvas on top of the background image*/}
      <StageOverlay
        id={"labelImageContainer"}
        width={imageResolution.x}
        height={imageResolution.y}
      >
        <Layer id={"labelImageLayer"}>
          {/*Display handles to be placed on edges to allow for correction of camera perspective*/}
          {imageLabel.planeCoordinates.map((pos: IVector2, i: number) => (
            <Ring
              key={`planeCoordinateHandle_${i}`}
              name={`planeCoordinateHandle_${i}`}
              draggable
              x={pos.x}
              y={pos.y}
              fill={PLANE_COORDINATE_COLOR}
              outerRadius={HANDLE_OUTER_RADIUS}
              innerRadius={HANDLE_INNER_RADIUS}
              onDragEnd={(e: KonvaEventObject<DragEvent>) =>
                handleDragEnd(e, (updatedPos: IVector2) =>
                  updatePlaneCoordinate(updatedPos, i)
                )
              }
            />
          ))}

          {/*Display colored handles to be placed on dart pointer*/}
          {imageLabel.dartPoints.map((pos, i: number) => {
            return dartPointVisibilities[i] ? (
              <Ring
                key={`dartPointHandle_${i}`}
                name={`dartPointHandle_${i}`}
                draggable
                x={pos.x}
                y={pos.y}
                fill={DART_POINT_COLORS[i]}
                outerRadius={HANDLE_OUTER_RADIUS}
                innerRadius={HANDLE_INNER_RADIUS}
                onDragEnd={(e: KonvaEventObject<DragEvent>) =>
                  handleDragEnd(e, (updatedPos: IVector2) =>
                    updateDartPoint(updatedPos, i)
                  )
                }
              />
            ) : null;
          })}
        </Layer>
      </StageOverlay>

      {/*Background Image fetched from server*/}
      <ImageContainer id={"throwImageContainer"}>
        <img
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt=""
          style={{ width: imageResolution.x, height: imageResolution.y }}
        />
      </ImageContainer>

      {/*Buttons to reset to initial positions & toggle dartPoint visibilities*/}
      <ButtonRow>
        <Button id={`resetLabelingButton`} onClick={reset}>
          {"Reset"}
        </Button>

        {getAddOrDeleteDartHandleButtons(
          dartPointVisibilities,
          toggleHandleVisibility
        )}
      </ButtonRow>
    </Root>
  );
}

export default ImageLabels;
