import './UserCard.css';
import { useState } from 'react';


const UserCard = ({
    user,
    deleteUserById,
    editUserRole
}) => {

    const [modal, setModal] = useState(false);
    const roles = ['client', 'editor', 'admin'];

    const onClickBtn = (e) => {

        user.roles = e.target.innerText;
        editUserRole(user._id, user)
    }

    return (
        <>
            {modal ? (

                <div className='modal'>
                    <div className='modalContent'>
                        <p id='txtModal'>Do you want to delete this user?</p>
                        <button id="modalDel" onClick={() => deleteUserById(user._id)}>Delete</button>
                        <button id='modalCancel' onClick={() => setModal(false)}>Cancel</button>
                    </div>

                </div>)
                : ''
            }
            <div className="usersDiv">
                <div className='usersInfo'>
                    <h4 id='userName'>{user.username}</h4>
                    <p id={`${user.roles}`}>{user.roles}</p>
                    <div id='allBtns'>

                        {roles.map(btnRoles => <button key={btnRoles} onClick={onClickBtn} className='changeRoleBtn'>{btnRoles}</button>)}

                    </div>

                    {<div id='delUserBtn' onClick={() => setModal(true)}><p id='txtDel'>X</p></div>}
                </div>

            </div>
        </>

    )
}


export default UserCard;