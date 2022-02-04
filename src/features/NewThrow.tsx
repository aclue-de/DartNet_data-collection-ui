import { useRef, useState } from 'react'
import logo from './logo.svg'
import { Box, Button, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InfoIcon from '@mui/icons-material/Info';
import DemoImage from '../images/demo-dart-throw.jpg';
import { ImageService } from '../services/image-service';
import { piUrl } from '../constants';
import { Buffer } from 'buffer';

const imageService = new ImageService(piUrl)

const NewThrow = () => {
  const { t } = useTranslation()
  const [ imgString, setImgString ] = useState("")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const captureImage = async () => {
      // send call to api
      // get image as response
      // display image
      const resp = await imageService.newImage()
      const img = Buffer.from(resp).toString()
      const i = new Image()
      i.src = "data:image/png;base64," + img
      if (i.complete) {
        const canvas = canvasRef.current
        if (!canvas) {
          console.error("image complate but no canvas")
          return
        }
        const context = canvas.getContext("2d")
        context?.drawImage(i, 0, 0)
      }
      i.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) {
          console.error("no canvas")
          return
        }
        const context = canvas.getContext("2d")
        context?.drawImage(i, 0, 0)
      }
      console.log("img", img)
      setImgString(img)
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <IconButton size="large" onClick={() => {captureImage()}}>
          <CameraAltIcon sx={{fontSize: '3em'}} />
        </IconButton>
        <ImageList sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ImageListItem key="images" cols={2}>
            <ListSubheader component="div">{t('imagePreview.title')}</ListSubheader>
          </ImageListItem>
          <ImageListItem key={0}>
              <img
                src={"data:image/png;base64," + imgString}
              />

            <canvas
              id="CanvasBG"
              ref={canvasRef}
            />
            </ImageListItem>
        </ImageList>
      </Box>
    </Container>
  )
}

export default NewThrow
