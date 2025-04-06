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
    <li>A brain disorder (disease) that causes shaking, stiffness, and difficulty with balance and coordination.</li>
    <li>Typically developed by people over 60 or older where symptoms gradually worsen over time.</li>
    <li><b>10 million</b> people worldwide have Parkinson’s <a href="https://www.parkinson.org/understanding-parkinsons/statistics" target="_blank" style="text-decoration: none;"><sup>[1]</sup></a></li> 
    <li><b>60,000</b> Americans are diagnosed each year <a href="https://www.parkinson.org/understanding-parkinsons/statistics" target="_blank" style="text-decoration: none;"><sup>[2]</sup></a></li> 
    <li>Early symptoms include <b>slower typing speed, increased errors, and irregular keystroke intervals</b>.</li>
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
            <h2>Levodopa (L-DOPA) <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications/levodopa" target="_blank" style="font-size: 15px;">More Info</a></h2>
            <li><b>What it does: </b>Converts into dopamine in the brain, reducing movement symptoms.</li>
            <li>Improves movement, stiffness, and tremors.</li>
            <li><b>Side effects: </b>Can cause dyskinesia (involuntary movements) over time.</li>
            <a href="https://www.azmedications.com/wp-content/uploads/2018/09/Levodopa.jpg" target="_blank">
                <img src="./data/levodopa.jpg" alt="levodopa" style="height: 200px; width: auto;">
            </a>
        `;
    } else if (category === 'Dopamine Agonist') {
        newContent = `
            <h2>Dopamine Agonist (DA) <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications/levodopa" target="_blank" style="font-size: 15px;">More Info</a></h2>
            <li><b>What it does:</b> Mimic dopamine in the brain without converting into it.</li>
            <li>Used for early-stage Parkinson’s or as a supplement to Levodopa.</li>
            <li><b>Side effects: </b>Sleepiness, impulse control issues (e.g., gambling, overeating).</li>
            <a href="https://www.invitra.com/en/wp-content/uploads/2019/12/treatment-dopamine-agonists-780x332.png" target="_blank">
                <img src="./data/DA.png" alt="dopamineagonist" style="height: 150px; width: auto;">
            </a>
        `;
    } else if (category === 'MAO-B') {
        newContent = `
            <h2>MAO-B Inhibitors (Monoamine Oxidase-B Inhibitors) <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications/mao-b-inhibitors" target="_blank" style="font-size: 15px;">More Info</a></h2>
            <li><b>What it does:</b> Slow the breakdown of dopamine in the brain by blocking the monoamine oxidase-B (MAO-B) enzyme.</li>
            <li>Used alone in early stages or with other meds later.</li>
            <li><b>Side effects: </b>Insomnia, nausea, interactions with antidepressants.</li>
            <a href="https://www.azmedications.com/wp-content/uploads/2018/09/Levodopa.jpg" target="_blank">
                <img src="./data/MOAB.jpg" alt="MOA-B" style="height: 150px; width: auto;">
            </a>
        `;
    } else if (category === 'Other') {
        newContent = `
            <h2>Other Medications <a href="https://www.parkinson.org/living-with-parkinsons/treatment/prescription-medications" target="_blank" style="font-size: 15px;">More Info</a></h2>
            <li><b>Anticholinergics</b> – Help with tremors but are rarely used due to cognitive side effects.</li>
            <li><b>Amantadine</b> – Originally an antiviral drug, it can help with Levodopa-induced dyskinesia.</li>
            <li><b>COMT Inhibitors</b> – Extend Levodopa’s effects by blocking dopamine breakdown (e.g., Entacapone, Tolcapone).</li>
            <a href="https://www.azmedications.com/wp-content/uploads/2018/09/Levodopa.jpg" target="_blank">
                <img src="./data/GENERIC.jpg" alt="pills spilling generic" style="height: 150px; width: auto;">
            </a>
        `;
    }
    else if (category === 'Not Medicated') {
        newContent = `
            <h2>Not Medicated</h2>
            <li>Some people may not need medication early on, especially if symptoms are mild.</li>
            <li>Exercise, physical therapy, and lifestyle changes can help manage symptoms.</li>
            <li>Medication may be started later if symptoms worsen.</li>
            <a href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjivitaayurveda.com%2Fwp-content%2Fuploads%2F2022%2F09%2FParkinsons-Disease-Symptoms-GettyImages-1091125296-2000-dee72c7d81a6465aab0d2f1955a8c7fb.jpeg&f=1&nofb=1&ipt=a302c9b0852c0981fbfc8dc3c270ec7f7dfcf134a78da2bc9b9ab1f7144522a0&ipo=images" target="_blank">
                <img src="./data/PAIN.jpeg" alt="exercise" style="height: 150px; width: auto;">
            </a>
        `;
    }

    if (statsSection) {
        statsSection.innerHTML = newContent;
    }
}