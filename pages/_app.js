import 'tailwindcss/tailwind.css'
import '../public/custom-forms.css';
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import Layout from '../components/layout'
import { GeneralProvider } from "../context";
import '@fortawesome/fontawesome-svg-core/styles.css'





function MyApp({ Component, pageProps }) {
  const client = createReactClient({
    provider: studioProvider({ apiKey: 'a47893e2-da0b-4ea2-89e0-64b55148d4b1' }),
  });

  return (    
    <GeneralProvider>
  <LivepeerConfig client={client}>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </LivepeerConfig>
  </GeneralProvider>)
}

export default MyApp
