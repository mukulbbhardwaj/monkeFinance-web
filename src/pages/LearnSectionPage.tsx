import ModulesList from "@/components/learnSectionComponents/ModulesList";
import Layout from "@/Layout";
import { FC } from "react";

interface LearnSectionPageProps {}

const LearnSectionPage: FC<LearnSectionPageProps> = () => {
  return (
    <div>
      <Layout>
        <div className="text-4xl font-bold my-16 ">Modules</div>
        <ModulesList />
      </Layout>
    </div>
  );
};

export default LearnSectionPage;
