import { ILabelingServiceRoutes } from "./interfaces/labeling/http/ILabelingServiceRoutes";
import { ContentType } from "./interfaces/shared/http/ContentType";

// URL
export const LABELING_SERVICE_URL: string = "http://ToDo-AWS-Lambda";
export const LABELING_SERVICE_ROUTES: ILabelingServiceRoutes = {
  serverUrl: LABELING_SERVICE_URL,

  getThrowSequenceNextUnlabeled: {
    httpType: "get",
    contentType: ContentType.JSON,
    clientRoute: `/api/throwSequences/nextUnlabeled/`,
    serverRoute: `/api/throwSequences/nextUnlabeled/:exceptId`,
  },
  postThrowSequenceImageLabels: {
    httpType: "post",
    contentType: ContentType.JSON,
    clientRoute: `/api/throwSequences/labels/`,
    serverRoute: `/api/throwSequences/labels/:throwSequenceId`,
  },
  // Todo Add Button to ThrowSequenceLabeling & endpoint to LabelApiMock
  deleteThrowSequence: {
    httpType: "delete",
    contentType: ContentType.JSON,
    clientRoute: `/api/throwSequences/`,
    serverRoute: `/api/throwSequences/:throwSequenceId`,
  },
};

// DART
// General
export const DART_COUNT = 3;
export const HANDLE_OUTER_RADIUS = 12; // Handles are displayed as Rings
export const HANDLE_INNER_RADIUS = 4;
// Plane Calculation
export const PLANE_COORDINATE_COLOR = "#ffbf36";
export const PLANE_COORDINATE_COUNT = 4; // Markers placed are used for calculating perspective on image
// Dart Points
const dartPointColor1 = "#ff0000";
const dartPointColor2 = "#00ff00";
const dartPointColor3 = "#00ffea";
export const DART_POINT_COLORS = [
  dartPointColor1,
  dartPointColor2,
  dartPointColor3,
];
// TEST DATA
// Image
export const TEST_IMAGE_WIDTH = 600;
export const TEST_IMAGE_HEIGHT = 800;
