import * as React from 'react';

import Layout from "../../components/Layout";

import Moment from 'react-moment';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import TimerIcon from '@mui/icons-material/Timer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Projekti({ projekti, taskit, id }) {
    const prio_varit = ['', '#d50000', '#ffa000', 'transparent', '#a5d6a7'];

    const [expanded, setExpanded] = React.useState(false);

    function toggleDescription(tid) {
        setExpanded((tid == expanded) ? false : tid);
    };

    function msFormatter(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(0);
        let hours = (ms / (1000 * 60 * 60)).toFixed(0);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
        if (seconds < 60) return seconds + " sek";
        else if (minutes < 60) return minutes + " min";
        else if (hours < 24) return hours + " tuntia";
        else return days + " päivää";
    }

    return (
        <Layout title={`${projekti.name} - ${projekti.space.name}`} description="Kuvaus" projekti={id}>
            <Grid container spacing={2} sx={{ maxWidth: 1500, mx: 'auto', p: 4 }}>
                {taskit?.map((status, i) => (  
                    <Grid item xs={6} md={4} key={i}>
                        <Box key={i} sx={{ maxWidth: 500, p: 4 }}>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 700, textTransform: "capitalize", mb: 2 }}>
                                
                                <Box sx= {{ height: '18px', width: '18px', borderRadius: '4px', mr: '8px', display: 'inline-block', backgroundColor: status.color }} />
                                {status.name + ' (' + status.tasks.length + ')'}
                                
                                <Box sx={{ flexGrow: 1 }} />

                                <Stack direction="row" spacing={2}>

                                    {status.time_estimate &&
                                        <Tooltip title="Arvioitu työaika yhteensä">
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: '#666' }}>
                                                <HistoryToggleOffIcon fontSize="small" sx={{ color: '#666', mr: 0.66 }} /> 
                                                <Typography sx={{ fontWeight: 700, textTransform: 'none' }}>{msFormatter(status.time_estimate)}</Typography>
                                            </Box>
                                        </Tooltip>
                                    }

                                    {status.time_spent &&
                                        <Tooltip title="Toteutunut työaika yhteensä">
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: '#666' }}>
                                                <TimerIcon fontSize="small" sx={{ color: '#666', mr: 0.66 }} /> 
                                                <Typography sx={{ fontWeight: 700, textTransform: 'none' }}>{msFormatter(status.time_spent)}</Typography>
                                            </Box>
                                        </Tooltip>
                                    }

                                </Stack>  

                            </Box>
                            
                            <Stack spacing={2}>
                                {status.tasks.map((task, j) => (
                                    <Badge badgeContent={ (task.priority && task.priority.id != 3) ? '!' : ' ' } sx={{ "& .MuiBadge-badge": { backgroundColor: task.priority ? prio_varit[task.priority.id] : 'transparent', color: '#FFF', fontWeight: 900 } }}>
                                        <Card sx={{ width: '100%' }} onClick={() => toggleDescription(task.id)} key={j}>
                                            <CardActionArea>
                                                <CardContent>

                                                    <Typography gutterBottom variant="h6" component="div" align="center" sx={{ fontWeight: 500, p: 2 }}>{task.name}</Typography>

                                                    
                                                    <Collapse in={expanded === task.id}>
                                                        <Typography sx={{ fontSize: 16, px: 2}}>
                                                            {task.description ? task.description : 'Tälle tehtävälle ei ole kirjoitettu kuvausta tai annettu lisätietoja.'}
                                                        </Typography>
                                                    </Collapse>

                                                    {(task.checklists && false) &&
                                                        <Box>
                                                            {task.checklists.map((checklist, k) => (
                                                                <Box key={k}>
                                                                    <Typography>{checklist.name} ({checklist.resolved}/{checklist.resolved + checklist.unresolved})</Typography>
                                                                    <List>
                                                                        {checklist.items.map((item, l) => (
                                                                            <ListItem key={l} sx={{ padding: 0 }}>
                                                                                <ListItemButton dense disabled={item.resolved}>
                                                                                    <ListItemIcon>
                                                                                        <Checkbox
                                                                                            edge="start"
                                                                                            checked={item.resolved}
                                                                                            tabIndex={-1}
                                                                                            disableRipple
                                                                                        />
                                                                                    </ListItemIcon>
                                                                                    <ListItemText primary={item.name} />
                                                                                </ListItemButton>
                                                                            </ListItem>
                                                                        ))}
                                                                    </List>
                                                                </Box>
                                                            ))}
                                                            
                                                        </Box>
                                                    }

                                                </CardContent>

                                                <CardActions disableSpacing>
                                                
                                                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', width: '100%' }}>
                                                        
                                                        {(!task.due_date && task.status.type != 'closed') &&
                                                            <Tooltip title="Tehtävä lisätty">
                                                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#AAA' }}>
                                                                    <EditCalendarIcon fontSize="small" sx={{ color: '#AAA', mr: 0.66 }} /> 
                                                                    <Moment format="D.M.YYYY HH:mm" unix>{task.date_created / 1000}</Moment>
                                                                </Box>
                                                            </Tooltip>
                                                        }

                                                        {(task.due_date && task.status.type != 'closed') &&
                                                            <Tooltip title="Tehtävän deadline">
                                                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#AAA' }}>
                                                                    <CalendarMonthIcon fontSize="small" sx={{ color: '#AAA', mr: 0.66 }} />
                                                                    <Moment format="D.M.YYYY HH:mm" unix>{task.due_date / 1000}</Moment>
                                                                </Box>
                                                            </Tooltip>
                                                        }

                                                        {task.date_closed &&
                                                            <Tooltip title="Tehtävä valmistui">
                                                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#AAA' }}>
                                                                    <EventAvailableIcon fontSize="small" sx={{ color: '#AAA', mr: 0.66 }} />
                                                                    <Moment format="D.M.YYYY HH:mm" unix>{task.date_closed / 1000}</Moment>
                                                                </Box>
                                                            </Tooltip>
                                                        }

                                                        {task.time_estimate &&
                                                            <Tooltip title="Työaika-arvio">
                                                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#AAA' }}>
                                                                    <HistoryToggleOffIcon fontSize="small" sx={{ color: '#AAA', mr: 0.66 }} />
                                                                    {msFormatter(task.time_estimate)}
                                                                </Box>
                                                            </Tooltip>
                                                        }   

                                                        {task.time_spent &&
                                                            <Tooltip title="Käytetty työaika">
                                                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#AAA' }}>
                                                                    <TimerIcon fontSize="small" sx={{ color: '#AAA', mr: 0.66 }} />
                                                                    {msFormatter(task.time_spent)}
                                                                </Box>
                                                            </Tooltip>
                                                        }

                                                    </Stack>
                                                    
                                                </CardActions>

                                            
                                            </CardActionArea>

                                        </Card>
                                    </Badge>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    var taskit = [];

    const projekti_res = await fetch(
        `https://api.clickup.com/api/v2/list/${id}`,
        {
            method: "GET",
            headers: {
              'Authorization': `${process.env.CLICKUP_API_KEY}`,
              'Content-Type': 'application/json'
            },
        }
    );

    const projekti = await projekti_res.json(); 
    
    for (var i = 0; i < projekti.statuses.length; i++) {

        const tasks_res = await fetch(
            `https://api.clickup.com/api/v2/list/${id}/task?archived=false&page=0&include_closed=true&reverse=1&statuses[0]=${projekti.statuses[i].status}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `${process.env.CLICKUP_API_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        const tasks = await tasks_res.json();

        var time_estimate = tasks.tasks.map(task => task.time_estimate).reduce((acc, amount) => acc + amount);
        var time_spent = tasks.tasks.map(task => task.time_spent).reduce((acc, amount) => acc + amount);
        
        if ( typeof time_estimate == 'undefined' || isNaN(time_estimate) || time_estimate == 0 ) {
            time_estimate = false;
        }
        
        if ( typeof time_spent == 'undefined' || isNaN(time_spent) || time_spent == 0 ) {
            time_spent = false;
        }

        taskit[i] = {
            "name": projekti.statuses[i].status, 
            "color": projekti.statuses[i].color, 
            "tasks": tasks.tasks, 
            "time_estimate": time_estimate,
            "time_spent": time_spent
        };
    }

    return { props: { projekti, taskit, id } };
}