// import React from 'react';

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../context/authContext';
// import { handleSignOut } from '../../utils/firebaseHelpers';

// import NavBarComponent from './NavBarComponent'
// import { NavLink } from '../BaseComponents';

// function NavBar() {

//     const { user, isAuthenticated, loading } = useAuth();
//     const router = useRouter();
//     if(loading){
//         return(
//         <>Loading...</>
//         );
//     };

//     if(isAuthenticated === false) {
//         router.push('/login');
//         return <>You aren't logged in.</>
//     };

//     return (
//         <NavBarComponent>
//             <Link href='/createquiz'>
//                 <NavLink>Create</NavLink>
//             </Link>
//             <Link href='/quizmaster/library'>
//                 <NavLink>Library</NavLink>
//             </Link>
//             <Link href='/quizmaster/profile'>
//                 <NavLink>Profile</NavLink>
//             </Link>
//             {user && <button onClick={handleSignOut}>Sign out</button>}
//             {!user && <Link href='/login'><a>Sign in</a></Link>}
//         </NavBarComponent>
//     );
// }

// export default NavBar;