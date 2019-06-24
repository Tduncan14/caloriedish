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
       items:[
           
            // {id:0,name:'Steak Dinner',calories:1200},
            //  {id:1,name:'Steak-chicken Dinner',calories:200},
            //   {id:2,name:'Chicken Dinner',calories:1800} 
            
            ],
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

       setCurrentItem:function(item){
         data.currentItem = item;
       },

       getCurrentItem:function(){
          return data.currentItem;
       },

       getTotalCalories: function(){
           let total = 0;

           data.items.forEach(item =>{
             total += item.calories;
             //also can be like total = total + item.calories

           })
           data.totalCalories = total;

           // return the total
           return data.totalCalories;
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
       },
       getItemById:function(id){
        let found = null;

        // loop through items
       
        data.items.forEach(function(item){
          if(item.id  === id){

            found = item;
          }
        })
        return found

       }
   }
})();






//ui controller

const UIctrl = (function(){

    const UISelectors={
        itemList:'#item-list',
        addBtn:'.add-btn',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
        itemNameInput:'#item-name',
        itemCaloriesInput:'#item-calories',
        totalCalories:'.total-calories'
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
           document.querySelector(UISelectors.itemList).style.display='block';
           // Create li element
           const li = document.createElement('li');
           // add class
           li.className = 'collection-item';
           //  add Id 
           li.id =`item-${item.id}`
           // add.html
           li.innerHTML =`<strong>${item.name}:</strong><em>${item.calories}</em>
           <a href="#" class="secondary-content"><i class="far fa-edit fa fa-pencil edit-item"></i></a>`

           // insert item
           document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);

       },
       getSelectors:function(){
        return UISelectors;
    },

      hideList:function(){
          document.querySelector(UISelectors.itemList).style.display = 'none';
      },

      clearInput:function(){
          document.querySelector(UISelectors.itemNameInput).value = '';
          document.querySelector(UISelectors.itemCaloriesInput).value = '';

      },
        addItemToForm:function(){
          document.querySelector(UISelectors.itemNameInput).value =  itemCtrl.getCurrentItem().name;
          document.querySelector(UISelectors.itemCaloriesInput).value = itemCtrl.getCurrentItem().calories;
        },




       showTotalCalories:function(totalCalories){

    document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

       },

     
      clearEditState:function(){
        UIctrl.clearInput();
        document.querySelector(UISelectors.updateBtn).style.display='none';
        document.querySelector(UISelectors.deleteBtn).style.display='none';
        document.querySelector(UISelectors.backBtn).style.display='none';
        document.querySelector(UISelectors.addBtn).style.inline ='inline';
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

   //Edit icon click event
   document.querySelector(UISelectors.itemList).addEventListener('click',ItemUpdateSubmit)
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

        // get the total calories

        const totalCalories = itemCtrl.getTotalCalories();
        
        // add total calories to UI
        UIctrl.showTotalCalories(totalCalories);

      // Clear fields
      UIctrl.clearInput();

     
     }

  

     console.log(input);

      e.preventDefault();

      
      console.log('add');
  }


     // update item submit
     const ItemUpdateSubmit = function(e){

        if(e.target.classList.contains('edit-item')){
          // Get list item id
          const listId = e.target.parentNode.parentNode.id;
          console.log(listId);

         //break into an array
         const listIdArr = listId.split('-')


         const id = parseInt(listIdArr[1]);

         //Get Item

         const itemToEdit = itemCtrl.getItemById(id);

          console.log(itemToEdit);
          // set to current item
          itemCtrl.setCurrentItem(itemToEdit);

          // add item to forms

          UIctrl.addItemToForm();
        }
        e.preventDefault();

    }

    // console.log(itemCtrl.logData())


  //Public method
    return{
        init:function(){ 
             // Clear edit state
             UIctrl.clearEditState();



            console.log("Starting app");

            //fetches the items form the data structure
            const items = itemCtrl.getData();
            // console.log(items,"items");
 
            // check if any Items
            if(items.length === 0){
                UIctrl.hideList();
            }
            //populate items list
            else{
            UIctrl.populateList(items);
            }


        // const totalCalories = itemCtrl.getTotalCalories();
        
        // // add total calories to UI
        // UIctrl.showTotalCalories(totalCalories);

           //load event listeners
           loadEventListeners();

        }
    }

})(itemCtrl,UIctrl);



// Starting 

App.init();