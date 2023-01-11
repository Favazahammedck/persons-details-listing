import React, { useEffect } from "react";
import "../style/Homepage.css";
import { useNavigate } from "react-router-dom";

import backgroundSvg from "../images/homePageSvg.png";

import { useSelector, useDispatch } from "react-redux";
import { listpersons } from "../actions/Persondataapiaction";

const HomePage = () => {
  const navigate = useNavigate();
  const gotoProfilePage = (id) => {
    // localStorage.setItem("profileId",id)
    navigate(`/profile/${id}`);
  };

  const dispatch = useDispatch();
  const personsdata = useSelector((state) => state.personsReducer);
  const { persons } = personsdata;
  useEffect(() => {
    dispatch(listpersons());
  }, []);
  console.log("our data is", persons);

  return (
    <>
      <div className="main">
        <img className="bgSvg" src={backgroundSvg} alt="backgroundSvg" />
        <div className="userDetailsForm">
          <div className="selectAccount">
            <h2>Select an account</h2>
          </div>
          <div className="detailsListMain">
            {persons.map((person) => {
              return (
                <>
                  <li
                    className="detailsList"
                    key={person.id}
                    onClick={() => gotoProfilePage(person.id)}
                  >
                    <img src={person.profilepicture} alt="profileIcon" />
                    <p>{person.name}</p>
                  </li>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
