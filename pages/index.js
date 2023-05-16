import { useRouter } from 'next/router';

import Layout from "../components/Layout";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxWidth: '95vw',
    bgcolor: "background.paper",
    borderRadius: '5px',
    boxShadow: 24,
    pt: 3,
    px: 6,
    pb: 6,
    mx: 'auto'
};

export default function Index() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const lomake = {
          pin: e.target.project_pin.value
        }
    
        router.replace('/projekti/' + lomake.pin);
    };

  return (
    <Layout
      title="Projektinhallinta - Oskari Järvelin"
      description="Kuvaus"
      projekti={false}
    >
      <Box sx={{ ...style }}>
        <Typography
          variant="h5"
          sx={{ my: 4, fontWeight: 500 }}
        >
          Avaa projekti PIN-koodilla
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              required
              id="projekti"
              label="Projektin PIN-koodi"
              name="project_pin"
            />
          </FormControl>

          <Button variant="contained" type="submit" sx={{ fontWeight: 700 }}>
            Avaa projekti
          </Button>
        </form>
      </Box>
    </Layout>
  );
}
