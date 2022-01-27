import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from '../../../shared/charts/graph';
import './home.css';
import { POWERWASH_ASSETID } from '../../../constants/mindsphere-constants';
import CircleGauge from '../../../shared/charts/guage/guage';
import ReactBarChart from '../../../shared/charts/barchart/barChart';

const COLOR = {
	blue: '#0F3790',
	red: '#EA4E49',
	grey: '#D9D9D9',
};

const useStyles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(0),
		textAlign: 'center',
		COLOR: theme.palette.text.secondary,
	},
});

class Dashboard extends React.PureComponent {
	render() {
		return (
			<div className={this.props.classes.root}>
				{/* ---- First Page ----- */}
				<Grid container spacing={1}>
					{/* Title */}
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<div style={{ fontSize: 32, marginTop: 5, color: '#0f3790', fontWeight: 900 }}>Power Wash Overview</div>
					</Grid>
					{/* T1 Row */}
					<Grid item xs={12} md={6} lg={3}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<div style={{ fontSize: 16, color: '#0f3790', fontWeight: 900 }}>Tank 1 (Degreasing)</div>
							</Grid>
							{/** Col **/}
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<Grid container spacing={1}>
									{/** Dyna test */}
									<Grid key={'dynetest'} item xs={12} sm={12} md={12} lg={12}>
										<Graph
											pathName='dashboard'
											endPoint='degreasing/dynetest'
											variableName='data'
											dataKey={'time'}
											limit={1000}
											dataPoint='api'
											unit={'mN/m'}
											title='Dyne Test'
											target={'34-38'}
											LL={34}
											HH={38}
										/>
									</Grid>
									{/** End*/}
									{/** Conductivity_us */}
									<Grid key={'conductivity_us'} item xs={12} sm={12} md={12} lg={12}>
										<Graph
											assetId={POWERWASH_ASSETID}
											aspectName='Tank1_Degreasing'
											variableName='Conductivity_uS'
											limit={3}
											dataKey={'_time'}
											unit={'uS'}
											dataPoint='mindsphere'
											title='Conductivity'
											target={'< 30k'}
											LL={14000}
											HH={30000}
										/>
									</Grid>
									{/** End*/}
									{/** Concentration */}
									<Grid key={'concentration'} item xs={12} sm={12} md={12} lg={12}>
										<Graph
											pathName='dashboard'
											endPoint='degreasing/concentration'
											variableName='data'
											dataKey={'time'}
											limit={1000}
											dataPoint='api'
											unit={'%'}
											title='Concentration'
											target={'0.7-3'}
											LL={0.7}
											HH={3.0}
										/>
									</Grid>
									{/** End*/}
									{/** pH */}
									<Grid key={'pH'} item xs={12} sm={12} md={12} lg={12}>
										<Graph
											assetId={POWERWASH_ASSETID}
											aspectName='Tank1_Degreasing'
											variableName='Water_pH'
											limit={3}
											dataKey={'_time'}
											unit={''}
											dataPoint='mindsphere'
											title='pH'
											target={'9-11'}
											LL={9}
											HH={11}
										/>
									</Grid>
									{/** End */}
									{/** waterLevel */}
									<Grid key={'waterLevel'} item xs={12} sm={12} md={12} lg={12}>
										<Graph
											assetId={POWERWASH_ASSETID}
											aspectName='Tank1_Degreasing'
											variableName='Water_Level_cm'
											limit={3}
											dataKey={'_time'}
											unit={'%'}
											dataPoint='mindsphere'
											title='Water Level'
											target={'60-70'}
											LL={60}
											HH={70}
										/>
									</Grid>
									{/** End */}
								</Grid>
							</Grid>
							{/** End **/}
							{/** Col **/}
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<Grid
									container
									style={{
										border: `1px solid ${COLOR.blue}`,
										backgroundColor: 'white',
									}}
								>
									{/** Pressure 1 **/}
									<Grid key={'pressure-1'} item xs={12} style={{ paddingBottom: '7.5px' }}>
										<CircleGauge
											title={'Pump Pressure 1'}
											assetId={POWERWASH_ASSETID}
											aspectName={'Tank1_Degreasing'}
											parameterName={'Pressure1_bar'}
											dataPoint='mindsphere'
											border={false}
											subTitle={''}
											range={[
												{ value: 1.0, color: '#b2b2b2' },
												{ value: 1.5, color: '#154a98' },
												{ value: 2.0, color: '#ff1029' },
											]}
											unit={'bar'}
											min={0.5}
											max={2.0}
											LL={1}
											HH={1.5}
										/>
									</Grid>
									{/** End **/}
									{/** Pressure 2 **/}
									<Grid key={'pressure-2'} item xs={12} style={{ paddingBottom: '7.5px' }}>
										<CircleGauge
											title={'Pump Pressure 2'}
											assetId={POWERWASH_ASSETID}
											aspectName={'Tank1_Degreasing'}
											parameterName={'Pressure2_bar'}
											dataPoint='mindsphere'
											border={false}
											subTitle={''}
											range={[
												{ value: 1.0, color: '#b2b2b2' },
												{ value: 1.5, color: '#154a98' },
												{ value: 2.0, color: '#ff1029' },
											]}
											unit={'bar'}
											min={0.5}
											max={2.0}
											LL={1}
											HH={1.5}
										/>
									</Grid>
									{/** End **/}
									{/** Pressure 3 **/}
									<Grid key={'pressure-3'} item xs={12} style={{ paddingBottom: '7.5px' }}>
										<CircleGauge
											title={'Pump Pressure 3'}
											assetId={POWERWASH_ASSETID}
											aspectName={'Tank1_Degreasing'}
											parameterName={'Pressure3_bar'}
											dataPoint='mindsphere'
											border={false}
											subTitle={''}
											range={[
												{ value: 1.0, color: '#b2b2b2' },
												{ value: 1.5, color: '#154a98' },
												{ value: 2.0, color: '#ff1029' },
											]}
											unit={'bar'}
											min={0.5}
											max={2.0}
											LL={1}
											HH={1.5}
										/>
									</Grid>
									{/** End **/}
									{/** Pressure 4 **/}
									<Grid key={'pressure-4'} item xs={12} style={{ paddingBottom: '7.5px' }}>
										<CircleGauge
											title={'Pump Pressure 4'}
											assetId={POWERWASH_ASSETID}
											aspectName={'Tank1_Degreasing'}
											parameterName={'Pressure4_bar'}
											dataPoint='mindsphere'
											border={false}
											subTitle={''}
											range={[
												{ value: 1.0, color: '#b2b2b2' },
												{ value: 1.5, color: '#154a98' },
												{ value: 2.0, color: '#ff1029' },
											]}
											unit={'bar'}
											min={0.5}
											max={2.0}
											LL={1}
											HH={1.5}
										/>
									</Grid>
									{/** End **/}
									{/** Pressure 5 **/}
									<Grid key={'pressure-4'} item xs={12} style={{ paddingBottom: '7.5px' }}>
										<CircleGauge
											title={'Pump Pressure 5'}
											assetId={POWERWASH_ASSETID}
											aspectName={'Tank1_Degreasing'}
											parameterName={'Pressure5_bar'}
											dataPoint='mindsphere'
											border={false}
											subTitle={''}
											range={[
												{ value: 1.0, color: '#b2b2b2' },
												{ value: 1.5, color: '#154a98' },
												{ value: 2.0, color: '#ff1029' },
											]}
											unit={'bar'}
											min={0.5}
											max={2.0}
											LL={1}
											HH={1.5}
										/>
									</Grid>
									{/** End **/}
								</Grid>
							</Grid>
							{/** End **/}
						</Grid>
					</Grid>
					{/* End */}
					{/** T2 Row */}
					<Grid item xs={12} md={6} lg={6}>
						<Grid container spacing={1}>
							{/** T2 Col **/}
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={12} md={12} lg={12}>
										<div style={{ fontSize: 16, color: '#0f3790', fontWeight: 900 }}>Tank 2 (Rinse)</div>
									</Grid>
									{/** Rinse One */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/rinseone'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='pH'
												target={'7-9.5'}
												LL={7}
												HH={9.5}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** Water Level */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Water Level'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank2_WaterRinse'}
												parameterName={'Water_Level_cm'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 50, color: '#b2b2b2' },
													{ value: 81.5, color: '#154a98' },
													{ value: 113, color: '#ff1029' },
												]}
												unit={'cm'}
												min={18.5}
												max={113}
												LL={50}
												HH={81.5}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** Water Flow*/}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/wateroverflow'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='WOF > WW-T'
												target={'200'}
												HH={200}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** Pump Pressure */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Pump Pressure'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank2_WaterRinse'}
												parameterName={'Pressure_bar'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 0.35, color: '#b2b2b2' },
													{ value: 1.5, color: '#154a98' },
													{ value: 2.65, color: '#ff1029' },
												]}
												unit={'bar'}
												min={-0.8}
												max={2.65}
												LL={0.35}
												HH={1.5}
											/>
										</Paper>
									</Grid>
									{/** End */}
								</Grid>
							</Grid>
							{/** End **/}
							{/** T3 Col **/}
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Grid container spacing={1} style={{ marginTop: 22 }}>
									<Grid item xs={12} sm={12} md={12} lg={12}>
										<div style={{ fontSize: 16, color: '#0f3790', fontWeight: 900 }}>Tank 3 (Rinse)</div>
									</Grid>
									{/** T3 pH */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/rinsetwo'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='pH'
												target={'7-9'}
												LL={7}
												HH={9}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T3 Water Level */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Water Level'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank3_WaterRinse'}
												parameterName={'Water_Level_cm'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 55, color: '#b2b2b2' },
													{ value: 67, color: '#154a98' },
													{ value: 79, color: '#ff1029' },
												]}
												unit={'cm'}
												min={43}
												max={79}
												LL={55}
												HH={67}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T3 Water Flow*/}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/watersupplyt3'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='WS < T4'
												target={'100'}
												HH={100}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T3 Pump Pressure */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Pump Pressure'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank3_WaterRinse'}
												parameterName={'Pressure_bar'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 0.2, color: '#b2b2b2' },
													{ value: 0.5, color: '#154a98' },
													{ value: 0.8, color: '#ff1029' },
												]}
												unit={'bar'}
												min={-0.1}
												max={0.8}
												LL={0.2}
												HH={0.5}
											/>
										</Paper>
									</Grid>
									{/** End */}
								</Grid>
							</Grid>
							{/** End **/}
							{/** T4 Col **/}
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Grid container spacing={1} style={{ marginTop: 22 }}>
									<Grid item xs={12} sm={12} md={12} lg={12}>
										<div style={{ fontSize: 16, color: '#0f3790', fontWeight: 900 }}>Tank 4 (DI Rinse)</div>
									</Grid>
									{/** T4 pH */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/rinsethree'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='pH'
												target={'7-9'}
												LL={7.0}
												HH={9.0}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T4 Water Level */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Water Level'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank4_DIWaterRinse'}
												parameterName={'Water_Level_cm'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 70, color: '#b2b2b2' },
													{ value: 77, color: '#154a98' },
													{ value: 84, color: '#ff1029' },
												]}
												unit={'cm'}
												min={63}
												max={84}
												LL={70}
												HH={77}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T4 Water Flow*/}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/diwatersupplyt4'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='WS < DI-T'
												target={'200'}
												HH={200}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T4 Pump Pressure */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Pump Pressure'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank4_DIWaterRinse'}
												parameterName={'Pressure_bar'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 0.5, color: '#b2b2b2' },
													{ value: 1.0, color: '#154a98' },
													{ value: 1.5, color: '#ff1029' },
												]}
												unit={'bar'}
												min={0}
												max={1.5}
												LL={0.5}
												HH={1.0}
											/>
										</Paper>
									</Grid>
									{/** End */}
								</Grid>
							</Grid>
							{/** End **/}
							{/** T5 Col **/}
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Grid container spacing={1} style={{ marginTop: 22 }}>
									<Grid item xs={12} sm={12} md={12} lg={12}>
										<div style={{ fontSize: 16, color: '#0f3790', fontWeight: 900 }}>Tank 5 (DI Rinse)</div>
									</Grid>
									{/** T5 pH */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												assetId={POWERWASH_ASSETID}
												aspectName='Tank5_DIWaterRinse'
												variableName='pH'
												limit={3}
												dataKey={'_time'}
												unit={''}
												dataPoint='mindsphere'
												title='pH'
												target={'6-8.5'}
												LL={6.0}
												HH={8.5}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T5 Water Level */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Water Level'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank5_DIWaterRinse'}
												parameterName={'Water_Level_cm'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 70, color: '#b2b2b2' },
													{ value: 76, color: '#154a98' },
													{ value: 82, color: '#ff1029' },
												]}
												unit={'cm'}
												min={64}
												max={82}
												LL={70}
												HH={76}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T5 Water Flow*/}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<Graph
												pathName='dashboard'
												endPoint='degreasing/diwatersupplyt5'
												variableName='data'
												dataKey={'time'}
												limit={1000}
												dataPoint='api'
												unit={''}
												title='WS < DI-T'
												target={'100'}
												HH={200}
											/>
										</Paper>
									</Grid>
									{/** End */}
									{/** T5 Pump Pressure */}
									<Grid item xs={12} sm={12} md={3} lg={3}>
										<Paper className={this.props.classes.paper}>
											<CircleGauge
												title={'Pump Pressure'}
												assetId={POWERWASH_ASSETID}
												aspectName={'Tank5_DIWaterRinse'}
												parameterName={'Pressure_bar'}
												dataPoint='mindsphere'
												border={true}
												subTitle={''}
												range={[
													{ value: 0.5, color: '#b2b2b2' },
													{ value: 1.2, color: '#154a98' },
													{ value: 1.9, color: '#ff1029' },
												]}
												unit={'bar'}
												min={-0.2}
												max={1.9}
												LL={0.5}
												HH={1.2}
											/>
										</Paper>
									</Grid>
									{/** End */}
								</Grid>
							</Grid>
							{/** End **/}
						</Grid>
					</Grid>
					{/** End*/}
					{/** T6 Row **/}
					<Grid item xs={12} md={6} lg={3}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<div style={{ fontSize: 16, color: '#0f3790', fontWeight: 900 }}>Tank 6 (Passivation)</div>
							</Grid>
							{/** T6 pH */}
							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Paper className={this.props.classes.paper}>
									<Graph
										assetId={POWERWASH_ASSETID}
										aspectName='Tank6_Passivation'
										variableName='pH'
										limit={3}
										dataKey={'_time'}
										unit={''}
										dataPoint='mindsphere'
										title='pH'
										target={'8 - 10'}
										LL={8.0}
										HH={10.0}
									/>
								</Paper>
							</Grid>
							{/** End */}
							{/** T6 Water Level */}
							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Paper className={this.props.classes.paper}>
									<CircleGauge
										title={'Water Level'}
										assetId={POWERWASH_ASSETID}
										aspectName={'Tank6_Passivation'}
										parameterName={'Water_Level_cm'}
										dataPoint='mindsphere'
										border={true}
										subTitle={''}
										range={[
											{ value: 60, color: '#b2b2b2' },
											{ value: 76, color: '#154a98' },
											{ value: 92, color: '#ff1029' },
										]}
										unit={'cm'}
										min={44}
										max={92}
										LL={60}
										HH={76}
									/>
								</Paper>
							</Grid>
							{/** End */}
							{/** T6 Water Flow*/}
							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Paper className={this.props.classes.paper}>
									<Graph
										pathName='dashboard'
										endPoint='passivation/concentration'
										variableName='data'
										dataKey={'time'}
										limit={1000}
										dataPoint='api'
										unit={''}
										title='Concentration'
										target={'0.3 - 1.0'}
										LL={0.3}
										HH={1.0}
									/>
									{/*<Graph*/}
									{/*    assetId={POWERWASH_ASSETID}*/}
									{/*    aspectName="Tank6_Passivation"*/}
									{/*    variableName="OverFlow_Level_cm"*/}
									{/*    limit={3}*/}
									{/*    dataKey={'_time'}*/}
									{/*    unit={'%'}*/}
									{/*    dataPoint='mindsphere'*/}
									{/*    title="Concentration"*/}
									{/*    target={'200'}*/}
									{/*    HH={200}*/}
									{/*/>*/}
								</Paper>
							</Grid>
							{/** End */}
							{/** T6 Pump Pressure */}
							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Paper className={this.props.classes.paper}>
									<CircleGauge
										title={'Pump Pressure'}
										assetId={POWERWASH_ASSETID}
										aspectName={'Tank6_Passivation'}
										parameterName={'Pressure_bar'}
										dataPoint='mindsphere'
										border={true}
										subTitle={''}
										range={[
											{ value: 0.4, color: '#b2b2b2' },
											{ value: 1.0, color: '#154a98' },
											{ value: 1.5, color: '#ff1029' },
										]}
										unit={'bar'}
										min={0}
										max={1.5}
										LL={0.4}
										HH={1.0}
									/>
								</Paper>
							</Grid>
							{/** End */}
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<div style={{ fontSize: 16, marginTop: 5, color: '#0f3790', fontWeight: 900 }}>Water Levels</div>
							</Grid>
							{/** T6 Water Level Chart**/}
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Grid
									item
									xs={12}
									style={{
										border: `1px solid ${COLOR.blue}`,
										backgroundColor: 'white',
									}}
								>
									<ReactBarChart
										dataPoint='mindsphere'
										chartType='multiple'
										labels={[
											{
												label: 'TANK 1',
												variable: 'Water_Level_cm',
												assetId: POWERWASH_ASSETID,
												aspectName: 'Tank1_Degreasing',
											},
											{
												label: 'TANK 2',
												variable: 'Water_Level_cm',
												assetId: POWERWASH_ASSETID,
												aspectName: 'Tank2_WaterRinse',
											},
											{
												label: 'TANK 3',
												variable: 'Water_Level_cm',
												assetId: POWERWASH_ASSETID,
												aspectName: 'Tank3_WaterRinse',
											},
											{
												label: 'TANK 4',
												variable: 'Water_Level_cm',
												assetId: POWERWASH_ASSETID,
												aspectName: 'Tank4_DIWaterRinse',
											},
											{
												label: 'TANK 5',
												variable: 'Water_Level_cm',
												assetId: POWERWASH_ASSETID,
												aspectName: 'Tank5_DIWaterRinse',
											},
											{
												label: 'TANK 6',
												variable: 'Water_Level_cm',
												assetId: POWERWASH_ASSETID,
												aspectName: 'Tank6_Passivation',
											},
										]}
										width={430}
										height={470}
									/>
								</Grid>
							</Grid>
							{/** End **/}
						</Grid>
					</Grid>
					{/** End **/}
				</Grid>
			</div>
		);
	}
}

export default withStyles(useStyles, { withTheme: true })(Dashboard);
