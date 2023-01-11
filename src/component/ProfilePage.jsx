import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { listpersons } from "../actions/Persondataapiaction";
import "../style/ProfilePage.css";
import PageLinks from "./PageLinks";
// import PopupLoginedProfile from "./PopupLoginedProfile";
const ProfilePage = () => {
  const [personDetails, setPersonDetails] = useState([]);

  const [popupVisible, setPopupVisible] = useState(false);
  const [messageListPersonId, setMessageListPersonId] = useState([]);
  // const [, showChatList, setShowChatList] = useState();
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [clickedMessagePersonList, setClickedMessagePersonList] =
    useState(false);
  console.log("messageListPersonId", messageListPersonId);
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    const fetchdata = async () => {
      axios.get(`https://panorbit.in/api/users.json`).then((res) => {
        const persondata = res.data.users;
        setPersonDetails(persondata);
      });
    };
    fetchdata();
    let handler = (e) => {
      if (e.target) {
        setPopupVisible(false);
      }
    };
  }, []);
  // all persons data from redux
  const dispatch = useDispatch();
  const personsdata = useSelector((state) => state.personsReducer);
  const { persons } = personsdata;
  useEffect(() => {
    dispatch(listpersons());
  }, []);
  console.log("our data is", persons);
  const details = personDetails.find((i) => i.id == id);

  console.log("deatails", details);
  const newdata = personDetails.find((i) => i.id == messageListPersonId);
  // function for chanage the data of clicked person from the popupMenu
  const gotoProfilePage = (id) => {
    localStorage.setItem("profileId", id);

    navigate(`/profile/${id}`);
    console.log("id goto ", id);
    showAndHidePopup();
  };

  // show and hide popup
  const showAndHidePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };

  const showAndHideChatList = () => {
    setShowDownArrow(!showDownArrow);
  };
  const getMessageListPersonId = () => {
    setClickedMessagePersonList(true);
  };

  return (
    <>
      <div className="profilewrapper">
        <PageLinks />

        {details ? (
          <div className="profilecontent">
            <div className="head">
              <div className="imageWithName">
                <div className="pageHead">
                  <h3>Profile</h3>
                </div>
                <div className="profileAndName" onClick={showAndHidePopup}>
                  <img src={details.profilepicture} alt="profile" />
                  <p>{details.name}</p>
                </div>
              </div>
              {popupVisible == true ? (
                <div className="popupMain">
                  <div className="popupTop">
                    <img src={details.profilepicture} alt="" />
                    <p>{details.name}</p>
                    <p className="websiteAdrs">{details.website}</p>
                    <hr />
                  </div>
                  <div className="popupBottom">
                    {persons.map((person) => {
                      return (
                        <>
                          <div
                            className="otherPersons"
                            key={person.id}
                            onClick={() => gotoProfilePage(person.id)}
                          >
                            <img src={person.profilepicture} alt="" />
                            <p>{person.name}</p>
                          </div>

                          <hr />
                        </>
                      );
                    })}
                  </div>
                  <div className="otherPersons">
                    <h4 className="" onClick={gotoHome}>
                      Sign Out
                    </h4>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="personFullDetailsLeftSection">
              <div className="leftSectionWrapper">
                <div className="profileBigimage">
                  <img src={details.profilepicture} alt="" />
                </div>
                <div className="name">
                  <p>
                    <span className="boldText">{details.name}</span>
                  </p>
                </div>

                <p>
                  Username :{" "}
                  <span className="boldText"> {details.username}</span>
                </p>
                <p>
                  e-mail :<span className="boldText"> {details.email}</span>
                </p>
                <p>
                  Phone : <span className="boldText"> {details.phone}</span>
                </p>
                <p>
                  Website :<span className="boldText"> {details.website}</span>
                </p>

                <hr />
                <p>Company</p>
                <p>
                  Name :{" "}
                  <span className="boldText"> {details.company.name}</span>
                </p>
                <p>
                  catchphrase :
                  <span className="boldText">
                    {" "}
                    {details.company.catchPhrase}
                  </span>
                </p>
                <p>
                  bs : <span className="boldText"> {details.company.bs}</span>
                </p>
              </div>
              <div className="rightSectionForDetails">
                <div className="rightSideDetails">
                  <p>Address :</p>
                  <p>
                    Street :
                    <span className="boldText"> {details.address.street}</span>
                  </p>
                  <p>
                    Suite :{" "}
                    <span className="boldText"> {details.address.suite}</span>
                  </p>
                  <p>
                    City :{" "}
                    <span className="boldText"> {details.address.city}</span>
                  </p>
                  <p>
                    ZipCode :
                    <span className="boldText"> {details.address.zipcode}</span>
                  </p>
                </div>
                <img
                  id="mapImage"
                  src="https://www.mrrl.org/sites/default/files/2021-04/maps.jpg"
                  alt=""
                />
                <div className="latitude">
                  <p>
                    {" "}
                    <span>Lat :</span> {details.address.geo.lat}
                    <span className="longitude"> Long :</span>{" "}
                    {details.address.geo.lng}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="chatMain">
        <div
          className="chatMessageScreen"
          style={{
            visibility:
              clickedMessagePersonList == true && showDownArrow == true
                ? "visible"
                : "hidden",
          }}
        >
          <div className="chatHead">
            {newdata ? (
              <>
                <img
                  className="chatMessageScreenPersonIcon"
                  src={newdata.profilepicture}
                  alt="person name"
                />
                <p className="chatMessagePersonName">{newdata.name}</p>
              </>
            ) : (
              ""
            )}

            <i
              className="fa-sharp fa-solid fa-angle-down uparrow"
              onClick={showAndHideChatList}
            ></i>
            <i
              className="fa-sharp fa-solid fa-xmark uparrow second"
              onClick={showAndHideChatList}
            ></i>
          </div>
          <div className="chatMessages">
            <div className="allMessages">
              <div className="messages">
                <div className="message">
                  <p>Lorem ipsum dolor sit amet Lorem, ipsum..</p>
                </div>
                <div className="message">
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <div className="time">
                  <p>9:16 PM</p>
                </div>
              </div>
              <div className="messages messageBottom">
                <div className="message">
                  <p>Lorem ipsum dolor</p>
                </div>
                <div className="message">
                  <p>Lorem ipsum dolor</p>
                </div>
              </div>
              <div className="messages">
                <div className="message">
                  <p>Lorem ipsum dolor sit amet Lorem, ipsum..</p>
                </div>
                <div className="message">
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <div className="time">
                  <p>12:50 AM</p>
                </div>
              </div>
              <div className="messages messageBottom">
                <div className="message">
                  <p>Lorem ipsum dolor </p>
                </div>
                <div className="message">
                  <p>Good morning dolor</p>
                </div>
              </div>
              <div className="messages">
                <div className="message">
                  <p>Lorem ipsum dolor sit amet Lorem, ipsum..</p>
                </div>
                <div className="message">
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <div className="time">
                  <p>3:56 AM</p>
                </div>
              </div>
              <div className="messages messageBottom">
                <div className="message">
                  <p>Lorem ipsum dolor </p>
                </div>
                <div className="message">
                  <p>Good morning dolor</p>
                </div>
              </div>
            </div>
            <div className="inputChat">
              <div className="inputBoxForChat">
                <i className="fa-sharp fa-solid fa-paper-plane"></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className="chatBox"
          style={{ marginTop: showDownArrow == true ? "-350px" : "" }}
        >
          <div className="chatHead">
            <i className="fa-regular fa-message-minus"></i>
            <p>Chats</p>
            {showDownArrow == false ? (
              <i
                className="fa-sharp fa-solid fa-angle-up uparrow"
                onClick={showAndHideChatList}
              ></i>
            ) : (
              <i
                className="fa-sharp fa-solid fa-angle-down uparrow"
                onClick={showAndHideChatList}
              ></i>
            )}
          </div>
          <div className="chatList">
            {persons.map((person) => {
              return (
                <div
                  className="allPersonsList"
                  onClick={() =>
                    getMessageListPersonId(setMessageListPersonId(person.id))
                  }
                >
                  <img
                    className="allPersonsListIcon"
                    src={person.profilepicture}
                    alt="personIcon"
                  />
                  <p className="allPersonsListName">{person.name}</p>
                  <div className="onlineOrOfflineStatus">
                    <tr>●</tr>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
