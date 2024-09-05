import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { MdClear } from "react-icons/md";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { LuFilter } from "react-icons/lu";
import { BiSortAlt2 } from "react-icons/bi";

import Card from "../../components/productComponents/Card";
import MultiRangeSlider from "../../components/productComponents/multiRangeSlider";
import { apiGET } from "../../utilities/apiHelpers";
import ProductModalFilter from "./ProductsPageFilterModal";
import { Helmet } from "react-helmet";
const Sort = () => {
  return <span className=" mr-2" style={{color:'gray'}}> SORT BY </span>;
};
const Filter = () => {
  return <span className=" mr-2"> Filter {"  "}</span>;
};
const ProductPage = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isFlavourOpen, setFlavourOpen] = useState(false);
  const [isProudcutTypeOpen, setProudcutTypeOpen] = useState(false);
  const [isPotsOpen, setPotsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [flavourName, setFlavourName] = useState("");
  const [productType, setProductType] = useState("");
  const [productTypeName, setProductTypeName] = useState("");
  const [pots, setPots] = useState([]);
  const [numberOfPots, setNumberOfPots] = useState("");
  const [strength,setStrength]=useState('');
  const [sortproduct,setsortproduct]=useState({sortby:"_id",sortbyvalue:-1});

  const [maxPrice, setmaxPrice] = useState(50);
  const [minPrice, setminPrice] = useState(0);
  const [sliderMinValue, setSliderMinValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(50);
  const [catogry, setcatogry] = useState([]);
  const [flavour, setFlavour] = useState([]);
  const [defaultClearValue, setDefaultClearValue] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };
  const toggleFlavour = () => {
    setFlavourOpen(!isFlavourOpen);
  };
  const toggleProductType = () => {
    setProudcutTypeOpen(!isProudcutTypeOpen);
  };
  const togglePots = () => {
    setPotsOpen(!isPotsOpen);
  };
  const togglePrice = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  const getsortproduct = async ()=>{
    try{
      const response = await apiGET(
        `/v1/product-sort/get`
      )
      if(response?.data?.code){
        setsortproduct(response?.data?.data?.data)
      }
    
    }catch(error){
      console.error("Error fetching collection data:", error);

    }
  }

  const getAllProducts = async (sortByPrice, sort) => {
    try {
      let brandId= localStorage.getItem('brandId')
      const response = await apiGET(
        `/v1/products/get-all-products?filter[query]={search:${search},brand:${brandId || brand},pots:${numberOfPots},productType:${productTypeName},strength:${strength},flavor:${flavourName}}&sort[${sort || sortproduct?.sortby
        }]=${sortByPrice || sortproduct?.sortbyvalue}&page=${page}&minPrice=${minPrice || 0
        }&maxPrice=${parseFloat(maxPrice) || 100}`
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
      //  console.log(response?.data?.data);
        setcatogry(response?.data?.data);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const getAllFlavourNames = async () => {
    try {
      const response = await apiGET(`v1/products/getallflavour-name`);
      if (response?.status === 200) {
        // console.log("gaffar flavour", response?.data?.data);
        setFlavour(response?.data?.data?.data);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };
  const getPots = async () => {
    try {
      const response = await apiGET(`v1/products/get-number-of-pots`);
      if (response?.status === 200) {
        // console.log("gaffar Pots", response?.data?.data?.data);
        setPots(response?.data?.data?.data);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };
  const getAllProductType = async () => {
    try {
      const response = await apiGET(`v1/products/get-all-product-type`);
      if (response?.status === 200) {
        // console.log("gaffar Pots", response?.data?.data?.data);
        setProductType(response?.data?.data?.data);
      } else {
        console.error("Error fetching collection data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const pageNumbers = [...Array(totalPages).keys()]?.map((page) => page + 1);

  const handleChangefilter = (number) => {
 
    let sortByPrice,sortByStrength;
    let sort;

    if (number == 1) {
      setSelectedOption("Newest");
      sort = "createdAt";
      sortByPrice = -1;
      getAllProducts(sortByPrice, sort);
    } else if (number == 2) {
      setSelectedOption("Price (low to high)");
      sort = "price";

      sortByPrice = 1;
      getAllProducts(sortByPrice, sort);
    } else if (number == 3) {
      setSelectedOption("Price (high to low)");
      sort = "price";

      sortByPrice = -1;
      getAllProducts(sortByPrice, sort);
    } else if (number == 4) {
      setSelectedOption("Name A-Z");
      sort = "name";
      sortByPrice = 1;
      getAllProducts(sortByPrice, sort);
    } else if (number == 5) {
      setSelectedOption("Name Z-A");
      sort = "name";
      sortByPrice = -1;
      getAllProducts(sortByPrice, sort);
    }
    else if (number == 6) {
      setSelectedOption("Strength (low to high)");
      sort = "strength";

      sortByStrength= 1;
      getAllProducts(sortByStrength, sort);
    } else if (number == 7) {
      setSelectedOption("Strength (high to low)");
      sort = "strength";

      sortByStrength = -1;
      getAllProducts(sortByStrength, sort);
    }
  };
  const handleOnChange = (e) => {
    setDefaultClearValue(false)
    /* setBrand(""); */
    setmaxPrice(e.max);
    setminPrice(e.min);
   
  };
  const handlebybrand1 = (item,name) => {
    
   
    if (item === "All") {
    
      if (localStorage.getItem("brandId")) {
        localStorage.removeItem("brandId");
      }
      setBrand("");
    }
    else {
      setBrand(item);
      localStorage.setItem('brandId', item);
    }
  };
  const handlebyFlavour = (item) => {
    if (item === "All") setFlavourName("");
    else setFlavourName(item);
  };
  const handlebyProductType = (item) => {
    if (item === "All") setProductTypeName("");
    else setProductTypeName(item);
  };
  const handlebyPots = (item) => {
    if (item === "All") setNumberOfPots("");
    else setNumberOfPots(item);
  };
  const handleclearfilter = () => {
    setDefaultClearValue(true)
    setCategoryOpen(false);
    setFlavourOpen(false);
    setProudcutTypeOpen(false)
    setPotsOpen(false)
    setIsPriceOpen(false);
    setBrand("");
    setFlavourName("");
    setProductTypeName("")
    setNumberOfPots("")
    setminPrice(0);
    setmaxPrice(50);
    setSliderMaxValue(50);
    setSliderMinValue(0);
    setSelectedOption('')
    getAllProducts('')
  };
  const showFilter = () => {
    setShowModal(true);
  };
  const onHideFilter = () => {
    setShowModal(false);
  };
  const handlePreviewPage = () => {
    setPage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getAllProducts();
    getAllBrandNames();
    getAllFlavourNames();
    getAllProductType()
    getPots();
    getsortproduct();
  
  }, [maxPrice, minPrice, page, brand, search,productTypeName, flavourName,numberOfPots]);
  useEffect(() => {
    getAllProducts();
  
    window.scrollTo(0, 0);
  }, [page, brand, search, flavourName,numberOfPots,productTypeName, sortproduct]);

  const cardArray = Array.from({ length: 16 }, (v, i) => i);

  const [metaData, setMetaData] = useState([]);
  let fetchSiteMetadata = async () => {
	try {
	  let res = await apiGET(`/v1/site-metadata/get-site-metadata-by-type?type=shop page discription`);
	  let data = res?.data?.data?.data;
  
	  if (data && data?.length > 0) {
		let statements = data[0]?.statements;
		//console.log("statements", statements);
  
		if (res?.status === 200) {
		  setMetaData(statements);
		}
	  }
	} catch (error) {
	  console.error("Error fetching site metadata:", error);
	}
  };
  

  useEffect(() => {
    fetchSiteMetadata();
      getsortproduct();
      if (localStorage.getItem("brandId")) {
       setBrand(localStorage.getItem("brandId"))
      }
  }, []);



  return (<>
    <div>
      <Helmet>
        <meta name="description" content={metaData?.length ? metaData : 'Shop our 450+ exiting flavours !'} />
      </Helmet>
    </div>
    <div className="main-container">
      <div className=" d-flex justify-content-center  text-center p-4 ">
        <div
          className="px-4 fs-3  mt-4 text-center  anton1  "
          style={{ letterSpacing: "5px" }}
        >
          SHOP ALL
        </div>
       
      </div>
      <div className="mb-3 d-block d-lg-none  px-4 fs-4">
       <div className="col-sm-12 col-md-12">
       <div className=" d-flex  gap-2 justify-content-center" style={{ flexWrap: "wrap" }}
       >
          <div
            className=" dropdown cursor-pointer btn btn-outline-secondary d-md-none"
            data-bs-toggle="dropdown"
            aria-expanded="false"

          >
            <div className=" d-flex flex-row gap-1 justify-content-center align-items-center ">
              <span>Brands</span>
            </div>
            
            <div className="dropdown-menu" style={{ height: 400, minWidth: '250px', overflowY: 'auto' }}>
            <div
                  style={{ cursor: "pointer",paddingLeft:'1rem' }}
                  className={`${brand == "All" || brand == "" ? "avenir-medium" : "avenir"
                    } thumbnail`}
                  onClick={() =>{
                     setBrand("")
                     if (localStorage.getItem("brandId")) {
                      localStorage.removeItem("brandId");
                    }
                    }}
                >
                  {" "}
                  ALL{" "}
                </div>
              {catogry && catogry?.map((item) => {
              
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    className={` ${item?._id == brand ? "avenir-medium" : "avenir"
                      } thumbnail`}
                    onClick={() => handlebybrand1(item?._id,item?.name)}
                  >
                    <div className="dropdown-item">{item?.name}</div>

                  </div>
                );
              })}
            </div>

          </div>
          <div className="d-md-none">
            <div  className="d-flex justify-content-end">
              <DropdownButton
                as={ButtonGroup}
                key={"SORT BY"}
                variant="Success"
                title={
                  selectedOption ? (
                    selectedOption
                  ) : (
                    <>
                      <BiSortAlt2 style={{color:'gray', marginTop: "-4px" }} />
                      <Sort />
                    </>
                  )
                } // display the selected option
                className="btn btn-outline-secondary d-flex justify-content-between"
                onSelect={handleChangefilter}
                style={{padding: '0'}}
                noCaret
              // drop="down-centered"
              >
                <Dropdown.Item eventKey="1">Newest</Dropdown.Item>
                <Dropdown.Item eventKey="2">Price (low to high)</Dropdown.Item>
                <Dropdown.Item eventKey="3">Price (high to low)</Dropdown.Item>
                <Dropdown.Item eventKey="4">Name A-Z</Dropdown.Item>
                <Dropdown.Item eventKey="5">Name Z-A </Dropdown.Item>
                <Dropdown.Item eventKey="6">Strength (low to high)</Dropdown.Item>
                <Dropdown.Item eventKey="7">Strength (high to low)</Dropdown.Item>
              </DropdownButton>
         
            </div>
          </div>
      
          <div
            onClick={showFilter}
            className="btn btn btn-outline-secondary cursor-pointer d-flex flex-row gap-2 justify-content-center align-items-center d-md-none"
          >
            <LuFilter /> <span>Filter</span>
          </div>
        </div>
       </div>
        <ProductModalFilter
          handlebybrand1={handlebybrand1}
          handlebyFlavour={handlebyFlavour}
          handlebyPots={handlebyPots}
          handlebyProductTypeFunction={handlebyProductType}
          handleOnChange={handleOnChange}
          show={showModal}
          onHide={onHideFilter}
        />
      </div>

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
                <div className="d-flex pt-1 align-items-center`">Brand</div>
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
                  onClick={() =>{
                     setBrand("")
                     if (localStorage.getItem("brandId")) {
                      localStorage.removeItem("brandId");
                    }
                    }}
                >
                  {" "}
                  ALL{" "}
                </div>

                {catogry && catogry?.map((item) => {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
                      className={` ${item?._id === brand ? "avenir-medium" : "avenir"
                        } thumbnail`}
                      onClick={() => handlebybrand1(item?._id,item?.name)}
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
                    clearFilter={defaultClearValue}
                  />
                </div>
              </div>
            </div>

            <div
              className=" py-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div class="d-flex justify-content-between  ">
                <div className="d-flex pt-1 align-items-center`">Flavour</div>
                <button
                  data-bs-toggle="collapse"
                  data-bs-target="#flavourDropdown"
                  onClick={toggleFlavour}
                  className="btn p-0 "
                >
                  <span className="text-lg">{isFlavourOpen ? "-" : "+"}</span>
                </button>
              </div>
              <div
                className={`${isFlavourOpen ? "show" : "collapse"}`}
                id="flavourDropdown"
              >
                <div
                  style={{ cursor: "pointer" }}
                  className={`${flavourName == "All" || flavourName == ""
                      ? "avenir-medium"
                      : "avenir"
                    } thumbnail`}
                  onClick={() => setFlavourName("")}
                >
                  {" "}
                  ALL{" "}
                </div>
                {flavour?.length
                  ? flavour?.map((item) => {
                    return (
                      <div
                        style={{ cursor: "pointer" }}
                        className={` ${item?.flavor == flavourName
                            ? "avenir-medium"
                            : "avenir"
                          } thumbnail`}
                        onClick={() => handlebyFlavour(item?.flavor)}
                      >
                      <span className="capitalizeText">{item?.flavor}</span>  
                      </div>
                    );
                  })
                  : ""}
              </div>
            </div>
            <div
              className=" py-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div class="d-flex justify-content-between  ">
                <div className="d-flex pt-1 align-items-center`">Pots</div>
                <button
                  data-bs-toggle="collapse"
                  data-bs-target="#potsDropdown"
                  onClick={togglePots}
                  className="btn p-0 "
                >
                  <span className="text-lg">{isPotsOpen ? "-" : "+"}</span>
                </button>
              </div>
              <div
                className={`${isPotsOpen ? "show" : "collapse"}`}
                id="potsDropdown"
              >
                <div
                  style={{ cursor: "pointer" }}
                  className={`${numberOfPots == "All" || numberOfPots == ""
                      ? "avenir-medium"
                      : "avenir"
                    } thumbnail`}
                  onClick={() => setNumberOfPots("")}
                >
                  {" "}
                  ALL{" "}
                </div> 
                {pots?.length
                  ? pots?.map((item) => {
                    return (
                      <div
                        style={{ cursor: "pointer" }}
                        className={` ${item?.pots === numberOfPots
                            ? "avenir-medium"
                            : "avenir"
                          } thumbnail`}
                        onClick={() => handlebyPots(item?.pots)}
                      >
                        {item?.pots}
                      </div>
                    );
                  })
                  : ""}
              </div>
            </div>
            <div
              className=" py-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div class="d-flex justify-content-between  ">
                <div className="d-flex pt-1 align-items-center`">Product Type</div>
                <button
                  data-bs-toggle="collapse"
                  data-bs-target="#prodcutTypeDropdown"
                  onClick={toggleProductType}
                  className="btn p-0 "
                >
                  <span className="text-lg">{isProudcutTypeOpen ? "-" : "+"}</span>
                </button>
              </div>
              <div
                className={`${isProudcutTypeOpen ? "show" : "collapse"}`}
                id="rodcutTypeDropdown"
              >
               <div
                  style={{ cursor: "pointer" }}
                  className={`${productTypeName == "All" || productTypeName == ""
                      ? "avenir-medium"
                      : "avenir"
                    } thumbnail`}
                  onClick={() => setProductTypeName("")}
                >
                  {" "}
                  ALL{" "}
                </div> 
                {productType?.length
                  ? productType?.map((item) => {
                    return (
                      <div
                        style={{ cursor: "pointer" }}
                        className={` ${item?.productType === productTypeName
                            ? "avenir-medium"
                            : "avenir"
                          } thumbnail`}
                        onClick={() => handlebyProductType(item?.productType)}
                      >
                        {item?.productType}
                      </div>
                    );
                  })
                  : ""}
              </div>
            </div>

            {/* <div
              className=" py-4"
              style={{ "border-bottom": "1px solid grey" }}
            >
              <div>Price</div>
            </div> */}

            <div className=" py-4 ">
              <div >
                {" "}
                <span className=" py-1 cursor-pointer" onClick={() => handleclearfilter()}>
                  Clear Filter x
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0  ">
          <div className="d-none d-md-block">
            <div className="d-flex justify-content-end pt-4 pb-1`">
              <DropdownButton
                as={ButtonGroup}
                key={"SORT BY"}
                variant="Success"
                title={
                  selectedOption ? (
                    selectedOption
                  ) : (
                    <>
                      <BiSortAlt2 style={{ marginTop: "-4px" }} />
                      <Sort />
                    </>
                  )
                } // display the selected option
                className="btn btn-outline-secondary d-flex justify-content-between"
                onSelect={handleChangefilter}
                noCaret
              // drop="down-centered"
              >
                <Dropdown.Item eventKey="1">Newest</Dropdown.Item>
                <Dropdown.Item eventKey="2">Price (low to high)</Dropdown.Item>
                <Dropdown.Item eventKey="3">Price (high to low)</Dropdown.Item>
                <Dropdown.Item eventKey="4">Name A-Z</Dropdown.Item>
                <Dropdown.Item eventKey="5">Name Z-A </Dropdown.Item>
                <Dropdown.Item eventKey="6">Strength (low to high)</Dropdown.Item>
                <Dropdown.Item eventKey="7">Strength (high to low)</Dropdown.Item>
              </DropdownButton>
              {/* 	<DropdownButton
								as={ButtonGroup}
								key={"SORT BY"}
								variant="Success"

								title={selectedOption ? selectedOption : <><FiFilter style={{marginTop:'-4px'}} /><Filter /></>} // display the selected option
								className="btn btn-outline-secondary d-flex justify-content-between"
								onSelect={handleChangefilter}
								noCaret
							// drop="down-centered"
							style={{marginLeft:'8px'}}
							>
								<Dropdown.Item eventKey="1" >Newest</Dropdown.Item>
								<Dropdown.Item eventKey="2">Price (low to high)</Dropdown.Item>
								<Dropdown.Item eventKey="3" >Price (high to low)</Dropdown.Item>
								<Dropdown.Item eventKey="4">Name A-Z</Dropdown.Item>
								<Dropdown.Item eventKey="5">Name Z-A </Dropdown.Item>


							</DropdownButton> */}
            </div>
          </div>
          <div className="container">
            <div className="row">
              {products?.length > 0
                ? products?.map((item, index) => (
                  <div key={index} className="col-6 col-lg-4 col-xl-3">
                    <Card productDetail={item} />
                  </div>
                ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="  container d-flex justify-content-end">
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						<li class="page-item"><span className="page-link" onClick={handlePreviewPage}>{'<'}</span></li>
						<li class="page-item"><span className="page-link" onClick={() => setPage(1)}>1</span></li>
						<li class="page-item"><span className="page-link" onClick={() => setPage(2)}>2</span></li>
						<li class="page-item"><span className="page-link" onClick={() => setPage(3)}>3</span></li>
						<li class="page-item"><span className="page-link" onClick={handleNextPage}>{'>'}</span></li>
					</ul>
				</nav>
			</div> */}
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
            {page > 2 && (
              <li className="page-item">
                <span
                  className="page-link font-weight-bold cursor-pointer"
                  onClick={() => setPage(1)}
                  style={{ background:`${page === 1 ? "#f5f5f5" :''}`}}
                >
                  First
                </span>
              </li>
            )}


            {page === 1 && (
              <li className="page-item">
                <span
                  className="page-link font-weight-bold cursor-pointer"
                  onClick={() => setPage(1)}
                  style={{ background:`${page === 1 ? "#f5f5f5" :''}`}}
                >
                  First
                </span>
              </li>
            )}

            {page !== 1 && (
              <li className="page-item">
                <span
                  className="page-link cursor-pointer"
                  onClick={() => setPage(page - 1)}
                >
                  {page == 2 ? 'First' : page - 1}
                </span>
              </li>
            )}

            {page !== 1 && (
              (page === totalPages) ? ""
                : (
                  <li className="page-item">
                    <span
                      className="page-link cursor-pointer"
                      onClick={() => setPage(page)}
                      style={{ background: "#f5f5f5" }}
                    >
                      {page}
                    </span>
                  </li>
                )
            )}
            {page !== totalPages && (
              (page == totalPages - 1) ? ""
                : (
                  <li className="page-item">
                    <span
                      className="page-link cursor-pointer"
                      onClick={() => setPage(page + 1)}
                    >
                      {page + 1}
                    </span>
                  </li>)
            )}
            {page >= totalPages - 1 ? '' : (page !== totalPages && (
              <li className="page-item">
                <span
                  className="page-link cursor-pointer"
                  onClick={() => setPage(page + 1)}
                >
                  ...
                </span>
              </li>
            ))}

            <li className="page-item">
              <span
                className="page-link cursor-pointer"
                onClick={() => setPage(totalPages)}
                style={{ background: `${page == totalPages ? '#f5f5f5':''} ` }}

              >
                {page <= totalPages ? "Last" : ''}
              </span>
            </li>

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
    </>
  );
};

export default ProductPage;
