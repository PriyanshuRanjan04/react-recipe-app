export default function ImproveSkills() {
    const list = [
        "Learn new recipes",
        "Experiment with food",
        "Write your own recipes",
        "Know nutrition facts",
        "Get cooking tips",
        "Get ranked"
    ]

    return (
        <div className="section improve-skills bg-skills-turmeric">
            <div className="col img">
                <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop" alt="Masala dosa" loading="lazy" />
            </div>
            <div className="col typography">
                <h1 className="title">Improve Your Culinary Skills</h1>
                {list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                ))}
                <button className="btn">signup now</button>
            </div>
        </div>
    )
}