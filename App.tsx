import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import "./src/styles/global.css";

import { Loading } from './src/components/loading';
import { Home } from './src/screens/home';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  return (
    <>
      {fontsLoaded ? <Home /> : <Loading />}
      <StatusBar style="auto" translucent />
    </>
  );
}

