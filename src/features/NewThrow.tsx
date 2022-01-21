import { useState } from 'react'
import logo from './logo.svg'
import { Box, Button, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InfoIcon from '@mui/icons-material/Info';
import DemoImage from '../images/demo-dart-throw.jpg';

const NewThrow = () => {
  const { t } = useTranslation()

  const captureImage = () => {
      // send call to api
      // get image as response
      // display image
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <IconButton size="large" onClick={() => {captureImage}}>
          <CameraAltIcon sx={{fontSize: '3em'}} />
        </IconButton>
        <ImageList sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ImageListItem key="images" cols={2}>
            <ListSubheader component="div">{t('imagePreview.title')}</ListSubheader>
          </ImageListItem>
          <ImageListItem key={0}>
              <img
                src="https://picsum.photos/800/450"
                alt="Demo Image"
                loading="lazy"
              />
            </ImageListItem>
        </ImageList>
      </Box>
    </Container>
  )
}

export default NewThrow
