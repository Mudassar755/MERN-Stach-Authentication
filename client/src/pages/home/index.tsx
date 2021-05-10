import React, { useContext, useEffect } from 'react'
import Slider from '../../components/Slider'
import { GlobalContext } from '../../context/GlobalState';

const Home = () => {
    const { loadUser, isAuthenticated } = useContext(GlobalContext);
    useEffect(() => {
        loadUser && loadUser()
    }, [])
    console.log("isAuthenticated", isAuthenticated)
    return (
        <div className="carousel-image-1">
            <div className="content text-center text-white">
                <h1 className="mb-3">Hello World</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident nostrum quo atque? Sequi adipisci inventore molestias! Veritatis in ratione, aliquam cum officiis vero quaerat repudiandae porro exercitationem nemo reiciendis quam recusandae perspiciatis eos, quae architecto sed. Repellat dolore optio nemo, harum temporibus cumque molestias fugiat? Facilis quos fugiat suscipit iste.</p>

            </div>
            {/* <Slider /> */}
        </div>
    )
}

export default Home
