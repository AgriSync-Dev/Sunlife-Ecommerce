import React, { useState } from "react";
import "../../App.css";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Faq = () => {
	const [openCard, setOpenCard] = useState(null);

	const toggleCard = (index) => {
		if (openCard === index) {
			// If the same card is clicked again, close it
			setOpenCard(null);
		} else {
			// Otherwise, open the clicked card
			setOpenCard(index);
		}
	};

	return (
		<div className="d-flex justify-content-center p-5">
			<div className="container">
				<h2 style={{
					color: "black", textAlign: "center",
					fontFamily: "Anton",
				}}>
					<strong>Frequently Asked Questions</strong>
				</h2>
				<div className="w-75 m-auto mt-3">
					<div class="accordion" id="accordionExample">
						<div class="accordion-item">
							<h2 class="accordion-header" id="headingOne">
								<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
									What are nicotine pouches?
								</button>
							</h2>
							<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Nicotine pouches are a smokeless, tobacco-free product designed to deliver nicotine
									without the use of cigarettes. They are considered an evolution of traditional snus
									which is a type of moist, smokeless tobacco popular in Scandinavia. Unlike snus, which
									contains tobacco, nicotine pouches are made from a blend of nicotine, flavourings, and
									plant-based fibres, typically in a small pouch similar to a small teabag This evolution
									from traditional snus to nicotine pouches represents a significant shift towards
									products that aim to reduce the harm associated with tobacco use. Nicotine pouches
									provide a similar experience to snus, through the same nicotine delivery system, but
									without the tobacco-related risks. This makes them an option for those looking to avoid
									tobacco while still satisfying nicotine cravings. They are available in a plethora of
									strengths and flavours, appealing to a broad range of preferences. You will be pleased
									to know we have the largest product range in the UK and one of the largest in the whole
									of Europe
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingTwo">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
									How to use Nicotine pouches?
								</button>
							</h2>
							<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Select a nicotine pouch that matches your preference for flavour and strength Place the
									pouch between your gum and upper lip, it’s usually more comfortable to position it to
									the side. The pouch will begin to release nicotine soon after placement. You'll feel a
									tingling sensation - that’s normal Keep the pouch in for 5 to 60 minutes depending on
									your comfort and the product’s instructions. After use, dispose of the pouch in a waste
									bin. Most brands offer a discreet disposal catch lid to store your used pouches.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingThree">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
									How do Nicotine pouches work?
								</button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<ol>
										<li>
											A pouch is placed between the gum and upper lip.
										</li>
										<li>
											The nicotine in the pouch is absorbed into the bloodstream through the mucous membranes of the mouth.
										</li>
										<li>
											The pouch gradually releases nicotine, providing a steady and controlled nicotine experience without the need for smoking or vaping
										</li>
									</ol>
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingFour">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
									Why are Nicotine pouches used?
								</button>
							</h2>
							<div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<ol>
										<li>
											They provide a tobacco-free way to consume nicotine without smoking or vaping, reducing exposure to the harmful byproducts of combustion.
										</li>
										<li>
											Nicotine pouches can be used discreetly in social situations or places where smoking and vaping are not allowed.
										</li>
										<li>
											We offer various nicotine strengths allowing you to more precisely manage your nicotine consumption.
										</li>
										<li>
											We also offer a wide range of flavours, enhancing the users experience beyond what traditional tobacco products can offer.
										</li>
										<li>
											They are easy to carry and use without the need for lighting or charging, nicotine pouches are the convenient option for on-the-go nicotine consumption.
										</li>
									</ol>
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingFive">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
									What do Nicotine pouches do?
								</button>
							</h2>
							<div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Nicotine pouches provide a tobacco-free way to consume nicotine discreetly and without
									smoke. Nicotine pouches can help manage cravings, come in various strengths for
									controlled intake, and are available in multiple flavours for an enjoyable experience.
									They are designed for adult users seeking a convenient, smokeless nicotine option.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingSix">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
									Can Nicotine pouches help me quit smoking?
								</button>
							</h2>
							<div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Nicotine pouches can be a tool for those looking to quit smoking, offering a smoke-free
									and tobacco-free nicotine alternative. They allow users to gradually reduce their
									nicotine intake thanks to the various strengths available. By providing a discreet way
									to manage nicotine cravings without cigarettes, nicotine pouches can be part of a
									broader quitting strategy.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingSeven">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
									Why are Nicotine pouches preferable to vaping?
								</button>
							</h2>
							<div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									They offer a discreet, smokeless nicotine experience without the need for devices or
									batteries. There’s no vapour or odour making them more socially acceptable in various
									settings. They provide a controlled nicotine intake by having different strengths
									available and they eliminate concerns about lung health associated with inhaling smoke
									or vapour. Additionally, nicotine pouches require no maintenance, unlike vaping
									equipment, making them a convenient choice for on-the-go use.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingEight">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
									What are the effects of Nicotine pouches?
								</button>
							</h2>
							<div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Nicotine pouches offer several positive effects, including the provision of a smokeless
									and discreet way to consume nicotine which reduces exposure to harmful tobacco smoke.
									They can aid in managing nicotine cravings helping people to quit smoking for good. The
									controlled dosage allows for gradual reduction in nicotine intake. Users also report a
									sense of mental clarity, focus, and stress relief after use.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingNine">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
									Nicotine pouches in professional sport?
								</button>
							</h2>
							<div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Nicotine pouches are used by Premier League football players as well as athletes in many
									other professional sports mainly for their stimulant effects which include increased
									focus, alertness, and stress reduction. They offer a tobacco-free and smokeless
									alternative for athletes helping avoid the health risks associated with traditional
									smoking or vaping.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingTen">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
									Are Nicotine pouches cheaper than smoking and vaping?
								</button>
							</h2>
							<div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									Nicotine pouches are a cost-effective alternative to tobacco products, particularly in
									countries & areas where tobacco is heavily taxed like the UK. The price advantage stems
									from factors like lower usage quantities compared to cigarettes and the absence of the
									need accessories such as lighters and ashtrays. Their longer-lasting use and the
									potential for reduced health-related costs make them economically advantageous for many
									users over time.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingEleven">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
									Does Snus have a shelf life?
								</button>
							</h2>
							<div id="collapseEleven" class="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									All of our products have a best before date typically of 12 or 24 months but nicotine
									pouches are completely fine to use even after this date. We have a high turnover rate at
									our warehouse with deliveries coming and going several times a day. Meaning that at The
									Snus Life your pouches are always as fresh as possible from the factory
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingTwelve">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
									Are Nicotine pouches safe?
								</button>
							</h2>
							<div id="collapseTwelve" class="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									While Nicotine pouches don’t pose the same health risks as smoking or vaping, nicotine
									is still an addictive chemical. People who use nicotine products do so at their own
									risk.
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div class="accordion-item">
							<h2 class="accordion-header" id="headingThirteen">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
									How can I stay up to date with new products?
								</button>
							</h2>
							<div id="collapseThirteen" class="accordion-collapse collapse" aria-labelledby="headingThirteen" data-bs-parent="#accordionExample">
								<div class="accordion-body">
									You can follow us on TikTok and Instagram @TheSnusLifeLtd where we showcase new
									products, host giveaways and provide updates. Also be sure to sign up to our newsletter
									to ensure you never miss the release of a new flavour or a flash discount !
									<div className="d-flex mt-2 gap-4 align-items-center ">
										<a href="#" target="_blank">
											<FaInstagram style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a
											href="#"
											target="_blank"
										>
											<FaFacebook style={{ color: "black" }} className="fs-5 mr-2" />
										</a>
										<a href="#" target="_blank">
											<FaTiktok style={{ color: "black" }} className="fs-5" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Faq;