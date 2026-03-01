import { Box } from 'lucide-react'
import React from 'react'
import Button from './ui/Button'
import { useOutletContext } from 'react-router'

function Header() {
  const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>()
  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();

      } catch (error) {
        console.error("Error signing out:", error);
      }
      return
    }

    try {
      await signIn();
    } catch (error) {
      console.error(`Puter Sign in Failed: ${error}`)
    }

  }

  return (
    <header className='navbar'>
      <nav className='inner'>
        <div className='left'>
          <div className="brand">
            <Box className='logo' />
            <span className="name">
              Roomify
            </span>
          </div>
          <ul className='links'>
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className='actions'>

          {isSignedIn ? (
            <>
              <span>
                {userName ? `Welcome, ${userName}` : 'Welcome'}
              </span>
              <Button className='btn' size='sm' onClick={handleAuthClick}>
                Log Out
              </Button>
            </>
          ) : (
            <>

              <Button variant='ghost' className='login ' size='sm' onClick={handleAuthClick}>
                Login
              </Button>
              <a href="#upload" className='cta'>Get Started</a>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header