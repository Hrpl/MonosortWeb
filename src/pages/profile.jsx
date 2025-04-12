import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();

	React.useEffect(() => {
			const currentDate = new Date();
			if(new Date(localStorage.getItem("expires")) < currentDate ){
				navigate('/sign');
			}
			if(localStorage.key("expires") == null){
				navigate('/sign');
			}
		}, [navigate]);
	return (
		<>
			fsaaf
		</>
	)
};

export default Profile;
