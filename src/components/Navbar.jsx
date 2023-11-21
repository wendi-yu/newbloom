import UserProfile from "@/components/document/Header/UserProfile";

const NavbarSubSection = ({ subsectionName }) => {
  return <div 
    className='px-3 p-2 hover:bg-[#5C00B8] rounded'
    onClick={(e) => {
      print(e)
      // TODO: Do some routing here
    }}>
    {subsectionName}
  </div>
}

const NavbarSection = ({ title, subsections }) => {
  return <div className=' text-lg font-bold py-3'>
    {title}
    <div className='ml-3 my-2 text-base font-light'>
      <NavbarSubSection subsectionName={subsections[0]}/>
      <NavbarSubSection subsectionName={subsections[1]}/>
    </div>
  </div>

}

function Navbar() {
  return (
    <>
      <div className='fixed w-[350px] h-screen bg-[#340068] text-white'>
        <div className='grid grid-cols-1 divide-y divide-gray-400 m-[30px]'>
          <div className='h-[80px] text-2xl font-bold'>
            [redacted]
          </div>
          <NavbarSection title={"My Documents"} subsections={["To Redact", "In Progress"]}/>
          <NavbarSection title={"Shared"} subsections={["Review", "Completed"]}/>
        </div>
        <footer className='absolute bottom-2 inset-x-2'>
          <div className='w-full bg-[#5C00B8] rounded p-2'>
            <UserProfile/>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Navbar;
