class Food {
    constructor (){
        this.foodStock, this.lastFed;
        this.image= loadImage("images/Milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock (foodS){
        this.foodStock = foodS;
    }
    deductFood (){
        if(foodStock>0)
        this.foodStock = this.foodStock-1;
    }
    bedroom(){
        image(bedroom,400,400,800,800);
    }
    washroom(){
        image(washroom,400,400,800,800);
        console.log("washroom");
    }
    garden(){
        image(garden,400,400,800,800);
        console.log("e2");
    }
    display(){
      var x=80,y=100;

      imageMode(CENTER);
      //image(this.image,720,220,70,70);

      if(this.foodStock!=0){
         for(var i=0;i<=this.foodStock;i++) {
             if(i%10==0){
                 x=80;
                 y=y+50;
             }
             image(this.image,x,y,50,50);
             x=x+30;
         }
      }
    }
}




