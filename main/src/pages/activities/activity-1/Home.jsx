import "./Home.css";

const Home = () => {
    return (
        <main className="container">
            <h1>React App</h1>
            <p>This is a simple landing page, where you can see the some of the information and features of our website.</p>
            <section>
                <p>Here are our members:</p>

                <ul>
                    <li>Grotes, Saint Mark D.</li>
                    <li>Mediante, Arvin Clark G.</li>
                    <li>Ostulano, Janna M.</li>
                    <li>Versaga, Jullever D.</li>
                </ul>
            </section>
        </main>
    )
}

export default Home;