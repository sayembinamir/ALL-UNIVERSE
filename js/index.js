
const loadHub = async(dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayHub(data.data.tools,dataLimit);
}
     
displayHub = (hubData, dataLimit) =>{
    const hubSection = document.getElementById('hub-section');
    hubSection.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if( dataLimit && hubData.length > 6){
        hubData = hubData.slice(0,6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
  
    hubData.forEach (hubInfo => {
        const hubDiv =document.createElement('div');
        // hubDiv.innerHTML = '';

       hubDiv.classList.add('col');
       hubDiv.innerHTML = `
       <div class="card h-100 p-4">
            <img src="${hubInfo.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">features</h5>
                <ol> ${hubInfo.features.map(feature => `<li>${feature}</li>`).join(' ')}</ol>
                <hr>
                <div>
                    <div class='d-flex justify-content-between'>
                        <div>
                            <h5>${hubInfo.name}</h5>
                            <p class='mt-3'> <span class ='me-2'><i class="fa-solid fa-calender-days"></i></span> ${hubInfo.published_in}</p>
                        </div>
                        <button onclick="loadAIData('${hubInfo.id}')" class="border-0 rounded-circle mt-3" data-bs toggle="modal" target-bs-target ="#hubDetailModal" style ='height:24px'><i class= "fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
       `;
       hubSection.appendChild(hubDiv);
    });
    // toggleSpinner(false);
}

const process =(dataLimit) => {
    toggleSpinner(true);
    loadHub(dataLimit);

}
const toggleSpinner = isloading =>{
   const loaderSection = document.getElementById('load');
   if(isloading){
       loaderSection.classList.remove('d-none')
   }
   else{
       loaderSection.classList.add('d-none')
   }
}

document.getElementById('btn-all').addEventListener('click', function(){
   process();
})
const loadAIData = async id =>{
   const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
   const res = await fetch (url);
   const data = await res.json();
   displaySingleDataDetails(data.data);
}
const displaySingleDataDetails =info =>{
   const modalTitle =document.getElementById('hubDetailModel');
   const dataDetails = document.getElementById('data-details');
   dataDetails.classList.add('col', 'p-3');
   dataDetails.innerHTML=`
   <div>
        <h6>${info.description}</h6>
        <div class='d-flex justify-content-between gap-2 mt-4'>
            <div>
                <h6 class="text-success">${info?.pricing?.[0]?.price || 'free of cost'} <br><span>${info.pricing?.[0].plan}</span> </h6>
            </div>
            <div>
                <h6 class="text-warning">${info?.pricing?.[1]?.price || 'free of cost'} <br><span>${info.pricing?.[1].plan}</span> </h6>
            </div>
            <div>
                <h6 class="text-danger">${info?.pricing?.[2]?.price || 'free of cost'} <br><span>${info.pricing?.[2].plan}</span> </h6>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
            <div>
                <h5>Features</h5>
                <ul>
                    <li>${info.features["1"]["feature_name"] }</li>
                    <li>${info.features["2"]["feature_name"] }</li>
                    <li>${info.features["3"]["feature_name"] }</li>
                </ul>
            </div>
            <div>
                <h6>Integrations</h6>
                <ul>
                    ${info.integrations.map(integration => `<li>${integration}</li>`).join(' ')}
                </ul>
            </div>
        </div>
    </div>
    <div class="border rounded p-3">
    <div class=" position-relative">
    <img src ="${info.image_link?.[0]}" class="card-img-top rounded"alt="...">
    <p class="bg-danger text-white rounded position-absolute top-0 and-0">${info.accuracy?.['score'] ? info.accuracy['score'] *100+ `%accuracy`: ''}</p>
    </div>
    <h6 class=" text-center">${info.input_output_examples?.[0].input} </h6>
    <p class="text-center">${info.input_output_examples?.[0].output || 'No! Not yet! take a break !!!'}</p>
    </div>
   `



}

loadHub(6);