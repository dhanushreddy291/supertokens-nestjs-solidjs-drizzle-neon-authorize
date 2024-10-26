import { createSignal, onMount, Show } from "solid-js";
import Todo from "./Todo";
import * as Session from "supertokens-web-js/recipe/session";
import "./App.css";

async function getUserInfo() {
  const session = await Session.doesSessionExist();
  if (session) {
    const userId = await Session.getUserId();
    console.log(Session);

    return { userId, session };
  }

  return { userId: null, session: false };
}

async function signOut() {
  await Session.signOut();
  window.location.reload();
}

function redirectToSignIn() {
  window.location.href = "/auth";
}

function App() {
  const [data, setData] = createSignal<{
    userId: string | null;
    session: boolean;
  }>({
    userId: null,
    session: false,
  });

  onMount(async () => {
    const { userId, session } = await getUserInfo();
    setData({ userId, session });
  });

  return (
    <main>
      <div class="body">
        <Show when={data().session}>
          <nav>
            <h1>Supertokens + Neon Authorize Demo</h1>
            <div class="logout">
              <p>Hello {data().userId}</p>
              <button onclick={signOut}>Sign Out</button>
            </div>
          </nav>
          <Todo />
        </Show>

        <Show when={!data().session}>
          <div class="logged-out">
            <img src="/neon.png" alt="Neon logo" class="neon-logo" />
            <p>
              Welcome to the Supertokens + Neon Authorize Demo. Please sign in
              to continue.
            </p>
            <p>
              Visit the <a href="https://supertokens.com">SuperTokens docs</a>{" "}
              to learn how to build Auth under a day.
            </p>
            <p>
              Visit the{" "}
              <a href="https://neon.tech/docs/introduction">Neon docs</a> to
              learn how to build a scalable, secure, and cost-effective backend.
            </p>
            <button onclick={redirectToSignIn}>Sign in</button>
          </div>
        </Show>
      </div>
    </main>
  );
}

export default App;
