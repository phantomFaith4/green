import React from 'react'
import './accountSettingsComponent.css';

const AccountSettingsComponent = () => {
  return (
    <div className='accountSettingsComponent'>
        <div className="accountSettingsComponentContainer">
          <div className="profileImageDiv">
            <img className='profileImage' src={'https://qph.cf2.quoracdn.net/main-qimg-965b11ec95106e64d37f5c380802c305-lq'} alt='' />
            <div className='editIconDiv'>
              <i class="fa-solid fa-pen"></i>
            </div>
          </div>
          <div className='userInfoDiv'>
            <div>
              <div className='nameHolderDiv'>
                <span>Ernad</span>
              </div>
              <div className='nameHolderDiv'>
                <span>Karahasanovic</span>
                </div>
            </div>
            <div>
              <div className='nameHolderDiv'>
                <span>phantomFaith4@gmail</span>
                </div>
              <div className='nameHolderDiv'>
              <span>061449540</span>
                </div>
            </div>
          </div>
          <div className='editSettingsDiv'>
            <div className='editSettingsButton'>
              <i class="fa-solid fa-pen"></i>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AccountSettingsComponent