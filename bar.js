// Data for the bar chart
const dataa = [
    { category: 'Levadopa', count: 107 },
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
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 550 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select('.visual-section')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.2); // Increased padding for better spacing

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .nice()
        .range([height, 0]);

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
        .on('mouseover', function() {
            d3.select(this).style('fill', '#45a049');
        })
        .on('mouseout', function() {
            d3.select(this).style('fill', 'cornflowerblue');
        });

    // Add the x-axis
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')  // Rotate text for better visibility
        .style('text-anchor', 'middle');

    // Add the y-axis
    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

    // Add axis labels
    svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')  // Centered alignment
        .attr('x', -height / 2)
        .attr('y', -margin.left + 5)  // Adjusted for better spacing
        .attr('dy', '.75em')
        .attr('transform', 'rotate(-90)')
        .text('Count')
        .style('font-size', '14px'); // Change the font size to 12px
}
