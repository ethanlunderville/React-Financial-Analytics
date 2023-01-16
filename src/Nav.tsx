import React from 'react'
import Logo from './techlogo.jpg'

function Nav( {setManager}: any ) {

return (
  <>
    <nav className="navbar navbar-expand-sm navbar-light"> 
    <img src={Logo} alt="" height="50 px;" width="50 px;" />
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end container-fluid" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setManager(0)}>Generate Insights</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setManager(2)}>Help</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href = "mailto: ethanjlunderville@gmail.com">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setManager(1)}>About</a>
          </li>
        </ul>
      </div>
    </nav>
  </>
  );
}

export default Nav