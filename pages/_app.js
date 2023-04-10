import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';

export default function MyApp({ Component, pageProps }) {
    return (
        <CssBaseline>
            <Component {...pageProps} />
        </CssBaseline>
    )
}
  