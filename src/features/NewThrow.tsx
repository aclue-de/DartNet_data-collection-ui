import { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import { Buffer } from "buffer";

import { DartScoreSelector } from "../components/dart-score-selector"

import { piUrl } from "../constants";
import { ImageService } from "../services/image-service";
import { newThrowSlice } from "./newThrowReducer"
import { collectionNavigationStateActions } from "./collectionNavigationReducer"
import { useAppSelector } from "./../appReducer";

import { useDispatch, useStore } from "react-redux";

const imageService = new ImageService(piUrl);

const NewThrow = () => {
  
  const dispatch = useDispatch()
  
  const newThrowState = useAppSelector((state) => state.newThrowState);
  //const { t } = useTranslation();

  const [currentImgString, setCurrentImgString] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false)

  const captureImage = async () => {
    // send call to api
    // get image as response
    // display image
    setLoading(true)
    const resp = await imageService.newImage();
    const img = `data:image/png;base64,${Buffer.from(resp).toString("base64")}`;
    console.log(`set img string to ${img}`)
    setCurrentImgString(img);
    setLoading(false)
  };

  const nextState = () => {
    console.log("store state", newThrowState )
    
    if (newThrowState.length === 2) {
      dispatch(newThrowSlice.actions.addThrow({score: score, imgString: currentImgString}))
      dispatch(collectionNavigationStateActions.nextState())
    } else {
      console.log("next throw")
      dispatch(newThrowSlice.actions.addThrow({score: score, imgString: currentImgString}))
      setCurrentImgString("")
    }

  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p>
          Capture throw {1 + newThrowState.length}/3
        </p>

        <div hidden={ currentImgString !== "" } >
          <IconButton
            size="large"
            onClick={() => {
              captureImage();
            }}
          >
            <CameraAltIcon sx={{ fontSize: "3em" }} />
          </IconButton>
        </div>

        <div hidden={ currentImgString === "" }>
          <IconButton size="large" disabled={loading} onClick={ nextState }>
            <CheckIcon sx={{ fontSize: "2em" }}/>
          </IconButton>
          <IconButton size="large" disabled={loading} onClick={ captureImage }>
            <ReplayIcon sx={{ fontSize: "2em" }}/>
          </IconButton>
        </div>

        <ImageList
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageListItem key={0}>
            <img src={currentImgString} alt="" />
          </ImageListItem>
        </ImageList>

        <p>Score: {score}</p>
        <br/>
        <DartScoreSelector setScoreCallback={(score) => setScore(score)}/>
        
      </Box>
    </Container>
  );
};

export default NewThrow;


/*
<ImageListItem key="images" cols={2}>
            <ListSubheader component="div">
              {t("imagePreview.title")}
            </ListSubheader>
          </ImageListItem>
*/