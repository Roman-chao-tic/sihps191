/*
====================================================
PROBLEM STATEMENT DATA
====================================================

For now, the data is stored here.

Later, you can replace this array with:
- Firebase
- Supabase
- MySQL
- MongoDB
- REST API
- Any backend/database

The rest of the website does NOT need to change.
====================================================
*/

const problems = [

    {
        id: 1,

        organization:
            "Ministry of Development of North Eastern Region (MDoNER)",

        title:
            "AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)",

        category:
            "Software",

        theme:
            "MedTech / BioTech / HealthTech"
    }

    // ADD MORE PROBLEMS HERE
];



/*
====================================================
ELEMENTS
====================================================
*/

const problemGrid =
    document.getElementById("problemGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const themeFilter =
    document.getElementById("themeFilter");

const problemCount =
    document.getElementById("problemCount");

const emptyState =
    document.getElementById("emptyState");



/*
====================================================
CREATE FILTER OPTIONS
====================================================
*/

function createFilters() {

    const categories = [
        ...new Set(
            problems.map(problem => problem.category)
        )
    ];

    const themes = [
        ...new Set(
            problems.map(problem => problem.theme)
        )
    ];


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });


    themes.forEach(theme => {

        const option =
            document.createElement("option");

        option.value = theme;

        option.textContent = theme;

        themeFilter.appendChild(option);

    });

}



/*
====================================================
DISPLAY PROBLEMS
====================================================
*/

function displayProblems(data) {

    problemGrid.innerHTML = "";

    problemCount.textContent = data.length;


    if (data.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    data.forEach(problem => {

        const card =
            document.createElement("article");

        card.className = "problem-card";


        card.innerHTML = `

            <div class="card-top">

                <span class="category">
                    ${problem.category}
                </span>

                <span class="card-number">
                    #${String(problem.id).padStart(3, "0")}
                </span>

            </div>


            <h3>
                ${problem.title}
            </h3>


            <div class="organization">

                Organization

                <strong>
                    ${problem.organization}
                </strong>

            </div>


            <div class="card-bottom">

                <div class="theme">
                    Theme:
                    <strong>
                        ${problem.theme}
                    </strong>
                </div>

                <div class="view-button">
                    View →
                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            () => openModal(problem)
        );


        problemGrid.appendChild(card);

    });

}



/*
====================================================
SEARCH + FILTER
====================================================
*/

function filterProblems() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const theme =
        themeFilter.value;


    const filtered =
        problems.filter(problem => {


            const matchesSearch =

                problem.title
                    .toLowerCase()
                    .includes(search)

                ||

                problem.organization
                    .toLowerCase()
                    .includes(search)

                ||

                problem.theme
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =

                category === "all"
                ||
                problem.category === category;


            const matchesTheme =

                theme === "all"
                ||
                problem.theme === theme;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesTheme
            );

        });


    displayProblems(filtered);

}



/*
====================================================
MODAL
====================================================
*/

const modal =
    document.getElementById("modal");

const closeModalButton =
    document.getElementById("closeModal");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalOrganization =
    document.getElementById("modalOrganization");

const modalTheme =
    document.getElementById("modalTheme");



function openModal(problem) {

    modalCategory.textContent =
        problem.category;

    modalTitle.textContent =
        problem.title;

    modalOrganization.textContent =
        problem.organization;

    modalTheme.textContent =
        problem.theme;


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}



function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}



closeModalButton.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            closeModal();

        }

    }
);


/*
====================================================
EVENT LISTENERS
====================================================
*/

searchInput.addEventListener(
    "input",
    filterProblems
);


categoryFilter.addEventListener(
    "change",
    filterProblems
);


themeFilter.addEventListener(
    "change",
    filterProblems
);



/*
====================================================
INITIALIZE
====================================================
*/

createFilters();

displayProblems(problems);