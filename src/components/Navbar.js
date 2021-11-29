import React, {useState} from "react";
import CreatePost from "./CreatePost";

const Navbar = () => {
    const [ Visibility, setVisibility] = useState(false);
    
    return (       
           
        <div>
            <div className="px-8">
        
            {Visibility && <CreatePost />}
            <button onClick={()=>setVisibility(!Visibility)} type="button" className="w-1/4 bg-white 
            text-center rounded-2xl flex text-black hover:bg-purple-900 hover:text-white  justify-center mt-3 py-4 
            ">
                Publicar :)
             </button>
           </div>)
        </div>
            
        
    )
}

export default Navbar;
