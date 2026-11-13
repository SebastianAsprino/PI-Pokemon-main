import NavBar from '../navbar/NavBar'
import Cards from '../cards/cards'
import Footer from '../footer/footer'

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