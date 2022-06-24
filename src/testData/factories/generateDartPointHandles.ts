import { IVector2 } from "../../interfaces/shared/math/IVector2";
import { DART_COUNT } from "../../config";

function generateDartPointCoordinates(
  maxX: number,
  maxY: number,
): IVector2[] {
  const handles = [];
  for (let i = 0; i < DART_COUNT; i++) {
    const coordinate = generateDartPointCoordinate(i, maxX, maxY);
    handles.push({
      x: coordinate.x,
      y: coordinate.y,
    });
  }
  return handles;
}

function generateDartPointCoordinate(
  i: number,
  maxX: number,
  maxY: number,
  offsetFromCenter: number = 40
): IVector2 {
  switch (i) {
    case 0:
      return { x: 0.5 * maxX, y: 0.5 * maxY + offsetFromCenter };
    case 1:
      return {
        x: 0.5 * maxX + offsetFromCenter,
        y: 0.5 * maxY - offsetFromCenter,
      };
    case 2:
      return {
        x: 0.5 * maxX - offsetFromCenter,
        y: 0.5 * maxY - offsetFromCenter,
      };
    default: {
      return { x: 0.5 * maxX, y: 0.5 * maxY };
    }
  }
}

export default generateDartPointCoordinates;
