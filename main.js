let users = [
    {
        id:0,
        name: "John Doe",
        phone: "0123456789",
        email: "john@email.com",
        note: "johndoe",
        style: 'lightblue'
    },
    {
        id:1,
        name: "Maria Novak",
        phone: "+1 (312) 555-0146",
        email: "maria.novak@fastmail.com",
        note: "Study group partner — prefers texts over calls. Met at the Week 3 workshop.",
        style: '#2E63D6'
    },
    {
        id:2,
        name: "Liza Smith",
        phone: "0123456789",
        email: "liza@email.com",
        note: "meet on bus station",
        style: 'lightgreen'
    },
    {
        id:3,
        name: "Andrii Petrovych",
        phone: "0543456456",
        email: "Andrii@email.com",
        note: "meet on bus station",
        style: 'lightgreen'
    },
    {
        id:4,
        name: "Dima Andreiko",
        phone: "380 68 837 27 91",
        email: "dimaandreiko8888@email.com",
        note: "Fs dev",
        style: 'lightpink'
    },
    {
        id:5,
        name: "Ihor Ihor",
        phone: "380 50 854 29 57",
        email: "ihor06@email.com",
        note: "FS dev from IF",
        style: 'magenta'
    },
    {
        id:6,
        name: "Iliina Diana",
        phone: "380 97 876 29 67",
        email: "carrot997@email.com",
        note: "friend",
        style: 'lightgray'
    },
    {
        id:7,
        name: "John Sena",
        phone: "380 98 988 39 12",
        email: "johnSena@email.com",
        note: "Wrestling",
        style: 'lightgray'
    },
    {
        id:8,
        name: "Elon Musk",
        phone: "12567 765 543",
        email: "SpaceX@email.com",
        note: "",
        style: 'purple'
    },
    {
        id:9,
        name: "Zen Chen",
        phone: "49 83875 737",
        email: "chen@email.com",
        note: "",
        style: 'orange'
    }


]
const contactList = document.querySelector(".contact-list");
const avatar = document.querySelector(".avatar-mn");
const userName = document.querySelector(".user-info h1");

const userPhone = document.querySelector(".phone-field");
const userEmail = document.querySelector(".email-field");
const userNote = document.querySelector(".note-field");

let selectedUserId = null;

function sortUsers(usersToRender) {
    contactList.innerHTML = "";

    let savedUser = document.querySelector('.saved-users');
    savedUser.textContent = (`${users.length} saved`)

    const firstLetters = [...new Set(
        usersToRender.map(user => user.name[0].toUpperCase())
    )].sort();

    firstLetters.forEach(letter => {
        contactList.innerHTML += `
            <div class="letter-container">
                <h3>${letter}</h3>
                <ul></ul>
            </div>
        `;
    });

    document.querySelectorAll(".letter-container").forEach(container => {
        const letter = container.querySelector("h3").textContent;
        const ul = container.querySelector("ul");

        if (selectedUserId !== null) {
            const selectedContact = contactList.querySelector(
                `.contact[data-id="${selectedUserId}"]`
            );

            if (selectedContact) {
                selectContact(selectedContact);
            }
        }

        usersToRender.forEach(user => {
            if (user.name[0].toUpperCase() !== letter) return;

             const initials = user.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase();

            ul.innerHTML += `
                <li class="contact" data-id="${user.id}">
                    <div class="avatar" style="background-color:${user.style}">
                        ${initials}
                    </div>

                    <div class="contact-info">
                        <h4>${user.name}</h4>
                        <span class="phone">${user.phone}</span>
                        <span class="email" hidden>${user.email}</span>
                        <span class="note" hidden>${user.note}</span>
                    </div>
                </li>
            `;

        });

    });
}

function selectContact(contact) {
    contactList.querySelectorAll(".contact").forEach(item => {
        item.classList.remove("active");
    });

    contact.classList.add("active");

    const contactAvatar = contact.querySelector(".avatar");
    if (!contact) return;

    selectedUserId = Number(contact.dataset.id);

    userName.textContent = contact.querySelector("h4").textContent;

    userPhone.textContent =
        contact.querySelector(".phone")?.textContent || "";

    userEmail.textContent =
        contact.querySelector(".email")?.textContent || "";

    userNote.textContent =
        contact.querySelector(".note")?.textContent || "";

    avatar.textContent =
        contact.querySelector(".avatar")?.textContent || "";

    avatar.textContent = contactAvatar.textContent;

    avatar.style.backgroundColor = contactAvatar.style.backgroundColor;
}

contactList.addEventListener("click", (event) => {

    const contact = event.target.closest(".contact");

    if (!contact) return;

    selectContact(contact);
});

sortUsers(users);

const firstContact = contactList.querySelector(".contact");

if (firstContact) {
    selectContact(firstContact);
}


const search = document.getElementById("search");

search.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase()

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );

    sortUsers(filteredUsers);
});

addButton = document.querySelector(".add-btn");

const modal = document.getElementById("addModal");

const addBtn = document.querySelector(".add-btn");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");


addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
});


const modaalName = document.querySelector("#modal-name");
const modaalPhone = document.querySelector("#modal-phone");
const modaalEmail = document.querySelector("#modal-email");
const modaalNote = document.querySelector("#modal-note");
const modealColor = document.querySelector("#modal-color");


saveBtn.addEventListener("click", (event) => {
    users.push({
        id: users.length + 1,
        name: modaalName.value,
        phone: modaalPhone.value,
        email: modaalEmail.value,
        note: modaalNote.value,
        style: modealColor.value,
    },)

    sortUsers(users);

    modaalName.value = "";
    modaalPhone.value = "";
    modaalEmail.value = "";
    modaalNote.value = "";
    modealColor.value = "#2E63D6";

})


const modalEdit = document.getElementById("addModalEdit");
const editBtn = document.querySelector(".edit-btn");
const closeEditBtn = document.getElementById("close-editBtn");
const saveEditBtn = document.getElementById("save-editBtn");

editBtn.addEventListener("click", () => {
    modalEdit.classList.remove("hidden");
})

closeEditBtn.addEventListener("click", () => {
    modalEdit.classList.add("hidden");
});

const editName = document.querySelector("#edit-name");
const editPhone = document.querySelector("#edit-phone");
const editEmail = document.querySelector("#edit-email");
const editNote = document.querySelector("#edit-note");
const editColor = document.querySelector("#edit-color");

editBtn.addEventListener("click", () => {

    if (selectedUserId === null) return;

    const user = users.find(user => user.id === selectedUserId);

    editName.value = user.name;
    editPhone.value = user.phone;
    editEmail.value = user.email;
    editNote.value = user.note;
    editColor.value = user.style;

    sortUsers(users);

    modalEdit.classList.remove("hidden");
});

saveEditBtn.addEventListener("click", () => {

    const user = users.find(user => user.id === selectedUserId);

    user.name = editName.value;
    user.phone = editPhone.value;
    user.email = editEmail.value;
    user.note = editNote.value;
    user.style = editColor.value;

    sortUsers(users);

    modalEdit.classList.add("hidden");
});

const delete_modal = document.querySelector(".delete-modal");

const deleteBtn = document.querySelector(".delete-btn");
const buttonYes = document.querySelector(".button-yes");
const buttonNo = document.querySelector(".button-no");

buttonYes.addEventListener("click", () => {

    users = users.filter(user => user.id !== selectedUserId);

    sortUsers(users);

    selectedUserId = null;

    delete_modal.classList.add("hidden");

    const firstContact = contactList.querySelector(".contact");

    if (firstContact) {
        selectContact(firstContact);
    }
});


deleteBtn.addEventListener("click", () => {
    delete_modal.classList.remove("hidden");


});

buttonNo.addEventListener("click", () => {
    delete_modal.classList.add("hidden");
});
