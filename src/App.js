import { Route , Routes} from 'react-router-dom';
import Main from './component/Main';


function Routerr() {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Main/>}/>
          <Route exact path='/folder/:folderId' element={<Main/>}/>
        </Routes>
    </div>
  );
}
  
export default Routerr;
