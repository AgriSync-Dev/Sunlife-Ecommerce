import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const ProfileMenu = () => {
	const { userData } = useSelector((state) => state.user);

	const location = useLocation();
	let links = [
		{
			link: "/ordersPage",
			name: "My Orders"
		},
		{
			link: "/account/my-addresses",
			name: "My Addresses"
		},
		{
			link: "/myWishlist",
			name: "My Wishlist"
		},
		{
			link: "/account",
			name: "My Account"
		},
	]

	return (
		<div className="w-full ">
			<div>
				<div className="d-flex gap-4 align-items-center">
					<div className="rounded-circle d-flex align-items-center justify-content-center
				 fs-3 fw-bold text-white bg-info"
						style={{ width: "80px", height: "80px" }}
					>
						{userData?.fName
							? userData?.fName?.toUpperCase()[0] + userData?.lName?.toUpperCase()[0]
							: userData?.username?.toUpperCase()[0]
						}
					</div>
					<div>
						<div className="">
							{userData?.username}
						</div>
						<div className=" mt-1">
							{userData?.email}
						</div>
					</div>
				</div>
				<div className="d-flex flex-column gap-3 mt-4">
					{links.map((item, id) =>
						<Link to={item?.link} key={id}
							className={`text-decoration-none fw-semibold ${location?.pathname === item?.link ? 'text-dark fs-5' : 'text-secondary'}`}
						>
							{item?.name}
						</Link>
					)}
				</div>
			</div>
		</div>
	)
	return (
		<>
			<div className="d-flex  justify-content-md-center  pt-0 px-0 py-lg-2 px-lg-3 p-lg-4  ">
				<div className="container mt-0 mt-lg-4  w-100 ">
					<div className=" bg-primaryy pt-5 d-lg-none  d-flex justify-content-end"></div>
					<div className="container px-3 px-md-10">
						<div style={{ marginTop: "-40px" }} className="d-flex justify-content-md-start ">
							<div
								className=" rounded-circle d-flex text-white align-items-center justify-content-center  border border-1 border-white "
								style={{ width: "90px", height: "90px", fontSize: "40px", backgroundColor: "#EF6C00" }}
							>
								{userData?.fName
									? userData?.fName?.toUpperCase()[0] + userData?.lName?.toUpperCase()[0]
									: userData?.username?.toUpperCase()[0]}
							</div>
						</div>
						<div className="mt-1 mt-md-2 text-md-start">
							<p>{userData?.username}</p>
						</div>
						<div className="mt-1 mt-md-2 text-md-start content-hidden3">
							<p className="" style={{ fontSize: "14px" }}>
								{userData?.userTitle}
							</p>
						</div>
						<div className="d-flex justify-content-md-start ">
							<div className=" d-flex justify-content-start d-md-table-cell   ">
								<div className="text-md-start px-0 px-md-0 "> 0</div>
								<div className="text-md-start px-2 px-md-0 " style={{ fontSize: "13px" }}>
									Followers
								</div>
							</div>
							<div className=" border mx-1 mx-md-4   "></div>
							<div className=" d-flex justify-content-start d-md-table-cell    ">
								<div className="text-md-start px-1 px-md-0 ">0</div>
								<div className="text-md-start px-1  px-md-0 " style={{ fontSize: "13px" }}>
									Following
								</div>
							</div>
						</div>
						<div className="mt-4 text-md-start content-hidden4">
							<p className="" style={{ fontSize: "14px" }}>
								{userData?.userTitle}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-3">
				<div className="mx-3 mx-md-3 mx-lg-4 mb-2 ">
					<div className=" container d-flex justify-content-between mt-2" data-bs-toggle="dropdown">
						<div className=" content-hidden8  text-underline-none text-dark underline-none">
							{" "}
							<span>My Account </span>{" "}
						</div>
						<div className=" content-hidden8 dropdown-toggle " style={{ fontSize: "xx-large" }}></div>
					</div>
					<div className="dropdown-menu w-100	 " style={{ padding: "0 50px" }}>
						<div className="mt-2 m">
							<Link
								to={"/ordersPage"}
								className={`dropdown-item ${location?.pathname === "/ordersPage" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Orders </span>{" "}
							</Link>
						</div>
						<div className="mt-3">
							<Link
								to={"/account/my-addresses"}
								className={`dropdown-item ${location?.pathname === "/account/my-addresses" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Addresses </span>{" "}
							</Link>
						</div>
						<div className="mt-3">
							<Link
								to={"/"}
								className={`dropdown-item ${location?.pathname === "/" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Wallet </span>{" "}
							</Link>
						</div>
						<div className="mt-3">
							<Link
								to={"/myWishlist"}
								className={`dropdown-item ${location?.pathname === "/myWishlist" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Wishlist </span>{" "}
							</Link>
						</div>
						<div className="mt-3">
							<Link
								to={"/account"}
								className={`dropdown-item ${location?.pathname === "/account" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Account </span>{" "}
							</Link>
						</div>
						<div className="mt-3">
							<Link
								to={"/"}
								className={`dropdown-item ${location?.pathname === "/" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>Notification </span>{" "}
							</Link>
						</div>
						<div className="mt-3">
							<Link
								to={"/"}
								className={`dropdown-item ${location?.pathname === "/" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>Settings </span>{" "}
							</Link>
						</div>
					</div>
					<div className="" style={{ padding: "0 10px" }}>
						<div className="mt-2 content-hidden7 ">
							<Link
								to={"/ordersPage"}
								className={`dropdown-item ${location?.pathname === "/ordersPage" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Orders </span>{" "}
							</Link>
						</div>
						<div className="mt-3  content-hidden7">
							<Link
								to={"/account/my-addresses"}
								className={`dropdown-item ${location?.pathname === "/account/my-addresses" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Addresses </span>{" "}
							</Link>
						</div>
						<div className="mt-3  content-hidden7">
							<Link
								to={"/"}
								className={`dropdown-item ${location?.pathname === "/" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Wallet </span>{" "}
							</Link>
						</div>
						<div className="mt-3  content-hidden7">
							<Link
								to={"/myWishlist"}
								className={`dropdown-item ${location?.pathname === "/myWishlist" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Wishlist </span>{" "}
							</Link>
						</div>
						<div className="mt-3  content-hidden7">
							<Link
								to={"/account"}
								className={`dropdown-item ${location?.pathname === "/account" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>My Account </span>{" "}
							</Link>
						</div>
						<div className="mt-3  content-hidden7">
							<Link
								to={"/"}
								className={`dropdown-item ${location?.pathname === "/" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>Notification </span>{" "}
							</Link>
						</div>
						<div className="mt-3  content-hidden7">
							<Link
								to={"/"}
								className={`dropdown-item ${location?.pathname === "/" ? "account-active" : "account-link"
									} account-link text-underline-none text-dark underline-none`}
							>
								{" "}
								<span>Settings </span>{" "}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileMenu;
