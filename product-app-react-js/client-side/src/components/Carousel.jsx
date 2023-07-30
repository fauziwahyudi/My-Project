import video from '../assets/hermes-video.mp4'
import video2 from '../assets/video2.mp4'
export default function Carousel() {
    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">

                        <video style={{ height: "600px" }} className="d-block w-100" loop muted autoPlay="autoPlay">
                            <source src={video} type='video/mp4' />
                        </video>

                        <div className="carousel-caption d-none d-md-block">
                            <h5>Welcome to the world of Hermès:</h5>
                            <p> In 1837 Thierry Hermes opened his workshop making the finest quality harnesses and saddles in the heart of Paris. </p>
                            <p>Astonishing orange! Orange is first and foremost about the box. Held in the hands, it is the promise of a gift.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <video style={{ height: "600px" }} className="d-block w-100" loop muted autoPlay="autoPlay">
                            <source src={video2} type='video/mp4' />
                        </video>
                    
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Welcome to the world of Hermès:</h5>
                            <p>Today Hermes is still a family company whose craftspeople make, often by hand and always with love , bags and belts, </p>
                            <p>diaries and dishes, scarves and shoes, perfumes and purses, ties and travelling furniture, as well as gloves, </p>
                            <p>hats, watches, jewellery and clothes.</p>
                        </div>
                    </div>
                    <div className="carousel-item" style={{width: "1600px", height: "600px", overflow: "hidden"}}>
                    <img src="https://assets.hermes.com/is/image/hermesedito/P_169_Opening_Aspen_USA_2023?fit=wrap%2C0&wid=1280" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Hermès Brings its Signature to Aspen</h5>
                            <p>A welcoming chalet surrounded with mountains and trees, the Aspen store in Colorado opens June 16th, 2023. Inspired by the calm and peaceful surroundings, Hermès invites customers to explore its abundant collections in place where creation vibrates in unison with nature.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


        </>
    )
}