import React from "react";
import { BsPlus } from "react-icons/bs";

const MixMatchCard = ({ productDetail, showPlusIcon }) => {
	return (
		<div className={`p-2 mixMatchCard ${showPlusIcon ? "withPlusIcon" : ""}`}>
			<div className="cardContent">
				<div className="card-container d-flex  ">
					<img
						src={productDetail?.productImageUrl}
						className={`img-fluid position-relative ${showPlusIcon ? "minimizeImage" : ""}`}
						alt={productDetail?.name}
					/>
				</div>

				<div>
					<div
						style={{ fontSize: "16px", whiteSpace: "normal", wordBreak: "break-word" }}
						className="card-title avenir-semibold text-center mt-3 cursor-pointer"
					>
						{productDetail?.name}
					</div>
				</div>
			</div>

			{parseInt(productDetail?.inventory) > 0 ? (
				<div className="plusIcon ">
					{showPlusIcon && (
						<div className="bg-light ">
							<BsPlus className="plusIcon fw-bold fs-3 bg-dark bg-opacity-25   rounded-5" />
						</div>
					)}
				</div>
			) : (
				<div
					style={{
						display: "flex",
						position: "absolute",
						top: "30%",
						left: "20%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{showPlusIcon ? <p className="  fs-3  bg-opacity-25   ">Out Of Stock</p> : null}
				</div>
			)}
		</div>
	);
};

export default MixMatchCard;
