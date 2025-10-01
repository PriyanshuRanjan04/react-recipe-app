import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"


export default function ChiefCard({ chief }) {
    return (
        <div className="chief-card">
            <img
                src={chief.img}
                alt={`${chief.name}, ${chief.cuisine} chef`}
                loading="lazy"
                width="320"
                height="240"
                srcSet={`${chief.img}&w=320 320w, ${chief.img}&w=480 480w, ${chief.img}&w=640 640w`}
                sizes="(max-width: 640px) 100vw, 320px"
            />
            <div className="chief-card-info">
                <h3 className="chief-card-name">{chief.name}</h3>
                <p className="chief-recipe-count">Recipes: <b>{chief.recipesCount}</b></p>
                <p className="chief-cuisine">Cuisine: <b>{chief.cuisine}</b></p>
                <p className="cheif-icons">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                </p>
            </div>
        </div>
    )
}