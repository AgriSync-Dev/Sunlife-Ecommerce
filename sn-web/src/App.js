import { Helmet } from "react-helmet";
import "./App.css";
import SiteRoutes from "./routes";
import { useEffect, useState } from "react";
import { apiGET } from "./utilities/apiHelpers";

function App() {
	const [metaData, setMetaData] = useState([]);
	let fetchSiteMetadata = async () => {
		try {
			let res = await apiGET(`/v1/site-metadata/get-site-metadata-by-type?type=all site metadata`);
			let data = res?.data?.data?.data;

			if (data && data?.length > 0) {
				let statements = data[0]?.statements;

				if (res?.status === 200) {
					setMetaData(statements);
				}
			}
		} catch (error) {
			console.error("Error fetching site metadata:", error);
		}
	};

	useEffect(() => {
		fetchSiteMetadata();
	}, []);

	return (
		<>
			<div>
				<Helmet>
					<meta
						name="description"
						content={
							metaData?.length
								? metaData
								: "We have THE largest product range in the UK with 450+ different flavors, rated excellent on Trustpilot - 4.8/5.0 and 20,000+ happy customers"
						}
					/>
				</Helmet>
			</div>
			<div className="App avenir">
				<SiteRoutes />
			</div>
		</>
	);
}

export default App;
