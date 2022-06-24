import {
  CreateThrowSequences,
  CreateThrowSequencesCompleted,
} from "./throwSequenceTestData";
import Pretender from "pretender";
import { DART_COUNT, LABELING_SERVICE_ROUTES } from "../config";
import { IThrowSequence } from "../interfaces/labeling/data/IThrowSequence";
import { IImageLabel } from "../interfaces/labeling/data/IImageLabel";

const throwSequenceCount = 10;
const throwSequencesCompleted: boolean[] =
  CreateThrowSequencesCompleted(throwSequenceCount);
const throwSequences = CreateThrowSequences(throwSequenceCount);

/*Returns the next ThrowSequence which is unlabeled and not the passed one (The one the client recently solved)*/
function getThrowSequenceNextUnlabeled(
  exceptId: number
): IThrowSequence | undefined {
  const index = throwSequencesCompleted.findIndex(
    (completed: boolean, i: number) => {
      const isCurrentThrowSequence = i === exceptId;
      const canBeLabeled = !completed;
      return canBeLabeled && !isCurrentThrowSequence;
    }
  );
  if (index >= 0) {
    return throwSequences[index];
  }
  return undefined;
}

export const createMockServer = () =>
  new Pretender(function () {
    /*Return next ThrowSequence which has not yet been marked with ImageLabels*/
    this.get(
      `${LABELING_SERVICE_ROUTES.serverUrl}${LABELING_SERVICE_ROUTES.getThrowSequenceNextUnlabeled.serverRoute}`,
      async (request) => {
        await sleep(300);
        const exceptId = parseInt(request.params.exceptId as string);
        const throwSequence = getThrowSequenceNextUnlabeled(exceptId);
        if(!throwSequence){
          return [404, {}, "All ThrowSequences have been labeled. None are left."];
        }

        const jsonData = JSON.stringify({ throwSequence });
        return [200, { "Content-Type": "application/json" }, jsonData];
      }
    );
    /*Receives ImageLabels to store them in ThrowSequence*/
    this.post(
      `${LABELING_SERVICE_ROUTES.serverUrl}${LABELING_SERVICE_ROUTES.postThrowSequenceImageLabels.serverRoute}`,
      async (request) => {
        await sleep(300);
        const throwSequenceId = parseInt(request.params.throwSequenceId as string);
        if (!throwSequenceId && throwSequenceId !== 0) {
          return [404, {}, "Labels could not be saved as ThrowSequence was not found."];
        }
        const body = request.requestBody;
        const parsedBody = JSON.parse(body);
        const imageLabels: IImageLabel[] = parsedBody.imageLabels;
        const throwSequence = throwSequences[throwSequenceId];
        throwSequencesCompleted[throwSequenceId] = true;
        for (let i = 0; i < DART_COUNT; i++) {
          throwSequence.throws[i].imageLabel = imageLabels[i];
        }
        return [200, {}, ""];
      }
    );
  });

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
