import React from 'react';
import { Link} from 'react-router-dom';

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
        <div> {showTitle && <h2> {title}</h2>}
        {rocks && rocks.map((rock)=> ( <div key={rock._id} className = "card">
            <Link to={`/rocks/${rock._id}`}><h3> {rock.name} </h3> </Link>
            <p> Rock info will go here</p>
            <Link  to={`/users/${rock.user}`} > {rock.user}  </Link>
             </div>

        ))}
        
        </div>
    )
}

export default RockList;