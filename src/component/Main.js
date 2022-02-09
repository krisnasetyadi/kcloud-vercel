import '../styles/App.css';
import NavBar from './NavBar';
import {Container} from 'react-bootstrap'
import AddFolder from './AddFolder';
import { useFolder } from '../folder/useFolder';
import Folderr from '../folder/folder';
import { useParams, useLocation } from 'react-router-dom';
import FolderBreadcrumbs from '../folder/FolderBreadcrumbs';
import AddFile from './AddFile';
import Filee from '../folder/Filee';

function Main() {
  const { folderId } = useParams()
  const {state = {}} = useLocation()
  const {folder, childFolders, childFiles} = useFolder(folderId)
  console.log(childFolders)
  return (
    <>
     <NavBar/>
     <Container fluid>
     <div className='d-flex align-items-center'>
        <FolderBreadcrumbs currentFolder={folder}/>
        <AddFile currentFolder={folder}/>
        <AddFolder currentFolder={folder}/>
     </div>
     {childFolders.length > 0 && (
       <div className='d-flex flex-wrap'>
         {childFolders.map(childFolder=>(
           <div 
           key={childFolder.id} style={{maxWidth:'250px'}}
           className="p-2">
             <Folderr folder={childFolder} />
           </div>
         ))}
       </div>
     )}
     {childFolders.length > 0 && childFiles.length > 0 && <hr/>}
       {childFiles.length > 0 && (
       <div className='d-flex flex-wrap'>
         {childFiles.map(childFile=>(
           <div 
           key={childFile.id} style={{maxWidth:'250px'}}
           className="p-2">
             <Filee file={childFile} />
           </div>
         ))}
       </div>
       )}
     </Container>
    </>
  );
}

export default Main;
