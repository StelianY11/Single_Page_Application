import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { userService } from "../userService.js";

const loginTemplate = () => {
  return html` <section id="login">
    <section id="login">
      <div class="form" @submit=${submitHandler}>
        <img class="border" src="./images/border.png" alt="" />
        <h2>Login</h2>
        <form class="login-form">
          <input type="text" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <p class="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
        <img class="border" src="./images/border.png" alt="" />
      </div>
    </section>
  </section>`;
};
let context = null;
export function showLogin(ctx) {
  context = ctx;
  context.render(loginTemplate());
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
    return window.alert("Error");
  }
  await userService.login(email, password);

  context.goTo("/");
}
