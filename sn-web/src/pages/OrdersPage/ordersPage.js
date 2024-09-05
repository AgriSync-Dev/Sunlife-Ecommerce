import React, { useEffect, useState } from 'react';
import ProfileMenu from '../My-Profile/ProfileMenu';
import { apiGET } from '../../utilities/apiHelpers';
import moment from 'moment/moment';
import { ellipseAddress } from '../../components/ellips/ellipseAddress';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Login from '../../components/signup/login';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import OrderDetails from './OrderDetails';
import Spinner from 'react-bootstrap/Spinner';




const OrdersPage = ({ address }) => {
    const [myOrders, setMyorders] = useState([])
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { userData } = useSelector(s => s.user)
    const navigate = useNavigate()
    const getMyOrders = async () => {
        setIsLoading(true);
        const resp = await apiGET("/v1/order/get-myorder")
        setIsLoading(false);
        if (resp.status === 200) {
         console.log("my orders---",resp);
            setMyorders(resp?.data?.data);
            // setMyorders([]);
            setIsLoading(false); // Set loading to false once data is fetched
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
      <>
        <div className="col-12 mt-lg-3 col-lg-3 px-0"></div>
        <div className=" container-fluid ">
          <div className="">
            <div className="px-0 row d-flex justify-content-center">
              <div className="col-12 mt-lg-3 col-lg-3 px-0">
                <ProfileMenu />
              </div>
              <div className="col-10 mt-5 mt-lg-3 col-md-8  px-0 mb-4  ">
                <div className=" container">
                  <div className="px-2  px-lg-5 mt-4 ">
                    <div className="row d-flex justify-content-between">
                      <div className="col-12 ">
                        <h1 style={{ fontSize: "32px" }} className="anton">
                          My Orders
                        </h1>
                        <p className="mt-3">
                          View your order history or check the status of a
                          recent order.
                        </p>
                      </div>
                    </div>
                    {/* <div className='border border-1 border-dark border-top-0 mt-4 mb-5'></div> */}
                    <div className="  mt-3">
                      <div className=" showtabletScreen row ">
                        <div className="flex-wrap w-100">
                          <div className=" d-none d-sm-block">
                            <ul
                              className="nav row "
                              style={{ minWidth: "460px", gap: "1px" }}
                            >
                              <li className="nav-item col-3 col-md-3 col-lg-3  ">
                                <div className="">Date</div>
                              </li>

                              <li className="nav-item col-3 col-md-2 col-lg-3 no-wrap">
                                <div className="">Order</div>
                              </li>

                              <li className="nav-item col-2 col-md-3 col-lg-2 text-capitalize">
                                <div className="">Status</div>
                              </li>
                              <li className="nav-item col-2 col-md-2 ">
                                <div className=""> Total</div>
                              </li>
                            </ul>
                            <div className="border border-1 border-dark border-top-0 mt-4 mb-5  "></div>
                          </div>
                          {myOrders && myOrders?.length > 0 ? (
                            <>
                              {myOrders.map((item, index) => (
                                <OrderDetails key={index} item={item} />
                              ))}
                            </>
                          ) : myOrders && myOrders?.length === 0 && isLoading ? (
                            <div
                              className="d-flex flex-column align-items-center justify-content-center"
                              style={{ height: "10vh" }}
                            >
                              <Spinner
                                animation="border"
                                style={{ color: "white", marginTop: 5 }}
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            </div>
                          ) : (
                            <div
                              className="d-flex flex-column align-items-center justify-content-center"
                              style={{ height: "10vh" }}
                            >
                              <div className="text-center">
                                <p>You haven't placed any orders yet.</p>
                                <Link className="text-black" to="/">
                                  Start Browsing
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default OrdersPage
