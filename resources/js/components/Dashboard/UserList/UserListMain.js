import React, { 
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoadingPage from '../../Assets/LoadingPage';
import Header from '../../Header';
import { getUserList } from '../../../apis/api';
import { getCookie } from '../../../utilities/obtain_cookie';
// import { useStore } from '../../../utilities/store';


function UserListMain(props) {
  // const { user, loading } = props;

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstAttempt, setFirstAttempt] = useState(false);
  const [staff, setStaff] = useState([]);
  const [customer, setCustomer] = useState([]);
  // const manipulate = useStore(state => state.setData)

  var intervalId;

  const fetchIntervally = () => {
    intervalId = window.setInterval(() => {
      getUserList(getCookie('token'))
        .then(res => {
          if (res.status === 200) {
            const user = res.data.user
            if (res.data.status === 'Token is Expired') {
              return <Redirect to='/dashboard' />
            } else {
              setUserList(user)
            }
          } else {
            console.log('error getting user list')
          }
        })
      console.log('time elapsed 1800000 milisecond')
    }, 1800000)
  }

  useEffect(() => {
    if (firstAttempt === false) {
      getUserList(getCookie('token'))
      .then(res => {
        if (res.status === 200) {
          const user = res.data.user
          if (res.data.status === 'Token is Expired') {
            return <Redirect to='/dashboard' />
          } else {
            setUserList(user)
            user.forEach(el => {
              if ((el.role_names).toString() === 'customer') {
                console.log('customer');
              } else {
                console.log((el.role_names).toString());
              }
            });
          }
        } else {
          console.log('error getting user list')
        }

        if (firstAttempt === false) {
          setFirstAttempt(true)
        }

        setLoading(false)
      })
    } else {
      fetchIntervally();
    }

    return () => {
      setFirstAttempt(false)
      clearInterval(intervalId);
    }
  }, [])


  return (
    <div id="dashboard-content" className="px-16 pt-10 pb-16 ml-20 h-full overflow-auto">
      {loading ? 
        <LoadingPage height="full" width="full"/> : 
        <>
          <Header page='User List'/>
          {/* <button onClick={() => manipulate('data')}>set Data</button> */}
          <div id="page-content" className="flex w-full h-auto justify-center flex-col">
            <div id="users-information" className="h-auto w-full grid grid-cols-5 gap-8">
              <div id="information-1" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3+'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2+'px'}}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>All Users</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Users</span></span>
                </div>
              </div>
              <div id="information-2" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Active Users</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Users</span></span>
                </div>
              </div>
              <div id="information-3" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Awkowkowkowko</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Awkowkowokwokwok</span></span>
                </div>
              </div>
              <div id="information-4" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Awkowkowkowko</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Awkowkowokwokwok</span></span>
                </div>
              </div>
              <div id="information-5" className="w-full flex flex-row py-4 mb-16 box-border items-center" style={{ height: 110 + 'px', marginTop: 3 + 'px' }}>
                <span id="long-line" className="inline-block bg-gray-400 h-full mr-6" style={{ width: 2 + 'px' }}></span>
                <div id="information-container" className="flex-grow h-full py-2 flex flex-col justify-between">
                  <span id="information-title" className="text-sm text-gray-400" style={{ fontFamily: ['Inter', 'sans-serif'], fontWeight: 400 }}>Awkowkowkowko</span>
                  <span id="information-content" className="text-xl text-gray-600" style={{ fontWeight: 600 }}>{userList.length}<span id="additional-information" className="text-lg text-gray-600 inline-block ml-2" style={{ fontWeight: 600 }}>Awkowkowokwokwok</span></span>
                </div>
              </div>
            </div>
            <div id="list-user-wrapper" className="w-full grid grid-cols-5 h-auto gap-8">
              {userList.map((el, idx) => (
                <Link to={`userlist/user/${el.id}`} key={idx} className="w-full h-auto">
                  <div 
                    id="user-card-wrapper" 
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      fontFamily: ['Inter', 'sans-serif'],
                      height: 110 + 'px'
                    }}
                    className={`rounded w-full border-r-6 box-border ${(el.role_names).toString() === 'customer' ? 'border-blue-400' : 'border-red-400'} hover:border-green-400 transition-colors duration-300`}
                  >
                    <div id="user-card-content-wrapper" className="w-full h-full flex flex-row p-4">
                      <div id="left-content" className="h-full w-20 flex items-center justify-center">
                        <img src={el.avatar} alt="user" className="h-20 w-20 rounded object-cover"/>
                      </div>
                      <div id="right-content" className="h-full flex-grow flex flex-col justify-center ml-4">
                        <span id="user-name" className="text-gray-600" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>{el.first_name} {el.last_name}</span>
                        <span id="username" className="text-gray-400 text-sm" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>@{el.username}</span>
                        {(el.role_names[0]).toString() === 'customer' ? <span id="user-email" className="text-gray-700 text-sm" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 400}}>Saldo: <span id="user-bill" style={{fontWeight: 300}}>IDR 400.000</span></span> : null}
                      </div>
                    </div>
                  </div>
                </Link> 
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default UserListMain;