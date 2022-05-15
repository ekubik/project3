import React from "react";
import SingleRock from "../../pages/SingleRock";

const CommentList = ({comments = []}) => {
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
            <div key={comment.commentId} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.author} left a comment {' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentBody}</p>
              </div>
            </div>
          ))}
      </div>
      </div>
)
}


export default CommentList;