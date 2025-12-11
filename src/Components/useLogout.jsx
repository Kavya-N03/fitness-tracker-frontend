import { useNavigate } from "react-router-dom";

export default function useLogout(){
    const navigate = useNavigate();
    const logout =async()=>{
        const refreshToken = localStorage.getItem("refresh");
        try{
            await fetch("https://fitness-tracker-api-5ibu.onrender.com/api/logout/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`JWT ${localStorage.getItem("access")}`,
                },
                body:JSON.stringify({refresh_token:refreshToken}),
            });
        }catch(error){
            console.log("Logout error:",error);
        }
        //Remove tokens
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        navigate("/login");
    };
    return logout;
}