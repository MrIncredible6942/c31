const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground
var engine;
var world;
var rope;
var fruit;
var fruitlink;
var backgroundImg;
var fruitImg;
var bunnyImg, bunny;
var button;

var blink, eat, sad;
function preload(){

  bunnyImg = loadImage("Rabbit-01.png")
  backgroundImg = loadImage("background.png")
  fruitImg = loadImage("melon.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation('eat_0.png', "eat_1.png", 'eat_2.png', 'eat_3.png', 'eat_4.png')
  sad = loadAnimation('sad_1.png', 'sad_2.png', "sad_3.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;


}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 1
  sad.frameDelay = 10
  eat.frameDelay = 10

  button = createImg('cut_btn.png');
  button.position(224, 30);
  button.size(40, 40);
  button.mouseClicked(drop);

  bunny = createSprite(340, 610, 40, 40)
  //bunny.addImage("bunny", bunnyImg)
  bunny.addAnimation("blink", blink);
  bunny.addAnimation("eat", eat)
  bunny.addAnimation("sad", sad);
  bunny.changeAnimation('blink')
  bunny.scale = 0.2



/*  var render = Render.create({

    element: document.body,
    engine: engine,
    options: {
      width: 500,
      height: 700,
      wireframes: false,
    }
  });

  Render.run(render)

  */
  ground = new Ground(250,  690, 500, 20);
  rope = new Rope(6, {x: 246, y: 30})

  var fruit_options = {
       density: 0.001
  }
  fruit =  Bodies.circle(246, 300, 20, fruit_options);

  Matter.Composite.add(rope.body, fruit);

  fruitlink = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

 //World.add(world, fruit) 
 

function draw() 
{
  background(51);
              
  image(backgroundImg, 0, 0)
 
  Engine.update(engine);
   ground.display();
   rope.show();
  
   push();

   if(fruit!= null)
   {
    image(fruitImg, fruit.position.x -25, fruit.position.y-50, 60, 60)  
   }
    pop();

    if(collide(fruit, bunny) === true)
    {
      bunny.changeAnimation("eat", eat);

      
    }

    else if(collide(fruit, ground.body)===true)
    {
      bunny.changeAnimation("sad", sad)
    }
    


//ellipse(fruit.position.x,fruit.position.y,20,20)
drawSprites()
}


//user defined function
function drop()
{
     rope.break();
     fruitlink.detach();
     fruitlink = null;
}




function collide(body, sprite) {

  if(body!=null)
  {
     var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)

    if(distance <=80)
    {
        //the fruit collided with the bunny
        World.remove(world, fruit);
        fruit = null;
        return true;
        
    }

    else
    {
        return false;
    }
 
}

 
}









