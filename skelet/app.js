import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "../skelet/src/userService.js";
import { userHelper } from "./src/userHelper.js";
import { showHome } from "./src/views/home.js";
import { showDashboard } from "./src/views/dashboard.js";
import { showAdd } from "./src/views/add.js";
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";
import { showEdit } from "./src/views/edit.js";
import { showDetails } from "./src/views/details.js";
const root = document.querySelector("main");
const userNav = document.querySelector(".user");
const guestNav = document.querySelector(".guest");
page(decorationContext);
page("/", showHome);
page("/dashboard", showDashboard);
page("/add", showAdd);
page("/login", showLogin);
page("/register", showRegister);
page("/edit/:id", showEdit);
page("/details/:id", showDetails);
page("/logout", logout);
page.start();
updateNav();
export async function logout() {
  await userService.logout();
  updateNav();
  goTo("/");
}

function renderer(template) {
  render(template, root);
}
function updateNav() {
  const userData = userHelper.getUserData();

  if (userData) {
    userNav.style.display = "block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "block";
  }
}
function goTo(path) {
  page.redirect(path);
}

function decorationContext(context, next) {
  context.render = renderer;
  context.updateNav = updateNav;
  context.goTo = goTo;

  next();
}
