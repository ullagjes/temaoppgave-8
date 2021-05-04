import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { handleSignOut } from '../../utils/firebaseHelpers';

function NavBar() {

    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    if(loading){
        return(
        <>Loading...</>
        );
    };

    if(isAuthenticated === false) {
        router.push('/login');
        return <>You aren't logged in.</>
    };

    return (
        <nav>
            <Link href='/createquiz'>
                <a>Create</a>
            </Link>
            <Link href='/quizmaster/library'>
                <a>Library</a>
            </Link>
            <Link href='/quizmaster/profile'>
                <a>Profile</a>
            </Link>
            {user && <button onClick={handleSignOut}>Sign out</button>}
            {!user && <Link href='/login'><a>Sign in</a></Link>}
        </nav>
    );
}

export default NavBar;