import axios from "axios";


const getPortfolioInfo = async (userId:number|undefined) => {
    try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/pt/portfolio/${userId}`
        );
        return res.data.data;
    } catch (error) {
        console.error(error);
    }
};

export default getPortfolioInfo;
