import { Button, Box, Container, ImageListItem, ImageListItemBar, Stack, ButtonGroup, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';

import ConfirmDialog from "../components/confirm-dialog"
import { useAppSelector } from "../appReducer";
import { useState } from "react";

const ConfirmNewThrow = () => {
  const newThrowState = useAppSelector((state) => state.newThrowState);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const uploadNewThrow = () => {

  }


  const actuallyCancelNewThrow = () => {
    setOpenConfirmDialog(false)

  }

  const confirmCancelNewThrow = () => {
    setOpenConfirmDialog(true)
  }

  return (
    <Container maxWidth="lg">

      <ConfirmDialog
        open={openConfirmDialog}
        autoFocus="no"
        cancel={() => setOpenConfirmDialog(false)}
        confirm={actuallyCancelNewThrow}
        title="Cancel new Throw?"
        text=""
      />


      <Box textAlign="center">
        <Typography variant="h3">
          Upload ?
        </Typography>
        <br/>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          {
            newThrowState.map((t, i) => {
              return (
              <ImageListItem key={`throw_${i}`}>
                <img src={t.imgString} alt="" style={{height: "300px", width: "300px"}}/>
                <ImageListItemBar position="below" title={<p>{t.score}</p>} />
              </ImageListItem>
              )
            })
          }
        </Stack>

        <ButtonGroup variant="outlined" style={{marginTop: "50px"}}>
          <Button size="large" 
            sx={{
              minWidth: "160px",
              }}
            onClick={ uploadNewThrow }
            endIcon={<CloudUploadIcon sx={{fontSize: "2em"}}/>}
          >
            Upload
          </Button>
          <Button
            onClick={ confirmCancelNewThrow }
            endIcon={<CancelIcon sx={{fontSize: "2em"}}/>}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  )
}

export default ConfirmNewThrow