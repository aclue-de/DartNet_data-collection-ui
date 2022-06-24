import { IVector2 } from "../../interfaces/shared/math/IVector2";
import { PLANE_COORDINATE_COUNT } from "../../config";


function generatePlaneCoordinates(maxX: number, maxY: number): IVector2[] {
  const items = [];
  for (let i = 0; i < PLANE_COORDINATE_COUNT; i++) {
    const coordinate = generatePlaneCoordinateOnSideTRDL(i, maxX, maxY);
    items.push({
      x: coordinate.x,
      y: coordinate.y,
    });
  }
  return items;
}

function generatePlaneCoordinateOnSideTRDL(
  i: number,
  maxX: number,
  maxY: number,
  offsetFromEdge: number = 40
): IVector2 {
  const wrappedIIndex = i % PLANE_COORDINATE_COUNT;
  switch (wrappedIIndex) {
    case 0:
      return { x: 0.5 * maxX, y: offsetFromEdge };
    case 1:
      return { x: maxX - offsetFromEdge, y: 0.5 * maxY };
    case 2:
      return { x: 0.5 * maxX, y: maxY - offsetFromEdge };
    case 3:
      return { x: offsetFromEdge, y: 0.5 * maxY };
    default: {
      return { x: 0.5 * maxX, y: 0.5 * maxY };
    }
  }
}

export default generatePlaneCoordinates;
