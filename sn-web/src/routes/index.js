import React from "react";
import { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MixMatchProduct from "../pages/Products/mixMatchProduct";

//import HomePage from "../pages/Home/HomePage";
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const ProductPage = React.lazy(() => import("../pages/Products/ProductsPage"));
const Apparel = React.lazy(() => import("../pages/Products/Apparel"));
const Accessories = React.lazy(() => import("../pages/Products/Accessories"));
const ProductDetails = React.lazy(() => import("../pages/Products/ProductDetails"));
const AboutUs = React.lazy(() => import("../pages/About/AboutUs"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const MedicalDisclaimer = React.lazy(() => import("../pages/MedicalDisclaimer/MedicalDisclaimer"));
const TermOfService = React.lazy(() => import("../pages/TermOfService/TermOfService"));
const Faq = React.lazy(() => import("../pages/Faq/Faq"));
const ContactUs = React.lazy(() => import("../pages/Contact/ContactUs"));
const Footer = React.lazy(() => import("../components/Footer/Footer"));
const Blogs = React.lazy(() => import("../pages/Blog/Blogs"));
const BlogDetails = React.lazy(() => import("../pages/Blog/BlogDetails"));
const MyCart = React.lazy(() => import("../pages/cart/mycart"));
const MyAccount = React.lazy(() => import("../pages/My-Profile/myAccount"));
const MyAddresses = React.lazy(() => import("../pages/My-Profile/MyAddresses"));
const CheckoutPage = React.lazy(() => import("../pages/Checkout/checkoutPage"));
const myWishlist = React.lazy(() => import("../pages/My-Wishlist/myWishlist"));
const MyOrders = React.lazy(() => import("../pages/OrdersPage/myOrders"));
const thankyou = React.lazy(() => import("../pages/Thankyou/thankyou"));
const NavbarTwo = React.lazy(() => import("../components/Navbar/NavbarTwo"));
const ResetPassword = React.lazy(() => import("../components/resetPassword"));
const SearchProductResults = React.lazy(() => import("../pages/Products/searchProductResults"));

export const publicPages = [
	{ path: "/", exact: true, component: HomePage },
	{ path: "/shop", component: ProductPage },
	{ path: "/category-apparel", component: Apparel },
	{ path: "/product-page/:product", component: ProductDetails },
	{ path: "/category-accessories", component: Accessories },
	{ path: "/about", component: AboutUs },
	{ path: "/contact", component: ContactUs },
	{ path: "/privacy-policy", component: PrivacyPolicy },
	{ path: "/medical-disclaimer", component: MedicalDisclaimer },
	{ path: "/terms-of-service", component: TermOfService },
	{ path: "/faq", component: Faq },
	{ path: "/blog", component: Blogs },
	{ path: "/blog-details/:title", component: BlogDetails },
	{ path: "/cart", component: MyCart },
	{ path: "/account", component: MyAccount },
	{ path: "/account/my-addresses", component: MyAddresses },
	{ path: "/checkout", component: CheckoutPage },
	{ path: "/myWishlist", component: myWishlist },
	{ path: "/ordersPage", component: MyOrders },
	{ path: "/checkout/thankyou/:orderId", component: thankyou },
	{ path: "/reset-password/:token", component: ResetPassword },
	{ path: "/search-results", component: SearchProductResults },
	{ path: "/mix-match/:id", component: MixMatchProduct },
];
export const withoutfooterandNavbar = [
	{ path: "/checkout", component: CheckoutPage },
];

const SiteRoutes = () => {
	return (
		<BrowserRouter basename="/">
			<Suspense
				fallback={
					<div
						style={{
							display: "flex",
							height: "100vh",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Spinner animation="border" style={{ color: "black", marginTop: 5 }} role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</div>
				}
			>
				<Routes>
					{publicPages.map((route, idx) => (
						<Route
							key={idx}
							path={`${route?.path}`}
							element={
								withoutfooterandNavbar.find((item) => item.path === route?.path) ? (
									<route.component />
								) : (
									<>
										<NavbarTwo />
										<route.component />
										<Footer />
									</>
								)
							}
						/>
					))}
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default SiteRoutes;
