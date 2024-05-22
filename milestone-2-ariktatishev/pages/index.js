import ClassLink from "../components/ClassLink";

export default function Home() {
  return (
    <div>
      <main>
        <section class="hero is-medium is-link">
          <div class="hero-body columns is-vcentered">
            <div className="column">
              <p class="title">Ask and share questions during class</p>
              <p class="subtitle">
                Quickly  a URL where you can post questions during class
                and see what other users are saying
              </p>
              <ClassLink />
            </div>
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
          </div>
        </section>

        <section class="hero is-medium">
          <div class="hero-body columns is-vcentered">
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
            <div className="column">
              <p class="title">
                Share questions with the class using a custom URL
              </p>
              <p class="subtitle">
                Create your own temporary URL where you can save questions and
                view them in real time.
              </p>
            </div>
          </div>
        </section>

        <section class="hero is-medium has-background-white-ter	">
          <div class="hero-body columns is-vcentered">
            <div className="column">
              <p class="title">Ask a question</p>
              <p class="subtitle">
                Write a new questions to share with the class. Delete it if you
                made a mistake.
              </p>
            </div>
            <div className="column">
              <figure>
                <img src="https://dummyimage.com/640x360/fff/aaa" />
              </figure>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
