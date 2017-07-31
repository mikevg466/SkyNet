import React from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array'
import { select } from 'd3-selection'


class BarChart extends React.Component {
  constructor(props){
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.props.data.every(el => typeof el.data === 'number') && this.createBarChart();
  }
  componentDidUpdate() {
    this.props.data.every(el => typeof el.data === 'number') && this.createBarChart();
  }
  createBarChart() {
    const node = this.node;
    const dataArr = this.props.data.map(el => el.data);
    const labelArr = this.props.data.map(el => el.label);
    const dataMax = max(dataArr);

    const outerWidth = this.props.size[0];
    const outerHeight = this.props.size[1];
    const xAxisLabelText = "Temperature";
    // const xAxisLabelOffset = 55;
    const margin = { left: 0, top: 0, right: 0, bottom: 60 };
    const barPadding = 0.2;
    const innerWidth  = outerWidth  - margin.left - margin.right;
    const innerHeight = outerHeight - margin.top  - margin.bottom;

    var xScale = d3.scaleLinear().range(      [0, innerWidth]);
    var yScale = d3.scaleBand().range([0, innerHeight]).padding(barPadding);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var g = select(node).append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var xAxisG = g.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + innerHeight + ")")
    var xAxisLabel = xAxisG.append("text")
     .style("text-anchor", "middle")
     .attr("x", innerWidth / 2)
     .attr("y", innerHeight / 2)
     .attr("class", "label")
     .text(xAxisLabelText);
    var yAxisG = g.append("g")
     .attr("class", "y axis");

     xScale.domain([0, dataMax]);
     yScale.domain(labelArr);

     xAxisG.call(xAxis);
     yAxisG.call(yAxis);

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr("height", yScale.bandwidth())

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr("x", 0)
      .attr("y",     function (d){return yScale(d.label); })
      .attr("height", yScale.bandwidth())
      .attr("width", function (d){return xScale(d.data); });
    }
    render() {
      return <svg ref={node => this.node = node}
        width={500} height={500}>
      </svg>
    }
}
export default BarChart
