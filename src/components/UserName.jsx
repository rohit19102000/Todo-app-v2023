
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase'

function UserName() {
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            // If the user is logged in, update the state with the user's name
            setUserName(user.displayName);
          } else {
            // If the user is logged out, set the name to null or any default value
            setUserName(null);
          }
        });
    
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, []); // Empty dependency array ensures the effect runs only once on mount
    
    
  return (
    <div>
    {auth?.currentUser?
    <h3>hello {userName} v3 started| firebase auth implementation</h3> :
     <h3>v3 started| firebase auth implementation</h3>}
     </div>
  )
}

export default UserName