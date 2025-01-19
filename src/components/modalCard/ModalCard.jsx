import React from "react";
import "./modalCard.css";

const ModalCard = () => {
	return (
		<>
			<div className="modal-wrapper">
				<div className="modal">
					<div className="modal__info">
						<img className="modal__info-img" src="" alt={category.name} />
						<h2 className="modal__info-title">{category.name}</h2>
						<h3 className="modal__info-subtitle">настрой как любишь</h3>
					</div>
					<div className="modal__panel">
						<div className="modal__panel-choice">
							
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
import "./modalCard.css";

export default ModalCard;
