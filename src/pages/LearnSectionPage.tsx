import Layout from '@/Layout'
import LatestNewsSection from '@/components/dashboardComponents/LatestNewsSection'
import { FC } from 'react'

interface LearnSectionPageProps {
  
}

const LearnSectionPage: FC<LearnSectionPageProps> = () => {
  return <div>
    <Layout>
      Mukul
      <LatestNewsSection/>
    </Layout>
  </div>
}

export default LearnSectionPage