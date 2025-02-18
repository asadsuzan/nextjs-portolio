
import Footer from '@/components/shared/Footer';
import NavBar from '@/components/shared/NavBar';



const CommonLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
        <header>
            <NavBar/>
        </header>
      <main className='flex-grow'>
      {children}
      </main>
      <Footer/>
        
        </div>
  )
}

export default CommonLayout