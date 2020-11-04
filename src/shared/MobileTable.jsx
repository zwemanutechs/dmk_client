// import React, {Component} from 'react';
// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
// import {withStyles} from "@material-ui/styles";
// import Grid from "@material-ui/core/Grid";
// import Input from "@material-ui/core/Input";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import {SearchOutlined} from "@material-ui/icons";
// import Skeleton from "@material-ui/lab/Skeleton";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import InfiniteScroll from "react-infinite-scroll-component";
// import LinearProgress from '@material-ui/core/LinearProgress';
// import {
//     SwipeableList,
//     SwipeableListItem
// } from '@sandstreamdev/react-swipeable-list';
// import '@sandstreamdev/react-swipeable-list/dist/styles.css';
// import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
// import {sortByUpdatedAt} from "../appservices/app-services";
//
// const useStyles = theme => ({
//     skeletonBox: {
//         width: "100%",
//     },
//     textWrap:{
//         overflowWrap: 'anywhere'
//     }
// });
//
// /**
//  * Usually For SM and XS Table View
//  * **/
// class MobileTable extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: true,
//             rowData: [],
//             hasMore: false,
//             pageNo: 0,
//         }
//     }
//
//     async componentDidMount() {
//         const rowData = await this.initializeTable();
//         this.setState({rowData: rowData, loading: false, hasMore: false,  pageNo: 0});
//     }
//
//     async componentDidUpdate(prevProps, prevState, snapshot) {
//         if(prevProps.data !== this.props.data){
//             const rowData = await this.initializeTable();
//             this.setState({rowData: rowData.sort(this.sortByField), loading: false, hasMore: false,  pageNo: 0});
//         }
//     }
//
//     /**
//      * Sort by given prop
//      * **/
//     sortByField = (dateAPair, dateBPair) =>{
//         if(this.props.sortValue && this.props.sortValue !== ''){
//             let DateA = new Date(dateAPair[this.props.sortValue]);
//             let DateB = new Date(dateBPair[this.props.sortValue]);
//             if (DateA < DateB) {
//                 return 1;
//             } else if (DateA > DateB) {
//                 return -1;
//             } else {
//                 return 0;
//             }
//         }else{
//             return 0;
//         }
//
//     };
//
//     /**
//      * Initialize Table Data
//      * **/
//     initializeTable = () => {
//         this.setState({hasMore: true});
//         let _rowData = this.state.rowData;
//         if(Array.isArray(this.props.data) && this.props.data.length > 0){
//             this.props.data.forEach((dataObject) => {
//                 if(typeof dataObject === 'object'){
//                     let _rowDataObject;
//                     _rowDataObject = Object.assign({}, _rowDataObject, {id : dataObject.id});
//                     Object.keys(dataObject).forEach((key) => {
//                         const col = this.props.columns.find(col => col.name === key);
//                         if(col){
//                             _rowDataObject = Object.assign({}, _rowDataObject, {[col.label] : dataObject[col.name]});
//                         }
//                     });
//                     if(_rowDataObject){
//                         const dataIndex = _rowData.findIndex(x => x.id === _rowDataObject.id);
//                         if(dataIndex >= 0){
//                             _rowData[dataIndex] = _rowDataObject;
//                         }else{
//                             _rowData.push(_rowDataObject);
//                         }
//                     }
//                 }
//             });
//         }
//         return _rowData;
//     };
//
//     /**
//      * Get Selected Data and return to caller
//      * **/
//     handleClick = (idx) => {
//         if(typeof this.props.handleClick === "function"){
//             const rowData = this.state.rowData[idx];
//             this.props.handleClick(rowData, idx, 'SM');
//         }
//     };
//
//     /***
//      *  Fetch next data set on scroll end
//      * */
//     onNext = async () => {
//         if(this.props.totalCount > 10){
//             this.setState({pageNo: this.state.pageNo + 1}, async () => await this.props.nextData(this.state.pageNo));
//         }
//     };
//
//     /***
//      * On Delete swipe
//      * */
//     onDelete = async (idx) => {
//         if(typeof this.props.handelDelete === "function"){
//             const rowData = this.state.rowData[idx];
//             this.props.handelDelete(rowData).then((res) => {
//                 const newRowData = [...this.state.rowData];
//                 const deletedIndex = newRowData.findIndex(x => x.id === rowData.id);
//                 if(deletedIndex >= 0){
//                     newRowData.splice(deletedIndex, 1);
//                     this.setState({rowData: [...newRowData]});
//                 }
//
//             });
//         }
//     };
//
//     render() {
//         return (
//             <Grid container direction="row" spacing={1} justify="center">
//                 <Grid item xs={4}>
//                     <Typography variant="h6">
//                         {this.props.title}
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={8}>
//                     <Input
//                         placeholder="Search e.g.sample@dormakaba.com"
//                         fullWidth={true}
//                         inputProps={{ 'aria-label': 'description' }}
//                         style={{marginRight: 5}}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <SearchOutlined />
//                             </InputAdornment>
//                         }
//                     />
//                 </Grid>
//                 <Grid item xs={12} style={{marginTop: 10}}>
//                     {
//                         Array.isArray(this.props.data) && this.props.data.length === 0 ? <Grid container direction="row" justify="center" spacing={2}>
//                                 <Grid item xs={12}>
//                                     <Skeleton variant="rect" className={this.props.classes.skeletonBox} height={118} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Skeleton variant="rect" className={this.props.classes.skeletonBox} height={118} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Skeleton variant="rect" className={this.props.classes.skeletonBox} height={118} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Skeleton variant="rect" className={this.props.classes.skeletonBox} height={118} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Skeleton variant="rect" className={this.props.classes.skeletonBox} height={118} />
//                                 </Grid>
//                             </Grid>
//                             : <InfiniteScroll
//                                 dataLength={10}
//                                 style={{overflowX: 'hidden', margin: 0, padding: 0, width: '100%'}}
//                                 next={this.onNext}
//                                 hasMore={true}
//                                 loader={<LinearProgress color="secondary" style={{display: this.state.hasMore ? 'inline': 'none'}} />}
//                             >
//                                 <Grid container direction="row" justify="center" spacing={2}>
//                                     {
//                                         Array.isArray(this.state.rowData) && this.state.rowData.length > 0 ?
//                                             <SwipeableList>
//                                                 {
//                                                     this.state.rowData.map((rd, idx) => <SwipeableListItem
//                                                             blockSwipe={typeof this.props.handelDelete !== "function"}
//                                                             style={{padding: 10}}
//                                                             key={`sw${idx}`}
//                                                             swipeLeft={{
//                                                                 content: <div><DeleteForeverOutlinedIcon style={{ fontSize: 85, color: 'red' }} /></div>,
//                                                                 action: () => this.onDelete(idx)
//                                                             }}
//                                                     >
//                                                             <Grid item xs={12} key={idx} style={{overflow: 'hidden'}}>
//                                                                 <Card elevation={1}>
//                                                                 <CardActionArea onClick={e => {this.handleClick(idx)}}>
//                                                                     <Grid container direction="row" spacing={1} justify="flex-start" style={{paddingRight: 15, paddingLeft: 15}}>
//                                                                         {
//                                                                             Object.keys(rd).map((key, index) => key !== 'id' ? <Grid container direction="row" spacing={3} key={index} justify="space-evenly" style={{marginTop: 1, borderBottom: '1px solid #ddd', marginBottom: 2}}>
//                                                                                 <Grid item xs={6} key={key}>
//                                                                                     <Typography variant="subtitle1" className={this.props.classes.textWrap}>
//                                                                                         {key}
//                                                                                     </Typography>
//                                                                                 </Grid>
//                                                                                 <Grid item xs={6} key={`${key + index}`} >
//                                                                                     <Typography variant="subtitle1" className={this.props.classes.textWrap}>
//                                                                                         {rd[key]}
//                                                                                     </Typography>
//                                                                                 </Grid>
//                                                                             </Grid> : null)
//                                                                         }
//                                                                     </Grid>
//                                                                 </CardActionArea>
//                                                             </Card>
//                                                             </Grid>
//                                                     </SwipeableListItem>)
//                                                 }
//                                             </SwipeableList>
//                                             : <Typography variant="h6" >No Record</Typography>
//                                     }
//                                 </Grid>
//                             </InfiniteScroll>
//                     }
//                 </Grid>
//             </Grid>
//         );
//     }
// }
//
// export default withStyles(useStyles, { name: 'MobileTable' })(MobileTable);
