import React, { useEffect, useState } from "react";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setCartUpdate } from "../../redux/users/users";
import { useDispatch, useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Card from "../../components/productComponents/Card";
import Swal from "sweetalert2";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CurrencyConvertComp from "../../components/currencyConvertComp";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [productDetails, setproductDetails] = useState(null);
  const [isWistlist, setIsWishlist] = useState(false);
  const [productId, setProductId] = useState("");
  const [quantity, setQuentity] = useState(1);
  const [flavour, setFlavour] = useState("");
  const [features, setFeatures] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [arrowShow, setArrowShow] = useState(false);
  const { userData } = useSelector((s) => s.user);
  let param = useParams();
  const [delfaultVariant, setDefaultVariant] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [selectedSubImage, setSelectedSubImage] = useState("");
  const [recentProductItem, setRecentProductItem] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 991, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };
  const handleSelectChange = (event) => {
    const selectedPots = event.target.value;

    const selectedVariant = productDetails?.variants?.find((variant) =>
      variant.pots
        ? variant.pots === selectedPots
        : variant.size === selectedPots
    );

    setSelectedValue(selectedPots);
    setSelectedPrice(selectedVariant ? selectedVariant?.price : null);
    setSelectedInventory(selectedVariant ? selectedVariant?.inventory : null);
    setDefaultVariant(selectedVariant);
  };

  const getAllProducts = async () => {
    try {
      const response = await apiGET(
        `/v1/products/getproduct-By-name/${param?.product}`
      );
      if (response?.status === 200) {
        let d = response?.data?.data;
        let recentProduct = localStorage.getItem("recentProduct");
        recentProduct = recentProduct ? JSON.parse(recentProduct) : [];
        const exists = recentProduct.some(
          (product) => product?.name === d?.name
        );
        if (!exists) {
          if (recentProduct.length >= 10) {
            recentProduct.shift();
          }
          recentProduct.push(d);
        }

        localStorage.setItem("recentProduct", JSON.stringify(recentProduct));

        setSubImages(d?.subImages || []);
        setSelectedSubImage(d?.productImageUrl);
        // let f = d.description.match(/<ul>(.*?)<\/ul>/gs)
        // let ds = d.description.match(/<p>(.*?)<\/p>/gs).join("")
        const ulRegex = /<ul>(.*?)<\/ul>/gs; // 's' flag allows the dot (.) to match newline characters

        const ulMatch = d?.description.match(ulRegex);
        let f = ulMatch ? ulMatch[0] : ""; // Extracted content from <ul>

        // Regex pattern for extracting data from all occurrences of <p>
        const pRegex = /<p>(.*?)<\/p>/gs; // 'g' flag for global search

        const pMatches = d?.description.match(pRegex);
        let ds = pMatches ? pMatches.join("") : ""; // Extracted content from all <p>

        if (f.length > 0) setFeatures(f);
        if (ds.length > 0) setDesc(ds);
        setproductDetails(response?.data?.data);
        setProductId(response?.data?.data.id);
        if (d?.variants?.length) {
          setDefaultVariant(d?.variants[0]);
          setSelectedInventory(d?.variants[0]?.inventory);
          setSelectedPrice(d?.variants[0]?.price);
          setSelectedValue(d.variants[0]?.pots || d.variants[0]?.size);
        }
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const [schemaMarkup, setSchemaMarkup] = useState({});
  useEffect(() => {
    if (productDetails?.name?.includes("Pick 'n' Mix")) {
      window.location = `/mix-match/${productDetails?.id}`
    }
    let productReviews = [
      "Good product and available in multiple flavours and strengths.",
      "Pick'n mix are very affordable.",
      "Hugh discount for every product.",
    ];
    if (productDetails) {
      const regex = /&nbsp;- (.*?)<\/strong>/;
      let str = productDetails?.description.toString();
      const match = str.match(regex);

      setSchemaMarkup({
        "@context": "#",
        "@type": "Product",
        name: productDetails?.name,
        image: productDetails?.productImageUrl,
        description: productDetails?.description,
        priceCurrency: "GBP",
        price: productDetails?.price,
        features: productDetails?.features,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            propertyID: "flavor",
            value: productDetails?.flavor,
          },
          {
            "@type": "PropertyValue",
            propertyID: "productType",
            value: productDetails?.productType,
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.8,
          reviewCount: 500,
        },
        reviews: productReviews?.map((review) => ({
          "@type": "Review",
          reviewBody: review,
        })),
        // "brand": {
        //   "@type": "Brand",
        //   "name": productDetails?.brand
        // },
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: productDetails?.price,
          availability:
            productDetails?.inventory > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: productDetails?.name,
          },
        },
        sku: productDetails?.id, // Replace with your actual SKU or product identifier
        weight: {
          "@type": "QuantitativeValue",
          value: productDetails?.weight,
          unitCode: "MG",
        },
        // "category": productDetails?.categoryArray?.[0] || "",  // Replace with your actual product category
        url: `#product-page/${encodeURIComponent(
          productDetails?.name
        )}`, // Replace with the actual product URL
        datePublished: moment().format(productDetails?.createdAt),
        dateModified: moment().format(productDetails?.updatedAt),
      });

      if (productDetails?.variants?.length > 0) {
        setSchemaMarkup((prevSchema) => ({
          ...prevSchema,
          variants: productDetails.variants.map((variant) => ({
            "@type": "Product",
            name: variant.name,
            priceCurrency: "GBP",
            price: variant.price,
            // Add other variant details as needed
          })),
        }));
      }

      if (match) {
        const extractedData = match[1];
        setFlavour(extractedData);
        getYouMayLikeProd(extractedData);
      } else {
        console.log("No match found.");
      }
    }
  }, [productDetails]);

  const [suggestion, setSuggestion] = useState([]);

  const getYouMayLikeProd = async (flavournew) => {
    try {
      const response = await apiGET(
        `/v1/products/getproduct-by-category/${flavournew}`
      );
      if (response?.status === 200) {
        // setproductDetails(response?.data?.data);
        setSuggestion(response.data.data);
        // setProductId(response?.data?.data.id);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const addProductWishlist = async () => {
    let payload = {
      productId: productDetails.id,
    };
    try {
      const response = await apiPOST(`v1/wishlist/add-to-wishlist`, payload);

      if (response?.status) {
        setIsWishlist(true);
        toast.success("Product added in  wishlist successfully");
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };
  const removeProductFromWishlist = async () => {
    let payload = {
      productId: productDetails.id,
    };
    try {
      const response = await apiPOST(`v1/wishlist/delete`, payload);

      if (response?.status === 200) {
        setIsWishlist(false);
        toast.success("Product remove from  wishlist");
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };
  const checkProductWishlist = async () => {
    try {
      const response = await apiGET(
        `v1/wishlist/check-wishlist-product/${productId}`
      );
      if (response?.status === 200) {
        setIsWishlist(response?.data.data.data.isWistlist);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const addToCart = async (product) => {
    if (productDetails?.variants?.length > 0) {
      if (
        selectedInventory?.trim() === "0" ||
        selectedInventory?.trim()?.toLowerCase() === "out of stock"
      ) {
        toast.error("Product is out of stock ");
        return;
      }
    } else {
      if (productDetails?.inventory == 0) {
        toast.error("Product is out of stock ");
        return;
      }
    }
    if (userData) {
      try {
        let payload = {
          productId: product,
          quantity: quantity,
          variants: delfaultVariant,
        };
        const response = await apiPOST("v1/cart/add-to-cart", payload);
        if (response?.status == 200) {
          toast.success("Product added to cart");
        } else {
          toast.error(response?.data?.data);
        }
      } catch (error) {
        return false;
      }
    } else {
      try {
        let payload = {
          productId: product,
          quantity: quantity,
          deviceId: localStorage.getItem("deviceId"),
          variants: delfaultVariant,
        };
        const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
        if (response?.status == 200) {
          toast.success(response?.data?.data?.data?.data);
        } else {
          toast.error(response?.data?.data);
        }
      } catch (error) {
        return false;
      }
    }
  };

  const addToCartAndBuy = async (product) => {
    if (productDetails?.variants?.length > 0) {
      if (
        selectedInventory?.trim() === "0" ||
        selectedInventory.trim().toLowerCase() === "out of stock"
      ) {
        toast.error("Product is out of stock ");
        return;
      }
    } else {
      if (productDetails?.inventory == 0) {
        toast.error("Product is out of stock ");
        return;
      }
    }
    if (userData) {
      try {
        let payload = {
          productId: product,
          quantity: quantity,
          variants: delfaultVariant,
        };
        const response = await apiPOST("v1/cart/add-to-cart", payload);

        if (response?.data?.status) {
          toast.success(response?.data?.data);
          navigate("/checkout");
        } else if (response?.data?.code == 401) {
          toast.error("Please Login to buy now.");
        } else {
          toast.error(response?.data?.data);
        }
      } catch (error) {
        return false;
      }
    } else {
      try {
        let payload = {
          productId: product,
          quantity: quantity,
          deviceId: localStorage.getItem("deviceId"),
          variants: delfaultVariant,
        };

        const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
        if (response?.data?.status == true) {
          toast.success(response?.data?.data);
          navigate("/checkout");
          toast.error(response?.data?.data);
        }
      } catch (error) {
        return false;
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const notifyMe = async (productId) => {
    try {
      let payload = {
        productId: productId,
        email: email,
      };

      if (!isValidEmail(email)) {
        toast.error("Invalid email");
        return;
      }
      const result = await apiPOST("/v1/notify/addNotification", payload);
      setEmail("");
      if (result?.data?.code === 200) {
        setEmail("");
        toast.success("We will notify you when product is available");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    setFeatures("");
    setDesc("");
    getAllProducts();
    let product = localStorage.getItem("recentProduct");
    let recentProduct = JSON.parse(product);
    setRecentProductItem(recentProduct);
  }, [param]);
  useEffect(() => {
    if (productId) {
      checkProductWishlist();
    }
  }, [productId]);
  const handleQuantityChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setQuentity(input);
    }
  };

  return (
    <div className="py-5 d-flex flex-column justify-content-center">
      <script async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="container">
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-center">
          <div className="w-100 d-flex justify-content-start">
            <Link to={"/ "} className="text-dark text-decoration-none">
              Home
            </Link>
            <span className="px-1">/</span>
            <Link to={"/shop "} className="text-dark text-decoration-none">
              Shop
            </Link>
            <span className="px-1">/</span>
            <div
              className="text-dark text-decoration-none"
              style={{ opacity: "50%" }}
            >
              {productDetails?.name}
            </div>
          </div>
          {/* <div className="w-100 d-flex justify-content-end flex-row gap-2 align-items-center">
						<span className="d-flex gap-1 align-items-center cursor-pointer">
							<GrPrevious />
							<span>Prev</span>
						</span>
						<span>|</span>
						<span className="d-flex gap-1 align-items-center cursor-pointer">
							<span>Next</span>
							<GrNext />
						</span>
					</div> */}
        </div>
        <div className="row py-5">
          <div className="col-12 col-sm-6 col-lg-5">
            {subImages?.length > 0 ? (
              <div>
                <div>
                  <img
                    src={selectedSubImage}
                    alt={productDetails?.imageAltText || productDetails?.name}
                    className="w-100 p-5 p-sm-0"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      border: `${selectedSubImage === productDetails?.productImageUrl
                        ? "2px solid #70b5f1"
                        : ""
                        }`,
                      padding: "4px ",
                    }}
                    onClick={() =>
                      setSelectedSubImage(productDetails?.productImageUrl)
                    }
                  >
                    <img
                      src={productDetails?.productImageUrl}
                      alt={productDetails?.imageAltText || productDetails?.name}
                      className="subImages"
                    />
                  </div>
                  {subImages?.map((subImage, index) => (
                    <div
                      style={{
                        border: `${selectedSubImage === subImage
                          ? "2px solid #70b5f1"
                          : ""
                          }`,
                        padding: "4px ",
                      }}
                      onClick={() => setSelectedSubImage(subImage)}
                    >
                      <img src={subImage} alt={index} className="subImages" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <img
                src={productDetails?.productImageUrl}
                alt={productDetails?.imageAltText || productDetails?.name}
                className="w-100 p-5 p-sm-0"
              />
            )}
          </div>
          <div className="col-12 col-sm-6 col-lg-4 p-4">
            <div className="fs-4" style={{ wordBreak: "normal" }}>
              {productDetails?.name}
            </div>
            {productDetails?.originalPrice != productDetails?.price ? (
              <div className="fs-5 mt-4 line-through-text">
                <CurrencyConvertComp amount={productDetails?.originalPrice} />
              </div>
            ) : (
              ""
            )}
            {
              <div
                className={`fs-5 mt-${productDetails?.originalPrice != productDetails?.price
                  ? "1"
                  : "4"
                  }`}
              >
                <CurrencyConvertComp amount={selectedPrice ? selectedPrice?.toFixed(2) : productDetails?.price?.toFixed(2)} />
              </div>
            }
            <div className="mt-3">
              <p style={{ fontSize: "16px" }}>Quantity</p>
              <input
                style={{ width: "100px" }}
                className=" p-2"
                /* type="number" */
                min={1}
                value={quantity}
                onChange={(e) => {
                  handleQuantityChange(e);
                  //setQuentity(e.target.value);
                }}
              />
              <span style={{ position: "relative" }}>
                <span
                  onClick={() => {
                    setQuentity(quantity + 1);
                  }}
                  style={{ position: "absolute", right: "8px" }}
                >
                  <IoIosArrowUp style={{ color: "gray" }} />{" "}
                </span>
                <span
                  onClick={() => {
                    if (quantity > 1) {
                      setQuentity(quantity - 1);
                    }
                  }}
                  style={{ position: "absolute", right: "8px", top: "6px" }}
                >
                  <IoIosArrowDown style={{ color: "gray" }} />
                </span>
              </span>
            </div>
            <div className="my-2">
              {productDetails?.variants?.length > 0
                ? (selectedInventory.trim() === "0" ||
                  selectedInventory?.trim()?.toLowerCase() ==
                  "out of stock") && (
                  <div>
                    <span className="text-danger">Out of stock</span>

                    {/* Notify me feature */}
                    <div
                      className=" gap-2"
                      style={{ display: "flex", padding: "0 0px" }}
                    >
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ border: "1px solid black" }}
                        className="bg-white p-2 col-sm-6 buttonDiv "
                      // onClick={() => {

                      // }}
                      >
                        Notify when available
                      </button>
                      <button
                        onClick={() => {
                          if (isWistlist) {
                            removeProductFromWishlist();
                          } else {
                            addProductWishlist();
                          }
                        }}
                        style={{
                          minWidth: "50px",
                          border: "1px solid black",
                        }}
                        className=" col-sm-2 p-2 bg-white"
                      >
                        {isWistlist ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="_1vD2j _1nQx0"
                            data-hook="wishlist-button-icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M20.9219,8.4561 C20.5569,6.2411 18.8899,4.4871 16.7729,4.0901 C14.9729,3.7521 13.1989,4.3791 11.9999,5.7381 C10.8009,4.3791 9.0259,3.7521 7.2269,4.0901 C5.1099,4.4871 3.4429,6.2411 3.0779,8.4561 C2.9219,9.4021 3.0039,10.3711 3.3159,11.2571 C4.2969,14.3921 9.1369,17.8931 11.1729,19.2541 C11.4249,19.4221 11.7139,19.5061 12.0019,19.5061 C12.2909,19.5061 12.5789,19.4221 12.8309,19.2541 C14.8669,17.8931 19.7109,14.3871 20.6809,11.2661 C20.9959,10.3781 21.0789,9.4061 20.9219,8.4561"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="_1vD2j _2_JeV"
                            data-hook="wishlist-button-icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.1816,5.0039 C7.9276,5.0039 7.6696,5.0279 7.4106,5.0759 C5.7326,5.3909 4.3566,6.8479 4.0646,8.6189 C3.9346,9.4039 4.0036,10.2029 4.2616,10.9319 C4.2636,10.9379 4.2656,10.9439 4.2676,10.9499 C5.1716,13.8579 10.2066,17.4019 11.7286,18.4189 C11.8966,18.5329 12.1076,18.5309 12.2746,18.4189 C13.7956,17.4019 18.8266,13.8589 19.7326,10.9499 C19.9966,10.2029 20.0646,9.4039 19.9356,8.6189 C19.6426,6.8479 18.2666,5.3909 16.5896,5.0759 C14.9596,4.7749 13.3646,5.4459 12.4126,6.8369 C12.2256,7.1099 11.7736,7.1099 11.5876,6.8369 C10.7866,5.6669 9.5276,5.0039 8.1816,5.0039 M12.0016,19.5029 C11.7136,19.5029 11.4246,19.4189 11.1726,19.2509 C9.1366,17.8899 4.2966,14.3869 3.3156,11.2559 C3.0036,10.3719 2.9216,9.4039 3.0776,8.4569 C3.4436,6.2429 5.1106,4.4889 7.2266,4.0939 C9.0226,3.7539 10.8006,4.3809 11.9996,5.7409 C13.1996,4.3829 14.9766,3.7569 16.7736,4.0939 C18.8896,4.4899 20.5566,6.2429 20.9216,8.4569 C21.0786,9.4069 20.9956,10.3789 20.6816,11.2659 C19.7116,14.3819 14.8676,17.8889 12.8306,19.2509 C12.5786,19.4189 12.2896,19.5029 12.0016,19.5029"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )
                : (productDetails?.inventory == 0 ||
                  productDetails?.inventory.toLowerCase() ==
                  "out of stock") && (
                  <div>
                    <span className="text-danger">Out of stock</span>

                    {/* Notify me feature */}
                    <div
                      className=" gap-2"
                      style={{ display: "flex", padding: "0 0px" }}
                    >
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ border: "1px solid black" }}
                        className="bg-white p-2 col-sm-6 buttonDiv "
                      // onClick={() => {

                      // }}
                      >
                        Notify when available
                      </button>
                      <button
                        onClick={() => {
                          if (isWistlist) {
                            removeProductFromWishlist();
                          } else {
                            addProductWishlist();
                          }
                        }}
                        style={{
                          minWidth: "50px",
                          border: "1px solid black",
                        }}
                        className=" col-sm-2 p-2 bg-white"
                      >
                        {isWistlist ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="_1vD2j _1nQx0"
                            data-hook="wishlist-button-icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M20.9219,8.4561 C20.5569,6.2411 18.8899,4.4871 16.7729,4.0901 C14.9729,3.7521 13.1989,4.3791 11.9999,5.7381 C10.8009,4.3791 9.0259,3.7521 7.2269,4.0901 C5.1099,4.4871 3.4429,6.2411 3.0779,8.4561 C2.9219,9.4021 3.0039,10.3711 3.3159,11.2571 C4.2969,14.3921 9.1369,17.8931 11.1729,19.2541 C11.4249,19.4221 11.7139,19.5061 12.0019,19.5061 C12.2909,19.5061 12.5789,19.4221 12.8309,19.2541 C14.8669,17.8931 19.7109,14.3871 20.6809,11.2661 C20.9959,10.3781 21.0789,9.4061 20.9219,8.4561"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="_1vD2j _2_JeV"
                            data-hook="wishlist-button-icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.1816,5.0039 C7.9276,5.0039 7.6696,5.0279 7.4106,5.0759 C5.7326,5.3909 4.3566,6.8479 4.0646,8.6189 C3.9346,9.4039 4.0036,10.2029 4.2616,10.9319 C4.2636,10.9379 4.2656,10.9439 4.2676,10.9499 C5.1716,13.8579 10.2066,17.4019 11.7286,18.4189 C11.8966,18.5329 12.1076,18.5309 12.2746,18.4189 C13.7956,17.4019 18.8266,13.8589 19.7326,10.9499 C19.9966,10.2029 20.0646,9.4039 19.9356,8.6189 C19.6426,6.8479 18.2666,5.3909 16.5896,5.0759 C14.9596,4.7749 13.3646,5.4459 12.4126,6.8369 C12.2256,7.1099 11.7736,7.1099 11.5876,6.8369 C10.7866,5.6669 9.5276,5.0039 8.1816,5.0039 M12.0016,19.5029 C11.7136,19.5029 11.4246,19.4189 11.1726,19.2509 C9.1366,17.8899 4.2966,14.3869 3.3156,11.2559 C3.0036,10.3719 2.9216,9.4039 3.0776,8.4569 C3.4436,6.2429 5.1106,4.4889 7.2266,4.0939 C9.0226,3.7539 10.8006,4.3809 11.9996,5.7409 C13.1996,4.3829 14.9766,3.7569 16.7736,4.0939 C18.8896,4.4899 20.5566,6.2429 20.9216,8.4569 C21.0786,9.4069 20.9956,10.3789 20.6816,11.2659 C19.7116,14.3819 14.8676,17.8889 12.8306,19.2509 C12.5786,19.4189 12.2896,19.5029 12.0016,19.5029"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              {/* Notify email modal */}

              <div
                class="modal fade "
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title fs-5"
                        id="staticBackdropLabel"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        Notify when available
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div style={{ textAlign: "center" }}>
                        Enter your email address and you’ll be notified when
                      </div>
                      <div style={{ textAlign: "center" }}>
                        {" "}
                        this product is back in stock
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "20px",
                        }}
                      >
                        <input
                          placeholder="Enter your email"
                          type="email"
                          style={{ width: "350px", padding: "8px 12px" }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          onClick={() => notifyMe(productDetails?.id)}
                          type="button"
                          class=""
                          data-bs-dismiss="modal"
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    {/* <div class="modal-footer">
											<button type="button" class="btn btn-secondary" >Close</button>
											<button type="button" class="btn btn-primary">Understood</button>
										</div> */}
                  </div>
                </div>
              </div>

              {selectedInventory
                ? selectedInventory >= 1 &&
                selectedInventory <= 10 && (
                  <span className="text-success">
                    Only {selectedInventory} items left in stock
                  </span>
                )
                : productDetails?.inventory >= 1 &&
                productDetails?.inventory <= 10 && (
                  <span className="text-success">
                    Only {productDetails?.inventory} items left in stock
                  </span>
                )}
            </div>

            {productDetails?.variants?.length > 0 ? (
              <div className="col-sm-8">
                <select
                  className="form-select form-select-lg mb-2"
                  aria-label="Large select example"
                  style={{ borderRadius: "0", border: "1px solid black" }}
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  {productDetails?.variants?.map((variant, index) =>
                    variant?.pots.length > 0 ? (
                      <option
                        key={index}
                        value={variant?.pots}
                        style={{ padding: "8px" }}
                      >
                        {variant?.pots}
                      </option>
                    ) : (
                      <option
                        key={index}
                        value={variant?.size}
                        style={{ padding: "8px" }}
                      >
                        {variant?.size}
                      </option>
                    )
                  )}
                </select>
              </div>
            ) : (
              <div></div>
            )}

            {productDetails?.variants?.length > 0
              ? (selectedInventory > 0 ||
                selectedInventory.trim().toLowerCase() == "instock") && (
                <div
                  className=" gap-2"
                  style={{ display: "flex", padding: "0 0px" }}
                >
                  <button
                    style={{ border: "1px solid black" }}
                    className="bg-white p-2 col-sm-6 buttonDiv"
                    onClick={() => {
                      addToCart(productDetails?.id);
                    }}
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => {
                      if (isWistlist) {
                        removeProductFromWishlist();
                      } else {
                        addProductWishlist();
                      }
                    }}
                    style={{ minWidth: "50px", border: "1px solid black" }}
                    className=" col-sm-2 p-2 bg-white"
                  >
                    {isWistlist ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                        class="_1vD2j _1nQx0"
                        data-hook="wishlist-button-icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M20.9219,8.4561 C20.5569,6.2411 18.8899,4.4871 16.7729,4.0901 C14.9729,3.7521 13.1989,4.3791 11.9999,5.7381 C10.8009,4.3791 9.0259,3.7521 7.2269,4.0901 C5.1099,4.4871 3.4429,6.2411 3.0779,8.4561 C2.9219,9.4021 3.0039,10.3711 3.3159,11.2571 C4.2969,14.3921 9.1369,17.8931 11.1729,19.2541 C11.4249,19.4221 11.7139,19.5061 12.0019,19.5061 C12.2909,19.5061 12.5789,19.4221 12.8309,19.2541 C14.8669,17.8931 19.7109,14.3871 20.6809,11.2661 C20.9959,10.3781 21.0789,9.4061 20.9219,8.4561"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                        class="_1vD2j _2_JeV"
                        data-hook="wishlist-button-icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.1816,5.0039 C7.9276,5.0039 7.6696,5.0279 7.4106,5.0759 C5.7326,5.3909 4.3566,6.8479 4.0646,8.6189 C3.9346,9.4039 4.0036,10.2029 4.2616,10.9319 C4.2636,10.9379 4.2656,10.9439 4.2676,10.9499 C5.1716,13.8579 10.2066,17.4019 11.7286,18.4189 C11.8966,18.5329 12.1076,18.5309 12.2746,18.4189 C13.7956,17.4019 18.8266,13.8589 19.7326,10.9499 C19.9966,10.2029 20.0646,9.4039 19.9356,8.6189 C19.6426,6.8479 18.2666,5.3909 16.5896,5.0759 C14.9596,4.7749 13.3646,5.4459 12.4126,6.8369 C12.2256,7.1099 11.7736,7.1099 11.5876,6.8369 C10.7866,5.6669 9.5276,5.0039 8.1816,5.0039 M12.0016,19.5029 C11.7136,19.5029 11.4246,19.4189 11.1726,19.2509 C9.1366,17.8899 4.2966,14.3869 3.3156,11.2559 C3.0036,10.3719 2.9216,9.4039 3.0776,8.4569 C3.4436,6.2429 5.1106,4.4889 7.2266,4.0939 C9.0226,3.7539 10.8006,4.3809 11.9996,5.7409 C13.1996,4.3829 14.9766,3.7569 16.7736,4.0939 C18.8896,4.4899 20.5566,6.2429 20.9216,8.4569 C21.0786,9.4069 20.9956,10.3789 20.6816,11.2659 C19.7116,14.3819 14.8676,17.8889 12.8306,19.2509 C12.5786,19.4189 12.2896,19.5029 12.0016,19.5029"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              )
              : (productDetails?.inventory > 0 ||
                productDetails?.inventory.toLowerCase() == "instock") && (
                <div
                  className=" gap-2"
                  style={{ display: "flex", padding: "0 0px" }}
                >
                  <button
                    style={{ border: "1px solid black" }}
                    className="bg-white p-2 col-sm-6 buttonDiv"
                    onClick={() => {
                      addToCart(productDetails?.id);
                    }}
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => {
                      if (isWistlist) {
                        removeProductFromWishlist();
                      } else {
                        addProductWishlist();
                      }
                    }}
                    style={{ minWidth: "50px", border: "1px solid black" }}
                    className=" col-sm-2 p-2 bg-white"
                  >
                    {isWistlist ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                        class="_1vD2j _1nQx0"
                        data-hook="wishlist-button-icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M20.9219,8.4561 C20.5569,6.2411 18.8899,4.4871 16.7729,4.0901 C14.9729,3.7521 13.1989,4.3791 11.9999,5.7381 C10.8009,4.3791 9.0259,3.7521 7.2269,4.0901 C5.1099,4.4871 3.4429,6.2411 3.0779,8.4561 C2.9219,9.4021 3.0039,10.3711 3.3159,11.2571 C4.2969,14.3921 9.1369,17.8931 11.1729,19.2541 C11.4249,19.4221 11.7139,19.5061 12.0019,19.5061 C12.2909,19.5061 12.5789,19.4221 12.8309,19.2541 C14.8669,17.8931 19.7109,14.3871 20.6809,11.2661 C20.9959,10.3781 21.0789,9.4061 20.9219,8.4561"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                        class="_1vD2j _2_JeV"
                        data-hook="wishlist-button-icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.1816,5.0039 C7.9276,5.0039 7.6696,5.0279 7.4106,5.0759 C5.7326,5.3909 4.3566,6.8479 4.0646,8.6189 C3.9346,9.4039 4.0036,10.2029 4.2616,10.9319 C4.2636,10.9379 4.2656,10.9439 4.2676,10.9499 C5.1716,13.8579 10.2066,17.4019 11.7286,18.4189 C11.8966,18.5329 12.1076,18.5309 12.2746,18.4189 C13.7956,17.4019 18.8266,13.8589 19.7326,10.9499 C19.9966,10.2029 20.0646,9.4039 19.9356,8.6189 C19.6426,6.8479 18.2666,5.3909 16.5896,5.0759 C14.9596,4.7749 13.3646,5.4459 12.4126,6.8369 C12.2256,7.1099 11.7736,7.1099 11.5876,6.8369 C10.7866,5.6669 9.5276,5.0039 8.1816,5.0039 M12.0016,19.5029 C11.7136,19.5029 11.4246,19.4189 11.1726,19.2509 C9.1366,17.8899 4.2966,14.3869 3.3156,11.2559 C3.0036,10.3719 2.9216,9.4039 3.0776,8.4569 C3.4436,6.2429 5.1106,4.4889 7.2266,4.0939 C9.0226,3.7539 10.8006,4.3809 11.9996,5.7409 C13.1996,4.3829 14.9766,3.7569 16.7736,4.0939 C18.8896,4.4899 20.5566,6.2429 20.9216,8.4569 C21.0786,9.4069 20.9956,10.3789 20.6816,11.2659 C19.7116,14.3819 14.8676,17.8889 12.8306,19.2509 C12.5786,19.4189 12.2896,19.5029 12.0016,19.5029"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              )}
            {productDetails?.variants?.length > 0
              ? (selectedInventory > 0 ||
                selectedInventory.trim().toLowerCase() == "instock") && (
                <div className="row" style={{ padding: "0 11px" }}>
                  <button
                    onClick={() => {
                      addToCartAndBuy(productDetails?.id);
                    }}
                    style={{ minWidth: "232px", color: "white" }}
                    className="bg-black col-sm-8  mt-2 p-2 border-0"
                  >
                    {" "}
                    Buy Now
                  </button>
                </div>
              )
              : (productDetails?.inventory > 0 ||
                productDetails?.inventory.toLowerCase() == "instock") && (
                <div className="row" style={{ padding: "0 11px" }}>
                  <button
                    onClick={() => {
                      addToCartAndBuy(productDetails?.id);
                    }}
                    style={{ minWidth: "232px", color: "white" }}
                    className="bg-black col-sm-8  mt-2 p-2 border-0"
                  >
                    {" "}
                    Buy Now
                  </button>
                </div>
              )}
          </div>
          <div className="d-none d-lg-block col-3 p-4 px-0 py-0">
            {productDetails?.features
              ? ReactHtmlParser(productDetails.features)
              : features != ""
                ? ReactHtmlParser(features)
                : ""}
          </div>
        </div>
        <div>
          <div className="d-block d-lg-none">
            {productDetails?.features
              ? ReactHtmlParser(productDetails.features)
              : features != ""
                ? ReactHtmlParser(features)
                : ""}
          </div>
          {desc.length > 0 && desc !== null ? ReactHtmlParser(desc) : ""}
          {/* {productDetails?.description ?
						ReactHtmlParser(productDetails.description)
						: ""
					} */}
        </div>

        <div>
          {recentProductItem?.length > 0 ? (
            <div className="fs-4 avenir-semibold mt-5">
              Recently visited products
              {/* Last 10 Visited Product */}
            </div>
          ) : (
            ""
          )}

          {recentProductItem?.length > 0 ? (
            <div className="container" style={{ marginTop: "4rem" }}>
              <div className="featured-carousel row">
                {/* Conditionally render the carousel for screens 1024px and above */}
                {window.innerWidth >= 0 &&
                  (console.log(window.innerWidth),
                    (
                      <Carousel responsive={responsive}
                        autoPlay={true}
                        arrows={true}
                        infinite
                        showDots={false}
                        stopOnHover={true}
                        swipeable={true}
                        keyBoardControl={true}
                        autoPlaySpeed={3000}
                        className="w-100"
                      >
                        {recentProductItem?.map((item, index) => (
                          <Card productDetail={item} />
                        ))}
                      </Carousel>
                    ))}
              </div>
              {/*   <div className="featureRow d-flex d-lg-none row">
             
                      {recentProductItem?.map((item, index) => (
                         <div  className="col-6 col-md-4 col-xl-4 " style={{}}>
                        <Card productDetail={item} />
                        </div>
                      ))}
            
              </div> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
