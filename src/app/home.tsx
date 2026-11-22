




import Link from "next/link";



const homeImage =
  "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1200&h=1200";

export default function Home() {
  return (
    <div className="app-shell">
     

      <main className="home">
        <section className="home-hero">
          <div className="home-copy">
            <span className="eyebrow">
              Your campus, all in one place
            </span>

            <h1>
              There’s always
              <br />
              something <em>happening.</em>
            </h1>

            <p>
              Find talks, workshops, performances, and the people
              who make campus feel like yours.
            </p>

            <div className="hero-buttons">
              <Link href="/events" className="button primary">
                Explore events
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/events/create" className="text-button">
                Host an event
              </Link>
            </div>
          </div>

          <div className="home-photo">
            <img
              src={homeImage}
              alt="Students spending time together on campus"
            />

            <div className="next-up">
              <span className="date-chip">
                
                <small></small>
              </span>

              <div>
                <small>NEXT ON CAMPUS</small>
                <strong>Random Campus Event</strong>
                <p></p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-strip">
          <div>
            
            <span>campus events</span>
          </div>

          <div>
            <strong>6</strong>
            <span>event categories</span>
          </div>

          <div>
            
            <span>campus to explore</span>
          </div>

          <Link href="/events">
            See what’s on <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

     
    </div>
  );
}

