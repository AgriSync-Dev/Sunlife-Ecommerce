import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiGET } from '../../utilities/apiHelpers';
import MultiRangeSlider from '../../components/productComponents/multiRangeSlider';
const ProductModalFilter = ({ show, onHide,handlebybrand1 , handlebyFlavour, handlebyPots,handleOnChange,  handlebyProductTypeFunction}) => {
    const [catogry, setcatogry] = useState([]);
    const [brand, setBrand] = useState('');
    const [isCategoryOpen, setisCategoryOpen] = useState(false)
    const [isPriceOpen, setisPriceOpen] = useState(false)
    const [isPotsOpen, setisPotsOpen] = useState(false)
    const [isProudcutTypeOpen, setProudcutTypeOpen] = useState(false);
    const [productType, setProductType] = useState("");
    const [productTypeName, setProductTypeName] = useState("");
    const [pots, setPots] = useState([]);
    
    const [isBold, setisBold] = useState('')
    const [isFlavourOpen, setFlavourOpen] = useState(false);
    const [flavourName, setFlavourName] = useState("");
    const [flavour, setFlavour] = useState([]);
    const [maxPrice, setmaxPrice] = useState(50);
    const [minPrice, setminPrice] = useState(0);
    const [sliderMinValue, setSliderMinValue] = useState(0);
    const [sliderMaxValue, setSliderMaxValue] = useState(50);
    const [catogryData, setcatogryData] = useState('')
    const [numberOfPots, setNumberOfPots] = useState("");



    const getAllBrandNames = async () => {
        try {
            const response = await apiGET(`v1/category/get-category`)
            if (response?.status === 200) {
                setcatogry(response?.data?.data)
            } else {
                console.error("Error fetching collection data:", response.error);
            }
        } catch (error) {
            console.error("Error fetching collection data:", error);
        }
    }
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
      const getAllFlavourNames = async () => {
        try {
          const response = await apiGET(`v1/products/getallflavour-name`);
          if (response?.status === 200) {
             console.log("gaffar flavour", response?.data?.data);
            setFlavour(response?.data?.data?.data);
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
    const handlebybrand = (item) => {
        setcatogryData(item);
        setisBold(item)

    }
    const handleByPotsData = (item) => {
       
        setNumberOfPots(item);
      //  setisBold(item)
        //setisBold(item)

    }
    const handleByProductType = (item) => {
       
        setProductTypeName(item);
      //  setisBold(item)
        //setisBold(item)

    }
    const handleByFlavourData = (item) => {
       
        setFlavourName(item);
       // setisBold(item)
        

    }

    const toggleCategory = () => {

        setisCategoryOpen(!isCategoryOpen);
    };
    const togglePrice = () => {
		setisPriceOpen(!isPriceOpen);
	};
	const handleOnChangeData = (e) => {
		setminPrice(e.min)
		setmaxPrice(e.max)
	}
    const togglePots =()=>{
        setisPotsOpen(!isPotsOpen)
    }
    const toggleFlavour =()=>{
        setFlavourOpen(!isFlavourOpen)
    }
    const toggleProductType =()=>{
        setFlavourOpen(!isFlavourOpen)
    }
    const apllyFilter = () =>{
        handlebyProductTypeFunction(productTypeName)
        handlebybrand1(catogryData)
        handlebyPots(numberOfPots)
        handlebyFlavour(flavourName)
        onHide()
        let data={min:minPrice,max:maxPrice}
        handleOnChange(data)
    }
    const clearFilter = () =>{
        handlebyProductTypeFunction('');
        handlebybrand1('')
        handlebyPots('')
        handlebyFlavour('')
        onHide()
        setisBold('')
        setFlavourName("");
        setNumberOfPots("")
        setcatogryData("")
        setSliderMaxValue(50);
        setSliderMinValue(0);
        setProductTypeName("")
        setminPrice(0);
        setmaxPrice(50);


    }


    useEffect(() => {
        getAllBrandNames()
        getPots();
        getAllFlavourNames();
        getAllProductType();
    }, [])

    return (
        <>
            <Modal show={show} onHide={onHide} className='' size="lg" aria-labelledby="contained-modal-title-vcenter">
                <div className='p-3'>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Filter By</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='border-bottom border-2 border-dark'>

                                <button
                                    data-bs-toggle="collapse"
                                    data-bs-target="#categoryDropdown"
                                    onClick={toggleCategory}
                                    className="btn px-2 w-100"
                                >
                                    <div class="d-flex justify-content-between   ">
                                        <div className="d-flex pt-1 align-items-center`">Brand</div>
                                        <div className="text-lg">{isCategoryOpen ? "-" : "+"}</div>
                                    </div>
                                </button>
                                <div className={`${isCategoryOpen ? 'show': 'collapse'} p-3`} id="categoryDropdown">
                                    <div style={{ cursor: "pointer" }} ><p style={{ fontSize: "16px" }} className={`${isBold == 'All'|| isBold=="" ? "avenir-medium" : "avenir"} p-0 m-0 mt-2`}> ALL </p></div>

                                    {catogry.map((item,i) => {
                                        return <>	<div  style={{ cursor: "pointer" }} className={` ${item?._id === isBold ? "avenir-medium" : "avenir"} mt-1 thumbnail`} onClick={() =>handlebybrand(item?._id) }>     {item?.name}</div></>
                                    })}
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Body>
                    <div className=" py-0 border-bottom border-2 border-dark">
								<button
									data-bs-toggle="collapse"
									data-bs-target="#priceDropdown"
									onClick={togglePrice}
									className="btn px-2 w-100 "
								>
							<div class="d-flex justify-content-between  ">
								<div className="d-flex pt-1 align-items-center`">Price</div>
									<span className="text-lg">{isPriceOpen ? "-" : "+"}</span>
							</div>
								</button>
							<div className={`collapse my-4 `} id="priceDropdown">
								<div className=" d-flex justify-content-center py-4 " style={{ minWidth: "100%" }}>
									<MultiRangeSlider
										min={sliderMinValue}
										max={sliderMaxValue}
										onChange={(e) => handleOnChangeData(e)}

									/>
								</div>
							</div>
						</div>
                    </Modal.Body>
                     <Modal.Body>
                        <div className='border-2 border-bottom border-dark py-1' >
                            <button
                            data-bs-toggle="collapse"
                            data-bs-target="#potsdrop"
                            onClick={toggleFlavour}
                            className="btn px-2 w-100 ">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                    Flavour
                                    </div>
                                    <div>
                                      {isFlavourOpen}  {isFlavourOpen ?'-':'+'}
                                    </div>
                                    </div>
                            </button>
                            <div className='collapse' id='potsdrop'>
                            <div
                                style={{ cursor: "pointer",marginLeft:'0.4rem' }}
                                className={`${flavourName == "All" || flavourName == ""
                                    ? "avenir-medium "
                                    : "avenir"
                                    } thumbnail`}
                                onClick={() => setFlavourName("")}
                               
                                >
                                {" "}
                                ALL{" "}
                                </div>
                                {
                                    flavour.length>0 && flavour.map((item,cv)=>{
                                      
                                       
                                        return (
                                <div key={cv}>
                                  
                                    <div className={` ${item?.flavor == flavourName ? "avenir-medium" : "avenir"} mx-2 capitalizeText thumbnail`} style={{cursor:'pointer'}} onClick={() =>handleByFlavourData(item?.flavor) }  >{item?.flavor}</div>
                                </div>
                                        )
                                    })
                                }
                                
                        
                            </div>
                        </div>
                    </Modal.Body>
                     <Modal.Body>
                        <div className='border-2 border-bottom border-dark py-1' >
                            <button
                            data-bs-toggle="collapse"
                            data-bs-target="#producttype"
                            onClick={toggleProductType}
                            className="btn px-2 w-100 ">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                    Product Type
                                    </div>
                                    <div>
                                      {isProudcutTypeOpen}  {isProudcutTypeOpen ?'-':'+'}
                                    </div>
                                    </div>
                            </button>
                            <div className='collapse' id='producttype'>
                            <div
                            style={{ cursor: "pointer",marginLeft:'0.4rem' }}
                            className={`${productTypeName == "All" || productTypeName == ""
                                ? "avenir-medium"
                                : "avenir"
                                } thumbnail`}
                            onClick={() => setProductTypeName("")}
                            >
                            {" "}
                            ALL{" "}
                            </div> 
                                {
                                    productType.length>0 && productType.map((item,cv)=>{
                                      
                                       
                                        return (
                                <div key={cv}>
                                  
                                    <div className={` ${item?.productType == productTypeName ? "avenir-medium" : "avenir"} mx-2 capitalizeText thumbnail`} style={{cursor:'pointer'}} onClick={() =>handleByProductType(item?.productType) }  >{item?.productType}</div>
                                </div>
                                        )
                                    })
                                }
                                
                        
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Body>
                        <div className='border-2 border-bottom border-dark py-1' >
                            <button
                            data-bs-toggle="collapse"
                            data-bs-target="#potsdropdonw"
                            onClick={togglePots}
                            className="btn px-2 w-100 ">
                                <div className='d-flex justify-content-between'>
                                    <div>
                                   Pots
                                    </div>
                                    <div>
                                        {isPotsOpen ?'-':'+'}
                                    </div>
                                    </div>
                            </button>
                            <div className='collapse' id='potsdropdonw'>
                                            <div
                                style={{ cursor: "pointer",marginLeft:'0.4rem' }}
                                className={`${numberOfPots == "All" || numberOfPots == ""
                                    ? "avenir-medium"
                                    : "avenir"
                                    } thumbnail`}
                                onClick={() => setNumberOfPots("")}
                                >
                                {" "}
                                ALL{" "}
                                </div> 
                                {
                                    pots.length>0 && pots.map((item,cv)=>{
                                       
                                        return (
                                <div key={cv}>
                                    {/* <input className='mx-2' type='checkbox'></input> */}
                                    <div  onClick={() =>handleByPotsData(item?.pots) } className={` ${item?.pots == numberOfPots ? "avenir-medium" : "avenir"} mx-2 thumbnail `} style={{cursor:'pointer'}}>{item?.pots}</div>
                                </div>
                                        )
                                    })
                                }
                                
                        
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                    <div className=''>
                        <div className=' gap-1 d-flex justify-content-evenly '>
                        <div className='  d-flex align-items-center'>
                            <Button onClick={clearFilter} className=' border-1 border-dark  rounded-0 ' style={{width:"150px"}} variant="">
                                Clear Filters
                            </Button>
                            </div>
                            <div className='  d-flex align-items-center' >
                            <Button onClick={apllyFilter} className='  border-1 border-dark  rounded-0 ' style={{width:"150px"}} variant="dark">
                                Apply
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProductModalFilter;
