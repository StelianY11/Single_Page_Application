import { html } from "../../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";
import { userHelper } from "../userHelper.js";
const detailsTemplate = (item, isOwner) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${item.imageUrl}" alt="example1" />
    <div>
      <p id="details-category">${item.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${item.description}</p>
          <p id="more-info">${item.moreInfo}</p>
        </div>
      </div>
      <h3>Is This Useful:<span id="likes">0</span></h3>

      <!--Edit and Delete are only for creator-->
      ${isOwner
        ? html`  <div id="action-buttons">
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a href="" id="like-btn">Like</a>
        <a href="" @click="${deleteCharacter} id="delete-btn">Delete</a></div>
`
        : ""}

      <!--Bonus - Only for logged-in users ( not authors )-->
    </div>
  </div>
</section>`;
let context = null;
export async function showDetails(ctx) {
  context = ctx;
  const id = ctx.params.id;
  const data = await dataService.getSingleCharacterDetails(id);
  let isOwner = false;
  if (userHelper.getUserData() !== null) {
    isOwner = userHelper.getUserId() === data._ownerId;
  }
  ctx.render(detailsTemplate(data, isOwner));
}
async function deleteCharacter(e) {
  e.preventDefault();
  const confirmed = window.confirm(`Are you sure you want to delete`);
  if (confirmed) {
    await dataService.deleteCharacter(context.params.id);
  }

  context.goTo("/dashboard");
}
