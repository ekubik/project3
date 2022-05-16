import React from "react";
import SingleRock from "../../pages/SingleRock";
import { HighlightOff } from '@mui/icons-material';
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../utils/mutations";
import { QUERY_MY_PROFILE } from "../../utils/queries";
import {useParams} from "react-router-dom"
import "../../styles/Comments.css"

import Auth from "../../utils/auth";

const CommentList = ({comments}) => {
  let i=0;

 const {rockId} = useParams();
 const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    variables: { },
  });
  const handleDelete = async (commentId) => {
    try {
      const { data } = await deleteComment({commentId})
    } catch (error) {
      console.error(error);
    }
  }
  

if (!comments.length) {
    return <div><h2> Comments: </h2>
    <p> Be the first to leave a comment on this rock...</p> </div>;
}

return (
  <div>
    <h2> Comments: </h2>
    <h3> Here's what people are saying...</h3>
    <div className="flex-row my-4 ">
      {comments &&
        comments.map((comment) => (
          <div key={comment.commentId}>
            <div className="p-3 comment">
              <div className="cardHead">
              <h5 className="text-dark">
                {comment.author} left a comment{" "}
                <span style={{ fontSize: "0.825rem" }}>
                  on {comment.createdAt}
                </span>
              </h5>
              </div>
              <div>
              <p className="commentBody">{comment.commentBody}</p>
            </div>

            <div>
              {Auth.loggedIn() &&
              Auth.getProfile().data.username === comment.author ? (
                <div>
                    <button id="deleteButton" className="btn submitButton" onClick={()=> handleDelete(comment.commentId)}>
                      <HighlightOff></HighlightOff> Delete{" "}
                    </button>{" "}
                  
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
          </div>
        ))}
    </div>
  </div>
);
}


export default CommentList;