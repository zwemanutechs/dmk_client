import React, { Component, PureComponent, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { colours } from '../../chart-constants';

class CustomizedLabel extends PureComponent {
	render() {
		const { x, y, stroke, value } = this.props;
		return (
			<text x={x} y={y} dy={-4} fill={stroke} fontSize={12} textAnchor='middle'>
				{value}
			</text>
		);
	}
}

class CustomizedAxisTick extends PureComponent {
	render() {
		const { x, y, stroke, payload } = this.props;
		const timeStamp = Date.parse(payload.value);
		if (isNaN(timeStamp) === false) {
			return (
				<g transform={`translate(${x},${y})`}>
					<text x={0} y={0} dy={3} textAnchor='end' fill='#666' transform='rotate(-35)'>
						{new Date(payload.value).toLocaleDateString('en-GB')}
					</text>
				</g>
			);
		} else {
			return (
				<g transform={`translate(${x},${y})`}>
					<text x={0} y={0} dy={3} textAnchor='end' fill='#666' transform='rotate(-35)'>
						{payload.value}
					</text>
				</g>
			);
		}
	}
}

function AppLineChart(props) {
	// useEffect(() => fetchData(), []);
	//
	// function fetchData () {
	//     props.lineChartFetchData(props.url, props.keys)
	// }
	return props.loading ? (
		<Skeleton variant='rect' width={props.width} height={props.height} />
	) : (
		<LineChart
			width={props.width}
			height={props.height}
			data={props.data}
			margin={{ top: 5, bottom: 5, right: 1, left: 1 }}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis
				interval='preserveEnd'
				dataKey={props.xDataKey}
				height={70}
				allowDuplicatedCategory={false}
				tick={<CustomizedAxisTick />}
			/>
			<YAxis
				interval='preserveStartEnd'
				width={90}
				allowDuplicatedCategory={false}
				tickCount={10}
				domain={['auto', 'auto']}
			/>
			{Array.isArray(props.referenceLineData) && props.referenceLineData.length > 0
				? props.referenceLineData.map((refLine, ri) => (
						<ReferenceLine
							isFront={true}
							key={`r${ri}`}
							y={refLine.value}
							alwaysShow={true}
							label={refLine.label}
							stroke={refLine.color}
							label={refLine.label}
						/>
				  ))
				: null}
			<Tooltip />
			{Array.isArray(props.keys) &&
				props.keys.length > 0 &&
				props.keys.map((dataKey, i) => (
					<Line key={`l${i}`} type='monotone' dataKey={dataKey} stroke={colours[i]} strokeWidth={5} />
				))}
		</LineChart>
	);
}

const mapStateToProps = (state) => ({
	// data: state.lineChartItemActions.data,
	// legendKeys: state.lineChartItemActions.legendKeys,
	// loading: state.lineChartItemActions.loading,
});

export default AppLineChart;
