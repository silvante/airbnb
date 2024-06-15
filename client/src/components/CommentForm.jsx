import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { UserContext } from "../UserContext";
import axios from "axios";
import check from "../assets/check.svg";
import { Link } from "react-router-dom";
import { imageTotalLink } from "..";

const CommentForm = ({ placeId, ownerId }) => {
  const { user, ready } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [comment, setcomment] = useState("");
  const [isWork, setisWork] = useState(false);
  const [commentor, setcommentor] = useState(null);
  const [data, setdata] = useState(null);
  const [comments, setcomments] = useState([]);

  const [sliceCount, setsliceCount] = useState(3);
  const [showBTN, setshowBTN] = useState(true);

  // for add comment
  useEffect(() => {
    if (user) {
      setisWork(true);
      setcommentor({
        id: user._id,
        username: user.username,
        verificated: user.verificated,
        avatar: user.avatar,
      });
    } else {
      setisWork(false);
    }
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/comments", {
        to: placeId,
        commentor,
        comment,
        rating: value,
      });
      setdata(data);
      alert("comment is published");
      setcomment("");
      setValue(0);
    } catch (err) {
      console.log(err);
    }
  };

  // get comments

  async function getComments() {
    const { data } = await axios.get(`/comments-of/${placeId}`);
    setcomments(data);
  }

  useEffect(() => {
    getComments();
  }, []);

  function handleUnslice(params) {
    setsliceCount(Infinity);
    setshowBTN(false);
  }

  return (
    <div className="space-y-5 w-full">
      <div className="w-full bg-white p-5 rounded-2xl space-y-3">
        <h1 className="text-xl font-semibold">Rate & comment</h1>
        {isWork && (
          <form className="w-full flex flex-col" onSubmit={handleComment}>
            <div>
              <Typography component="legend">rate the place</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                className="mb-5"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ff3d47",
                  },
                }}
              />
            </div>
            <div className="flex space-x-3">
              <input
                type="text"
                required
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className="flex-1 placeholder:text-basedark border-2 border-basedark px-3 rounded-lg"
                placeholder="Your opinions"
              />
              <button className="bg-base text-white py-2 px-10 rounded-lg">
                Publicate
              </button>
            </div>
          </form>
        )}
        {!isWork && (
          <p>
            You should registrate first to comment this place.{" "}
            <Link className="underline text-blue-600" to={"/login"}>
              Rigistrator
            </Link>
          </p>
        )}
      </div>
      <div className="w-full bg-white p-5 rounded-2xl space-y-3">
        {comments.length > 0 ? (
          <div className="space-y-5">
            <h1 className="text-xl font-semibold">
              all comments - {comments.length}
            </h1>
            <ul className="space-y-5 w-full block">
              {comments.slice(0, sliceCount).map((comment) => {
                return (
                  <li key={comment._id} className="flex gap-2 w-full">
                    <Link className="w-[42px]">
                      <img
                        src={imageTotalLink + comment.commentor.avatar}
                        alt=""
                        width={"42px"}
                        height={"42px"}
                        className="rounded-full"
                      />
                    </Link>
                    <div className="space-y-1 flex-1">
                      <Link className="flex w-full items-center font-semibold hover:text-blue-600 hover:underline">
                        {comment.commentor.username}
                        {""}
                        {comment.commentor.verificated && (
                          <img
                            src={check}
                            alt="verify icon"
                            width={"20px"}
                            className="ml-1"
                          />
                        )}
                      </Link>
                      <div>
                        <p>{comment.comment}</p>
                      </div>
                      <p className="flex items-center font-semibold">
                        given rating:{" "}
                        <Rating
                          name="read-only"
                          value={comment.rating}
                          readOnly
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "#ff3d47",
                            },
                          }}
                          className="ml-2"
                        />
                      </p>
                    </div>
                  </li>
                );
              })}
              {showBTN && (
                <button className="text-blue-600" onClick={handleUnslice}>
                  more →
                </button>
              )}
            </ul>
          </div>
        ) : (
          <h3>This place has no comments</h3>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
