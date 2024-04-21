import { Link } from "react-router-dom";

// Componente de nav bar superior.
let styleTopNavBar = {
    color: "white",
}

const TopNavBar = (props) => {
    return (
        <>
            <nav className="navbar bg-base-100 bg-info-content" style={styleTopNavBar}>
                <div className="flex-1">
                    <button className="btn btn-ghost normal-case text-xl">{props.title}</button>
                    <ul style={{display: "inline-flex", borderLeft: "1px solid lightslategray"}}>
                        <li style={{margin: "5px 10px"}}><Link to="/">Todo</Link></li>
                        <li style={{margin: "5px 10px"}}><Link to="/category/1">Teclados</Link></li>
                        <li style={{margin: "5px 10px"}}><Link to="/category/2">Mouses</Link></li>
                        <li style={{margin: "5px 10px"}}><Link to="/cart">Ver Carrito</Link></li>
                        <li style={{margin: "5px 10px"}}><Link to="/orders">Ver Ordenes</Link></li>
                    </ul>
                </div>
                
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button>
                </div>
            </nav>
        </>
    );
}

export default TopNavBar;