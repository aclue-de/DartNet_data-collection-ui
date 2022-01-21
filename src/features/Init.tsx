import { useState } from 'react'
import logo from './logo.svg'
import { Box, Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Init = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => navigate('/new-throw')}>
          {t('newThrow')}
        </Button>
      </Box>
    </Container>
  )
}

export default Init
