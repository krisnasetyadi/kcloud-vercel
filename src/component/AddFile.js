import React,{useState} from "react";
import ReactDOM from "react-dom";
import {ProgressBar,Toast} from 'react-bootstrap'
import {RiUploadCloudLine} from 'react-icons/ri'
import { database, storage } from '../config/fire'
import { ROOT_FOLDER } from '../folder/useFolder'
import { v4 as uuidV4} from 'uuid'

export default function AddFile({currentFolder}){
    const [uploadingFiles, setUploadingFiles] = useState([])

    function uploadHandler(e){
        const file = e.target.files[0]
        if(currentFolder == null || file == null) return

        const id = uuidV4()
        // library uuid untuk mengenarate unique identifier
        setUploadingFiles(previousUploadingFiles =>[
            ...previousUploadingFiles,
            { id:id,
            name:file.name,
            progress: 0,
            error:false}
        ])
        const filePath = currentFolder === ROOT_FOLDER ? 
        `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

        const uploadTask = storage.ref(`/files/${filePath}`).put(file)

        uploadTask.on('state_changed', snapshot=>{
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploadingFiles(previousUploadingFiles=>{
                return previousUploadingFiles.map(uploadFile =>{
                    if(uploadFile.id === id){
                        return { ...uploadFile, progress:progress}
                    }
                    return uploadFile
                })
            })

        }, 
        ()=>{
            setUploadingFiles(previousUploadingFiles=>{
                return previousUploadingFiles.map(uploadFile=>{
                    if(uploadFile.id === id){
                        return { ...uploadFile, error: true}
                    }
                    return uploadFile
                })
            })
        },
        ()=>{
            setUploadingFiles(previousUploadingFiles=>{
                return previousUploadingFiles.filter(uploadFile=>{
                    return uploadFile.id !== id
                })
                // disappear the progress
            })

            uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                database.files.add({
                    url:url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    // userId: currentUser.uid ,
                })
            })
        })
    }
    return(
        <>
        <div style={{marginRight:"10px",paddingTop:"10px"}}>
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
            <RiUploadCloudLine style={{
                width:"30px",height:"30px"}}/>
            <input 
            type="file" 
            onChange={uploadHandler}
            style={{opacity:0, position:"absolute", left:"-9999px"}}
            />
        </label>
        </div>
        {/* portal is allowed us to create code that is going
        to be rendered in somewhere else than inside the current
        component */}
      
        {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
            
            <div style={{
                position:'absolute',
                bottom:'1rem',
                right:'1rem',
                maxWidth:'250px'
            }}>
                {uploadingFiles.map(file=>(
                    <Toast key={file.id} onClose={()=>{
                        setUploadingFiles(previousUploadingFiles=>{
                            return previousUploadingFiles.filter(uploadFile=>{
                                return uploadFile.id !== file.id
                            })
                        })
                    }}>
                        <Toast.Header closeButton={file.error}
                        className="text-truncate w-100 d-block">
                            {file.name}
                        </Toast.Header>
                        <Toast.Body>
                            <ProgressBar
                            animated={!file.error}
                            variant={file.error ? 'danger' : 'primary'}
                            now={file.error ? 100 : file.progress * 100}
                            label={
                                file.error ? "Error" : `${Math.round(file.progress
                                    * 100)}%`
                            }/>
                        </Toast.Body>
                    </Toast>
                ))}
            </div>,
            document.body
        )}
{/* this where our portal is hoing to get rendered out */}
        
        
        
        </>
    )
}