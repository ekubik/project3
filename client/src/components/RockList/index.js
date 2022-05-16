import React from "react";
import { Link } from "react-router-dom";
import "../../styles/RockList.css";

const RockList = ({
  rocks,
  title,
  showTitle = true,
  //displayUsername = true,
}) => {
  if (!rocks.length) {
    return <h2> There are no rocks available for viewing </h2>;
  }
  return (
    <div>
      <div>
        {showTitle && <h2> {title}</h2>}
        <div className="d-flex container-fluid">
          {rocks &&
            rocks.map((rock) => (
              <div
                className="rockCards container-fluid justify-content-center"
                key={rock._id}
              >
                <div className="row justify-content-center">
                  <div>
                    <Link className="rockNameLink" to={`/rocks/${rock._id}`}>
                      <h3> {rock.name} </h3>
                    </Link>
                  </div>
                  <div>
                    <img src={require("../../assets/angry-rock.jpg")} />
                  </div>
                  <div >
                    {" "}
                    <h4> Description: </h4>
                    {rock.description}
                  </div>

                  <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="align-items-end">
                      {" "}
                      This rock belongs to
                      <Link className="redirectLink" to={`/users/${rock.user}`}>
                        {`  ${rock.user}`}
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RockList;
