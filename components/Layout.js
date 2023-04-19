import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AddIcon from "@mui/icons-material/Add";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: '5px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Layout({ title, description, projekti, children }) {
  var api_url = "";
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const [priority, setPriority] = React.useState(3);
  const [deadline, setDeadline] = React.useState(false);
  const [reloading, setReloading] = React.useState(false);

  const changePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReload = () => {
    setReloading(true);
    router.reload(window.location.pathname);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const lomake = {
      pid: e.target.project_id.value,
      title: e.target.title.value,
      priority: e.target.priority.value,
      deadline: deadline,
      budget: e.target.budget.value,
      description: e.target.description.value
    }

    if (process.env.NODE_ENV === 'development') {
      api_url = `/api/new_task`;
    } else {
      api_url = `https://projektit.oskarijarvelin.fi/api/new_task`
    }

    const response = fetch(`${api_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lomake),
    });

    console.log(response)

    setOpen(false);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" component="header">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 700, fontSize: 24 }}
              >
                {title}
              </Typography>
            </Box>
            {projekti &&
              <Tooltip title="Päivitä tehtävät">
                <IconButton onClick={() => handleReload()} color="white">
                  <AutorenewIcon sx={{
                    animation: reloading ? "spin 2s linear infinite" : "none",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(0deg)",
                      },
                      "100%": {
                        transform: "rotate(360deg)",
                      },
                    },
                  }} />
                </IconButton>
              </Tooltip>
            }
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="main"
        sx={{ pt: "64px", minHeight: "calc(100vh - 85px)" }}
      >
        {children}
        {projekti &&
        <Tooltip title="Lähetä uusi tehtävä">
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "absolute", right: 36, bottom: 36 }}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        }
      </Box>
      <Box component="footer">
        <Typography
          sx={{ py: 4, fontSize: 14, textAlign: "center", color: "#AAA" }}
        >
          &copy; {new Date().getFullYear()} {"Oskari Järvelin"}
        </Typography>
      </Box>

      {projekti &&
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          keepMounted
        >
          <Box sx={{ ...style, width: 500 }}>

            <Typography variant="h4" id="modal-title" sx={{ my: 1, fontWeight: 500 }}>Lähetä uusi tehtävä</Typography>

            <Typography id="modal-description" sx={{ mb: 3 }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Typography>

            <form onSubmit={handleSubmit}>

            <FormControl fullWidth sx={{ mb: 3, display: 'none' }}>
              <TextField
                required
                id="projekti"
                label="Projektin ID"
                name="project_id"
                defaultValue={projekti}
                disabled={true}
                hidden
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                required
                id="nimi"
                label="Tehtävän otsikko"
                name="title"
                defaultValue=""
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>

              <InputLabel id="priority-label">Kiireellisyys</InputLabel>

              <Select
                labelId="priority-label"
                id="priority"
                value={priority}
                label="Kiireellisyys"
                name="priority"
                onChange={changePriority}
              >
                <MenuItem value={1}><b>!!! Kriittinen</b>&nbsp;&nbsp;&nbsp;<small>(luo hälytyksen, sovelletaan hälytyshinnastoa)</small></MenuItem>
                <MenuItem value={2}><b>Kiireellinen</b>&nbsp;&nbsp;&nbsp;<small>(teen mahdollisimman pian)</small></MenuItem>
                <MenuItem value={3}><b>Normaali</b>&nbsp;&nbsp;&nbsp;<small>(teen työtilanteen salliessa)</small></MenuItem>
                <MenuItem value={4}><b>Kiireetön</b>&nbsp;&nbsp;&nbsp;<small>(teen muiden tehtävien yhteydessä)</small></MenuItem>
              </Select>

            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label="Deadline (jos haluat asettaa)" id="deadline" name="deadline" format="D.M.YYYY HH:mm" ampm={false} onChange={(e) => setDeadline(Number(e))} />
              </LocalizationProvider>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="budget-label">Budjetti (jos haluat rajata)</InputLabel>
              <OutlinedInput
                labelId="budget-label"
                type="number"
                pattern="[0-9.]+"
                id="budget"
                name="budget"
                label="Budjetti (jos haluat rajata)"
                InputProps={{
                  pattern: "[0-9.]+",
                }}
                endAdornment={<InputAdornment position="end">€</InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="description"
                label="Tehtävän kuvaus"
                name="description"
                defaultValue=""
                multiline={true}
                minRows={4}
              />
            </FormControl>

            <Box sx={{ mb: 3 }}>
              <Link href="https://oskarijarvelin.fi/hinnoittelu" target="_blank" rel="noopener"><small>Hinnasto</small></Link><br/>
              <Link href="https://oskarijarvelin.fi/sopimusehdot" target="_blank" rel="noopener"><small>Yleiset sopimusehdot</small></Link>
            </Box>

            <Button variant="contained" type="submit">Lähetä</Button>
            
            </form>

          </Box>
        </Modal>
      }
    </div>
  );
}
