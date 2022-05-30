import axios from 'axios';

export const newNotification = async (value,loc,greenhouse)=>{
    try{
        const res = await axios.post(`/api/notification/new/${greenhouse}`,{
            text:value,
            location:loc,
        });
    }catch(err){
        console.log("Error pushing notification",err);
    }
}