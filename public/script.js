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

document.addEventListener("DOMContentLoaded", fetchPets);
