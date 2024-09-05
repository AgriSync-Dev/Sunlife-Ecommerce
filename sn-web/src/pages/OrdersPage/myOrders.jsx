import React, { useEffect, useState } from 'react'
import ProfileMenu from '../My-Profile/ProfileMenu'
import { Link, useNavigate } from 'react-router-dom'
import { apiGET } from '../../utilities/apiHelpers'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'
import { currencyConversion, currencySymbol } from '../../utilities/currencyConversion'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const MyOrders = () => {
    const { userData } = useSelector(s => s.user)
    const navigate = useNavigate()
    const [myOrders, setMyOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getMyOrders = async () => {
        try {
            setIsLoading(true);
            const response = await apiGET("/v1/order/get-myorder")
            setIsLoading(false);
            if (response.status === 200) {
                setMyOrders(response?.data?.data);
            } else {
                setMyOrders([])
            }
        } catch (error) {
            console.log("Error while fetch orders.", error)
            toast.error("Error while fetch orders.")
        }
    }

    useEffect(() => {
        if (!userData) {
            toast.error("Please login first")
            navigate("/")
        }
        else {
            getMyOrders();
        }
    }, [userData])

    return (
        <div className='py-5 d-flex justify-content-center'>
            <div className='container'>
                <div className='row gap-5 gap-lg-0'>
                    <div className='col-lg-4'>
                        <ProfileMenu />
                    </div>
                    <div className='col-lg-8'>
                        <div className="anton fs-2">
                            My Orders
                        </div>
                        <div className='mt-2'>
                            View your order history or check the status of a
                            recent order.
                        </div>
                        <hr className='' />
                        {myOrders?.length > 0 ?
                            <div>
                                <div class="accordion " id="order-accordion">
                                    {myOrders?.map((order, idx) =>
                                        <div key={idx} class="accordion-item">
                                            <h2 class="accordion-header">
                                                <button class={`accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded="true" aria-controls={`collapse${idx}`}>
                                                    <div className='d-flex gap-2 flex-wrap flex-column'>
                                                        <div>
                                                            <span className='fw-semibold'>Order No :</span> {order?.orderNo}
                                                        </div>
                                                        <div>
                                                            <span className='fw-semibold'>Date :</span> {moment(order?.createdAt).format('llll')}
                                                        </div>
                                                        <div>
                                                            <span className='fw-semibold'>Status :</span> {order?.orderStatus === "fulfilled" ? 'Order Sent' :
                                                                order?.orderStatus === "unfulfilled" || order?.orderStatus === "partiallyfulfilled" ?
                                                                    'Order Received' :
                                                                    order?.orderStatus === "canceled" ? 'Order Canceled' : ""
                                                            }
                                                        </div>
                                                        <div>
                                                            <span className='fw-semibold'>Total :</span> {currencySymbol(order?.currency)} {order?.amountToPay}
                                                        </div>
                                                        <div>
                                                            <span className='fw-semibold'>Currency :</span> {order?.currency || "GBP"}
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id={`collapse${idx}`} class={`accordion-collapse collapse`} data-bs-parent="#order-accordion">
                                                <div class="accordion-body">
                                                    <div className='d-flex gap-3 flex-column'>
                                                        {order?.productDetail.map((product, pId) =>
                                                            <div key={pId} className='border-bottom'>
                                                                <div className='p-1 d-flex flex-wrap gap-3 justify-content-between'>
                                                                    <div className='d-flex gap-3 flex-wrap '>
                                                                        <LazyLoadImage
                                                                            effect="blur"
                                                                            className="border rounded-2"
                                                                            src={product?.productDetailsObj?.productImageUrl}
                                                                            width={120}
                                                                            height={120}
                                                                        >
                                                                        </LazyLoadImage>
                                                                        <div>
                                                                            <div className='fw-semibold'>
                                                                                {product?.productDetailsObj?.name}
                                                                            </div>
                                                                            {
                                                                                product?.productDetailsObj?.discountedSalePrice ?
                                                                                    <div className='d-flex gap-2 '>
                                                                                        <span className='fw-semibold'>Unit Price :</span>
                                                                                        <span className='text-secondary text-decoration-line-through'>
                                                                                            {currencyConversion(
                                                                                                order?.currency,
                                                                                                product?.productDetailsObj?.price,
                                                                                                order?.currencyRate
                                                                                            )}
                                                                                        </span>
                                                                                        <span className='text-success'>
                                                                                            {currencyConversion(
                                                                                                order?.currency,
                                                                                                product?.productDetailsObj?.discountedSalePrice,
                                                                                                order?.currencyRate
                                                                                            )}
                                                                                        </span>
                                                                                    </div>
                                                                                    :
                                                                                    <div>
                                                                                        <span className='fw-semibold'>Unit Price : </span>
                                                                                        {currencyConversion(
                                                                                            order?.currency,
                                                                                            product?.productDetailsObj?.price,
                                                                                            order?.currencyRate
                                                                                        )}
                                                                                    </div>
                                                                            }
                                                                            {product?.productDetailsObj?.selectedVariant ?
                                                                                <div>
                                                                                    <span className='fw-semibold'>Variant : </span>
                                                                                    {product?.productDetailsObj?.selectedVariant?.pots ?
                                                                                        <span>{product?.productDetailsObj?.selectedVariant?.pots} Pots</span>
                                                                                        : product?.productDetailsObj?.selectedVariant?.pots ?
                                                                                            <span>{product?.productDetailsObj?.selectedVariant?.size} Size</span>
                                                                                            : ""
                                                                                    }
                                                                                </div>
                                                                                :
                                                                                ""
                                                                            }
                                                                            {product?.productDetailsObj?.couponName ?
                                                                                <div>
                                                                                    <span className='fw-semibold'>Coupon : </span><span className='text-info'>{product?.productDetailsObj?.couponName}</span>
                                                                                </div>
                                                                                :
                                                                                ""
                                                                            }

                                                                            {order?.invoice ?
                                                                                <Link to={order?.invoice} target='_blank' className='text-text-decoration-underline text-primary'>
                                                                                    Download Invoice
                                                                                </Link>
                                                                                :
                                                                                ""
                                                                            }
                                                                            <div>
                                                                                <span className='fw-semibold'>Tracking URL : </span>
                                                                                {order?.trackingURL ?
                                                                                    <Link to={order?.trackingURL} target='_blank' className='text-text-decoration-underline text-primary'>
                                                                                        Track Item
                                                                                    </Link>
                                                                                    :
                                                                                    <span>Not Assigned</span>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <span className='fw-semibold'>Qty :</span> {product?.quantity}
                                                                    </div>

                                                                    {
                                                                        product?.productDetailsObj?.discountedSalePrice ?
                                                                            <div className='d-flex gap-1 flex-column'>
                                                                                <span className='text-secondary text-decoration-line-through'>
                                                                                    {currencyConversion(
                                                                                        order?.currency,
                                                                                        (product?.quantity * product?.productDetailsObj?.price),
                                                                                        order?.currencyRate
                                                                                    )}
                                                                                </span>
                                                                                <span className='text-success fw-semibold'>
                                                                                    {currencyConversion(
                                                                                        order?.currency,
                                                                                        (product?.quantity * product?.productDetailsObj?.discountedSalePrice),
                                                                                        order?.currencyRate
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                            :
                                                                            <div className='fw-semibold'>
                                                                                {currencyConversion(
                                                                                    order?.currency,
                                                                                    (product?.quantity * product?.productDetailsObj?.price),
                                                                                    order?.currencyRate
                                                                                )}
                                                                            </div>
                                                                    }
                                                                </div>
                                                                {product?.subProduct?.length ?
                                                                    <div className='d-flex gap-3 flex-column mt-3'>
                                                                        <div className='fw-semibold'>Sub Products :</div>
                                                                        {product?.subProduct.map((sProduct, sPID) =>
                                                                            <div key={sPID} className='border-bottom p-1 d-flex flex-wrap gap-3 justify-content-between'>
                                                                                <div className='d-flex gap-3 flex-wrap '>
                                                                                    <LazyLoadImage
                                                                                        effect="blur"
                                                                                        className="border rounded-2"
                                                                                        src={sProduct?.productDetailsObj?.productImageUrl}
                                                                                        width={60}
                                                                                        height={60}
                                                                                    >
                                                                                    </LazyLoadImage>
                                                                                    <div>
                                                                                        <div className='fw-semibold'>
                                                                                            {sProduct?.productDetailsObj?.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <span className='fw-semibold'>Qty :</span> {sProduct?.quantity}
                                                                                </div>

                                                                            </div>)}

                                                                    </div>
                                                                    :
                                                                    ""
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='row mt-4'>
                                                        <div className='col-lg-6'></div>
                                                        <div className='col-lg-6'>
                                                            <div className='w-100 d-flex gap-2 justify-content-between align-items-center'>
                                                                <div className='fw-semibold'>Subtotal : </div>
                                                                <div>
                                                                    {currencySymbol(order?.currency)} {(order?.amountToPay - order?.deliveryCharge).toFixed(2)}
                                                                </div>
                                                            </div>
                                                            <div className='w-100 d-flex gap-2 justify-content-between align-items-center mt-1'>
                                                                <div className='fw-semibold'>Shipping : </div>
                                                                {order?.couponType === 'free_shipping' ?
                                                                    <div>
                                                                        <span className='text-decoration-line-through me-2'>
                                                                            {currencySymbol(order?.currency)} {order?.couponDiscount}
                                                                        </span>
                                                                        <span>
                                                                            {currencySymbol(order?.currency)} {order?.deliveryCharge}
                                                                        </span>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        {currencySymbol(order?.currency)} {order?.deliveryCharge}
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className='w-100 d-flex gap-2 justify-content-between align-items-center mt-1'>
                                                                <div className='fw-semibold'>Coupon : </div>
                                                                <div>
                                                                    <span className='text-info me-2'>{order?.couponName}</span>
                                                                    <span className='text-success'>- {currencySymbol(order?.currency)} {order?.couponDiscount}</span>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='w-100 fs-5 d-flex gap-2 justify-content-between align-items-center mt-1'>
                                                                <div className='fw-semibold'>Total : </div>
                                                                <div>
                                                                    {currencySymbol(order?.currency)} {order?.amountToPay}
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='w-100 fs-5 d-flex gap-2 justify-content-between align-items-center mt-1'>
                                                                <div className='fw-semibold'>Paid : </div>
                                                                <div>
                                                                    {currencySymbol(order?.currency)} {order?.paymentStatus !== "unpaid" ? order?.amountToPay : '00'}
                                                                </div>
                                                            </div>
                                                            <div className='w-100 fs-6 d-flex gap-2 justify-content-between align-items-center mt-1'>
                                                                <div className='fw-semibold'>Balance Due : </div>
                                                                <div>
                                                                    {currencySymbol(order?.currency)} {order?.paymentStatus !== "paid" ? order?.amountToPay : '00'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row mt-4'>
                                                        <div className='col-lg-6'>
                                                            <div className='fw-semibold'>Billing Information</div>
                                                            <div className={`${order?.paymentStatus != "unpaid" ? 'text-success' : 'text-danger'}`}>
                                                                {order?.paymentStatus != "unpaid" ?
                                                                    'Paid with Pay360'
                                                                    : 'Payment Due'
                                                                }
                                                            </div>
                                                            <div className='mt-2 text-secondary'>
                                                                <div>
                                                                    <span>{order?.shippingAdderess?.shippingAddressObj?.firstName}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.lastName}</span>
                                                                </div>
                                                                <div>
                                                                    {order?.shippingAdderess?.shippingAddressObj?.address}
                                                                </div>
                                                                <div>
                                                                    {order?.shippingAdderess?.shippingAddressObj?.addressLine2}
                                                                </div>
                                                                <div>
                                                                    <span>{order?.shippingAdderess?.shippingAddressObj?.city}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.state}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.country}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.zip}</span>
                                                                </div>
                                                                <div>
                                                                    {order?.shippingAdderess?.shippingAddressObj?.phone}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6 mt-4 mt-lg-0'>
                                                            <div className='fw-semibold'>Shipping Information</div>
                                                            <div className={`${order?.paymentStatus != "unpaid" ? 'text-success' : 'text-danger'}`}>
                                                                {order?.paymentStatus != "unpaid" ?
                                                                    <div>
                                                                        <div>{order?.deliveryMethod}</div>
                                                                        <div>{order?.deliveryTime}</div>
                                                                    </div>
                                                                    : 'Payment Due'
                                                                }
                                                            </div>
                                                            <div className='mt-2 text-secondary'>
                                                                <div>
                                                                    <span>{order?.shippingAdderess?.shippingAddressObj?.firstName}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.lastName}</span>
                                                                </div>
                                                                <div>
                                                                    {order?.shippingAdderess?.shippingAddressObj?.address}
                                                                </div>
                                                                <div>
                                                                    {order?.shippingAdderess?.shippingAddressObj?.addressLine2}
                                                                </div>
                                                                <div>
                                                                    <span>{order?.shippingAdderess?.shippingAddressObj?.city}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.state}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.country}</span>
                                                                    <span className='ms-1'>{order?.shippingAdderess?.shippingAddressObj?.zip}</span>
                                                                </div>
                                                                <div>
                                                                    {order?.shippingAdderess?.shippingAddressObj?.phone}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            :
                            myOrders?.length === 0 && isLoading ?
                                <div
                                    className="d-flex flex-column align-items-center justify-content-center"
                                    style={{ height: 300 }}
                                >
                                    <Spinner
                                        animation="border"
                                        style={{ color: "blue", marginTop: 5 }}
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </Spinner>
                                </div>
                                :
                                <div className='d-flex flex-column align-items-center justify-content-center'
                                    style={{ height: 300 }}>
                                    <div>
                                        You haven't placed any orders yet
                                    </div>
                                    <Link className="text-black mt-2" to="/">
                                        Start Browsing
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders