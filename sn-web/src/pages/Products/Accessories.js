import React, { useEffect, useState } from "react";
import { apiGET } from "../../utilities/apiHelpers";
import CardCategory from "../../components/productComponents/CardCategory";

const Accessories = () => {
	const [products, setProducts] = useState([]);

	const getAllProducts = async () => {
		try {
			const response = await apiGET(`/v1/products/getProductByNameOfCategory/Accessories`);

			if (response?.status === 200) {
				setProducts(response?.data?.data[0]?.products);
			} else {
				console.error("Error fetching collection data:", response.error);
			}
		} catch (error) {
			console.error("Error fetching collection data:", error);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<div className="main-container  " style={{ margin: "2.5rem 0", minHeight: "65vh" }}>
			<div className=" d-flex justify-content-center  text-center p-4 pt-0 ">
				<div className="px-4 fs-2 text-center  anton1  " style={{ letterSpacing: "5px" }}>
					Accessories
				</div>
			</div>
			<div className="container">
				<div className="row">
					{products?.length > 0
						? products.map((item, index) => (
								<div key={index} className="col-6 col-lg-4 col-xl-3">
									<CardCategory productDetail={item} />
								</div>
						  ))
						: ""}
				</div>
			</div>
		</div>
	);
};

export default Accessories;
