import './Users.css';
import UserCard from '../UserCard/UserCard';
import { connect } from 'react-redux';
import { fetchDeleteUser, fetchGetAllUsers, fetchPutUser } from "../../redux/actions/usersActions";
import { useEffect } from 'react';

const Users = (props) => {

    useEffect(() => {
        props.getAllUsers()
    }, [])

    const deleteUserFunction = (id) => {
        props.fetchDeleteUser(id)

    }

    const editRole = (userId, user) => [
        props.putUser(userId, user)
    ]

    return (
        <div className='userContent'>
            <h3>List of Users</h3>
            {props.users.map(user => <UserCard key={user._id} user={user} deleteUserById={deleteUserFunction} editUserRole={editRole} />)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.data,
        role: state.auth.user?.role
    }
}

const mapDispatchToProps = () => dispatch => {
    return {
        getAllUsers: () => dispatch(fetchGetAllUsers()),
        fetchDeleteUser: (id) => dispatch(fetchDeleteUser(id)),
        putUser: (id, userData) => dispatch(fetchPutUser(id, userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);