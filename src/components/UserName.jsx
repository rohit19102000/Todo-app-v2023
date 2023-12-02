
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase'


function UserName() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
        
            setUserName(user.displayName);
          } else {
        
            setUserName(null);
          }
        });
    
        
        return () => unsubscribe();
      }, []); 
    
    
  return (
    <div>
    {auth?.currentUser?
    <h3>hello {userName.split(' ')[0]}  v3 started | firebase auth implementation</h3> :
     <h3>v3 started| firebase auth implementation</h3>
     }
     </div>
  )
}

export default UserName