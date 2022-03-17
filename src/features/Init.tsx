import { Box, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { appStateActions } from "./appStateReducer";

const Init = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => appStateActions.nextState()}
        >
          {t("newThrow")}
        </Button>
      </Box>
    </Container>
  );
};

export default Init;
