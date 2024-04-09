import UserProfile from "@/components/document/Header/UserProfile";
import NavbarSection from "@/components/homepage/navbar/NavbarSection";
import LogoIcon from "@/assets/new_logo.svg";
import LocalStore from "@/util/localDocStore";

const Navbar = ({updateDocSection}) => {
  const sections = {
    // TODO: When you implement the actions for clicking the subsections, change this structure
    'My Documents': [LocalStore.DOC_STATUS.New, LocalStore.DOC_STATUS.InProgress, LocalStore.DOC_STATUS.Completed],
  }

  return (
    <div className='fixed w-80 h-screen bg-violet-950 text-white'>
      <div className='grid grid-cols-1 divide-y divide-gray-400 m-8'>
        <div className='flex flex-row items-center space-x-1.5 pb-5'>
          <img src={LogoIcon} alt="NewBloom Logo" className="h-10"/>
          <div className='text-2xl font-semibold'>
            newbloom
          </div>
        </div>
        {Object.entries(sections).map(([sectionTitle, subsection]) => {
          return <NavbarSection key={sectionTitle} title={sectionTitle} subsections={subsection} updateDocSection={(section) => {updateDocSection(section)}}/>
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
