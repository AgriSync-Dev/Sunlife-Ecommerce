import React, { useEffect, useState } from "react";

const CustomerQuotes = () => {
	const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
		script.async = true;
		script.onload = () => {
			window.Trustpilot.loadFromElement(document.getElementById("trustpilot-widget"));
		};
		document.head.appendChild(script);
	}, []);

	return (
		<div className="my-5">
			<div
				id="trustpilot-widget"
				data-locale="en-GB"
				data-template-id="54ad5defc6454f065c28af8b"
				data-businessunit-id="6461ff781c5698bd36af5793"
				data-style-height="240px"
				data-style-width="100%"
				data-theme="light"
				data-stars="1,2,3,4,5"
				data-review-languages="en"
			>
				<a href="https://uk.trustpilot.com/review/thesnuslife.com" target="_blank" rel="noopener">
					Trustpilot
				</a>
			</div>
		</div>
	);
};

export default CustomerQuotes;
