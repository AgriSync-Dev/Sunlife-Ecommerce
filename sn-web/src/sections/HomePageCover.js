import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { apiGET } from "../utilities/apiHelpers";
import { useEffect } from "react";

const HomePageCover = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState([]);
  const [siteDataSmallHeading, setSiteDataSmallHeading] = useState([]);

  let fetchSiteMetadata = async () => {
    let res = await apiGET(
      `/v1/site-metadata/get-site-metadata-by-type?type=${"belowBannner"}`
    );
    if (res?.status == 200) setSiteData(res.data.data.data);
  };

  let fetchSiteMetaDataSmallHeading = async () => {
    let res = await apiGET(
      `/v1/site-metadata/get-site-metadata-by-type?type=${"belowBannnerSmallText"}`
    );
    if (res?.status == 200) setSiteDataSmallHeading(res.data.data.data);
  };

  useEffect(() => {
    fetchSiteMetadata();
    fetchSiteMetaDataSmallHeading();
  }, []);

  return (
    <div className="w-100">
      <LazyLoadImage
        effect="blur"
        src={banner ? banner : ""}
        className="banner img-fluid coverPic"
        alt="Banner"
      />
      {siteData?.length > 0 && (
        <div className="text-center mt-4 anton fw-medium headingHome px-2">
          {siteData?.length > 0 && siteData[0]?.statements?.length
            ? siteData[0]?.statements?.map((item, cv) => {
                return <div key={cv}>{item}</div>;
              })
            : ""}
        </div>
      )}
      {siteDataSmallHeading?.length > 0 && (
        <div className="fs-5 text-center mt-3 subHeadingHome px-2">
          {siteDataSmallHeading?.length > 0 &&
          siteDataSmallHeading[0]?.statements?.length
            ? siteDataSmallHeading[0]?.statements?.map((item, cv) => {
                return <div key={cv}>{item}</div>;
              })
            : ""}
        </div>
      )}
      <div className="d-flex justify-content-center mt-5">
        <button
          className="bg-black text-white border-1 rounded-2 px-3 py-2"
          style={{ fontSize: "14px" }}
          onClick={() => navigate("/shop")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HomePageCover;
