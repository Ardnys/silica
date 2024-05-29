const formatter = new Intl.DateTimeFormat("tr-TR");
async function fetchPets() {
	try {
		const response = await fetch("/api/pets");
		const pets = await response.json();
		const petList = document.getElementById("pet-list");
		pets.forEach((pet) => {
			const listItem = document.createElement("li");
			listItem.textContent = `${pet.pet_name} (Microchip: ${pet.microchip_number})`;
			listItem.addEventListener("click", () =>
				SelectPetAndOwner(pet)
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

async function fetchIncomingVaccines() {
	try {
		const response = await fetch("/api/incoming_vaccines");
		const vaccines = await response.json();
		const vaccine_list = document.getElementById("incoming-vaccine-list");
		vaccines.forEach((vac) => {
			const listItem = document.createElement("li");
			const div_inside_list = document.createElement("div");
			const owner_name = document.createElement("p");
			const pet_name = document.createElement("p");
			const vaccine_name = document.createElement("p");
			const scheduled_date = document.createElement("p");

			let next_vac = new Date(vac.next_vaccination);
			owner_name.textContent = `Owner: ${vac.owner_name}`;
			pet_name.textContent = `Pet: ${vac.pet_name}`;
			vaccine_name.textContent = `Vaccine: ${vac.vaccine_name}`;
			scheduled_date.textContent = `Scheduled: ${formatter.format(next_vac)}`;

			div_inside_list.appendChild(owner_name);
			div_inside_list.appendChild(pet_name);
			div_inside_list.appendChild(vaccine_name);
			div_inside_list.appendChild(scheduled_date);

			listItem.appendChild(div_inside_list);
			vaccine_list.appendChild(listItem);
		});
	} catch (error) {
		console.error("error fetching vaccines: ", error);
	}
}

async function fetchSafeVaccines(pet_id, species_id) {
	try {
		const response = await fetch(`/api/safe_vaccines?` + new URLSearchParams({ pet_id, species_id }));

		const vaccines = await response.json();
		const vaccineList = document.getElementById("safe-vaccine-list");
		vaccineList.innerHTML = "";
		vaccines.forEach((vaccine) => {
			const listItem = document.createElement("li");
			listItem.textContent = vaccine.name;
			vaccineList.appendChild(listItem);
		});
	} catch (error) {
		console.error("error fetching safe vaccines:", error);
	}
}


// triggered when a pet is selected from the list
function SelectPetAndOwner(content) {
	let div = document.getElementById("selected-pet-section");
	div.hidden = false;
	let owner_name_p = document.getElementById("owner-name-v");
	let pet_name_p = document.getElementById("pet-name-v");
	let pet_name_header = document.getElementById("pet-name-header");
	owner_name_p.innerHTML = content.owner_name;
	pet_name_p.innerHTML = content.pet_name;
	pet_name_header.innerHTML = content.pet_name;

	fetchSafeVaccines(content.pet_id, content.species_id);
}

document.addEventListener("DOMContentLoaded", fetchPets);
document.addEventListener("DOMContentLoaded", fetchOwners);
document.addEventListener("DOMContentLoaded", fetchIncomingVaccines);

const owner_pet_button = document.getElementById("owner-pet-search");
owner_pet_button.addEventListener("click", fetchOwnerPet);
