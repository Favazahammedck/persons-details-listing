import React from "react";
import ComingSoon from "./ComingSoon";
import PageLinks from "./PageLinks";
const GalleryPage = () => {

  return (
    <>
      <div className="profilewrapper">
          <PageLinks/>
      

        <div className="profilecontent">
          <div className="head">
            <div className="imageWithName">
              <div className="pageHead">
                <h3>Gallery</h3>
              </div>
              <div className="profileAndName">
                <img
                  src="https://static.thenounproject.com/png/1995071-200.png"
                  alt=""
                />
                <p>name of the person</p>
              </div>
            </div>
          </div>
              <ComingSoon/>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;

