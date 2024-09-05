import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PrivacyPolicy = () => {
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
				<Col className="d-flex justify-content-center my-5 text-dark" style={{ fontFamily: "Anton" }}>
					<h2>
						<strong>PRIVACY POLICY</strong>
					</h2>
				</Col>
			</Row>

			<div className="container">
				<div>
					<h4>Privacy Policy</h4>
					<p>Last updated October 15, 2022</p>
					<p>
						This privacy notice for THE SNUS LIFE LIMITED ('Company', 'we', 'us', or 'our',), describes how
						and why we might collect, store, use, and/or share ('process') your information when you use our
						services ('Services'), such as when you:
					</p>
					<ul>
						<li>
							Visit our website at thesnuslife.com, or any website of ours that links to this privacy
							notice
						</li>
						<li>Engage with us in other related ways, including any sales, marketing, or events</li>
					</ul>
					<p>
						Questions or concerns? Reading this privacy notice will help you understand your privacy rights
						and choices. If you do not agree with our policies and practices, please do not use our
						Services. If you still have any questions or concerns, please contact us at{" "}
						<span style={{ textDecoration: "underline" }}> info@thesnuslife.com</span>.
					</p>
					<h4>SUMMARY OF KEY POINTS</h4>
					<p>
						This summary provides key points from our privacy notice, but you can find out more details
						about any of these topics by clicking the link following each key point or by using our table of
						contents below to find the section you are looking for. You can also click here to go directly
						to our table of contents.
					</p>
					<p>
						What personal information do we process? When you visit, use, or navigate our Services, we may
						process personal information depending on how you interact with THE SNUS LIFE LIMITED and the
						Services, the choices you make, and the products and features you use. Click here to learn more.
					</p>
					<p>
						Do we process any sensitive personal information? We do not process sensitive personal
						information. Do we receive any information from third parties? We do not receive any information
						from third parties. How do we process your information? We process your information to provide,
						improve, and administer our Services, communicate with you, for security and fraud prevention,
						and to comply with law. We may also process your information for other purposes with your
						consent. We process your information only when we have a valid legal reason to do so. Click here
						to learn more.
					</p>
					<p>
						In what situations and with which parties do we share personal information? We may share
						information in specific situations and with specific third parties. Click here to learn more.
					</p>
					<p>
						How do we keep your information safe? We have organisational and technical processes and
						procedures in place to protect your personal information. However, no electronic transmission
						over the internet or information storage technology can be guaranteed to be 100% secure, so we
						cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties
						will not be able to defeat our security and improperly collect, access, steal, or modify your
						information. Click here to learn more.
					</p>
					<p>
						What are your rights? Depending on where you are located geographically, the applicable privacy
						law may mean you have certain rights regarding your personal information. Click here to learn
						more. How do you exercise your rights? The easiest way to exercise your rights is by filling out
						our data subject request form available by contacting us. We will consider and act upon any
						request in accordance with applicable data protection laws.
					</p>
					<p>
						Want to learn more about what THE SNUS LIFE LIMITED does with any information we collect? Click
						here to review the notice in full.
					</p>
					<h4>TABLE OF CONTENTS</h4>

					<ol>
						<li>WHAT INFORMATION DO WE COLLECT?</li>
						<li>HOW DO WE PROCESS YOUR INFORMATION?</li>
						<li>WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</li>
						<li>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
						<li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
						<li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
						<li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
						<li>DO WE COLLECT INFORMATION FROM MINORS?</li>
						<li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
						<li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
						<li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
						<li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
						<li>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
					</ol>
					{/* <ul><li>WHAT INFORMATION DO WE COLLECT?</li></ul> */}
					<p> 1. WHAT INFORMATION DO WE COLLECT?</p>

					<p>
						Personal information you disclose to us In Short: We collect personal information that you
						provide to us. We collect personal information that you voluntarily provide to us when you
						register on the Services, express an interest in obtaining information about us or our products
						and Services, when you participate in activities on the Services, or otherwise when you contact
						us. Personal Information Provided by You. The personal information that we collect depends on
						the context of your interactions with us and the Services, the choices you make, and the
						products and features you use. The personal information we collect may include the following:
					</p>
					<ul>
						<li>email addresses</li>
						<li>billing addresses</li>
					</ul>

					<p>
						Sensitive Information. We do not process sensitive information. Payment Data. We may collect
						data necessary to process your payment if you make purchases, such as your payment instrument
						number, and the security code associated with your payment instrument. All payment data is
						stored by Square. You may find their privacy notice link(s) here:{" "}
						<span style={{ textDecoration: "underline", cursor: "pointer" }}>
							https://squareup.com/gb/en/legal/general/privacy
						</span>
						. All personal information that you provide to us must be true, complete, and accurate, and you
						must notify us of any changes to such personal information.
					</p>

					<p>
						nformation automatically collected In Short: Some information — such as your Internet Protocol
						(IP) address and/or browser and device characteristics — is collected automatically when you
						visit our Services. We automatically collect certain information when you visit, use, or
						navigate the Services. This information does not reveal your specific identity (like your name
						or contact information) but may include device and usage information, such as your IP address,
						browser and device characteristics, operating system, language preferences, referring URLs,
						device name, country, location, information about how and when you use our Services, and other
						technical information. This information is primarily needed to maintain the security and
						operation of our Services, and for our internal analytics and reporting purposes.
					</p>
					<p>
						Like many businesses, we also collect information through cookies and similar technologies. The
						information we collect includes:
					</p>

					<ul>
						<li>
							Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and
							performance information our servers automatically collect when you access or use our
							Services and which we record in log files. Depending on how you interact with us, this log
							data may include your IP address, device information, browser type, and settings and
							information about your activity in the Services (such as the date/time stamps associated
							with your usage, pages and files viewed, searches, and other actions you take such as which
							features you use), device event information (such as system activity, error reports
							(sometimes called 'crash dumps'), and hardware settings).
						</li>
						<li>
							Device Data. We collect device data such as information about your computer, phone, tablet,
							or other device you use to access the Services. Depending on the device used, this device
							data may include information such as your IP address (or proxy server), device and
							application identification numbers, location, browser type, hardware model, Internet service
							provider and/or mobile carrier, operating system, and system configuration information.
						</li>
					</ul>

					<p> 2. HOW DO WE PROCESS YOUR INFORMATION?</p>
					<p>
						In Short: We process your information to provide, improve, and administer our Services,
						communicate with you, for security and fraud prevention, and to comply with law. We may also
						process your information for other purposes with your consent. We process your personal
						information for a variety of reasons, depending on how you interact with our Services,
						including:
					</p>
					<ul>
						<li>
							To facilitate account creation and authentication and otherwise manage user accounts. We may
							process your information so you can create and log in to your account, as well as keep your
							account in working order.
						</li>
						<li>
							To deliver and facilitate delivery of services to the user. We may process your information
							to provide you with the requested service.
						</li>
						<li>
							To send administrative information to you. We may process your information to send you
							details about our products and services, changes to our terms and policies, and other
							similar information.
						</li>
						<li>
							To save or protect an individual's vital interest. We may process your information when
							necessary to save or protect an individual’s vital interest, such as to prevent harm.
						</li>
					</ul>
					<p>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</p>
					<p>
						In Short: We only process your personal information when we believe it is necessary and we have
						a valid legal reason (i.e. legal basis) to do so under applicable law, like with your consent,
						to comply with laws, to provide you with services to enter into or fulfil our contractual
						obligations, to protect your rights, or to fulfil our legitimate business interests.
					</p>
					<p>
						The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal
						bases we rely on in order to process your personal information. As such, we may rely on the
						following legal bases to process your personal information:
					</p>

					<ul>
						<li>
							Consent. We may process your information if you have given us permission (i.e. consent) to
							use your personal information for a specific purpose. You can withdraw your consent at any
							time. Click here to learn more.
						</li>
						<li>
							Performance of a Contract. We may process your personal information when we believe it is
							necessary to fulfil our contractual obligations to you, including providing our Services or
							at your request prior to entering into a contract with you.
						</li>
						<li>
							Legitimate Interests. We may process your information when we believe it is reasonably
							necessary to achieve our legitimate business interests and those interests do not outweigh
							your interests and fundamental rights and freedoms. For example, we may process your
							personal information for some of the purposes described in order to:
						</li>
						<li>
							Legal Obligations. We may process your information where we believe it is necessary for
							compliance with our legal obligations, such as to cooperate with a law enforcement body or
							regulatory agency, exercise or defend our legal rights, or disclose your information as
							evidence in litigation in which we are involved.
						</li>
						<li>
							Vital Interests. We may process your information where we believe it is necessary to protect
							your vital interests or the vital interests of a third party, such as situations involving
							potential threats to the safety of any person.
						</li>
					</ul>

					<p>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</p>
					<p>
						In Short: We may share information in specific situations described in this section and/or with
						the following third parties.
					</p>
					<p>We may need to share your personal information in the following situations:</p>
					<ul>
						<li>
							Business Transfers. We may share or transfer your information in connection with, or during
							negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
							portion of our business to another company.
						</li>
						<li>
							Affiliates. We may share your information with our affiliates, in which case we will require
							those affiliates to honour this privacy notice. Affiliates include our parent company and
							any subsidiaries, joint venture partners, or other companies that we control or that are
							under common control with us.
						</li>
						<li>
							Business Partners. We may share your information with our business partners to offer you
							certain products, services, or promotions.
						</li>
					</ul>

					<p>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</p>
					<p>
						In Short: We may use cookies and other tracking technologies to collect and store your
						information. We may use cookies and similar tracking technologies (like web beacons and pixels)
						to access or store information. Specific information about how we use such technologies and how
						you can refuse certain cookies is set out in our Cookie Notice.
					</p>
					<p>6. HOW LONG DO WE KEEP YOUR INFORMATION?</p>
					<p>
						In Short: We keep your information for as long as necessary to fulfil the purposes outlined in
						this privacy notice unless otherwise required by law. We will only keep your personal
						information for as long as it is necessary for the purposes set out in this privacy notice,
						unless a longer retention period is required or permitted by law (such as tax, accounting, or
						other legal requirements). No purpose in this notice will require us keeping your personal
						information for longer than the period of time in which users have an account with us.
					</p>

					<p>
						When we have no ongoing legitimate business need to process your personal information, we will
						either delete or anonymise such information, or, if this is not possible (for example, because
						your personal information has been stored in backup archives), then we will securely store your
						personal information and isolate it from any further processing until deletion is possible.
					</p>

					<p>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</p>
					<p>
						In Short: We aim to protect your personal information through a system of organisational and
						technical security measures.
					</p>
					<p>
						We have implemented appropriate and reasonable technical and organisational security measures
						designed to protect the security of any personal information we process. However, despite our
						safeguards and efforts to secure your information, no electronic transmission over the Internet
						or information storage technology can be guaranteed to be 100% secure, so we cannot promise or
						guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to
						defeat our security and improperly collect, access, steal, or modify your information. Although
						we will do our best to protect your personal information, transmission of personal information
						to and from our Services is at your own risk. You should only access the Services within a
						secure environment.
					</p>

					<p>8. DO WE COLLECT INFORMATION FROM MINORS?</p>
					<p>
						In Short: We do not knowingly collect data from or market to children under 18 years of age. We
						do not knowingly solicit data from or market to children under 18 years of age. By using the
						Services, you represent that you are at least 18 or that you are the parent or guardian of such
						a minor and consent to such minor dependent’s use of the Services. If we learn that personal
						information from users less than 18 years of age has been collected, we will deactivate the
						account and take reasonable measures to promptly delete such data from our records. If you
						become aware of any data we may have collected from children under age 18, please contact us at{" "}
						<span style={{ textDecoration: "underline" }}>info@thesnuslife.co.uk</span>
					</p>
					<p>9. WHAT ARE YOUR PRIVACY RIGHTS?</p>
					<p>
						In Short: In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you
						have rights that allow you greater access to and control over your personal information. You may
						review, change, or terminate your account at any time.
					</p>
					<p>
						In some regions (like the EEA and UK), you have certain rights under applicable data protection
						laws. These may include the right (i) to request access and obtain a copy of your personal
						information, (ii) to request rectification or erasure; (iii) to restrict the processing of your
						personal information; and (iv) if applicable, to data portability. In certain circumstances, you
						may also have the right to object to the processing of your personal information. You can make
						such a request by contacting us by using the contact details provided in the section 'HOW CAN
						YOU CONTACT US ABOUT THIS NOTICE?' below.
					</p>
					<p>
						We will consider and act upon any request in accordance with applicable data protection laws. If
						you are located in the EEA or UK and you believe we are unlawfully processing your personal
						information, you also have the right to complain to your local data protection supervisory
						authority. You can find their contact details here:{" "}
						<span style={{ cursor: "pointer", textDecoration: "underline" }}>
							https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
						</span>
						. If you are located in Switzerland, the contact details for the data protection authorities are
						available here:{" "}
						<span style={{ cursor: "pointer", textDecoration: "underline" }}>
							https://www.edoeb.admin.ch/edoeb/en/home.html{" "}
						</span>
						.
					</p>
					<p>
						Withdrawing your consent: If we are relying on your consent to process your personal
						information, you have the right to withdraw your consent at any time. You can withdraw your
						consent at any time by contacting us by using the contact details provided in the section 'HOW
						CAN YOU CONTACT US ABOUT THIS NOTICE?' below. However, please note that this will not affect the
						lawfulness of the processing before its withdrawal nor, will it affect the processing of your
						personal information conducted in reliance on lawful processing grounds other than consent.
						Opting out of marketing and promotional communications: You can unsubscribe from our marketing
						and promotional communications at any time by or by contacting us using the details provided in
						the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below. You will then be removed from the
						marketing lists. However, we may still communicate with you — for example, to send you
						service-related messages that are necessary for the administration and use of your account, to
						respond to service requests, or for other non-marketing purposes. Account Information
					</p>
					<p>
						If you would at any time like to review or change the information in your account or terminate
						your account, you can:
					</p>
					<ul>
						<li>Contact us using the contact information provided.</li>
					</ul>
					<p>
						Upon your request to terminate your account, we will deactivate or delete your account and
						information from our active databases. However, we may retain some information in our files to
						prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms
						and/or comply with applicable legal requirements. Cookies and similar technologies: Most Web
						browsers are set to accept cookies by default. If you prefer, you can usually choose to set your
						browser to remove cookies and to reject cookies. If you choose to remove cookies or reject
						cookies, this could affect certain features or services of our Services. To opt out of
						interest-based advertising by advertisers on our Services visit{" "}
						<span style={{ cursor: "pointer", textDecoration: "underline" }}>
							http://www.aboutads.info/choices/
						</span>
						. If you have questions or comments about your privacy rights, you may email us at{" "}
						<span style={{ cursor: "pointer", textDecoration: "underline" }}>info@thesnuslife.co.uk</span>.
					</p>
					<p>10. CONTROLS FOR DO-NOT-TRACK FEATURES</p>
					<p>
						Most web browsers and some mobile operating systems and mobile applications include a
						Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not
						to have data about your online browsing activities monitored and collected. At this stage no
						uniform technology standard for recognising and implementing DNT signals has been finalised. As
						such, we do not currently respond to DNT browser signals or any other mechanism that
						automatically communicates your choice not to be tracked online. If a standard for online
						tracking is adopted that we must follow in the future, we will inform you about that practice in
						a revised version of this privacy notice.
					</p>

					<p>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</p>
					<p>
						In Short: Yes, if you are a resident of California, you are granted specific rights regarding
						access to your personal information.
					</p>
					<p>
						California Civil Code Section 1798.83, also known as the 'Shine The Light' law, permits our
						users who are California residents to request and obtain from us, once a year and free of
						charge, information about categories of personal information (if any) we disclosed to third
						parties for direct marketing purposes and the names and addresses of all third parties with
						which we shared personal information in the immediately preceding calendar year. If you are a
						California resident and would like to make such a request, please submit your request in writing
						to us using the contact information provided below.
					</p>
					<p>
						If you are under 18 years of age, reside in California, and have a registered account with
						Services, you have the right to request removal of unwanted data that you publicly post on the
						Services. To request removal of such data, please contact us using the contact information
						provided below and include the email address associated with your account and a statement that
						you reside in California. We will make sure the data is not publicly displayed on the Services,
						but please be aware that the data may not be completely or comprehensively removed from all our
						systems (e.g. backups, etc.).
					</p>
					<p>CCPA Privacy Notice</p>
					<p>The California Code of Regulations defines a 'resident' as:</p>
					<p>
						(1) every individual who is in the State of California for other than a temporary or transitory
						purpose and
					</p>
					<p>
						(2) every individual who is domiciled in the State of California who is outside the State of
						California for a temporary or transitory purpose
					</p>
					<p>All other individuals are defined as 'non-residents'.</p>
					<p>
						If this definition of 'resident' applies to you, we must adhere to certain rights and
						obligations regarding your personal information.
					</p>
					<p>What categories of personal information do we collect?</p>
					<p>
						We have collected the following categories of personal information in the past twelve (12)
						months:
					</p>
					<p>A. Identifiers</p>
					<p>
						Contact details, such as real name, alias, postal address, telephone or mobile contact number,
						unique personal identifier, online identifier, Internet Protocol address, email address, and
						account name
					</p>
					<p>NO</p>
					<p>B. Personal information categories listed in the California Customer Records statute</p>
					<p>
						Name, contact information, education, employment, employment history, and financial information
					</p>
					<p>NO</p>
					<p>C. Protected classification characteristics under California or federal law</p>
					<p>Gender and date of birth</p>
					<p>NO</p>
					<p>D. Commercial information</p>
					<p>Transaction information, purchase history, financial details, and payment information</p>
					<p>NO</p>
					<p>E. Biometric information</p>
					<p>Fingerprints and voiceprints</p>
					<p>NO</p>
					<p>F. Internet or other similar network activity</p>
					<p>
						Browsing history, search history, online behaviour, interest data, and interactions with our and
						other websites, applications, systems, and advertisements
					</p>
					<p>NO</p>
					<p>G. Geolocation data</p>
					<p>Device location</p>
					<p>NO</p>
					<p>H. Audio, electronic, visual, thermal, olfactory, or similar information</p>
					<p>Images and audio, video or call recordings created in connection with our business activities</p>
					<p>NO</p>
					<p>I. Professional or employment-related information</p>
					<p>
						Business contact details in order to provide you our Services at a business level or job title,
						work history, and professional qualifications if you apply for a job with us
					</p>
					<p>NO</p>
					<p>J. Education Information</p>
					<p>Student records and directory information</p>
					<p>NO</p>
					<p>K. Inferences drawn from other personal information</p>
					<p>
						Inferences drawn from any of the collected personal information listed above to create a profile
						or summary about, for example, an individual’s preferences and characteristics
					</p>
					<p>NO</p>
					<p>
						We may also collect other personal information outside of these categories through instances
						where you interact with us in person, online, or by phone or mail in the context of:
					</p>
					<ul>
						<li>Receiving help through our customer support channels;</li>
						<li>Participation in customer surveys or contests; and</li>
						<li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
					</ul>

					<p>How do we use and share your personal information?</p>
					<p>
						More information about our data collection and sharing practices can be found in this privacy
						notice. You may contact us or by referring to the contact details at the bottom of this
						document. If you are using an authorised agent to exercise your right to opt out we may deny a
						request if the authorised agent does not submit proof that they have been validly authorised to
						act on your behalf.
					</p>
					<p>Will your information be shared with anyone else?</p>
					<p>
						We may disclose your personal information with our service providers pursuant to a written
						contract between us and each service provider. Each service provider is a for-profit entity that
						processes the information on our behalf. We may use your personal information for our own
						business purposes, such as for undertaking internal research for technological development and
						demonstration. This is not considered to be 'selling' of your personal information. THE SNUS
						LIFE LIMITED has not disclosed or sold any personal information to third parties for a business
						or commercial purpose in the preceding twelve (12) months. THE SNUS LIFE LIMITED will not sell
						personal information in the future belonging to website visitors, users, and other consumers.
						Your rights with respect to your personal data Right to request deletion of the data — Request
						to delete
					</p>
					<p>
						You can ask for the deletion of your personal information. If you ask us to delete your personal
						information, we will respect your request and delete your personal information, subject to
						certain exceptions provided by law, such as (but not limited to) the exercise by another
						consumer of his or her right to free speech, our compliance requirements resulting from a legal
						obligation, or any processing that may be required to protect against illegal activities. Right
						to be informed — Request to know Depending on the circumstances, you have a right to know:
					</p>
					<ul>
						<li>whether we collect and use your personal information;</li>
						<li>the categories of personal information that we collect;</li>
						<li>the purposes for which the collected personal information is used;</li>
						<li>whether we sell your personal information to third parties;</li>
						<li>
							the categories of personal information that we sold or disclosed for a business purpose;
						</li>
						<li>
							the categories of third parties to whom the personal information was sold or disclosed for a
							business purpose; and
						</li>
						<li>the business or commercial purpose for collecting or selling personal information.</li>
					</ul>

					<p>
						In accordance with applicable law, we are not obligated to provide or delete consumer
						information that is de-identified in response to a consumer request or to re-identify individual
						data to verify a consumer request. Right to Non-Discrimination for the Exercise of a Consumer’s
						Privacy Rights We will not discriminate against you if you exercise your privacy rights.
						Verification process
					</p>

					<p>
						Upon receiving your request, we will need to verify your identity to determine you are the same
						person about whom we have the information in our system. These verification efforts require us
						to ask you to provide information so that we can match it with information you have previously
						provided us. For instance, depending on the type of request you submit, we may ask you to
						provide certain information so that we can match the information you provide with the
						information we already have on file, or we may contact you through a communication method (e.g.
						phone or email) that you have previously provided to us. We may also use other verification
						methods as the circumstances dictate. We will only use personal information provided in your
						request to verify your identity or authority to make the request. To the extent possible, we
						will avoid requesting additional information from you for the purposes of verification. However,
						if we cannot verify your identity from the information already maintained by us, we may request
						that you provide additional information for the purposes of verifying your identity and for
						security or fraud-prevention purposes. We will delete such additionally provided information as
						soon as we finish verifying you. Other privacy rights
					</p>

					<ul>
						<li>You may object to the processing of your personal information.</li>
						<li>
							You may request correction of your personal data if it is incorrect or no longer relevant,
							or ask to restrict the processing of the information.
						</li>
						<li>
							You can designate an authorised agent to make a request under the CCPA on your behalf. We
							may deny a request from an authorised agent that does not submit proof that they have been
							validly authorised to act on your behalf in accordance with the CCPA.
						</li>
						<li>
							You may request to opt out from future selling of your personal information to third
							parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly
							possible, but no later than fifteen (15) days from the date of the request submission.
						</li>
					</ul>

					<p>
						To exercise these rights, you can contact us or by referring to the contact details at the
						bottom of this document. If you have a complaint about how we handle your data, we would like to
						hear from you.
					</p>
					<p>12. DO WE MAKE UPDATES TO THIS NOTICE?</p>

					<p>
						In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws. We
						may update this privacy notice from time to time. The updated version will be indicated by an
						updated 'Revised' date and the updated version will be effective as soon as it is accessible. If
						we make material changes to this privacy notice, we may notify you either by prominently posting
						a notice of such changes or by directly sending you a notification. We encourage you to review
						this privacy notice frequently to be informed of how we are protecting your information.
					</p>
					<p>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</p>
					<p>
						If you have questions or comments about this notice, you may email us at{" "}
						<span style={{ cursor: "pointer", textDecoration: "underline" }}>info@thesnuslife.com</span> or
						by post to: THE SNUS LIFE LIMITED Dews Hall New Road Lambourne End RM41AJ United Kingdom
					</p>
					<p>14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</p>
					<p>
						Based on the applicable laws of your country, you may have the right to request access to the
						personal information we collect from you, change that information, or delete it. To request to
						review, update, or delete your personal information, please contact us at{" "}
						<span style={{ cursor: "pointer", textDecoration: "underline" }}>info@thesnuslife.com</span>
					</p>
				</div>
			</div>
		</Container>
	);
};

export default PrivacyPolicy;
