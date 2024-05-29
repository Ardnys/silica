// TODO fetch stuff here to display in the ui
async function fetchPets() {
  try {
    const response = await fetch("/api/pets");
    const pets = await response.json();
    const petList = document.getElementById("pet-list");
    pets.forEach((pet) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${pet.pet_name} (Microchip: ${pet.microchip_number})`;
      listItem.addEventListener("click", () =>
        SelectPetAndOwner({
          owner_name: pet.owner_name,
          pet_name: pet.pet_name,
        })
      );
      petList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching pets:", error);
  }
}

async function fetchOwners() {
  try {
    const response = await fetch("/api/owners");
    const owners = await response.json();
    const ownerList = document.getElementById("owner-list");
    owners.forEach((owner) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Name: ${owner.name} (Phone: ${owner.phone_number})`;
      listItem.addEventListener("click", async () => {
        const search_box = document.getElementById("owner-input");
        search_box.value = owner.name;
        await fetchOwnerPet();
      });
      ownerList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
  }
}
async function fetchTotalPrices() {
  try {
    const response = await fetch("/api/owner_totals");
    const ownerPrices = await response.json();
    const ownerPriceList = document.getElementById("owner-total-list");
    ownerPrices.forEach((owner) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Name: ${owner.name} (Total Price: ${owner.total_price}$)`;
      ownerPriceList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
  }
}

async function fetchOwnerPet() {
  try {
    const oname_text = document.getElementById("owner-input").value;
    const response = await fetch(
      "/api/owner_pet?" + new URLSearchParams({ owner_name: oname_text })
    );
    const owners = await response.json();
    const ownerList = document.getElementById("owner-pet-list");
    ownerList.innerHTML = "";
    owners.forEach((owner) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Name: ${owner.owner_name} (Pet: ${owner.pet_name})`;
      listItem.addEventListener("click", () => SelectPetAndOwner(owner));
      ownerList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
  }
}

// triggered when a pet is selected from the list
function SelectPetAndOwner(content) {
  let div = document.getElementById("selected-pet-section");
  div.hidden = false;
  let owner_name_p = document.getElementById("owner-name-v");
  let pet_name_p = document.getElementById("pet-name-v");
  owner_name_p.innerHTML = content.owner_name;
  pet_name_p.innerHTML = content.pet_name;
}

document.addEventListener("DOMContentLoaded", fetchPets);
document.addEventListener("DOMContentLoaded", fetchOwners);
document.addEventListener("DOMContentLoaded", fetchTotalPrices);

const owner_pet_button = document.getElementById("owner-pet-search");
owner_pet_button.addEventListener("click", fetchOwnerPet);
