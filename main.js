let users = [
    {
        name: "John Doe",
        phone: "0123456789",
        email: "john@email.com",
        note: "johndoe",
        style: 'lightblue'
    },
    {
        name: "Liza Smith",
        phone: "0123456789",
        email: "liza@email.com",
        note: "meet on bus station",
        style: 'lightgreen'
    },
    {
        name: "Andrii Petrovych",
        phone: "0543456456",
        email: "Andrii@email.com",
        note: "meet on bus station",
        style: 'lightgreen'
    },
    {
        name: "Dima Andreiko",
        phone: "380 68 837 27 91",
        email: "dimaandreiko8888@email.com",
        note: "Fs dev",
        style: 'lightpink'
    },
    {
        name: "Ihor Ihor",
        phone: "380 50 854 29 57",
        email: "ihor06@email.com",
        note: "FS dev from IF",
        style: 'magenta'
    },
    {
        name: "Iliina Diana",
        phone: "380 97 876 29 67",
        email: "carrot997@email.com",
        note: "friend",
        style: 'lightgray'
    },
    {
        name: "John Sena",
        phone: "380 98 988 39 12",
        email: "johnSena@email.com",
        note: "Wrestling",
        style: 'lightgray'
    },
    {
        name: "Elon Musk",
        phone: "12567 765 543",
        email: "SpaceX@email.com",
        note: "",
        style: 'purple'
    },
    {
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

function sortUsers(){
    const firstLetter = new Set();
    users.forEach(user => {
        firstLetter.add(user.name[0]);
    })

    const sortedLetters = [...firstLetter].sort();
    sortedLetters.forEach((letter) => {
        contactList.innerHTML +=
            `<div class="letter-container">\n
                <h3>${letter}</h3>
                <ul></ul>\n
            </div>`
    })

    document.querySelectorAll(".letter-container").forEach(container => {

        const letter = container.querySelector("h3").textContent;

        users.forEach(user => {

            const initials = user["name"].match(/\b\w/g).join('');
            const ul = container.querySelector("ul");

            if (user.name[0] == letter) {
                ul.innerHTML += `            
                           <li class=\"contact\">\n
                            <div class="avatar" style="background-color: ${user.style}">${initials}</div>\n
                            <div class=\"contact-info\">\n
                              <h4>${user.name}</h4>\n
                              <span class=\"phone\">${user.phone}</span>\n 
                             <span class=\"email\" hidden>${user.email}</span>\n 
                              <span class=\"note\" hidden>${user.note}</span>\n 
                            </div>\n
                          </li>`
            }
        })
    })
}

sortUsers();



contactList.addEventListener("click", (event) => {

    const contact = event.target.closest(".contact");

    if (!contact) return;

    contactList.querySelectorAll(".contact").forEach(item => {
        item.classList.remove("active");
    });

    contact.classList.add("active");

    const contactAvatar = contact.querySelector(".avatar");
    if (!contact) return;

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
});
