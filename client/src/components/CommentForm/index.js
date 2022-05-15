import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Delete } from "@mui/icons-material";

import { ADD_COMMENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

const CommentForm = ({rockId}) => {
    const [commentBody, setCommentBody] = useState("");

    const [addComment, {error}] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await addComment({
          variables: {
            rockId,
            commentBody,
            author: Auth.getProfile().data.username,
          },
        });
        setCommentBody("");
      } catch (error) {
        console.error(error);
      }
    };
     const handleChange = (event) => {
       const { name, value } = event.target;

       if (name === "commentBody") {
         setCommentBody(value);
       }
     };
    return ( <div>
        <h2> What do you think about this rock?</h2>
        <p> Join the discussion. </p>
        {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentBody"
                placeholder="Share your thoughts..."
                value={commentBody}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>

    )
}





export default CommentForm;