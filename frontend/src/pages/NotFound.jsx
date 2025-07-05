import { Box, Button, Container, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h2" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Sorry, the page you are looking for doesn't exist.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Paper>
    </Container>
  );
}