const NavbarSubSection = ({ subsectionName, onClick }) => {
  return <div
    className='px-3 p-2 hover:bg-violet-600 rounded'
    onClick={() => {
      onClick()
    }}>
    {subsectionName}
  </div>
}

const NavbarSection = ({ title, subsections, onClick }) => {
  return <div className=' text-lg font-semibold py-3'>
    {title}
    <div className='ml-3 my-2 text-base font-light'>
      {subsections.map((subsection) => {
        return <NavbarSubSection key={subsection} subsectionName={subsection} onClick={onClick}/>
      })}
    </div>
  </div>
}

export default NavbarSection