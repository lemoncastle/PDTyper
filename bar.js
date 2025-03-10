// Data for the bar chart
const dataa = [
    { category: 'Levodopa', count: 107 },
    { category: 'DA', count: 31 },
    { category: 'MAOB', count: 14 },
    { category: 'Other', count: 67 },
    { category: 'Not Medicated', count: 55 }
];

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
        .call(d3.axisBottom(x));
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
            d3.select(this).style('fill', '#45a049');  // Change color on hover
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
        });

    // Add axis labels
    svg.append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .text('Medication Type')
        .style('font-size', '13px');
    
    svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')  // Centered alignment
        .attr('x', -height / 2)
        .attr('y', -margin.left + 0)  // Adjusted for better spacing
        .attr('dy', '.75em')
        .attr('transform', 'rotate(-90)')
        .text('Count')
        .style('font-size', '14px');
}