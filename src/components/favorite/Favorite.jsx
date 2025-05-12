import React from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteItem from "../favoriteItem/FavoriteItem";
import { globalStore } from "../../store/globalStore";
import { observer } from "mobx-react-lite";

const Favorite = observer(({ isShowFavorite, setIsShowFavorite }) => {
	const [favoriteData, setFavoriteData] = React.useState([]);

	const jwt = localStorage.getItem('accessToken');

	React.useEffect(() => {
		if(jwt) {
			getFavorite();
			console.log("");
		}
	}, [jwt]);

	const getFavorite = () => {
		axios.get("https://monosortcoffee.ru/api/favourite", 
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		)
		.then(res => {
			console.log(res.data);
			setFavoriteData(res.data);
			globalStore.getFavoritesFunc(getFavorite);
		})
		.catch(err => {
			console.log(err);
		});
  };
  return (
    <div className={isShowFavorite ? "cart favorite show" : "cart favorite"}>
      <div className="cart__header">
				<div className="order__user-name">
					<div className="order__profile-icon">
						<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M256 0C114.6 0 0 114.6 0 256C0 397.4 114.6 512 256 512C397.4 512 512 397.4 512 256C512 114.6 397.4 0 256 0ZM256 128C295.77 128 328 160.24 328 200C328 239.76 295.8 272 256 272C216.24 272 184 239.76 184 200C184 160.24 216.2 128 256 128ZM256 448C203.07 448 155.1 426.47 120.3 391.71C136.5 349.9 176.5 320 224 320H288C335.54 320 375.54 349.88 391.7 391.71C356.9 426.5 308.9 448 256 448Z" fill="#2C5C4F"/>
							<path d="M256 128C295.77 128 328 160.24 328 200C328 239.76 295.8 272 256 272C216.24 272 184 239.76 184 200C184 160.24 216.2 128 256 128Z" fill="white"/>
							<path d="M256 448C203.07 448 155.1 426.47 120.3 391.71C136.5 349.9 176.5 320 224 320H288C335.54 320 375.54 349.88 391.7 391.71C356.9 426.5 308.9 448 256 448Z" fill="white"/>
						</svg>
					</div>
					<h3 className="order__profile-name">{globalStore.profileData.name || ""}</h3>
				</div>
        <IconButton
          disableRipple={true}
          className="cart__header-button close"
        	onClick={() => setIsShowFavorite(false)}
          sx={{
            color: "#2c5c4f",
            backgroundColor: "#fff",
            borderRadius: "90%",
            boxShadow: "0 0 2px 0 #b7b7b7",
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {favoriteData.length > 0 ? (
				<ul className="cart__list">
					{favoriteData?.map((item) => (
						<FavoriteItem key={item.id} item={item} />
					))}
				</ul>
			) : (
				<div className="cart__empty">
					<p>Здесь ничего нет. <br /><span>Пока что.</span></p>
				</div>
			)}
    </div>
  );
});

export default Favorite;