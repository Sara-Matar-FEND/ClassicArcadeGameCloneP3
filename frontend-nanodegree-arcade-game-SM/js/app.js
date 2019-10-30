let speed;
class Enemy 
    {
        constructor(x,y)
            {
                this.x=x;
                this.y=y;
                this.speed=Math.random()*2+4;//make the speed of enemy randomly 
                this.sprite = 'images/enemy-bug.png';
            }

        update(dt)
            {
                this.x+=this.speed+dt;
                // to return the bug to start position 
                if(this.x>505)
                {
                    this.x= -70;
                }
                if(player.y < -40)
                {
                    player.y=395;//return the player to start position 
                }
            }
        render()
            {
             ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            }
    }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player
    {
        constructor(x,y)
            {
                this.x = x;
                this.y = y;
                this.sprite = 'images/char-cat-girl.png';
            }
        update(dt)
            {}
        render()
            {
             ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            }
        //this method control 4 handel input(up,down.right,left)   
        handleInput(direction)
            {
                switch(direction)
                {
                    case'right':
                    if(this.x < 400)
                    {this.x +=101;}
                    break;

                    case'left':
                    if(this.x > 1)//positve num
                    {this.x -=101;}
                    break;

                    case'up':
                    if(this.y > -20)
                     {this.y -=83;}
                    //check if the player reached the blue area 
                    //then return to start poistion
                    if(this.y < -19)
                     {ShowWinDiv();}
                    break;

                    case'down':
                    if(this.y < 395)
                    {this.y +=83;}
                    break;

                    default:
                    break;

                }
            }
    }

    // Now instantiate your objects.
    let enemy1 = new Enemy(10,58);
    let enemy2 = new Enemy(10,58+83);
    let enemy3 = new Enemy(10,222);
    let enemy4 = new Enemy(10,222+83);

    // Place all enemy objects in an array called allEnemies
    let allEnemies=[enemy1,enemy2,enemy3,enemy4];
    // Place the player object in a variable called player
     let player = new Player(200,395);


    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) 
    {
        var allowedKeys = 
        {

            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
    //this function will check if Collisions happen between player and enemy 
    function checkCollisions()
    {
        allEnemies.forEach(enemy =>
            { 
                let distance = getDistance(player,enemy);
                if(distance < 67)
                {
                player.x=200;
                player.y=395;
                }
            })

    }
//this function calculate the Distance between player and enemy
function getDistance(playerObj,enemyObj)
    {
      let a = playerObj.x  - enemyObj.x;
      let b = playerObj.y  - enemyObj.y;
      return Math.sqrt(a * a + b * b);
    }
//the function will apper the win div
function ShowWinDiv()
    {
        let windiv = document.getElementById("winDiv");   
        windiv.showModal();   

    }

function hideWinDiv()
    {
        //move the player to start point
        player.x=200;
        player.y=395;
        let windiv = document.getElementById("winDiv");
        windiv.close();
    }



