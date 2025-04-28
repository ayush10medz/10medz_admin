import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Image404 from '../Assets/Images/404 Error-pana.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <>


          <main className=' flex flex-col items-center justify-start gap-[100px] lg:gap-[200px] px-3 lg:px-6'>
              <Header />
              <div className='container mx-auto max-w-[88rem] flex flex-col items-center justify-center'>
                  <img className='w-full'    src={Image404} alt="404 errror" />
                  <Link className='py-3 px-6 flex flex-col items-center justify-center text-[24px] text-white bg-[#FE6903] rounded-xl' to={"/"}> Go to  Home </Link>
             </div>
          </main>
          <Footer />

      </>
  )
}

export default NotFound
