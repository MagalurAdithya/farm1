import React, { useState } from 'react'
import Navbar from '../dashbord/Navbar'
import API from '../API'
import { toast } from 'react-toastify'
import './Issue.css'

function Issue() {
    const [issueTitle,setIssueTitle] = useState("")
    const [issueDiscription,setIssueDiscription]=useState("")

    const issuehandle = (e)=>{
        setIssueTitle(e.target.value)
    }
    const discriptionhandle = (e)=>{
        setIssueDiscription(e.target.value)
    }
    const save = async(e) =>{
        e.preventDefault()
        try{
            const {data} = await API.post("/issue/add-issue",{issueTitle,issueDiscription})
            console.log(data)
            toast.success("Issue posted successfully")
        }catch{
            toast.error("error in posting")
        }
    }
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <form onSubmit={save} className='form'>
      <div className='div6'>
        <label>IssueTitle</label>
        <input
        type='text'
        placeholder='Title of the issue'
        value={issueTitle}
        onChange={issuehandle}
        ></input>
      </div>
      <div className='div6'>
        <label>issueDiscription</label>
        <input
        type='text'
        placeholder='Describe the issue'
        value={issueDiscription}
        onChange={discriptionhandle}

        ></input>
      </div>
      <div className='button2'>
        <button>Send</button>
      </div>
      </form>
    </div>
  )
}

export default Issue
