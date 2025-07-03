import { setSingleCompany } from "@/store/companySlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_COMPANY}/get/${companyId}`,{withCredentials:true});
            if(response.data.success){
                dispatch(setSingleCompany(response.data.company));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleCompany();
  },[companyId, dispatch])
}

export default useGetCompanyById;
