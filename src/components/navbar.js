import './navbar.css';
import { Link } from "react-router-dom";
import { auth } from "../config/firebase"; //because once authorisation is successful auth variable will have complete details about the user
import {useAuthState} from 'react-firebase-hooks/auth'; //we encountered a problem, that when the google account was changed, the corresponding profile picture didnt change, to solve that we are using this hook
import { signOut } from 'firebase/auth';


export function Navbar() {
    const[user] = useAuthState(auth); //current user info (it also has loading state and error if any)//thus everytime a new google account is registered the const [user] gets updated too, real time

    async function signUserOut(){
        await signOut(auth);
    }; 

    return (
        <div className='navbar'>
            <Link className='home' to="/" > Home </Link>
            
            { !user ? (
                <Link className='login' to="/login"> Login </Link>
             ) : (
                <Link className='createpost' to="/createpost"> Create post </Link>
            )
            }
                {/* <p> {auth.currentUser?.displayName} </p>
                <img src={auth.currentUser?.photoURL} width="75" />
                instead of using auth.currentUSer we will be using [user] from the hooked defined in line 6 */}
                <img className='pfp'  src={user?.photoURL} />
                <p className='name' > {user?.displayName} </p>
        </div>
    );
};