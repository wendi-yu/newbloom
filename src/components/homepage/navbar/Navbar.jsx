import UserProfile from "@/components/document/Header/UserProfile";
import NavbarSection from "@/components/homepage/navbar/NavbarSection";

const Navbar = () => {
  const sections = {
    // TODO: When you implement the actions for clicking the subsections, change this structure
    'My Documents': ['To Redact', 'In Progress'],
    'Shared': ['Review', 'Completed'],
  }

  return (
    <div className='fixed w-[350px] h-screen bg-violet-950 text-white'>
      <div className='grid grid-cols-1 divide-y divide-gray-400 m-[30px]'>
        <div className='h-[80px] text-2xl font-bold'>
          [redacted]
        </div>
        {Object.entries(sections).map(([key, value]) => {
          return <NavbarSection key={key} title={key} subsections={value} />
        })}
      </div>
      <footer className='absolute bottom-2 inset-x-2'>
        <div className='w-full bg-violet-600 rounded p-2'>
          <UserProfile />
        </div>
      </footer>
    </div>
  );
}

export default Navbar;
