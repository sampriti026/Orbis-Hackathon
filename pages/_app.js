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
    provider: studioProvider({ apiKey: 'ce8846a5-7d20-4896-8f4d-068454f4f787' }),
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
