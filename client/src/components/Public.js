import { Link } from "react-router-dom"

import React from 'react'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown beirut City, Dan D. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Dan D. Repairs<br />
                    1001-1002 beirut<br />
                    beirut, baabda ,1001<br />
                    <a href="tel:+96170657776">+961 70657776</a>
                </address>
                <br />
                <p>Owner: Dan Davidson</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public