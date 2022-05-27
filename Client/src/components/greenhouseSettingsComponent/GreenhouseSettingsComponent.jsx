import React from 'react'
import './greenhouseSettingComponent.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const GreenhouseSettingsComponent = () => {

    const [greenhouse,setGreenhouse ] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [name,setName] = useState('')
    const [content,setContent] = useState('')
    const [description,setDescription] = useState('')
    const [size,setSize] = useState(0)
    const [location,setLocation] = useState('')
    const [deleteId ,setDeleteId] = useState('');

    const addNewGreenhouse = async ()=>{
        try{
        const userId = JSON.parse(localStorage.getItem('user'))._id;
            const res = await axios.post(`/api/greenhouse/${userId}/new`,{ 
                greenhouse:name,
                location:location,
                content:content,
                desc:description,
                size:size,
            });
            setOpen2(false); 
        }catch(err){
            console.log("ErrorAddingNewGreenhouse",err);
        }
    }
    const deleteGreenhouse = async ()=>{
        try{
            const res = await axios.put(`/api/user/delete/greenhouse/${deleteId}`);
            setOpen(false); 
        }catch(err){
            console.log("ErrorDeletingGreenhouse",err);
        }
    }

    useEffect(()=>{
        const fetch = async()=>{
            try{
                const res = await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`);
                setGreenhouse(res.data);
            }catch(err){
                console.log("GreenhouseSettingErrFetch=>",err);
            }
        };
        fetch();
    },[open2,open,deleteId]);

    const handleClickOpen = (e,id) => {
        setOpen(true);
        setDeleteId(id);
        console.log(id);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
  return (
    <div className='greenhouseSettingsComponent'>
        <div className='tableDiv'>
            <table className='greenhouseTable'>
                <thead>
                <tr>
                    <th>NAME</th>
                    <th>LOCATION</th>
                    <th>CONTENT</th>
                    <th>DESCRIPTION</th>
                    <th>SIZE</th>
                    <th>D</th>
                </tr>
                </thead>
                <tbody>
                    {
                        greenhouse.map(g =>
                        (
                            <tr key={g._id}>
                                <td>{g.greenhouse}</td>
                                <td>{g.location}</td>
                                <td>{g.content}</td>
                                <td>{g.desc}</td>
                                <td>{g.size}²</td>
                                <td><i onClick={(e)=>handleClickOpen(e,g._id)} className="greenhouseSettingsIconDelete fa-solid fa-trash"></i></td>
                            </tr>
                        ))    
                    }
                </tbody>
            </table>
        </div>
        <div onClick={handleClickOpen2} className='NewGreenhouseDiv'>
            <div className='editSettingsButton'>
                <i class="fa-solid fa-plus"></i>
            </div>
        </div>
        <div className='deleteGreenhousePrompt'>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                {"Do you wish to delete selected greenhouse?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you delete greenhouse you cant restore it. If you wish not to proceed you can press NO
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>NO</Button>
                    <Button onClick={deleteGreenhouse} autoFocus>
                        YES
                    </Button> 
                </DialogActions>
            </Dialog>
        </div>
        <div className='addNewGreenhousePromp'>
            <Dialog open={open2} onClose={handleClose2}>
                <DialogTitle>Add Greenhouse</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Fill information about Greenhouse you want to add
                    </DialogContentText>
                        <TextField  onChange={(e)=>setName(e.target.value)} autoFocus margin="dense" id="name" label="Name of greenhouse" type="text" fullWidth variant="standard" />
                        <TextField  onChange={(e)=>setLocation(e.target.value)} autoFocus margin="dense" id="location" label="Location of greenhouse" type="text" fullWidth variant="standard" />
                        <TextField  onChange={(e)=>setContent(e.target.value)} autoFocus margin="dense" id="content" label="Content of greenhouse" type="text" fullWidth variant="standard" />
                        <TextField  onChange={(e)=>setDescription(e.target.value)} autoFocus margin="dense" id="description" label="Description of greenhouse" type="text" fullWidth variant="standard" />
                        <TextField  onChange={(e)=>setSize(e.target.value)} autoFocus margin="dense" id="size" label="Size of greenhouse" type="text" fullWidth variant="standard" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2}>Cancel</Button>
                        <Button onClick={addNewGreenhouse} >Add</Button>
                    </DialogActions>
            </Dialog>
        </div>
    </div>
  )
}

export default GreenhouseSettingsComponent