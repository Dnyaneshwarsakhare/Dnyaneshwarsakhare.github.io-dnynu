var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

window.onload= function()
{
var p = document.getElementById('bt1');
var q = document.getElementById('bt2');
p.onclick=function()
	{
		paddleX -=7;
		if(paddleX < 0)
		{
			paddleX = 0;
		}	
		
	}
q.onclick=function()
	{
		paddleX +=7;
		if(paddleX+ paddleWidth > canvas.width)
		{
			paddleX = canvas.width-paddleWidth;
		}
	}
};;

var score = 0;
var lives = 5;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var rightpressed = false;
var leftpressed= false;

var ballradius = 10;

var paddleHeight=10;
var paddleWidth=75;


var paddleX = (canvas.width-paddleWidth)/2;

var bricks = [];
for(var c=0; c< brickColumnCount;c++)
{
	bricks[c]=[];
	for(var r=0;r<brickRowCount;r++)
	{
		bricks[c][r]={x:0,y:0,status:1};
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove",touchMoveHandler,false);

function touchMoveHandler(e)
{
	var relativeX = e.pageX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX<canvas.width)
	{
		paddleX=relativeX-paddleWidth/2;
	}
}


function mouseMoveHandler(e)
{
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX<canvas.width)
	{
		paddleX=relativeX-paddleWidth/2;
	}
}

function keyDownHandler(e)
{
	if(e.key == "Right"|| e.key == "ArrowRight")
	{
		rightpressed=true;
	}
	else if(e.key=="Left"|| e.key=="ArrowLeft")
	{
		leftpressed=true;
	}
}

function keyUpHandler(e)
{
	if(e.key == "Right"|| e.key == "ArrowRight")
	{
		rightpressed=false;
	}
	else if(e.key=="Left"||e.key=="ArrowLeft")
	{
		leftpressed=false;
	}
}

function collisionDetection()
{
	for(var c=0;c<brickColumnCount;c++)
	{
		for(var r=0; r<brickRowCount;r++)
		{
			var b= bricks[c][r];
			if(b.status==1)
			{
				if(x>b.x+ballradius && x < b.x+brickWidth+ballradius && y<b.y+ballradius && y< b.y+brickHeight+ballradius)
				{
					dy=-dy;
					b.status=0;
					score++;
					if(score==brickRowCount*brickColumnCount)
					{
						alert("YOU WIN CONGRATULATIONS!\n Your Score = "+score);

						if (confirm("Press ENTER/OK to Restart"))
     						{
        						document.location.reload();
      						} 
      						else 
      						{
        						clearInterval(kk);
      						}
						
					}
                }
			}
		}
	}
}

function drawscore()
{
	ctx.font ="16px Arial";
	ctx.fillStyle="#2CDCB2";
	ctx.fillText("Score : "+score, 8, 20);
}

function drawlives()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#2CDCB2";
	ctx.fillText("Lives : "+lives,canvas.width-65,20);
}

function drawball()
{
	ctx.beginPath();
	ctx.arc(x, y, ballradius, 0, Math.PI*2);
	ctx.fillStyle = "#9900CC";
	ctx.fill();
	ctx.closePath();
}
function drawpaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#ff0033";
	ctx.fill();
	ctx.closePath();
}

function drawbricks()
{
	for(var c=0;c<brickColumnCount;c++)
	{
		for(r=0;r<brickRowCount;r++)
		{
			if(bricks[c][r].status ==1)
			{
				var brickX= (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY= (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle="#ff00DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawbricks();
	drawball();
	drawpaddle();
	drawscore();
	drawlives();
	collisionDetection();
	x+= dx;
	y+= dy;
	if(x+dx>canvas.width-ballradius || x+dx<ballradius)
	{
		dx=-dx;
	}
	if(y+dy<ballradius)
	{
		dy=-dy;
	}
	else if(y+dy> canvas.height-ballradius)
	{
		if(x > paddleX && x < paddleX + paddleWidth)
		{
			dy=-dy;
		}
		else
		{
			lives--;
			if(!lives)
			{
				alert("GAME OVER\n Your Score="+score);
				if (confirm("Press ENTER/OK to Restart"))
     				{
        				document.location.reload();
      				} 
      				else 
      				{
        					clearInterval(kk);
      				}
				
			}
			else
			{
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX=(canvas.width-paddleWidth)/2;
			}
		}
    }
	if(rightpressed)
	{
		paddleX +=7;
		if(paddleX+ paddleWidth > canvas.width)
		{
			paddleX = canvas.width-paddleWidth;
		}

	}
	else if(leftpressed)
	{
		paddleX -=7;
		if(paddleX < 0)
		{
			paddleX = 0;
		}
	}
	//requestAnimationFrame(draw);
}
var kk=setInterval(draw,10);
