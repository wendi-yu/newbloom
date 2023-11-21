import Navbar from "@/components/Navbar";

function Home() {
  return (
    <div className='grid grid-cols-2'>
      <div>
        <Navbar/>
      </div>
      <div className=''>
        HOME
      </div>
    </div>
  );
}

export default Home;
