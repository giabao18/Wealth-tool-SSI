import './Home.scss'
//component
import CardList from 'src/components/homeComponents/homeBody'
import HeaderHome from 'src/components/homeComponents/homeHeader'
import BoxIconContent from 'src/components/iconContent/BoxIconContent'
import Footer from 'src/components/footer'

function Home() {
    return (
        <>
            <div className="home_wrapper">
                <div className="header_background">
                    <div className="container">
                        <HeaderHome />
                    </div>
                </div>
                <div className="content_background">
                    <section className="container">
                        <div className="position_absolute">
                            <div className="position_container">
                                <BoxIconContent />
                            </div>
                        </div>
                        <div className="row row_list">
                            <div className="card_list">
                                <CardList />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="footer_desktop">
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Home
