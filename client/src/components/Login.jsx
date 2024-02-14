import React, { useContext } from 'react'
import {LoginContext} from "../context/LoginContext";

function Login() {

    const {login} = useContext(LoginContext);

    const nav = useNavigate();
    const [userType, setUserType] = useState('');
  
  
    useEffect(() => {
      console.log('userType in useEffect', userType)
      if (userType === '/bank') {
        nav(`/bank/Login`);
      } else if (userType === '/company') {
        nav(`/company/Login`);
      }
    }, [userType]);
  
  
    const handleLoginClick = (type) => {
      console.log('type', type)
      setUserType(type);
    };
  
    return (
      <div className="bank-header">
         {userType !== '/bank' ?
         (<button className='headerLog' onClick={() => handleLoginClick('/bank')}>Login</button>) :
         (<button className='headerLog' onClick={() => handleLoginClick('/company')}>Login</button>)
         }
      </div>
      )
}

export default Login