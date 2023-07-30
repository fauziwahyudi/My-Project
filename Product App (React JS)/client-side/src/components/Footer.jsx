import playStore from '../assets/play-store.png'
import appStore from '../assets/app-store.png'
import logohermes from '../assets/pngegg.png'

export default function Footer() {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col1">
                            <h3>Download Our App</h3>
                            <p>Download App for Android and ios mobile phone.</p>
                            <div className="app-logo">
                                <img src={playStore} />
                                <img style={{ marginLeft: "10px" }} src={appStore} />
                            </div>
                        </div>
                        <div className="footer-col2">
                            <img src={logohermes} />
                            <p>Receive our newsletter and discover our stories, collections, and surprises.</p>
                        </div>
                        <div className="footer-col3">
                            <h3>Useful Links</h3>
                            <ul>
                                <li>Coupons</li>
                                <li>Blog Post</li>
                                <li>Return Policy</li>
                                <li>Join Affiliate</li>
                            </ul>
                        </div>
                        <div className="footer-col4">
                            <h3>Follow Us</h3>
                            <ul>
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                                <li>YouTube</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <p className="copyright">© Hermès 2023. All rights reserved.</p>
                </div>

            </div>
        </>
    )
}