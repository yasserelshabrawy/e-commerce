import React from 'react'

export default function Footer() {
  return (
    <>
    <footer >

    <div className='bg-main-light'>
    <div className="container p-4">
        <h2>Get the FreshCart App</h2>
        <p>we will send you a link lorem, ipsuem dolor.</p>
        <div className="row py-3">
            <div className="col-md-10">
                <input type="email" placeholder='Email' className='form-control' />
            </div>
            <div className="col-md-2">
                <button className='btn bg-main text-center text-white'>Send Link</button>
            </div>
        </div>
    </div>
    </div>
    </footer>
    </>
  )
}
