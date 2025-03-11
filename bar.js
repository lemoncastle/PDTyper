// Data for the bar chart
const dataa = [
    { category: 'Levodopa', count: 107 },
    { category: 'Dopamine Agonist', count: 31 },
    { category: 'MAO-B', count: 14 },
    { category: 'Other', count: 67 },
    { category: 'Not Medicated', count: 55 }
];

const defaultContent = `
    <h2>Parkinson’s at a Glance</h2>
    <li><b>10 million</b> people worldwide have Parkinson’s <a href="https://www.parkinson.org/understanding-parkinsons/statistics" target="_blank"><sup>[1]</sup></a></li> 
    <li><b>60,000</b> Americans are diagnosed each year <a href="https://www.parkinson.org/understanding-parkinsons/statistics" target="_blank"><sup>[3]</sup></a></li> 
    <li>Early symptoms include <b>slower typing speed, increased errors, and irregular keystroke intervals</b>.</li>
    <li>Research suggests <b>typing patterns can predict Parkinson’s years before diagnosis</b>. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5708704/" target="_blank"><sup>[3]</sup></a></li> 
    <li>We found an average keystroke latency difference of <b>13.2ms</b> Parkinson’s patients.</li>    
    `; 

document.addEventListener('DOMContentLoaded', function() {
    createbar(dataa);
});

function createbar(data) {
    // Define margins and dimensions to fit within 600x350px
    const margin = { top: 20, right: 50, bottom: 50, left: 40 };
    const width = 590 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select('.visual-section')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create tooltip div (hidden by default)
    const tooltip = d3.select('.visual-section')
        .append('div')
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.7)')
        .style('color', '#fff')
        .style('padding', '5px 10px')
        .style('border-radius', '5px')
        .style('font-size', '12px')
        .style('display', 'none')
        .style('pointer-events', 'none');  // Avoid interfering with cursor movement

    // Set up the scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.2); // Increased padding for better spacing

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .nice()
        .range([height, 0]);

    // Add horizontal gridlines
    // This line of code took me 2 hours to figure out wtf
    // im so dumb
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat('')
            .ticks(5))
        .selectAll('line')
        .style('stroke', '#e0e0e0');
    
    // Add the x-axis
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .style('font-size', '13px');
     // Add the y-axis
     svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
    
    // Add the bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.category))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', 'cornflowerblue')
        .on('mouseover', function(event, d) {
            d3.select(this)
                .style('fill', '#45a049')  // Change color on hover
                .style('cursor', 'pointer');  // Change cursor style to pointer
            tooltip.style('display', 'block')  // Show tooltip
                .html(`<strong>${d.category}</strong>: ${d.count}`);  // Update text
        })
        .on('mousemove', function(event) {
            tooltip.style('left', (event.pageX + 10) + 'px')  // Position near cursor
                .style('top', (event.pageY - 20) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).style('fill', 'cornflowerblue');  // Reset color
            tooltip.style('display', 'none');  // Hide tooltip
        })
        .on('click', function(event, d) {
            openCategoryUrl(d.category);
        });

    // Add axis labels
    // svg.append('text')
    //     .attr('class', 'x-axis-label')
    //     .attr('text-anchor', 'middle')
    //     .attr('x', width / 2)
    //     .attr('y', height + margin.bottom - 10)
    //     .text('Medication Type')
    //     .style('font-size', '13px');
    
    svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')  // Centered alignment
        .attr('x', -height / 2)
        .attr('y', -margin.left + 0)  // Adjusted for better spacing
        .attr('dy', '.75em')
        .attr('transform', 'rotate(-90)')
        .text('Count')
        .style('font-size', '14px');


    document.addEventListener('click', function() {
        d3.select('.stats-section').html(defaultContent);
    });
}


function openCategoryUrl(category) {
    const statsSection = document.querySelector('.stats-section');
    let newContent = '';
    event.stopPropagation();
    if (category === 'Levodopa') {
        newContent = `
            <h2>Levodopa Information</h2>
            <li>Levodopa is a common treatment for Parkinson's disease.</li>
            <li>It helps to replenish the brain's supply of dopamine.</li>
            <li>For more information, visit <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications/levodopa" target="_blank">this link</a>.</li>
        `;
    } else if (category === 'Dopamine Agonist') {
        newContent = `
            <h2>Dopamine Agonist Information</h2>
            <li>Dopamine agonists mimic dopamine in the brain.</li>
            <li>They are used to treat Parkinson's disease symptoms.</li>
            <li>For more information, visit <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications/dopamine-antagonists" target="_blank">this link</a>.</li>
        `;
    } else if (category === 'MAO-B') {
        newContent = `
            <h2>MAO-B Inhibitor Information</h2>
            <li>MAO-B inhibitors help to prevent the breakdown of dopamine.</li>
            <li>They are used to treat Parkinson's disease symptoms.</li>
            <li>For more information, visit <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications/mao-b-inhibitors" target="_blank">this link</a>.</li>
        `;
    } else if (category === 'Other' || category === 'Not Medicated') {
        newContent = `
            <h2>General Parkinson's Information</h2>
            <li>There are various treatments available for Parkinson's disease.</li>
            <li>Consult with a healthcare provider for the best treatment options.</li>
            <li>For more information, visit <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications" target="_blank">this link</a>.</li>
        `;
    }

    if (statsSection) {
        statsSection.innerHTML = newContent;
    }
}