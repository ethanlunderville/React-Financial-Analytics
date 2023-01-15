import React from 'react'
import Logo from './techlogo.jpg'

function About() {
  return (
    <>
    <div id="form-mount-point">
      <div id="form-box">
        <img src={Logo} height="160 px;" width="160 px;"/>
          <div id="form-about">
            <p id="textbox">
              <br/>
                            Designed to help you analyze your finances with full privacy.
                          None of your data is collected and all business logic is
                          done on your computer locally. No servers involved! 
            </p>
          </div>
      </div>
    </div>
    </>
  )
}

export default About