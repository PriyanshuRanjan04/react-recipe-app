import ChiefCard from "./ChiefCard"

export default function ChiefsSection() {
    const chiefs = [
        {
            name: "Aarav Singh",
            img: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=640&auto=format&fit=crop",
            recipesCount: "28",
            cuisine: "Indian",
        },
        {
            name: "Lakshmi Rao",
            img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=640&auto=format&fit=crop",
            recipesCount: "22",
            cuisine: "South Indian",
        },
        {
            name: "Harpreet Kaur",
            img: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?q=80&w=640&auto=format&fit=crop",
            recipesCount: "19",
            cuisine: "Punjabi",
        },
        {
            name: "Zoya Khan",
            img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=640&auto=format&fit=crop",
            recipesCount: "17",
            cuisine: "Lucknowi",
        },
        {
            name: "Rohan Iyer",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop",
            recipesCount: "24",
            cuisine: "Maharashtrian",
        },
        {
            name: "Meera Nair",
            img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=640&auto=format&fit=crop",
            recipesCount: "21",
            cuisine: "Kerala",
        }
    ]
    return (
        <div className="section chiefs bg-chefs-mint">
            <h1 className="title">Our Top Chefs</h1>
            <div className="top-chiefs-container">
                {/* <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard /> */}
                {chiefs.map(chief => <ChiefCard key={chief.name} chief={chief} />)}
            </div>
        </div>
    )
}