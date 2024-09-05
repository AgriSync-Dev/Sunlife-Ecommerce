import React from "react";

const Button = ({ onClick, Title, className }) => {
	return (
		<div className="d-flex justify-content-center ">
			<button className={`bg-dark text-white w-100 ${className} `} onClick={onClick}>
				<span className="px-3 ">{Title}</span>
			</button>
		</div>
	);
};

export default Button;
