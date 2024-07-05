import BannerDataTable from '@/Components/Banner'
import ButtonAppBar from '@/Components/Navbar'
import React from 'react'

function Home() {
  return (
    <>
    <ButtonAppBar    />
    <div style={{ margin: '0 auto', padding: 20 }}>
      <BannerDataTable />
    </div>
    
        </>
  )
}

export default Home