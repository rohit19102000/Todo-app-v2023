
import { useEffect, useState } from 'react'
import { auth,googleProvider } from '../config/firebase'
import { signInWithPopup,signOut } from 'firebase/auth'


export default function Auth() {
 console.log(auth?.currentUser?.email)
 const [userPhotoURL, setUserPhotoURL] = useState(null);

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
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserPhotoURL(user.photoURL);
      } else {
        setUserPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="navbar-right">
        <button onClick={logOut} >Log out</button>
        <button onClick={signIn}>Sign In</button>
        {auth.currentUser ? (
        <img
          src={userPhotoURL}
          alt="User Profile"
          style={{ width: '50px', borderRadius: '50%' ,marginLeft:'25px',}}
        />
      ) : null}
    </div>

  )
}
