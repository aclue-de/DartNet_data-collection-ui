import { ReactElement } from "react";
import { DART_COUNT, DART_POINT_COLORS } from "../../../config";
import { Button } from "@mui/material";

function getAddOrDeleteDartHandleButtons(
  visibilities: boolean[],
  toggleHandleVisibility: (i: number) => void
): ReactElement[] {
  const buttons: ReactElement[] = [];
  for (let i = 0; i < DART_COUNT; i++) {
    const button = getAddOrDeleteDartHandleButton(
      i,
      visibilities[i],
      toggleHandleVisibility
    );
    buttons.push(button);
  }

  return buttons;
}

function getAddOrDeleteDartHandleButton(
  i: number,
  visible: boolean,
  toggleHandleVisibility: (i: number) => void
): ReactElement {
  return visible ? (
    <Button
      sx={{ color: DART_POINT_COLORS[i] }}
      key={`dartHandleDeleteButton_${i}`}
      onClick={() => toggleHandleVisibility(i)}
    >{`Delete #${i}`}</Button>
  ) : (
    <Button
      sx={{ color: DART_POINT_COLORS[i] }}
      key={`dartHandleAddButton_${i}`}
      onClick={() => toggleHandleVisibility(i)}
    >{`Add #${i}`}</Button>
  );
}

export default getAddOrDeleteDartHandleButtons;
