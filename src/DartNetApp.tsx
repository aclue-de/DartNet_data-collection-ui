import Init from "./features/Init";
import NewThrow from "./features/NewThrow";
import { useAppSelector } from "./appReducer";
import { AppState } from "./features/appStateReducer";

const DartNetApp = () => {
  const appState = useAppSelector((state) => state.appState);

  return (
    <>
      {appState === AppState.Init && <Init />}
      {appState === AppState.NewThrow && <NewThrow />}
    </>
  );
};

export default DartNetApp;
