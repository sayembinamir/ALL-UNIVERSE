
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
                        <div>
                     <button onclick="loadAIData('${hubInfo.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-right-long"></i>
                    </button>
                  <div>
                    </div>
                </div>
            </div>
        </div>
       `;
       hubSection.appendChild(hubDiv);
    });
    toggleSpinner(false);
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
    const modalTitle =document.getElementById('modelPerent');
    modalTitle.innerHTML = "";
    const dataDetails = document.createElement('div');
    dataDetails.innerHTML=`
    <div class = "d-flex justify-content-center align-items-center" style="width: 100%">
         <div class = "col-sm-12 col-md-6">
             <div class=" p-3 rounded-3">
                 <h4>${info.description}</h4>
                 <div class = " d-flex justify-content-between gap-1">
                     <div class = "text-center p-3 bg-light rounded-3">
                         <h6 class="text-danger">${info?.pricing?.[0]?.price || 'free of cost'} <br><span>${info.pricing?.[0]?.plan || 'Basic'}</span> </h6>
                     </div>
                     <div class = "text-center p-3 bg-light rounded-3">
                         <h6 class="text-danger">${info?.pricing?.[1]?.price || 'free of cost'} <br><span>${info.pricing?.[0]?.plan || 'Basic'}</span> </h6>
                     </div>
                     <div class = "text-center p-3 bg-light rounded-3">
                         <h6 class="text-danger">${info?.pricing?.[2]?.price || 'free of cost'} <br><span>${info.pricing?.[2]?.plan || 'Basic'}</span> </h6>
                     </div>
                 </div>
                 <div class="row">
                     <div class = "col">
                         <h3>Features</h3>
                         <ul class=""fs-6>
                             <li>${info?.features?.[1]?.feature_name || 'No Features'}</li>
                             <li>${info?.features?.[2]?.feature_name || 'No Features'}</li>
                             <li>${info?.features?.[3]?.feature_name || 'No Features'}</li>
                         </ul>
                     </div>
                     <div class="col">
                         <h3>Integrations</h3>
                         <ul>
                             <li>${info?.integrations?.[0]||'No Integrations'}</li>
                             <li>${info?.integrations?.[2]||'No Integrations'}</li>
                             <li>${info?.integrations?.[2]||'No Integrations'}</li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
         <div class="col-sm-12 col-md-6 position-relative">
                 <div class=" rounded p-3">
                     <div class=" position-relative">
                         <img src ="${info.image_link?.[0]}" class="card-img-top rounded"alt="..." style="height: 300px;">
                         <p class="bg-danger text-white rounded py-2 px-3 position-absolute"style="top: 7px; right: 7px">${info.accuracy?.['score'] ? info.accuracy['score'] *100+ `%accuracy`: ''}</p>
                     </div>
                     <h6 class="mt-2 text-center">${info.input_output_examples?.[0]?.input || 'No info'} </h6>
                     <p class="text-center">${info?.input_output_examples?.[0]?.output || 'No! Not yet! take a break !!!'}</p>
                 </div>
             </div>
     </div>
     
     `
     modalTitle.appendChild(dataDetails)
 
 
 
 }


loadHub(6);