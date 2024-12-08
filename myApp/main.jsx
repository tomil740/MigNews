import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomeScreen from './presentation/homeScreen/components/HomeScreen'
import { RecoilRoot } from 'recoil'
import NavigationHoster from './presentation/NavigationHoster'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <NavigationHoster />
    </RecoilRoot>
  </StrictMode>
);
