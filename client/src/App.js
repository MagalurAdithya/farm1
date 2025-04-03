import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Farmerdashbord from './dashbord/Farmerdashbord';
import Investerdashbord from './dashbord/Investerdashbord';
import Admindashbord from './dashbord/Admindashbord';
import { ToastContainer } from 'react-toastify';
import Myfarms from './farmer/Myfarms';
import Addfarms from './farmer/Addfarms';
import Loans from './farmer/Loans';
import Avaliable from './investor/Avaliable';
import Issue from './farmer/Issue';
import Myinvestment from './investor/Myinvestment';
import Manageuser from './admin/Manageuser';
import AllLoans from './admin/Allloans';
import Investorissue from './investor/Investorissue';
import Repay from './farmer/Repay';
import DocumentUpload from './farmer/DocumentUpload';
import Issues from './admin/Issues';
import Allfarm from './admin/Allfarm';
import Document from './investor/Document';
import About from './components/About';
import Home from './components/Home';
// import Mytransaction from './farmer/Mytransaction'
import Transactions from './admin/Transactions';
import Verify from './admin/Verify';
import MyDocuments from './farmer/Mydocuments';
import Profile from './farmer/Profile';
import CreateProfile from './farmer/Createprofile';
import Documentverify from './admin/Documentverify';
import UserProfile from './investor/Profileinvestor';
import Credit from './admin/Credit';



function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/farmerdashbord" element={<Farmerdashbord></Farmerdashbord>}></Route>
          <Route path='/myfarm' element={<Myfarms></Myfarms>}></Route>
          <Route path='/addfarms' element={<Addfarms></Addfarms>}></Route>
          <Route path='/document' element={<DocumentUpload></DocumentUpload>}></Route>
          {/* <Route path='/loans' element={<Loans></Loans>}></Route> */}
          <Route path="/loans/:farmId" element={<Loans/>} />
          <Route path='mydocuments' element={<MyDocuments></MyDocuments>}></Route>
          <Route path='/farmerprofile' element={<Profile></Profile>}></Route>
          <Route path='/profile' element={<CreateProfile></CreateProfile>}></Route>
          <Route path="/investor" element={<Investerdashbord></Investerdashbord>}></Route>
          <Route path='/avaliable' element={<Avaliable></Avaliable>}></Route>
          <Route path="/admin" element={<Admindashbord></Admindashbord>}></Route>
          <Route path="/issue" element={<Issue></Issue>}></Route>
          <Route path="/myinvestment" element={<Myinvestment></Myinvestment>}></Route>
          <Route path='/users' element={<Manageuser></Manageuser>}></Route>
          <Route path='/All-Loans' element={<AllLoans></AllLoans>}></Route>
          <Route path='/issues' element={<Investorissue></Investorissue>}></Route>
          <Route path='/repay' element={<Repay></Repay>}></Route>
          <Route path='/All-Issues' element={<Issues></Issues>}></Route>
          <Route path ='/verify-document' element={<Documentverify></Documentverify>}></Route>
          <Route path='/All-farms' element={<Allfarm></Allfarm>}></Route>
          <Route path='/Documents' element={<Document></Document>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/verify' element={<Verify></Verify>}></Route>
          {/* <Route path='/transaction' element={<Mytransaction></Mytransaction>}></Route> */}
          <Route path='/ALL-transactions' element={<Transactions></Transactions>}></Route>
          <Route path='/investorprofile'element={<UserProfile></UserProfile>}></Route>
          <Route path='/credit' element={<Credit></Credit>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;