import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyProtectedRoute = ({children}) => {
    const {user} = useSelector(store => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if(user === null || user?.role != 'recruiters'){
            navigate('/');
        }
    },[]);
    return(
        <>
        {children}
        </>
    )
};

export default CompanyProtectedRoute;