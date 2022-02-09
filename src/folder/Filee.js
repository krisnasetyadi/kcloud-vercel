import React from "react";
import {FcFile} from 'react-icons/fc'
// import { Button } from "react-bootstrap";

export default function Filee({file}){
    return(
        
        <a 
        href={file.url} 
        target="_blank" 
        className="btn btn-outline-dark
        text-truncate w-100">
            <FcFile style={{
                width:"85px",height:"100px"}}
                className="mr-2"/>
        </a>
        
    )
}