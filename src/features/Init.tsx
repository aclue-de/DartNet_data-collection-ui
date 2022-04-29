import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { collectionNavigationStateActions } from "./collectionNavigationReducer";

const Init = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => {
            dispatch(collectionNavigationStateActions.nextState());
          }}
        >
          {t("newThrow")}
        </Button>
      </Box>
    </Container>
  );
};

export default Init;
