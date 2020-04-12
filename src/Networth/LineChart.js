import React, {Component} from 'react';
import * as d3 from "d3";
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './Xy-axis';
import Line from './Line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';


export default class LineChart extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.data
        }
    }
    randomData = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
          const data = prevState.data.map(d => ({
            name: d.name,
            value: Math.floor((Math.random() * 100) + 1)
          }))
          return {
            data
          }
        })
      }
    render(){
    let data=this.props.data
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(data => data.month))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, data => data.total))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(data => xScale(data.month))
      .y(data => yScale(data.total))
      .curve(curveMonotoneX);


  return (
    <div className="LineChart">
        <button onClick={this.randomData}>Randomize data</button>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>

    </div>
  );
}
}
