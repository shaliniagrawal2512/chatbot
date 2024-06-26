import { Link } from "react-router-dom";

type Props = {
  to: string;
  type:'primary'|'secondary'
  text: string;
  width?:string;
  onClick?: () => Promise<void>;
};
 

const NavigationLink = (props: Props) =>{
 const width = props.width?  props.width :  'fit-content' 
 const handleClick = ()=>{
  props.onClick&&  props.onClick()
  }
  const style: React.CSSProperties ={
      width:width, textWrap:'nowrap', textAlign:'center', height:'30px', alignContent:'center'
  }
  return (
    <Link
      onClick={handleClick}
      className= {`nav-link ${props.type}`}
      to={props.to}
      style={style}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
