


document.addEventListener("DOMContentLoaded",()=>{

 const cardsContainer= document.getElementById("cardsContainer");
 const errorContainer= document.getElementById("errorContainer");
 const searchInput = document.getElementById("searchInput");
 const sortSelect= document.getElementById("sortSelect");
 const themeToggle = document.getElementById("themeToggle");
 const themeIcon = document.getElementById("themeIcon");
 let currentTheme = localStorage.getItem("theme") || "light";

 let allItems=[];
  


 fetch("data/items.json")
  .then((response)=>{
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
     return response.json();
  })

   .then((data) => {
      allItems = data;
        console.log("allItems loaded:", allItems);
      renderCards(allItems);
    })
 .catch((error)=>{
    console.error("Error fetching data:", error);
    errorContainer.textContent="Failed to load items. Please try again later.";
 });

//render item cards
 function renderCards(items){

 cardsContainer.innerHTML="";//clear existing cards

 if(items.length==0){
  cardsContainer.innerHTML=`<p style="color: red; text-align: center; margin: 20px auto;">No items found.</p>`
  return;
    
 }
 items.forEach((item)=>{
   
  const col = document.createElement("div");
  col.className="col";

  col.innerHTML=
  `
      <div class="card h-100 shadow-sm overflow-hidden rounded">         
           <img src="${item.image}" class="card-img-top" alt="${item.title}">
           <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text text-muted">by ${item.author}</p> 
            <button type="button" class="badge-author mb-2">by ${item.author}</button>
            <p class="card-text mt-auto">${item.description}</p>
          </div>
        </div>


  `
  cardsContainer.appendChild(col);
   });
  }

   //searching
     searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
 const filtered = allItems.filter((item) => {
  const title = (item.title || "").toLowerCase();
  const author = (item.author || "").toLowerCase();
  return title.startsWith(query) || author.startsWith(query);
});


      console.log("Filtered items:", filtered);
console.log("Query:", query);


    renderCards(filtered);
  });

  //sorting
  sortSelect.addEventListener("change",()=>{
   const sortValue = sortSelect.value;
    console.log("Change event triggered! New value:", sortValue);
     
      const sorted = [...allItems].sort((a, b) => {
    const aTitle = (a.title || "").toLowerCase();
    const bTitle = (b.title || "").toLowerCase();
    const aAuthor = (a.author || "").toLowerCase();
    const bAuthor = (b.author || "").toLowerCase();

    switch (sortValue) {
      case "title-asc":
        return aTitle.localeCompare(bTitle);
      case "title-desc":
        return bTitle.localeCompare(aTitle);
      case "author-asc":
        return aAuthor.localeCompare(bAuthor);
      case "author-desc":
        return bAuthor.localeCompare(aAuthor);
      default:
        return 0; 
    }
  });

  renderCards(sorted);



  }); 
 
  function applyTheme(theme) {
 if (theme === "dark") {
  document.body.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
} else {
  document.body.removeAttribute("data-theme");
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
}
    localStorage.setItem("theme", theme);             
  }

  
 

  
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark"; 
    applyTheme(currentTheme);                                   
  });
});




