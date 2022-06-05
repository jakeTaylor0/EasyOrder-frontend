import { click } from '@testing-library/user-event/dist/click'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return(
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to ="/" className='navbar-logo'>

                    </Link>
                    <div className='menu-icon'>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className = 'nav-links' onClick={closeMobileMenu}>
                                Create Order
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className = 'nav-links' onClick={closeMobileMenu}>
                                All Orders
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar