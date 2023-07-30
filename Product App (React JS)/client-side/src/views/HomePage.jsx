
import Card from '../components/Card'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/actions/actionCreator';
import Carousel from '../components/Carousel';

export default function HomePage() {

    const [loading, setLoading] = useState(true)

    const products = useSelector((state) => state.productReducer.products)
    const dispatch = useDispatch()
    // console.log(products);

    useEffect(() => {
        dispatch(fetchProducts())
            .then(() => {
                setLoading(false)
            })
    }, [])
    // console.log(products);

    const [query, setQuery] = useState("")

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide" style={{ marginTop: "110px" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <Carousel />

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div id='product' className="container">
                {/* Section Search */}
                <div className='row justify-content-center mb-2'>
                    <div className='col-8'>
                        <h2 className='text-center tagline mb-4 mt-5'>All Product</h2>

                        <div className='input-group'>

                            <form className='d-flex w-100'>
                                <input className='searchInput' placeholder='search something...' onChange={(e) => setQuery(e.target.value)} />
                                <button className='primaryBtn'>Search</button>
                            </form>
                        </div>
                    </div>
                </div>


                {/* Product Card */}
                <div className='row'>{
                    products.filter((el) => el.name.toLowerCase().includes(query)).map((el) => {
                        return (
                            <Card
                                key={el.id}
                                product={el}
                            />

                        )
                    })}

                </div>
            </div>

        </>
    )
}