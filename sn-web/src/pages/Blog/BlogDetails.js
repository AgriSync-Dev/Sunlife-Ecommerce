import React, { useEffect, useState } from "react";
import { ImLink } from "react-icons/im";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { apiGET, apiPUT } from "../../utilities/apiHelpers";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BlogDetails = () => {
	const [singleBlogs, setSingleBlogs] = useState(null);
	const { userData = null } = useSelector((state) => state.user);
	const { title } = useParams();
	const [blogsLoading, setBlogsLoading] = useState(true);
	const [metaDescription, setMetaDescription] = useState("");

	const getBlogbyTitle = async () => {
		try {
			const response = await apiGET(`/v1/blog/get-blog-by-title/${title}`);
			setBlogsLoading(false);
			if (response?.status === 200) {
				setSingleBlogs(response?.data?.data?.data[0]);
				setMetaDescription(response?.data?.data?.data[0].metaDescription);
			}
		} catch (e) {
			setBlogsLoading(false);
			console.log("Error to fetch blog", e);
		}
	};

	const updateBlogViews = async () => {
		try {
			const response = await apiPUT(`/v1/blog/update-blog-views/${singleBlogs?._id}`);
			if (response?.status === 200) {
				getBlogbyTitle();
			}
		} catch (e) {
			console.log("Error to fetch blog", e);
		}
	};

	useEffect(() => {
		getBlogbyTitle();
	}, []);

	let handleLikes = async (id) => {
		try {
			let url;

			let payload = {
				id: id,
			};
			url = `/v1/blog/handle-like/${id}`;
			let response = await apiPUT(url, payload);
			if (response.status === 200) {
				getBlogbyTitle();
			} else if (response.status === 400) {
				Swal.fire({
					title: "Error!",
					text: response?.data?.data,
					icon: "error",
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: response?.data?.data,
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: error,
				icon: "error",
			});
		}
	};

	useEffect(() => {
		if (singleBlogs !== null) updateBlogViews();
	}, [singleBlogs]);

	return (
		<>
			<div>
				<Helmet>
					<meta name="description" content={metaDescription || ""} />
				</Helmet>
			</div>
			<div className="container-fluid col-11 col-sm-10 my-5">
				<div
					className="d-flex justify-content-center align-items-center flex-column"
					style={{ minHeight: "calc(100vh - 450px)" }}
				>
					{blogsLoading ? (
						<>
							<div class="spinner-border text-primary" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
							<div className="mt-2 fs-5 fw-bold">Loading Blog...</div>
						</>
					) : (
						<div className="w-100">
							<Link className="fs-4 fw-bold text-decoration-none text-dark" to={"/blog"}>
								Return to all blogs
							</Link>
							{singleBlogs != null ? (
								<div
									style={{
										boxShadow:
											"-2px -2px 2px rgba(0,0,0, 0.2), 2px 2px 2px rgba(0,0,0, 0.2), 2px 2px 2px rgba(0,0,0, 0.2)",
									}}
									className=" d-flex flex-column justify-content-center mt-4 rounded p-2"
								>
									<img
										effect="blur"
										alt="bannerBlog"
										src={singleBlogs.img}
										// style={{ width: "84%" }}
										className=" img-fluid rounded"
									/>
									<div className="mt-4 px-3 px-sm-4 px-lg-5">
										<div className="d-flex" style={{ gap: "12px" }}>
											<img
												src={
													"https://thesnuslife-asset.s3.amazonaws.com/1704687980121_snuslife-author.jpeg"
												}
												alt="author"
												style={{ width: "50px", height: "50px", borderRadius: "100%" }}
											/>
											<div>
												<div className="fs-6 fw-semibold">{singleBlogs?.authorName}</div>
												<div>
													{singleBlogs?.createdAt &&
														moment(singleBlogs.createdAt).format("llll")}
												</div>
											</div>
										</div>
										<div className="anton blog-title mt-3 mb-1">{singleBlogs?.title}</div>

										<hr className="border border-dark" style={{ height: "2px" }} />

										<div
											className="mt-3 img-blog"
											style={{ whiteSpace: "pre-line" }}
											dangerouslySetInnerHTML={{ __html: singleBlogs?.description }}
										></div>

										{singleBlogs?.socialLink?.length ? (
											<>
												<hr className="border border-secondary" style={{ height: "2px" }} />
												<div className="d-flex gap-3">
													<FaFacebookF />
													<FaTwitter />
													<FaLinkedinIn />
													<ImLink />
												</div>
											</>
										) : (
											""
										)}

										<hr className="border border-secondary" style={{ height: "2px" }} />

										<div className="d-flex justify-content-between w-100 align-items-center">
											<div className="d-flex gap-3">
												{/* <span>{singleBlogs?.comments?.length || 0} Comments</span> */}
												<span>{singleBlogs?.views?.length || 0} Views</span>
											</div>
											<div className="d-flex align-items-center" style={{ gap: "8px" }}>
												<span>{singleBlogs?.likesBy?.length || 0}</span>
												{singleBlogs.likesBy.includes(userData?.id) ? (
													<span
														style={{ cursor: "pointer" }}
														onClick={() => {
															handleLikes(singleBlogs._id);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="25"
															viewBox="0 0 19 19"
															role="img"
														>
															<path
																d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774 Z"
																fill="red"
															></path>
														</svg>
													</span>
												) : (
													<span
														style={{ cursor: "pointer" }}
														onClick={() => {
															handleLikes(singleBlogs._id);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="25"
															viewBox="0 0 19 19"
															role="img"
														>
															<path
																d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774"
																stroke="red" // Border color
																fill="rgba(0, 0, 0, 0)" // Transparent inner part
															/>
														</svg>
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default BlogDetails;
