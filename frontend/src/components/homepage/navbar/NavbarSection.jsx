import LocalStore from "@/util/localDocStore";

const getSectionName = (status) => {
  switch(status) {
    case LocalStore.DOC_STATUS.New:
      return 'To Redact';
    case LocalStore.DOC_STATUS.InProgress:
      return 'In Progress';
    case LocalStore.DOC_STATUS.Completed:
      return 'Completed';
  }
}

const NavbarSubSection = ({ subsection, updateDocSection }) => {
  return <div
    className='px-3 p-2 hover:bg-violet-600 rounded'
    onClick={() => {
      updateDocSection(subsection)
    }}>
    {getSectionName(subsection)}
  </div>
}

const NavbarSection = ({ title, subsections, updateDocSection }) => {
  return <div className=' text-lg font-semibold py-3'>
    {title}
    <div className='ml-3 my-2 text-base font-light'>
      {subsections.map((subsection) => {
        return <NavbarSubSection key={subsection} subsection={subsection} updateDocSection={(section) => {updateDocSection(section)}}/>
      })}
    </div>
  </div>
}

export default NavbarSection