import { FC } from 'react'
import Header from '../components/miscComponents/Header'
import FeaturesBox from '../components/landingPageComponents/FeaturesBox'
import Footer from '../components/miscComponents/Footer'

interface LandingPageProps {
  
}

const LandingPage: FC<LandingPageProps> = () => {
  return <div>
    <Header />
    <FeaturesBox />
    <Footer/>
  </div>
}

export default LandingPage