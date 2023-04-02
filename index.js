document.getElementById('loader').classList.remove("d-none");
const loadItems = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  displayItems(data.data.tools);
  document.getElementById('loader').classList.add("d-none");
}
const displayItems  = items => {
  const showAll = document.getElementById('show-all');
  if (items.length > 7) {
      items = items.slice(0, 7);
      showAll.classList.remove('d-none')
  }
  else{
      showAll.classList.add('d-none')
  }

  const itemsContainer  = document.getElementById('items-container');
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('col');
        itemDiv.innerHTML = `
        <div class="card h-100 p-4 rounded">
            <img src="${item.image}" class="card-img-top rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title">Fetures</h5>
                <p class="card-text mb-0">1 ${item.features[0]}</p>
                <p class="card-text mb-0">2 ${item.features[1]}</p>
                <p class="card-text mb-o">3 ${item.features[2]}</p>
            </div>
            <div class="card-footer bg-body d-flex justify-content-between">
            <div>
                <h5>${item.name} </h5>
                <small class="text-body-secondary"> <i class="fa-solid fa-calendar-days"></i> ${item.published_in}</small>
            </div>
                <button onclick="loadItemDetails('${item.id}')" href="#" class="btn text-danger" data-bs-toggle="modal" data-bs-target="#itemDetailModal"> <i class="fa-solid fa-arrow-right"></i> </button>
            </div>
        </div>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

const loadItemDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayItemDetails(data.data);
}

const displayItemDetails = item => {
    const phoneDetails = document.getElementById('item-details');
    phoneDetails.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4  ">

      <div class="col">
        <div class="card h-100 p-2 bg-style border border-danger-subtle">
        <h5 class="card-title">${item.description}</h5>
        <div class="d-flex p-2 g-2 text-center">
        <div class="col card h-100 p-2 me-2 justify-content-center border border-0 text-success">
        <h6> ${item.pricing[0].price} </h6>
        <h6> ${item.pricing[0].plan} </h6>
        </div>
        <div class="col card h-100 p-2 me-2 justify-content-center border border-0 text-warning">
        <h6> ${item.pricing[1].price} </h6>
        <h6> ${item.pricing[1].plan} </h6>
        </div>
        <div class="col card h-100 p-2 justify-content-center border border-0 text-danger">
        <h6> ${item.pricing[2].price} </h6>
        <h6> ${item.pricing[2].plan} </h6>
        </div>
        </div>
        <div class="d-flex">
        <div>
        <ul>
          <li>${item.features[1].feature_name}</li>
          <li>${item.features[2].feature_name}</li>
          <li>${item.features[3].feature_name}</li>
        </ul>
        </div>
        <div>
        <ul>
          <li>${item.integrations[0]}</li>
          <li>${item.integrations[1]}</li>
          <li>${item.integrations[2]}</li>
        </ul>
        </div>
        </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
        <div class="position-relative">
        <img      src="${item.image_link[0]}" class="card-img-top" alt="...">
        <span class=" position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> ${item.accuracy.score} % accuracy </span>
        </div>
          <div class="card-body">
            <h5 class="card-title">${item.input_output_examples[0].input}</h5>
            <p class="card-title">${item.input_output_examples[0].output}</p>
          </div>
        </div>
      </div>
    </div>
    `
}
document.getElementById('showmore').addEventListener('click', function() {
  loadItems();
})

loadItems();