// Home — The main landing page of ShoppyGlobe.
// The Header now lives in the app layout, so we just show the product list.

import { useSelector } from 'react-redux'
import { selectSearchTerm } from '../../redux/slices/searchSlice'
import ProductList from '../../components/ProductList'

function Home() {
  const searchTerm = useSelector(selectSearchTerm)
  const isSearching = searchTerm.trim() !== ''

  return (
    <div className="home">
      {/* Hide the banner while the user is searching */}
      {!isSearching && (
        <section className="home-banner">
          <img
            src="/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
            alt="ShoppyGlobe banner"
            className="home-banner-image"
          />
        </section>
      )}

      <ProductList />
    </div>
  )
}

export default Home
