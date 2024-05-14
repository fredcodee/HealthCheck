import React from 'react'

const DoctorPage = () => {
  return (
    <div>
        <div className="content-profile-page">
                <div className="profile-user-page card">
                    <div className="img-user-profile">
                        <img className="profile-bgHome" src= {bg} />
                        <img className="avatar" src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" alt="jofpin" />
                    </div>
                    <button>Book</button>
                    <div className="user-profile-data">
                        <h1>Jose Pino</h1>
                        <p>github.com/jofpin</p>
                    </div>
                    <div className="description-profile">Front-end | Security Researcher | CSS Warrior | <a href="https://twitter.com/bullgit" title="bullgit"><strong>@bullgit</strong></a> | I love to create small things for the internet!</div>
                    <ul className="data-user">
                        <li><a><strong>3390</strong><span>Posts</span></a></li>
                        <li><a><strong>718</strong><span>Followers</span></a></li>
                        <li><a><strong>239</strong><span>Following</span></a></li>
                    </ul>
                </div>
            </div>
    </div>
  )
}

export default DoctorPage