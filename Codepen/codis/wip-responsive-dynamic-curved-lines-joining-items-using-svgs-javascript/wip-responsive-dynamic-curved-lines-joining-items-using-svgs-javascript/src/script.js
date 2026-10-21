function drawCurvyLines() {
    const articles = document.querySelectorAll('.wrapper > article');

    // if exist, clear existing SVG lines before redrawing
    const svgContainer = document.querySelector('svg');
    if (svgContainer) {
        svgContainer.remove();
    }

    // create SVG 
    const newSvgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    document.querySelector('.wrapper').appendChild(newSvgContainer);

    // loop through articles to create paths
    articles.forEach((article, index) => {
        const circle = article.querySelector('.circle');
        const nextArticle = articles[index + 1];
        if (nextArticle) {
            const nextCircle = nextArticle.querySelector('.circle');

            // get circles postions
            const circleRect = circle.getBoundingClientRect();
            const nextCircleRect = nextCircle.getBoundingClientRect();

            // Calculate the center positions of the circles
            const startX = circleRect.left + circleRect.width / 2; // center of the current circle
            const startY = circleRect.top + circleRect.height / 2; // center of the current circle
            const endX = nextCircleRect.left + nextCircleRect.width / 2; // center of the next circle
            const endY = nextCircleRect.top + nextCircleRect.height / 2; // center of the next circle

            // move down random amount of the height of the current circle
            const midY = startY + circleRect.height * Math.random() + 100;

            // random control points to ensure that all the lines are not the same
            const controlX1 = startX + (Math.random() * 200 - 100);
            const controlY1 = midY + (Math.random() * 80 - 40);
            const controlX2 = endX + (Math.random() * 200 - 100);
            const controlY2 = midY + (Math.random() * 200 - 300);
            const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
          
            // create the path
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('d', pathData);
            newSvgContainer.appendChild(path);
        }
    });
}
drawCurvyLines();
window.addEventListener('resize', drawCurvyLines);