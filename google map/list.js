// Function to create a list item for a coffee place
function createListItem(place) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
        <h2>${place.title}</h2>
        <p>${place.description}</p>
        ${place.hasModalButton ? `<button style="background-color:rgb(12, 54, 12, 70%); border-radius: 20px; font-size: 14px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#${place.title.replace(/\s/g, '')}Modal">Read More</button>` : ''}
    `;
    return listItem;
}

// Function to create a modal for a coffee place
function createModal(place) {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = `${place.title.replace(/\s/g, '')}Modal`;
    modal.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${place.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="${place.image}" alt="${place.title}" class="modal-image">
            <p>${place.full}</p>
            <a href="${place.website}" target="_blank">Website</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;
    return modal;
}

// Fetch and parse the JSON data
async function fetchData() {
    const response = await fetch('markers.json');
    const coffeePlaces = await response.json();

    // Populate the list view
    const coffeeListContainer = document.getElementById("coffeeList");
    coffeePlaces.forEach(place => {
        const listItem = createListItem(place);
        const modal = createModal(place);
        coffeeListContainer.appendChild(listItem);
        document.body.appendChild(modal); // 모달을 바디에 추가
    });
}

// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {
    // Call the fetchData function
    fetchData();
});
