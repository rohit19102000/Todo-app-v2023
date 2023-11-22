
import { auth,googleProvider } from '../config/firebase'
import { signInWithPopup,signOut } from 'firebase/auth'

export default function Auth() {
 console.log(auth?.currentUser?.email)

const signIn = async() => {
try{
    await signInWithPopup(auth,googleProvider)
}catch(err){
    console.error(err);
}
}

const logOut = async() =>{
try{
    await signOut(auth)
}catch(err){
    console.error(err);
}
}

  return (
    <div className="navbar-right">
        <button onClick={logOut} >Log out</button>
        <button onClick={signIn}>Sign In</button>
        <span>User Profile</span>
    </div>

  )
}
