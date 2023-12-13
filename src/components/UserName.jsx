
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
    <h3>hello {userName?.split(' ')[0]} </h3> :
     <h3>hello please log in </h3>
     }
     </div>
  )
}

export default UserName