import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhiteArrowButton from "../images/WhiteArrowBtn.png";
const PageLinks = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const [profileArrow, setProfileArrow] = useState(false);
  const [postsArrow, setPostArrow] = useState(false);
  const [galleryArrow, setGalleryArrow] = useState(false);
  const [todoArrow, setTodoArrow] = useState(false);



  const navigateToProfile = () => {
    let id= localStorage.getItem("profileId")
    navigate(`/profile/${id}`);
    setIsClicked(true);
  
    // setProfileArrow(true);
  };
  const navigateToPosts = (i) => {
    console.log("i",i);

    if(i=="posts"){
      setPostArrow(true);
      setGalleryArrow(false)
    }else if(i=="gallery"){
      setGalleryArrow(true);

      setPostArrow(false);
    }
    navigate(`/${i}`);
    // setPostArrow(true);
  };
  const navigateToGallery = () => {
    navigate("/gallery");
    setIsClicked(true);
    // setGalleryArrow(true);
  };
  const navigateToTodos = () => {
    navigate("/todos");
    setIsClicked(true);
    // setTodoArrow(true);
  };
  return (
    <div>
      <div className="allPagesSection">
        <div className="linksWrapper">
        <div className="pagesLink" onClick={navigateToProfile}>

            <p> Profile </p>
            <div className="arrowButton firstarrow" >
              <img src={WhiteArrowButton} alt="white button" />
            </div>
          </div>
        <div className="pagesLink" onClick={()=>navigateToPosts("posts")}>
            <p style={{color:postsArrow==true?"white":""}}> Posts </p>
            <div className={postsArrow?"arrowButton sample":"sampleone" } >
              <img src={WhiteArrowButton} alt="white button" />
            </div>
          </div>
        <div className="pagesLink" onClick={()=>navigateToPosts("gallery")}>
            <p> Gallery </p>
            <div className="arrowButton thirdarrow" >
              <img src={WhiteArrowButton} alt="white button" />
            </div>
          </div>
          <div className="pagesLink" onClick={navigateToTodos}>
            <p> Todo </p>
            <div className="arrowButton fourthArrow">
              <img src={WhiteArrowButton} alt="white button" />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default PageLinks;
