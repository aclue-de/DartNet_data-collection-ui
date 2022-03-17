import { useRef, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ListSubheader,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Buffer } from "buffer";
import { piUrl } from "../constants";
import { ImageService } from "../services/image-service";

const imageService = new ImageService(piUrl);

const NewThrow = () => {
  const { t } = useTranslation();
  const [imgString, setImgString] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const captureImage = async () => {
    // send call to api
    // get image as response
    // display image
    const resp = await imageService.newImage();
    const img = `data:image/png;base64,${Buffer.from(resp).toString("base64")}`;
    setImgString(img);
  };

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
        <IconButton
          size="large"
          onClick={() => {
            captureImage();
          }}
        >
          <CameraAltIcon sx={{ fontSize: "3em" }} />
        </IconButton>
        <ImageList
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageListItem key="images" cols={2}>
            <ListSubheader component="div">
              {t("imagePreview.title")}
            </ListSubheader>
          </ImageListItem>
          <ImageListItem key={0}>
            <img src={imgString} alt="" />

            <canvas id="CanvasBG" ref={canvasRef} />
          </ImageListItem>
        </ImageList>
      </Box>
    </Container>
  );
};

export default NewThrow;
