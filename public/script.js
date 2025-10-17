const formatter = new Intl.DateTimeFormat("tr-TR");
async function fetchPets() {
	try {
		const response = await fetch("/api/pets");
		const pets = await response.json();
		const petList = $("#pet-list");
		pets.forEach((pet) => {
			const listItem = $(`<li> ${pet.pet_name} (Microchip: ${pet.microchip_number}) </li>`)
			// const listItem = document.createElement("li");
			// listItem.textContent = `${pet.pet_name} (Microchip: ${pet.microchip_number})`;
			// listItem.addEventListener("click", () => SelectPetAndOwner(pet));
			listItem.on("click", () => SelectPetAndOwner(pet));
			petList.append(listItem);
		});
	} catch (error) {
		console.error("Error fetching pets:", error);
	}
}

async function fetchOwners() {
	try {
		const response = await fetch("/api/owners");
		const owners = await response.json();
		const ownerList = $("#owner-list");
		owners.forEach((owner) => {
			const listItem = $(`<li> Name: ${owner.name} (Phone: ${owner.phone_number})</li>`)
			listItem.on("click", async () => {
				const search_box = $("#owner-input");
				search_box.val(owner.name);
				await fetchOwnerPet();
			});
			ownerList.append(listItem);
		});
	} catch (error) {
		console.error("Error fetching owners:", error);
	}
}
async function fetchTotalPrices() {
	try {
		const response = await fetch("/api/owner_totals");
		const ownerPrices = await response.json();
		const ownerPriceList = $("#owner-total-list");
		ownerPrices.forEach((owner) => {
			const listItem = $(`<li> Name: ${owner.name} (Total Price: ${owner.total_price}$)</li>`);
			ownerPriceList.append(listItem);
		});
	} catch (error) {
		console.error("Error fetching owners:", error);
	}
}

async function fetchOwnerPet() {
	try {
		const oname_text = $("#owner-input").val();
		const response = await fetch(
			"/api/owner_pet?" + new URLSearchParams({ owner_name: oname_text })
		);
		const owners = await response.json();
		const ownerList = $("#owner-pet-list");
		ownerList.html("");
		owners.forEach((owner) => {
			const listItem = $(`<li> Name: ${owner.owner_name} (Pet: ${owner.pet_name}) </li>`);
			listItem.on("click", () => SelectPetAndOwner(owner));
			ownerList.append(listItem);
		});
	} catch (error) {
		console.error("Error fetching owners:", error);
	}
}
async function fetchIncomingVaccines() {
	try {
		const response = await fetch("/api/incoming_vaccines");
		const vaccines = await response.json();
		const vaccine_list = $("#incoming-vaccine-list");
		vaccines.forEach((vac) => {
			const listItem = $("<li>");
			const div_inside_list = $("<div>");

			let next_vac = new Date(vac.next_vaccination);

			const owner_name = $(`<p> Owner: ${vac.owner_name} </p>`);
			const pet_name = $(`<p> Pet: ${vac.pet_name}</p>`);
			const vaccine_name = $(`<p> Vaccine: ${vac.vaccine_name}</p>`);
			const scheduled_date = $(`<p> Scheduled: ${formatter.format(next_vac)}</p>`);


			div_inside_list.append(owner_name);
			div_inside_list.append(pet_name);
			div_inside_list.append(vaccine_name);
			div_inside_list.append(scheduled_date);

			listItem.append(div_inside_list);
			vaccine_list.append(listItem);
		});
	} catch (error) {
		console.error("error fetching vaccines: ", error);
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
	const safeVaccinesList = [];
	try {
		const safeVaccines = await fetch(
			`/api/safe_vaccines?` + new URLSearchParams({ pet_id, species_id })
		);

		const vaccines = await safeVaccines.json();
		vaccines.forEach((vaccine) => {
			safeVaccinesList.push(vaccine);
		});
	} catch (error) {
		console.error("error fetching safe vaccines:", error);
	}

	const vaccineList = document.getElementById("safe-vaccine-list");
	vaccineList.innerHTML = "";

	safeVaccinesList.forEach(async (vaccine) => {
		console.log("vaccine: ", vaccine);
		const listItem = document.createElement("li");
		const div_inside_list = document.createElement("div");
		const vaccine_name = document.createElement("p");
		const last_scheduled_date = document.createElement("p");

		vaccine_name.textContent = `Vaccine: ${vaccine.name}`;
		try {
			const lastVaccineResponse = await fetch(
				`/api/last_vaccine_date?` +
				new URLSearchParams({
					vaccine_id: vaccine.vaccine_id,
					pet_id: pet_id,
				})
			);

			const lastVaccine = await lastVaccineResponse.json();
			console.log(lastVaccine);
			if (lastVaccine[0]) {
				const vac_date = new Date(lastVaccine[0].last_vaccine_date);
				console.log(lastVaccine[0].last_vaccine_date);
				last_scheduled_date.textContent = `Next scheduled date: ${formatter.format(
					vac_date
				)}`;
			} else {
				last_scheduled_date.textContent = `Pet has not been vaccined with this. Suggested date: ${formatter.format(
					new Date()
				)}`;

			}
		} catch (error) {
			console.error("error displaying last vaccine:", error);
		}

		div_inside_list.appendChild(vaccine_name);
		div_inside_list.appendChild(last_scheduled_date);

		listItem.appendChild(div_inside_list);
		vaccineList.appendChild(listItem);
	});
}

// triggered when a pet is selected from the list
function SelectPetAndOwner(content) {
	let div = document.getElementById("selected-pet-section");

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
document.addEventListener("DOMContentLoaded", fetchTotalPrices);

const owner_pet_button = document.getElementById("owner-pet-search");
owner_pet_button.addEventListener("click", fetchOwnerPet);
