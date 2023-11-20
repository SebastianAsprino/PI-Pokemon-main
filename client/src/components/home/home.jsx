import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Cards from '../../components/cards/cards'
import Footer from '../../components/footer/footer'

function Home() {
  return (
    <div>
      <NavBar/>
      <section>
        <Cards/>
      </section>
      <Footer/>
    </div>
  )
}

export default Home