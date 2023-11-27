import { Routes, Route, Link  } from "react-router-dom";
import '../styles/cards.css'

export const Card = (props) => {
    return (
      <Link className="cards" to={props.path}>
          {/*Logo*/}
          <img src={props.img}/>
          <p>{props.title}</p>
      </Link>
    )
  }
  
  export default Card;