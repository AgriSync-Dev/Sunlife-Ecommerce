import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import banner from "../../assets/about us.jpg";

const AboutUs = () => {
	return (
		<div style={{margin:"2.5rem 0"}}>
			<div className="container">
				<p
					style={{
						fontFamily: "anton",
						fontSize: "28px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					ABOUT US
				</p>
				<div className="row">
					<div className="col-md-6">
						<div className="aboutUsBoxFirst">
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									textAlign: "center",
									fontSize: "22px",
								}}
							>
								<p>
									Here at The Snus Life, most importantly, we are snus lovers. We know snus and
									nicopods are and can be a positive force on the world and help people to laugh and
									love life.
								</p>
								<p>
									We are the largest online retailer in the UK because we are passionate about what we
									do. We take pride in delivering the highest possible quality of service for those
									who love to live The Snus Life
								</p>
								<p>
									At The Snus Life it is our goal to stock the snus and nicopods our customers want
									most. If there is a product you have seen and want us to stock then let us know on
									our ‘Get in touch’ form!
								</p>
								<p>
									We are always trying to do better. If there is an issue, big or small, our customer
									service team is ready to help you over email Info@thesnuslife.com
								</p>
							</div>
						</div>
					</div>

					<div
						className="col-md-6"
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "25px",
						}}
					>
						<LazyLoadImage
							effect="blur"
							style={{ height: "94%", width: "100%" }} // Adjust these values for the image size height:"80px"
							src={banner ? banner : "1"}
							alt="Profile"
							className="profile-image"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
