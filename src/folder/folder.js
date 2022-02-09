import React from "react";
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FcFolder} from 'react-icons/fc'

export default function Folderr ({folder}){
    return(
        <>
        <Button to={{
        pathname:`/folder/${folder.id}`,
        state:{folder:folder},
        }} 
        variant="outline-dark" className="text-truncate w-100" 
        as={Link}>
           <FcFolder className="mr-2"/>
           {folder.name}
        </Button>
        </>
    )
}