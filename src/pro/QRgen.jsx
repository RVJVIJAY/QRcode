import React from 'react'
import { useState } from 'react';
const QRgen = () => {
    const [img,setimg]=useState("")
    const [loading,setloding]=useState(false)
    const [size,setsize]=useState("")
    const [qrdata,setqrdata]=useState('')

     async function Generateurl(){
        setloding(true)
        console.log(qrdata)
        try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`
        setimg(url)
        }
        catch(error)
        {
            console.log("there was an error",error)
        }
        finally{
            setloding(false)
        }
    }
    
    function Downloadurl(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement('a')
            link.href=URL.createObjectURL(blob)
            link.download="yourqrcode.png"
            document.body.appendChild(link)
            link.click()
        })
       
    }
  return (
    <div className='app-container'>
        <h1 style={{marginBottom:10}}>QR CODE GENERATOR</h1>
        {img && <img src={img}/>}
        {loading &&<p>Plese wait...</p>}
        <div>
      <label htmlFor='qr'>Data for QR code </label>
      <input type='text' placeholder='enter ur data' id='qr' value={qrdata} onChange={(e)=>setqrdata(e.target.value)}/>
      <label htmlFor='size'>Size of Image (e.g.,150px)</label>
      <input type='text' placeholder='specify the size' id='size' value={size} onChange={(e)=>setsize(e.target.value)}/>
      <div className='btnclass'>
        <div>
        <button className='genqr' onClick={Generateurl}>Generate QR</button>
        </div>
        <div>
        <button className='downqr' onClick={Downloadurl}>Download QR</button>
        </div>
      </div>
      </div>
      <p>Designed by <a> VIJAY </a></p>
    </div>
  )
}

export default QRgen
