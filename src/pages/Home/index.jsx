// Home — The main landing page of ShoppyGlobe.
// Shows the header and the product list area.

import Header from '../../components/Header'
import ProductList from '../../components/ProductList'

function Home() {
  return (
    <div className="home">
      <Header />
      <ProductList />
    </div>
  )
}

export default Home
