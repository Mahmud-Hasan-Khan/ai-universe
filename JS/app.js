// load data from api
const loadData = async () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    const res = await fetch(URL);
    const data = await res.json();
    // get six Al Tools info
    displayData(data.data.tools.slice(0, 6));
}

// display data to UI
const displayData = (alTools) => {
    // get the container
    const AlContainer = document.getElementById('al-container');

    // clear previous data
    AlContainer.innerHTML = '';

    // show spinner
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    // get Al Tools info
    alTools.forEach((alTool) => {

        // create the child element
        const containerDiv = document.createElement('div');

        // set innerText innerHtml
        containerDiv.innerHTML = `
        <div class="card w-full h-full bg-base-100 shadow-2xl p-4">
            <figure><img src="${alTool.image}" alt="" /></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal text-left">
                    <li> ${alTool.features[0]}</li>
                    <li> ${alTool.features[1]}</li>
                    <li> ${alTool.features[2] ? alTool.features[2] : "No Data Found"}</li >
                </ol >
                <hr>
                <div class= "flex justify-between mt-2">
                    <div class= "text-left">
                        <h1 class="text-lg font-semibold">${alTool.name}</h1>
                        <i class="fa-regular fa-calendar-days"></i>
                        <p class= "inline">${alTool.published_in}</p>
                    </div>
                    <div class="card-actions justify-end">
                    <label for="my-modal-3" onClick="loadDetails('${alTool.id}')" class="px-6 py-4 btn bg-red-100 border-0 rounded-full"><i class="fa-solid fa-arrow-right" style="color: #f52e2e;"></i></label>
                    </div>
                </div>
            </div >
        </div >
    `;
        // append Child
        AlContainer.appendChild(containerDiv);
    });

    spinner.style.display = "none";
};



// Display All Al Tools 
const seeAllData = async () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    const res = await fetch(URL);
    const data = await res.json();
    displayData(data.data.tools);
};

// Display All Al Tools and sort by date ascending(New Date) order
const sortByDate = async () => {
    const URL = ('https://openapi.programming-hero.com/api/ai/tools')
    const res = await fetch(URL);
    const data = await res.json();
    const sortedData = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    displayData(sortedData);
};

// get details on click in a modal
const loadDetails = (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => showDetailsDataModal(data.data))
    // console.log(id)
};
// show details on click in a modal
const modalContainer = document.getElementById('modal-info');
const showDetailsDataModal = (details) => {
    console.log(details);
    modalContainer.innerHTML = "";
    const modalDiv = document.createElement('div');
    modalDiv.classList.add("modal-box", "w-4/5", "max-w-fit", "h-fit", "max-h-fit");
    modalDiv.innerHTML = `
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-0 top-0">✕</label>
    <div class="grid grid-cols-2 gap-4">
    <div class="card  w-full h-full bg-base-100 shadow-xl">
    <div class="card-body bg-[#f3e1e1] rounded-xl grid grid-rows-3 gap-4 content-center my-auto">
    <h2 class="card-title w-7/12  mx-auto">${details.description}</h2>
    <div class="grid grid-cols-3 gap-4 content-center my-auto ">
    <div class="bg-base-100 rounded-xl p-4 text-[#03A30A] font-semibold">
            <h2>${details.pricing && details.pricing[0].price ? details.pricing[0].price : "Free of Cost"}/</h2>
            <h2>${details.pricing && details.pricing[0].plan ? details.pricing[0].plan : "Basic"}</h2>
        </div>
                        <div class="bg-base-100 rounded-xl p-4 text-[#F28927] font-semibold">
                            <h2>${details.pricing && details.pricing[1].price ? details.pricing[1].price : "Free of Cost"}/</h2>
                            <h2>${details.pricing && details.pricing[1].plan ? details.pricing[1].plan : "Pro"}</h2>
                        </div>
                        <div class="bg-base-100 rounded-xl p-4 text-[#EB5757] font-semibold">
                        <h2>${details.pricing && details.pricing[2].price ? details.pricing[2].price : "Free of Cost"}/</h2>
                        <h2>${details.pricing && details.pricing[2].plan ? details.pricing[2].plan : "Enterprise"}</h2>
                        </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4 justify-items-center ">
                            <div>
                                <h2 class="card-title">Features</h2>
                                <ol class="list-disc text-left">
                                    <li> ${details.features[1].feature_name}</li>
                                    <li> ${details.features[2].feature_name}</li>
                                    <li> ${details.features[3].feature_name ? details.features[3].feature_name : "No Data Found"}</li >
                                </ol >
                            </div>
                            <div>
                                <h2 class="card-title">Integrations</h2>
                                <ol class="list-disc text-left">
                                    <li> ${details.integrations && details.integrations[0] ? details.integrations[0] : "No Data Found"}</li>
                                    <li> ${details.integrations && details.integrations[1] ? details.integrations[1] : "No Data Found"}</li>
                                    <li> ${details.integrations && details.integrations[2] ? details.integrations[2] : "No Data Found"}</li >
                                </ol >
                            </div>
                        </div>
                        <div class="card-actions justify-end">
                        </div>
                        </div>
                        </div>
                        <div>
                        <div class="card  w-full h-full bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                        <img src="${details.image_link[0]}" alt="Shoes" class="rounded-xl" />
                        </figure>
                        <h3 class="absolute right-12 top-12 bg-red-500 text-white font-semibold rounded-lg p-2">${details.accuracy.score ? details.accuracy.score : ''}<h3>
                        <div class="card-body items-center text-center">
                        <h2 class="card-title">${details.input_output_examples && details.input_output_examples[0].input ? details.input_output_examples[0].input : 'No Data Found'}</h2>
                        <p>${details.input_output_examples && details.input_output_examples[0].output ? details.input_output_examples[0].output : "No Data Found"}</p>
                        <div class="card-actions">
                        </div>
                        </div>
                </div>
                </div>
                </div>

`;
    modalContainer.appendChild(modalDiv);
};


loadData();