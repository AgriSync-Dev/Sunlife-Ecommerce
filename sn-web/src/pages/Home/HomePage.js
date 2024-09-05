import React, { useState, useEffect } from "react";
import HomePageCover from "../../sections/HomePageCover";
import FeaturedProducts from "../../sections/FeaturedProducts";
import CustomerQuotes from "../../sections/CustomerQuotes";
import ContactUsForm from "../../sections/ContactUsForm";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { setlastpath } from "../../redux/users/users";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Discount from "../../components/Home/Discount";
import { apiGET } from "../../utilities/apiHelpers";

const HomePage = () => {
	const [isOver18, setIsOver18] = useState(false);
	const [userNotOver18, setUserNotOver18] = useState(false);
	const [show, setShow] = useState(false);
	const [infoShow, setInfoShow] = useState(false);
	const [welcomeShow, setWelcomeShow] = useState(false);
	const [countryData, setCountryData] = useState({});
	const [christmasOffer, setChristmasOffer] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const [siteData, setSiteData] = useState([]);
	const [siteDataWelcome, setSiteDataWelcome] = useState([]);

	let fetchSiteMetadata = async () => {
		let res = await apiGET(`/v1/site-metadata/get-site-metadata-by-type?type=${"Home page modal"}`);
		if (res?.status == 200) setSiteData(res?.data?.data?.data);
		if (res?.data?.data?.data?.length == 0) {
			setChristmasOffer(false);
		}
	};

	let fetchSiteMetadataWelcome = async () => {
		let res = await apiGET(`/v1/site-metadata/get-site-metadata-by-type?type=${"usaCanadaModel"}`);
		if (res?.status == 200) setSiteDataWelcome(res.data.data.data);
	};

	useEffect(() => {
		if (location?.pathname && location.pathname == "/") {
			dispatch(setlastpath(location.pathname));
		}
	}, [location]);

	console.log("Time zone----Test", Intl.DateTimeFormat().resolvedOptions().timeZone);
	// const getGeoInfo = () => {
	//   axios
	//     .get("https://ipapi.co/json/")
	//     .then((response) => {
	//       let data = response.data;
	//       console.log("country data----------------", data);
	//       if (
	//         data.country_name == "United States" ||
	//         data.country_name == "Canada"
	//       ) {
	//         setShow(true);
	//       }
	//       setCountryData({
	//         ip: data.ip,
	//         countryName: data.country_name,
	//         countryCode: data.country_calling_code,
	//         city: data.city,
	//         timezone: data.timezone,
	//       });
	//     })
	//     .catch((error) => {
	//       console.log(error);
	//     });
	// };

	const getGeoInfo = () => {
		axios
			.get("https://ipapi.co/json/")
			.then((response) => {
				let data = response.data;
				if (
					data.country_name == "United States" ||
					data.country_name == "United States Minor Outlying Islands" ||
					data.country_name == "Canada"
				) {
					const hasConfirmedWelcome = localStorage.getItem("welcomeConfirmed");
					if (hasConfirmedWelcome === "true") {
						setWelcomeShow(false);
						//alert('hello')
					} else {
						setWelcomeShow(true);
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchSiteMetadata();
		setChristmasOffer(true);
		// getGeoInfo();
		getGeoInfo();
		fetchSiteMetadataWelcome();
	}, []);

	useEffect(() => {
		// Check if the user has previously confirmed their age
		const hasConfirmedAge = localStorage.getItem("hasConfirmedAge");
		if (hasConfirmedAge === "true") {
			setIsOver18(true);
		}
	}, []);

	const handleAgeConfirmation = (confirmed) => {
		if (confirmed) {
			localStorage.setItem("hasConfirmedAge", "true");
			setIsOver18(true);
			setInfoShow(true);
		} else {
			setUserNotOver18(true);
		}
	};
	
	const handleWelcomeConfirmation = (confirmed) => {
		if (confirmed) {
			localStorage.setItem("welcomeConfirmed", "true");
			setWelcomeShow(false);
		} /*  else {
      setUserNotOver18(true);
    } */
	};

	return (
		<div>
			<div>
				{isOver18 ? (
					""
				) : (
					<div className="over18modal">
						<div
							className="over18modal-div1"
							style={{
								backgroundColor: "#0396ff",
								color: "white",
								borderRadius: "10px",
							}}
						>
							<div
								className="w-100 font-serif text-size-low d-flex justify-content-center"
								style={{ padding: "40px 0" }}
							>
								<span>Over 18 Only</span>
							</div>
							<div className="text-center text-low-2" style={{ paddingBottom: "10px" }}>
								Please confirm you are over the age of 18
							</div>
							{userNotOver18 ? (
								<div className="text-danger text-center fs-5">
									You must be over 18 to access this website.
								</div>
							) : (
								""
							)}

							<div className="isOver18Button">
								<button
									className="over18button px-4  border-0 text-black"
									style={{ borderRadius: "10px", background: "#F0F0F0" }}
									onClick={() => handleAgeConfirmation(true)}
								>
									Yes
								</button>
								<button
									className="over18button px-4   border-0 text-black "
									style={{ borderRadius: "10px", background: "#F0F0F0" }}
									onClick={() => handleAgeConfirmation(false)}
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}
				{welcomeShow && siteDataWelcome?.length > 0 ? (
					<div className="over18modal">
						{siteDataWelcome.map((item, index) => (
							<div
								className="over18modal-div1"
								style={{
									padding: 10,
									marginTop: 20,
									backgroundColor: "#FFFFFF",
									color: "black",
									borderRadius: "10px",
								}}
							>
								<div
									className="w-100 font-serif text-size-low d-flex justify-content-center"
									style={{ padding: "15px 0" }}
								>
									<span>{item?.title}</span>
								</div>
								{item.statements?.length > 0 && item?.statements?.length
									? item?.statements?.map((cv, index) => {
											return (
												<div key={index} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
													<div
														className=" text-low-2"
														style={{ paddingBottom: "10px", textAlign: "justify" }}
													>
														{cv}
													</div>
												</div>
											);
									  })
									: ""}

								<div className="isOver18Button">
									<button
										className="over18button px-4  border-0 "
										style={{
											borderRadius: "10px",
											background: "#000000",
											color: "#FFFFFF",
											marginTop: "10px",
										}}
										onClick={() => handleWelcomeConfirmation(true)}
									>
										Okay, thanks !
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					""
				)}

				{/* {(infoShow && isOver18) ? (
           <div className="over18modal">
           <div
             className="over18modal-div1"
             style={{
               backgroundColor: "#0396ff",
               color: "white",
               borderRadius: "10px",
             }}
           >
              <div style={{display:'flex', justifyContent:"end"}}><span style={{margin:'10px'}}><MdClose size={'30px'} onClick={()=>infoHandle()}/></span></div>
             <div
               className="text-center text-low-2"
               style={{ paddingBottom: "10px", marginLeft:'20px', marginRight:'20px', marginBottom:'20px' }}
             >
               Welcome to our brand new site!
               You will notice a change to our payment gateway, a massive improvement in website speed and a cleaner sexier site in general.
               Some things are still being worked on such as improved functionality for our pick 'n' mix and more advanced filtering options
             </div>
           </div>

         </div>
        ) : (
         ""
        )} */}

				{christmasOffer && siteData.length > 0 ? (
					<div className="over18modal">
						<div
							className="over18modal-div1"
							style={{
								backgroundColor: "#FFFFFF",
								color: "black",
								borderRadius: "10px",
							}}
						>
							<div style={{ display: "flex", justifyContent: "end" }}>
								<span style={{ margin: "10px" }}>
									<MdClose
										className="cursor-pointer"
										size={"30px"}
										onClick={() => setChristmasOffer(false)}
									/>
								</span>
							</div>
							<div
								className="text-center text-low-2"
								style={{
									paddingBottom: "10px",
									marginLeft: "20px",
									marginRight: "20px",
									marginBottom: "20px",
								}}
							>
								<h2 className="avenir-medium">{siteData[0]?.title || ""} </h2>
								{siteData.length
									? siteData[0]?.statements.map((item, i) => {
											return <div style={{ fontSize: "15px" }}>{item || ""}</div>;
									  })
									: ""}
								<button
									className="over18button px-4  border-0 "
									style={{
										borderRadius: "10px",
										background: "#000000",
										color: "#FFFFFF",
										marginTop: "10px",
									}}
									onClick={() => setChristmasOffer(false)}
								>
									ok
								</button>{" "}
							</div>
						</div>
					</div>
				) : (
					""
				)}

				<Discount />
				<HomePageCover />
				<FeaturedProducts />
				<CustomerQuotes />
				<ContactUsForm />
			</div>
		</div>
	);
};

export default HomePage;
