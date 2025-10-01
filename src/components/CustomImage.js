export default function CustomImage({ imgSrc, pt }) {
    return (
        <div className="custom-image" style={{ paddingTop: pt }}>
            <img
                src={imgSrc}
                alt="Dish photo from Dishcovery"
                loading="lazy"
                width="800"
                height="600"
                srcSet={`${imgSrc}&w=480 480w, ${imgSrc}&w=800 800w, ${imgSrc}&w=1200 1200w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
        </div>
    )
}