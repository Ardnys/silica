// TODO fetch stuff here to display in the ui
async function fetchPets() {
	try {
		const response = await fetch("/api/pets");
		const pets = await response.json();
		const petList = document.getElementById("pet-list");
		pets.forEach((pet) => {
			const listItem = document.createElement("li");
			listItem.textContent = `${pet.name} (Microchip: ${pet.microchip_number})`;
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
			ownerList.appendChild(listItem);
		});
	} catch (error) {
		console.error("Error fetching owners:", error);
	}
}

async function fetchOwnerPet() {
	try {
		const oname_text = document.getElementById("owner-input").value;
		console.log("oname: " + oname_text);
		const response = await fetch(
			"/api/owner_pet?" + new URLSearchParams({ owner_name: oname_text })
		);
		const owners = await response.json();
		console.log(owners);
		const ownerList = document.getElementById("owner-pet-list");
		owners.forEach((owner) => {
			const listItem = document.createElement("li");
			listItem.textContent = `Name: ${owner.owner_name} (Pet: ${owner.pet_name})`;
			ownerList.appendChild(listItem);
		});
	} catch (error) {
		console.error("Error fetching owners:", error);
	}
}

document.addEventListener("DOMContentLoaded", fetchPets);
document.addEventListener("DOMContentLoaded", fetchOwners);

const owner_pet_button = document.getElementById("owner-pet-search");
owner_pet_button.addEventListener("click", fetchOwnerPet);
