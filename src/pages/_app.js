 
import store from "@/store/store";
import "@/styles/globals.css";
import { StyledEngineProvider } from "@mui/material";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import Script from "next/script";
import ChatBot from "@/Components/ChatBot";
 

export default function App({ Component, pageProps }) {
  const theme = createTheme();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/art.ico" />
        <title>AI Image generator</title>
      </Head>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
         {/* <ChatBot/> */}
          <ThemeProvider theme={theme}> 
            <Component {...pageProps} />
            </ThemeProvider> 
        </Provider>
      </StyledEngineProvider>
    </>
  );
}