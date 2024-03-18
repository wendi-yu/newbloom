const NavbarSubSection = ({ subsectionName }) => {
  return <div
    className='px-3 p-2 hover:bg-violet-600 rounded'
    onClick={(e) => {
      print(e)
      // TODO: Do some routing here
    }}>
    {subsectionName}
  </div>
}

const NavbarSection = ({ title, subsections }) => {
  return <div className=' text-lg font-semibold py-3'>
    {title}
    <div className='ml-3 my-2 text-base font-light'>
      {subsections.map((subsection) => {
        return <NavbarSubSection key={subsection} subsectionName={subsection} />
      })}
    </div>
  </div>
}

export default NavbarSection