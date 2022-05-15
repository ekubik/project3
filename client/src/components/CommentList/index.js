import React from "react";
import SingleRock from "../../pages/SingleRock";
import { HighlightOff } from '@mui/icons-material';
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../utils/mutations";
import { QUERY_MY_PROFILE } from "../../utils/queries";
import {useParams} from "react-router-dom"

import Auth from "../../utils/auth";

const CommentList = ({comments}) => {
  let i=0;

 const {rockId} = useParams();
 /* const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    variables: { },
  });
  const handleDelete = async () => {
    try {
      const { data } = await deleteComment({ rockId,  commentId: comments[i].commentId})
    } catch (error) {
      console.error(error);
    }
  }*/
  

if (!comments.length) {
    return <div><h2> Comments: </h2>
    <p> Be the first to leave a comment on this rock...</p> </div>;
}

return (
  <div>
    <h2> Comments: </h2>
    <h3> Here's what people are saying...</h3>
    <div className="flex-row my-4">
      {comments &&
        comments.map((comment) => (
          <div key={comment.commentId} className=" card col-10">
            <div className="p-3 bg-dark text-light">
              <h5 className="card-header">
                {comment.author} left a comment{" "}
                <span style={{ fontSize: "0.825rem" }}>
                  on {comment.createdAt}
                </span>
              </h5>
              <p className="card-body">{comment.commentBody}</p>
            </div>

            <div>
              {Auth.loggedIn() &&
              Auth.getProfile().data.username === comment.author ? (
                <div>
                    <button className="btn submitButton">
                      <HighlightOff></HighlightOff> Delete{" "}
                    </button>{" "}
                  
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        ))}
    </div>
  </div>
);
}


export default CommentList;