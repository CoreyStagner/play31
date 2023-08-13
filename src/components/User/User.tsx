import React from "react";
// import styles from "./User.module.css";
// import { Card } from "react-bootstrap";
import { User as UserModel } from "../../models/user";
// import { formatDate } from "../../utils/formatDate";
// import { MdDelete } from "react-icons/md";
interface UserProps {
    user: UserModel,
    index: number,
    // onUserClick: (user: UserModel) => void,
    // onDeleteUserClick: (user: UserModel) => void,
    className?: string,
}

const User = ( { user, className, index,
    // onUserClick, 
    // onDeleteUserClick
    } : UserProps) => {
    const { username,
    firstName,
    lastName,
    email } = user;

    return (
        <tr key={index}>
            <td>{index}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{username}</td>
            <td>{email}</td>
        </tr>
    )
}

export default User;