import { html } from "../../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";
const dashboardTemplate = (data) => {
  if (data.length > 0)
    return html`
      <h2>Characters</h2>
      <section id="characters">${data.map((item) => character(item))}</section>
    `;
  else
    return html`
      <!-- Display an h2 if there are no posts -->
      <h2>No added Heroes yet.</h2>
    `;
};

const character = (item) => html` <div class="character">
  <img src="${item.imageUrl}" />
  <div class="hero-info">
    <h3 class="category">${item.category}</h3>
    <p class="description">${item.description}</p>
    <a class="details-btn" href="details/${item._id}">More Info</a>
  </div>
</div>`;
export async function showDashboard(ctx) {
  const data = await dataService.getAllCharacters();
  ctx.render(dashboardTemplate(data));
}
