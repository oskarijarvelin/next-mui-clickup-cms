import Head from 'next/head'
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Index({ data }) {

    console.log(data);

    return (
        <div>
            <Head>
                <title>ClickUp</title>
                <meta
                name="description"
                content="ClickUp"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Typography>
                Lets go!
            </Typography>
            <Box sx={{ maxWidth: '500px', p: 4 }}>
                <Stack spacing={2}>
                    {data.tasks.map((task, i) => (
                        <Item key={i}>{task.name}</Item>
                    ))}
                </Stack>
            </Box>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const res = await fetch(
        `https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task?archived=false&page=0&subtasks=true&include_closed=true`,
        {
            method: "GET",
            headers: {
              'Authorization': `${process.env.CLICKUP_API_KEY}`,
              'Content-Type': 'application/json'
            },
        }
    );
    const data = await res.json();

    return { props: { data } };
}