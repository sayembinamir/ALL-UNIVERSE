const loadHub = async() =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayHub(data.data.tools);
}
const displayHub = hubs =>{
     const hubContainer = document.getElementById('hub-container');
     console.log(hubs)
     hubs.forEach( hub => {
       
        const hubDiv =document.createElement('div');
        hubDiv.classList.add('col');
        hubDiv.innerHTML = `
        <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
        
        `;
        hubContainer.appendChild(hubDiv);
     });
}
loadHub();