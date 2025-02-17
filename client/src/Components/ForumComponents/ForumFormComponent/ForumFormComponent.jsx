import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../../Redux/actions/postsActions";
import jwt_decode from "jwt-decode";
import "./form.css";
const ForumFormComponent = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          firstName: user?.firstName,
          email: user?.email,
        })
      );
    } else {
      dispatch(
        createPost({
          ...postData,
          firstName: user?.firstName,
          email: user?.email,
        })
      );
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
    });
  };
  return (
    <div id="form-div">
      <form onSubmit={handleSubmit} className="form" id="form1">
        <p className="name">
          <input
            name="title"
            type="text"
            className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
            placeholder="כותרת..."
            value={postData.title}
            id="name"
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </p>

        {/* <p className="email">
          <input
            name="email"
            type="text"
            className="validate[required,custom[email]] feedback-input"
            id="email"
            placeholder="אימייל..."
            onChange={(e) =>
              setPostData({ ...postData, email: e.target.value })
            }
          />
        </p> */}

        <p className="text">
          <textarea
            name="message"
            className="validate[required,length[6,300]] feedback-input"
            id="comment"
            placeholder="תוכן הפוסט..."
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></textarea>
        </p>

        <div className="submit">
          <button type="submit" value="SEND" id="button-blue">
            {currentId ? "ערוך" : "שלח"}
          </button>
          <div className="ease"></div>
        </div>
      </form>
    </div>
  );
};

export default ForumFormComponent;
