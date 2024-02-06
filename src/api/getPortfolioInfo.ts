import axios from "axios";


const getPortfolioInfo = async (userId:number|undefined) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/pt/portfolio/${userId}`);
        return res.data.data;
    } catch (error) {
        console.error(error);
    }
};

export default getPortfolioInfo;
