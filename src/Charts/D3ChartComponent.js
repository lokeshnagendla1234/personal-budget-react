import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function D3ChartComponent() {
  const chartRef = useRef();

  useEffect(() => {
    
    axios.get('/mybudget.json')
      .then((response) => {
        const budgetData = response.data.mybudget.map(item => ({
          label: item.title,
          value: item.budget,
        }));
        drawChart(budgetData);
      });
  }, []);

  const drawChart = (data) => {
    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    
    d3.select(chartRef.current).selectAll('*').remove();

    
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + 100)  
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${(width / 2) + 50}, ${height / 2})`);  

    
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    
    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);  

    
    const outerArc = d3.arc()
      .innerRadius(radius * 0.85)  
      .outerRadius(radius * 0.85);

    
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    
    svg.selectAll('path.slice')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    
    svg.selectAll('polyline')
      .data(pie(data))
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('points', d => {
        const posA = arc.centroid(d); 
        const posB = outerArc.centroid(d); 
        const posC = outerArc.centroid(d); 
        posC[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1); 
        return [posA, posB, posC];
      });

    
    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1); 
        return `translate(${pos})`;
      })
      .attr('text-anchor', d => (midAngle(d) < Math.PI ? 'start' : 'end'))  
      .attr('dy', '0.35em')
      .style('font-size', '12px')  
      .style('fill', 'black')      
      .text(d => d.data.label);

    
    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
  };

  return (
    <div>
      <div ref={chartRef}></div>
    </div>
  );
}

export default D3ChartComponent;