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

   return{
       logData: function(){
         return data
       }
   }
})();

//ui controller

const UIctr = (function(){

})()




// app controller
const App = (function(itemCtrl,UIctr){


    // console.log(itemCtrl.logData())

})(itemCtrl,UIctr);