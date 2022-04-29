import Init from "./features/Init";
import LabellingInit from "./features/labelling-init";
import NewThrow from "./features/NewThrow";
import ConfirmNewThrow from "./features/ConfirmNewThrow"

import { useAppSelector } from "./appReducer";
import { CollectionNavigationState, collectionNavigationStateActions } from "./features/collectionNavigationReducer";
import { Breadcrumbs, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { appNavigationStateActions } from "./features/appNavigationReducer";
import { LabellingNavigationState, labellingNavigationStateActions } from "./features/labellingNavigationReducer";

const DartNetApp = () => {
  const dispatch = useDispatch()

  const appNavigationState = useAppSelector((state) => state.appNavigationState);
  const labellingNavigationState = useAppSelector((state) => state.labellingNavigationState);
  const collectionNavigationState = useAppSelector((state) => state.collectionNavigationState);


  const navToLabelling = () => {
    dispatch(collectionNavigationStateActions.resetState())
    dispatch(labellingNavigationStateActions.resetState())
    dispatch(appNavigationStateActions.setState("labelling"))
  }

  const navToCollection = () => {
    dispatch(collectionNavigationStateActions.resetState())
    dispatch(labellingNavigationStateActions.resetState())
    dispatch(appNavigationStateActions.setState("collection"))
  }

  return (
    <>
      <Breadcrumbs>
        <Link
          onClick={navToLabelling}
        >
          Labelling
        </Link>
        <Link
          onClick={navToCollection}
        >
          Collect Data
        </Link>
      </Breadcrumbs>
    <>
      { appNavigationState === "collection" && collectionNavigationState === CollectionNavigationState.Init && <Init />}
      { appNavigationState === "collection" && collectionNavigationState === CollectionNavigationState.NewThrow && <NewThrow />}
      { appNavigationState === "collection" && collectionNavigationState === CollectionNavigationState.ConfirmNewThrow && <ConfirmNewThrow />}
      { appNavigationState === "labelling" && labellingNavigationState === LabellingNavigationState.Init && <LabellingInit />}      
    </>
    </>
  );
};

export default DartNetApp;
