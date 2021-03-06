import React from 'react'
import './accountSettingsComponent.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import { Link } from 'react-router-dom';

const AccountSettingsComponent = () => {

  const [mimeType_d,setMimeType] = useState('');
  const [b64_d,setB64] = useState('');
  const [open, setOpen] = useState(false);
  const [name,setName] = useState();
  const [lastname,setLastname] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [user,setUser] = useState({});
  const [counter,setCounter] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }; 
  const handleClose = () => {
      setOpen(false);
  };
  const updateUser = async ()=>{
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    try{
      const res = await axios.put(`/api/user/update/${userId}`,{
        name:name,
        lastname:lastname,
        email:email,
        phone:phone,
      });
      setOpen(false);
    }catch(err){

    };
  };
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        if(JSON.parse(localStorage.getItem('user')) !== null){
          const userId = JSON.parse(localStorage.getItem('user'))._id;
          const res = await axios.get(`/api/user/${userId}`);
          setUser(res.data);
          setMimeType(res.data.image.contentType);
          setB64(new Buffer.from(res.data.image.data.data).toString('base64'));
          setLoading(true);
        }
      }catch(err){

      }
    }
    fetch()
  },[open,counter]);
  
  const onImgUpload = async(e) => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const data = new FormData();
    const filename = Date.now()+ e.target.files[0].name;
    data.append("name",filename);
    data.append("file",e.target.files[0]);
    try{
      await axios.post(`/api/uploadPhoto/${userId}`,data);
      setCounter(counter+1);
    }catch(err){
      console.log("errorOnImageUploadAPI_CALL",err);
    }

  }
  return (
    <div className='accountSettingsComponent'>
      {
        JSON.parse(localStorage.getItem('user')) === null ?
        (
          <>
            <p>RESTRICTED ACCESS</p>
            <Link to='/login'>LOGIN</Link>
          </>
        )
        :
        (
          <>
          {
            loading ?
            (
              <>
              <div className="accountSettingsComponentContainer">
              <div className="profileImageDiv">
                <img className='profileImage' src={`data:${mimeType_d};base64,${b64_d}`} alt='' />
                <form>
                  <label for="profileImg">
                    <div className='editIconDiv'>
                      <i className="fa-solid fa-pen"></i>
                      <input onChange={onImgUpload} type="file" id="profileImg" name="profileImg" accept="image/png, image/jpeg" />
                    </div>
                  </label>
                </form>
              </div>
              <div className='userInfoDiv'>
                <div>
                  <div className='nameHolderDiv'>
                    <span>{user.name}</span>
                  </div>
                  <div className='nameHolderDiv'>
                    <span>{user.lastname}</span>
                    </div>
                </div>
                <div>
                  <div className='nameHolderDiv'>
                    <span>{user.email}</span>
                    </div>
                  <div className='nameHolderDiv'>
                  <span>{user.phone}</span>
                    </div>
                </div>
              </div>
              <div onClick={handleClickOpen} className='editSettingsDiv'>
                <div className='editSettingsButton'>
                  <i className="fa-solid fa-pen"></i>
                </div>
              </div>
            </div>
            <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add User info</DialogTitle>
              <DialogContent>
                <DialogContentText>
                    Fill information about User you want add or edit
                </DialogContentText>
                <TextField defaultValue={user.name} onChange={(e)=>setName(e.target.value)} autoFocus margin="dense" id="name" label="Name" type="text" fullWidth variant="standard" />
                <TextField defaultValue={user.lastname} onChange={(e)=>setLastname(e.target.value)} autoFocus margin="dense" id="lastname" label="Lastname" type="text" fullWidth variant="standard" />
                <TextField defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)} autoFocus margin="dense" id="email" label="Email address" type="email" fullWidth variant="standard" />
                <TextField defaultValue={user.phone} onChange={(e)=>setPhone(e.target.value)} autoFocus margin="dense" id="phone" label="Phone number" type="phone" fullWidth variant="standard" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateUser}>Edit</Button>
              </DialogActions>
            </Dialog>
            </div>
              </>
            )
            :
            (<div className='accountSettingsLoaderDiv'><LoadingComponent /></div>)
          }
          </>
        )
      }
    </div>
  )
}

export default AccountSettingsComponent