// Storage controller


// item controller
const itemCtrl = (function(){
    // item constructor
  const Item = function(id,name,calories){
      this.id = id;
      this.name = name;
      this.calories = calories;
  }




  // Data Structure / State
   const data = {
       items:[{id:0,name:'Steak Dinner',calories:1200},
             {id:1,name:'Steak-chicken Dinner',calories:200},
             {id:2,name:'Chicken Dinner',calories:1800} ],
       currentItem:null,
       totalCalories:0

   }
   //public method
   return{
       getData:function(){
            return data.items
       },

       logData: function(){
         return data
       },

       addItem:function(name,calories){
        let ID;

        //Create Id
        if(data.items.length > 0){
        ID = data.items[data.items.length -1].id + 1;

        }
        else{
            ID = 0;
        }

        // calories to number
        const caloriess = parseInt(calories);

        // create new item

        newItem = new Item(ID,name,caloriess);

        // adds to item array
        data.items.push(newItem);


        // returns the new item

        return newItem;



        console.log('treek');
        console.log(name);
        console.log(calories);
       }
   }
})();






//ui controller

const UIctrl = (function(){

    const UISelectors={
        itemList:'#item-list',
        addBtn:'.add-btn',
        itemNameInput:'#item-name',
        itemCaloriesInput:'#item-calories'
      }

    //public method
    return{

        

       populateList:function(items){

        let html = ``;

        items.forEach(item =>{
         html += ` <li class="collection-item" id="${item.id}">
         <strong>${item.name}:</strong><em>${item.calories}</em>
         <a href="#" class="secondary-content"><i class="far fa-edit fa fa-pencil"></i></a>
</li>`})
        // insert list items
        document.querySelector(UISelectors.itemList).innerHTML = html;

       },
        getItemInput:function(){
            return{
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }

        }
       ,
       addListItem:function(item){
           // Create li element
           const li = document.createElement('li');
           // add class
           li.className = 'collection-item';
           //  add Id 
           li.id =`item-${item.id}`
           // add.html
           li.innerHTML =`<strong>${item.name}:</strong><em>${item.calories}</em>
           <a href="#" class="secondary-content"><i class="far fa-edit fa fa-pencil"></i></a>`

           // insert item
           document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);

       },
       getSelectors:function(){
        return UISelectors;
    },

      clearInput:function(){
          document.querySelector(UISelectors.itemNameInput).value = '';
          document.querySelector(UISelectors.itemCaloriesInput).value = '';

      }
    }
    

})()









// app controller
const App = (function(itemCtrl,UIctrl){

// load event listeners
const loadEventListeners =function(){
   const UISelectors = UIctrl.getSelectors();


   // Add Item event
   document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

}


// Add item submit

  const itemAddSubmit = function(e){

    

    // Get form input from UI controller
    const input = UIctrl.getItemInput();



     // check for name and calorie input
    if(input.name  !=='' && input.calories !== ''){
         // add item
        const newItem = itemCtrl.addItem(input.name,input.calories);


        // add Item to ui list
        UIctrl.addListItem(newItem);

      // Clear fields
      UIctrl.clearInput();

     
     }


     console.log(input);

      e.preventDefault();

      
      console.log('add');
  }

    // console.log(itemCtrl.logData())


  //Public method
    return{
        init:function(){
            console.log("Starting app");

            //fetches the items form the data structure
            const items = itemCtrl.getData();
            // console.log(items,"items");

            //populate items list
            UIctrl.populateList(items);

           //load event listeners
           loadEventListeners();

        }
    }

})(itemCtrl,UIctrl);



// Starting 

App.init();