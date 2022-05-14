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
    <div className="rockContainer d-flex container-fluid">
      <div>
        {showTitle && <h2> {title}</h2>}
        <div>
          {rocks &&
            rocks.map((rock) => (
              <div>
                <div className="rockCards" key={rock._id}>
                  <Link className="redirectLink" to={`/rocks/${rock._id}`}>
                    <h3> {rock.name} </h3>
                  </Link>
                  <p> Rock info will go here</p>
                  <Link className="redirectLink" to={`/users/${rock.user}`}>
                    {rock.user}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RockList;
