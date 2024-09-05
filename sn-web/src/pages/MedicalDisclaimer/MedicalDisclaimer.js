import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MedicalDisclaimer = () => {
	const [containerWidth, setContainerWidth] = useState("90%");

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 768) {
				setContainerWidth("100%");
			} else {
				setContainerWidth("90%");
			}
		}

		window.addEventListener("resize", handleResize);

		// Initial setup
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	
	return (
		<Container style={{ width: containerWidth }}>
			<Row>
				<Col
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "Anton",
						marginTop: "2rem",
					}}
				>
					<h2 style={{ fontSize: "56px" }}>
						<strong>Medical disclaimer</strong>
					</h2>
				</Col>
			</Row>

			<div className="container" style={{ marginTop: "50px", width: "85%", marginBottom: "70px" }}>
				<div>
					<h2 style={{ fontSize: "25px", fontFamily: "Anton" }}>
						<strong>
							Warning: This site and products sold within is intended for audiences of 18 year old or
							over.
						</strong>
					</h2>
					<p style={{ marginTop: "20px" }}>
						www.thesnuslife.com site is intended to supply oral nicotine products and other tobacco free
						products to responsible adults of 18 years old and over only.
					</p>
					<p>
						www.thesnuslife.com cannot take responsibility for the effect of products sold on our website.
					</p>
					<h3 style={{ fontSize: "40px", fontFamily: "Anton", marginTop: "70px" }}>CONTENT</h3>
					<p>
						www.thesnuslife.com contains general information about tobacco free, oral nicotine products and
						other methods of tobacco free products. The information provided is not medical advice, and
						should not be relied upon unless explicitly cited. We do not make any warranties surrounding the
						health benefits, reliability and accuracy of written copy across all pages on our website,
						including blog content and content posted on social media.
					</p>
					<p>
						In no way do The Snus Life Limited suggest oral nicotine products to have any health benefits
						other than in comparison to conventional cigarettes and tobacco containing snus. You must not
						rely on the information on The Snus Life Limited as an alternative to medical advice from your
						doctor or other professional healthcare providers. Comments, feedback and testimonials
						surrounding the effectiveness of oral nicotine products as a smoking cessation tool are based on
						customer, staff and industry opinions and should not be relied upon.
					</p>
					<p>
						We do not recommend or endorse any products mentioned on this site. Any opinions expressed are
						the opinions of the staff and industry and we do not assume any liability for the contents of
						any material provided on the site.
					</p>
					<p>
						Please also note whilst we strive to keep content up to date on this site, medical information
						changes rapidly and therefore some content may be out of date or even possibly inaccurate. If
						you find any information to misrepresent the products sold or erroneous please let us know.
					</p>
					<p>Any action you take upon the information on this website is strictly at your own risk.</p>

					<h4 style={{ fontSize: "40px", fontFamily: "Anton", marginTop: "70px" }}>NICOTINE WARNING</h4>

					<p>
						Nicotine pouches contain{" "}
						<a
							style={{ cursor: "pointer", textDecoration: "underline", color: "black" }}
							href="https://en.wikipedia.org/wiki/Nicotine"
						>
							nicotine.
						</a>
						Therefore cannot be sold to minors aged 18 or under. Nicotine is a highly addictive substance
						and can be poisonous. The Snus Life Limited do not in any way advocate the use of nicotine
						pouches or any other nicotine products.
					</p>
					<p>
						Nicotine pouches must always be kept out of reach of children. We advise that the following
						groups of people not to use any products that contain nicotine:
					</p>
					<ul>
						<li>pregnant or lactating women</li>
						<li>people who suffer from cardio-vascular diseases</li>
						<li>people suffering from seizure disorders.</li>
					</ul>
					<p>If you are unsure, please take advise from your doctor.</p>
					<p>In case of accident (ingestion or adverse reaction) contact your doctor immediately.</p>
					<p>
						Please note: Nicotine pouches may contain traces of nuts, if you have a nut allergy of any form
						please refrain from using nicotine pouches.
					</p>
					<p>
						The Snus Life Limited cannot be held liable for mis-use of nicotine pouches or any other
						products sold on our website. All products purchased are used at your own risk.
					</p>
					<p>By browsing this site, you confirm that you are of legal age and have read this disclaimer.</p>
				</div>
			</div>
		</Container>
	);
};

export default MedicalDisclaimer;
