import React, { useEffect, useState } from "react";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { FaMinus } from "react-icons/fa6";
import MultiRangeSlider from "../../components/productComponents/multiRangeSlider";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import MixMatchCard from "../../components/productComponents/MixMatchCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCartUpdate } from "../../redux/users/users";
import { max } from "moment/moment";
import { WEB_URL } from "../../config";
import CurrencyConvertComp from "../../components/currencyConvertComp";

const MixMatchProduct = () => {
  const [details, setDetails] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 720) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
}

// create an event listener
useEffect(() => {
  window.addEventListener("resize", handleResize)
})
  const dispatch = useDispatch();

  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [mixMatchProductArray, setMixMatchProductArray] = useState([]);
  const [maxPrice, setmaxPrice] = useState(100);
  const [minPrice, setminPrice] = useState(0);
  const [sliderMinValue, setSliderMinValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(100);
  const [catogry, setcatogry] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };
  const togglePrice = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  const { userData } = useSelector((s) => s.user);

  const getPackageDeatils = async (id) => {
    try {
      const response = await apiGET(`/v1/products/getproductbyid/${id}`);

    

      if (response?.status == 200) {
     
        setDetails(response.data.data);

        let myArray = [];

        // Adding five empty elements to the array
        for (let i = 0; i < parseInt(response.data.data.pots); i++) {
          myArray.push({}); // You can use null or any other value as needed
        }
        setNewArray(myArray);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
    
      getPackageDeatils(params?.id);
    }
  
  }, [params]);

  const addToCartBulk = async (product) => {
    let arr = [];
    const filteredData = newArray.filter(
      (value, index, self) =>
        self.findIndex((v) => v._id === value._id) === index
    );
   
    for (let i = 0; i < filteredData.length; i++) {
      arr.push({
        productId: filteredData[i]._id,
        quantity: newArray.filter((e) => e._id == filteredData[i]._id).length,
        productDetailsObj: filteredData[i],
      });
    }

  
    let obj = {
      mainProduct: {
        productId: details?._id,
        quantity: 1,
        productDetailsObj: details,
      },
      subProduct: arr,
    };

   
    if (userData != null) {
     
      try {
        let payload = { productId: details?._id, productDetail: obj };
        const response = await apiPOST("v1/cart/mix-add-to-cart", payload);
        if (response?.data?.status) {
          toast.success("Product Added To Cart Successfully.")
        } else {
          toast.error(response?.data?.data);
        }
      } catch (error) {
        return false;
      }
    } else {
      try {
        let payload = {
          productId: details?._id,
          deviceId: localStorage.getItem("deviceId"),
          productDetail: obj,
        };

       
        const response = await apiPOST(
          "v1/cart/nouser-mix-add-to-cart",
          payload
        );
      
        if (response?.data?.status == true) {       
          toast.success(response?.data?.data?.message);
        } else {
          toast.error(response?.data?.data?.msg);
        }
      } catch (error) {
        return false;
      }
    }
  };

  const checProductAvaialbilty = async (item) => {


    if((details?.name.includes("Premium"))){
      
      if(item?.disabledPremiumPickNMix){
        toast.error("This product cannot be added at the moment."); 
        return
      }
    }
    else{
      
      if(item?.disabledStandardPickNMix){
        toast.error("This product cannot be added at the moment.");
        return
      }
    }
        
       
    let emptyObjectIndex = newArray.findIndex(
      (e) => Object.keys(e).length === 0
    );

    if (emptyObjectIndex !== -1) {
     
      let temp = [...newArray];
      temp[emptyObjectIndex] = item;
      setNewArray(temp);
      toast.success("Product added.");
    } else {
      toast.error(`${details?.pots} items already added.`);
 
    }
    // } else {
    //   toast.error(response?.data?.data?.msg);
    // }
  };

  const handleDivClick = (index) => {
    // Create a copy of the array without the clicked item
    const updatedArray = newArray.filter((_, i) => i !== index);
    setMixMatchProductArray(updatedArray);
  };

  const getAllProducts = async (sortByPrice, sort) => {
    try {
      const response = await apiGET(
        `/v1/products/get-all-products?filter[query]={search:${search},brand:${brand}}&sort[${sort || "name"
        }]=${sortByPrice || 1
        }&page=${page}&minPrice=${minPrice}&maxPrice=${parseFloat(
          details?.perpotprice
        )}`
      );
      setTotalPages(response?.data?.data?.totalPages);
      if (response?.status === 200) {
     
        setProducts(response?.data?.data?.data);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const getAllBrandNames = async () => {
    try {
      const response = await apiGET(`v1/category/get-category`);
      if (response?.status === 200) {
        setcatogry(response?.data?.data);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  // const newArray =  mixMatchProductArray

  const handleOnChange = (e) => {
    /* setBrand(""); */
    setminPrice(e.min);
    setmaxPrice(e.max);
  };
  const handlebybrand1 = (item) => {
    
    if (item === "All") setBrand("");
    else setBrand(item);
  };
  const handleclearfilter = () => {
    setCategoryOpen(true);
    setIsPriceOpen(false);
    setBrand("");
    // setminPrice(0);
    // setmaxPrice(100);
    setSliderMaxValue(100);
    setSliderMinValue(0);
  };

  useEffect(() => {
    getAllProducts();
    getAllBrandNames();

  }, [maxPrice, minPrice, page, brand, search]);

  useEffect(() => {
    if (details) {
     
      setminPrice(0);
      setmaxPrice(
        parseFloat(parseInt(details?.price) / parseInt(details?.pots))
      );
    }
  }, [details]);

  //   const emptyDivs = Array.from(
  //     { length: Math.max(10 - newArray.length, 0) },
  //     (_, index) => (
  //       <div
  //         key={`empty-${index}`}
  //         className={`border mixmatchCard`}
  //         style={{ width: "200px", height: "200px" }}
  //       ></div>
  //     )
  //   );

  const cardArray = Array.from({ length: 16 }, (v, i) => i);
  return (
    <div className="main-container  ">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="container d-flex   text-left p-4">
        <p style={{ fontWeight: "bold", fontSize: 25 }}>
          {details?.name}  - <CurrencyConvertComp amount={details?.price} />
        </p>

        <button
          style={{
            minWidth: "100px",
            color: "white",
            marginLeft: "12%",
            border: "1px solid black",
          }}
          className="p-2 gap-2 bg-black"
          onClick={() => {
            window.location.href = `${WEB_URL}/shop`
          }}
        >
          Back
        </button>


      </div>
      <div className="container ">
        <div >

          <div  className="gap-3 gap-sm-3 gap-lg-4  d-flex justify-content-center   row">

            {newArray.map((item, index) => (
              <div
                key={index}
            
                className={`border  col-5 col-sm-3 col-lg-2  mixmatchCard ${hoveredIndex === index ? "bg-light" : ""
                  } `}
                style={{
                  backgroundColor: "#f5f5f5",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  if (Object.keys(item).length > 0) {
                    let filterremove = newArray.filter(
                      (e, i) => i != index && e != null
                    );

                    let temp = filterremove;
                    temp.push({});
                    setNewArray(temp);
                  }
                }}
              >
                <div >
                  <img className="w-100" src={item?.productImageUrl} alt="" />
                  {hoveredIndex === index && (
                    <FaMinus style={{ backgroundColor: "red", marginTop: "10%" }} className="plusIcon  fw-bold bg-dark  bg-opacity-50 rounded-5 " />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div style={{ display: "flex", justifyContent:"center" }}>
        <button
          style={{
            minWidth: "60px",
            color: "white",
            border: "1px solid black",
            marginTop:"10%"
          }}
          className="p-2 gap-2 bg-black"
          onClick={() => {
            let checkallAdded = newArray.filter(
              (e) => Object.keys(e).length == 0
            );
            if (checkallAdded.length > 0) {
              toast.error(`For ${details?.name} add ${details.pots} products`);
            } else {
              setHoveredIndex(null)
              addToCartBulk(details?._id);
            }
          }}
        >
          Add To Cart
        </button>
      </div>
      <div className=" container d-flex   p-4 ">
        <div className="  ">
          <p>Descritption : </p>
          <div dangerouslySetInnerHTML={{ __html: details?.description }}></div>
        </div>
      </div>
      {isMobile?
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} className="py-2">
      <input
        value={search}
         onChange={(e) => setSearch(e?.target?.value)}
          placeholder="Search Product"
          style={{  width: "75%",alignSelf:"center", border:"2px solid black" }}
        />
     
         </div>
         :null}
      
     
      <div className=" container p-0 d-flex">
        
        <div className="mt-2 d-none d-md-block" style={{ minWidth: "250px" }}>
          <div className="  p-3   " style={{ width: "100%" }}>
            <div
              className="pt-0 fs-3  pb-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div>Filter By</div>
            </div>

            {/* category */}
            <div
              className=" py-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div class="d-flex justify-content-between  ">
                <div className="d-flex pt-1 align-items-center`">Category</div>
                <button
                  data-bs-toggle="collapse"
                  data-bs-target="#categoryDropdown"
                  onClick={toggleCategory}
                  className="btn p-0 "
                >
                  <span className="text-lg">{isCategoryOpen ? "-" : "+"}</span>
                </button>
              </div>
              <div
                className={`${isCategoryOpen ? "show" : "collapse"}`}
                id="categoryDropdown"
              >
                <div
                  style={{ cursor: "pointer" }}
                  className={`${brand == "All" || brand == "" ? "avenir-medium" : "avenir"
                    } thumbnail`}
                  onClick={() => setBrand("")}
                >
                  {" "}
                  ALL{" "}
                </div>
                {catogry.map((item) => {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
                      className={` ${item?.brand === brand ? "avenir-medium" : "avenir"
                        } thumbnail`}
                      onClick={() => handlebybrand1(item?._id)}
                    >
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price */}

            <div
              className=" py-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div class="d-flex justify-content-between  ">
                <div className="d-flex pt-1 align-items-center`">Price</div>
                <button
                  data-bs-toggle="collapse"
                  data-bs-target="#priceDropdown"
                  onClick={togglePrice}
                  className="btn p-0 "
                >
                  <span className="text-lg">{isPriceOpen ? "-" : "+"}</span>
                </button>
              </div>
              <div className={`collapse my-4 `} id="priceDropdown">
                <div
                  className=" d-flex justify-content-center "
                  style={{ minWidth: "100%" }}
                >
                  <MultiRangeSlider
                    min={sliderMinValue}
                    max={sliderMaxValue}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className=" py-4 cursor-pointer">
              <div onClick={() => handleclearfilter()}>
                {" "}
                <span /* style={{cursor:'pointer'}} */>
                  Clear Filter x
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0  ">
          <div className="d-none d-md-block"></div>
          <div className="container">
            <div className="row ">
              {products.length > 0
                ? products.map((item, index) => (
                  <div
                    key={index}
                    className="col-6 col-lg-4 col-xl-3 "
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                    
                      if(parseInt(item?.inventory)>0){
                     checProductAvaialbilty(item);
                      }
                    }}
                  >
                    <MixMatchCard
                      productDetail={item}
                      showPlusIcon={hoveredItem === index}
                    />
                  </div>
                ))
                : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center align-items-center">
        {page > 1 && (
          <div
            className="page-indicator cursor-pointer"
            onClick={() => setPage(page - 1)}
            style={{ marginRight: "15px" }}
          >
            <FcPrevious />
          </div>
        )}

        <div aria-label="Page navigation example" style={{ marginTop: 20 }}>
          <ul className="pagination">
            {page === 1 && (
              <li className="page-item">
                <span
                  className="page-link font-weight-bold cursor-pointer"
                  onClick={() => setPage(1)}
                  style={{ background: "#f5f5f5" }}
                >
                  1
                </span>
              </li>
            )}

            {page !== 1 && (
              <li className="page-item">
                <span
                  className="page-link cursor-pointer"
                  onClick={() => setPage(page - 1)}
                >
                  {page - 1}
                </span>
              </li>
            )}

            {page !== 1 && (
              <li className="page-item">
                <span
                  className="page-link cursor-pointer"
                  onClick={() => setPage(page)}
                  style={{ background: "#f5f5f5" }}
                >
                  {page}
                </span>
              </li>
            )}
            {page !== totalPages && (
              <li className="page-item">
                <span
                  className="page-link cursor-pointer"
                  onClick={() => setPage(page + 1)}
                >
                  {page + 1}
                </span>
              </li>
            )}
            {/* {page !== totalPages && (
              <li className="page-item">
                <span className="page-link" onClick={() => setPage(totalPages)} >{totalPages}</span>
              </li>
            )} */}
          </ul>
        </div>

        {page < totalPages && (
          <div
            className="page-indicator cursor-pointer"
            onClick={() => setPage(page + 1)}
            style={{ marginLeft: "15px" }}
          >
            <FcNext />
          </div>
        )}
      </div>
    </div>
  );
};

export default MixMatchProduct;
