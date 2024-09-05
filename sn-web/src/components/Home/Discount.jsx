import React, { useEffect, useState } from "react";
import { apiGET } from "../../utilities/apiHelpers";

const Discount = () => {
	const [siteData, setSiteData] = useState([]);

	let fetchSiteMetadata = async () => {
		let res = await apiGET(`/v1/site-metadata/get-site-metadata-by-type?type=${"discount"}`);
		if (res?.status == 200) setSiteData(res.data.data.data);
	};
	
	useEffect(() => {
		fetchSiteMetadata();
	}, []);

	if (siteData?.length) {
		return (
			<div style={{ backgroundColor: "#F5F5F5" }} className="p-2 ">
				<div className="d-flex justify-content-center gap-2">
					<div className="d-flex flex-column justify-content-center flex-md-row gap-md-2">
						{siteData?.length > 0 && siteData[0]?.statements?.length
							? siteData[0]?.statements?.map((item, cv) => {
									return (
										<div key={cv}>
											{" "}
											<div className="text-center">{item || ""} </div>
										</div>
									);
							  })
							: ""}
					</div>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

export default Discount;
