document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.gamecontainer');
    const ground = document.querySelector('.ground');
    const gameOverScreen = document.querySelector('.gameOver');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;

    const startGame = () => {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gametimerId = setInterval(startGame, 20);
    const control = (e) => {
        if (e.keyCode === 32) {
            jump()
        }
    }
    
    const jump = () => {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup', control)

    const generateObstacle = () => {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 100;
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if(!isGameOver) topObstacle.classList.add('topObstacle')
        gameDisplay.appendChild(topObstacle);
        if(!isGameOver) obstacle.classList.add('obstacle');
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        const moveObstacle = () => {
            if(!isGameOver) obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if(obstacleLeft === -60){
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if( obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||birdBottom === 0){
                gameOver()
                clearInterval(timerId)
            }
        }

        let timerId = setInterval(moveObstacle, 20);
        if(!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle()

    const gameOver = () => {
        clearInterval(gametimerId);
        isGameOver =  true;
        console.log("Perdeu")
        document.removeEventListener('keyup', control);
        gameOverScreen.style.display = 'flex';
    }
})