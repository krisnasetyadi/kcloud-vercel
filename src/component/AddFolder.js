import React,{useState} from "react";
import { RiFolderAddLine } from "react-icons/ri";
import {Button,Modal,Form} from 'react-bootstrap';
import { database } from "../config/fire";
import { ROOT_FOLDER } from '../folder/useFolder'


export default function AddFolder({currentFolder}){
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
function openHandler(){
    setOpen(true)
}
function closeHandler(){
    setOpen(false)
}
function handleSubmit(e){
    e.preventDefault()

    if(currentFolder == null) return

    const path = [...currentFolder.path]
    if(currentFolder !== ROOT_FOLDER){
        path.push({ name:currentFolder.name, id: currentFolder.id})
    }
    // create folder in database
    database.folders.add({
        name:name,
        parentId: currentFolder.id,
        // userId,
        path: path,
        createdAt: database.getCurrentTimestamp()
    })
    setName("")
    closeHandler()
}
    return(
        <>
        <div style={{marginRight:"10px",paddingTop:"10px"}}>
        <Button onClick={openHandler} variant='outline-success' size='sm' >
            <RiFolderAddLine style={{
                width:"30px",height:"30px"}}/>
        </Button>
        </div>
        <Modal show={open} onHide={closeHandler}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label> Folder Name </Form.Label>
                            <Form.Control 
                            type='text'
                            required
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeHandler}>
                        Close
                    </Button>
                    <Button variant='success' type="submit">
                        Add Data
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}