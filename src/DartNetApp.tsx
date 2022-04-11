import Init from "./features/Init";
import NewThrow from "./features/NewThrow";
import ConfirmNewThrow from "./features/ConfirmNewThrow"

import { useAppSelector } from "./appReducer";
import { AppState } from "./features/appStateReducer";

const DartNetApp = () => {
  const appState = useAppSelector((state) => state.appState);

  return (
    <>
      {appState === AppState.Init && <Init />}
      {appState === AppState.NewThrow && <NewThrow />}
      {appState === AppState.ConfirmNewThrow && <ConfirmNewThrow />}
    </>
  );
};

export default DartNetApp;
