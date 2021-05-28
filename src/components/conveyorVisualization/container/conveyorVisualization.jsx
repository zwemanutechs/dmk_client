import React, {Component, PureComponent, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from "@material-ui/styles";
import { ReactComponent as TrolleyPlus } from "../../../assets/images/svg/trolleyPlus.svg";
import { ReactComponent as TrolleyMinus } from "../../../assets/images/svg/trolleyMinus.svg";
import './style.css';
import { loadLatestValue, handleMindsphereError } from "../../../appservices/mindsphere-iotapi-services";
import {
    ORDER_LOADING_ASSETID,
    ORDER_ESTA1_ASSETID,
    ORDER_ESTA2_ASSETID,
    ORDER_UNLOADING1_ASSETID,
    ORDER_UNLOADING2_ASSETID
} from "../../../constants/mindsphere-constants";
import { Link } from "react-router-dom";
import { TOOMANYREQUESTS } from "../../../constants/app-constants";
import { loadingModel, unloadingModel } from '../model/model';
import { get } from "../../../middleware/axios-middleware";

const useStyles = theme => ({

});

function ConveyorVisualization (props, innerRef){
    const [data, setData] = useState({});
    const [dataInfo, setDataInfo] = useState({});
    const [dataLabel, setDataLabel] = useState({});
    const [refreshInterval, setRefreshInterval] = useState(0);

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(() => {loadData()}, refreshInterval);
            return () => clearInterval(interval);
        }else{
            loadData();
            setRefreshInterval(60000);
        }
    }, [refreshInterval]);

    const loadData = async () => {                
        const masterData = await get(
            `masterdata?pageNo=${0}&pageSize=${10}`
        );

        let from = new Date();
        let fromTo = new Date(from.setDate(from.getDate() - 1));
        let to = new Date();
        const assets = [
            {name:'Loading', id:ORDER_LOADING_ASSETID},
            {name:'ESTA1', id:ORDER_ESTA1_ASSETID},
            {name:'ESTA2', id:ORDER_ESTA2_ASSETID},
            {name:'Unloading1', id:ORDER_UNLOADING1_ASSETID},
            {name:'Unloading2', id:ORDER_UNLOADING2_ASSETID}
        ];
        let tempData = {}
        let tempDataInfo = {}
        let tempDataLabel = {}

        await Promise.all(assets.map(async (asset) => {
            for (var i = 0; i < 10; i++) {
                let trolleyName = asset.id === ORDER_UNLOADING1_ASSETID || asset.id === ORDER_UNLOADING2_ASSETID ? 'Unloading_0' + i : 'Trolley_0' + i;
                let positionName = i < 9 ? 'Position 0' + (i + 1) : 'Position 10';
                let dataId = `${asset.name}_${trolleyName}`;
                let params = asset.id === ORDER_UNLOADING1_ASSETID || asset.id === ORDER_UNLOADING2_ASSETID ? unloadingModel.toString() : loadingModel.toString();
                await loadLatestValue(asset.id, trolleyName, params)
                .then((response) => {
                    if (response && response.data  && response.data.length > 0) {
                        // let aggreateData = response.data.aggregates.reduce((r, o) => (Object.entries(o).forEach(([k, v]) => r[k] = v['lastvalue']), r), {});
                        let aggreateData = response.data[0];
                        let name = { Name: `${asset.name} ${positionName}` };
                        aggreateData = { ...name, ...aggreateData };
                        tempData[dataId] = aggreateData;

                        // Assign trolley labels
                        let obj = {};
                        obj.TrolleyNo = aggreateData.TrolleyNoInOrder || aggreateData.FirstTrolleyNo || 0;
                        obj.Desc = '';
                        obj.Col = '';
                        obj.Prog = aggreateData.BarcodeData_Program || aggreateData.Data_Program || '';
                        obj.Qty = aggreateData.BarcodeData_TotalAmountOfParts || aggreateData.Data_TotalAmountOfParts || 0;
                        obj.NoOfTrolley= aggreateData.BarcodeData_TotalAmountOfTrolley || aggreateData.Data_TotalAmountOfTrolley || 0;
                        obj.ETA = '';
                        if (masterData && masterData.data.data.data && masterData.data.data.data.length > 0) {
                            if (aggreateData.BarcodeData_MaterialNumber || aggreateData.Data_MaterialNumber) {
                              let index = masterData.data.data.data.findIndex((x) => (x.number === aggreateData.BarcodeData_MaterialNumber || x.number === aggreateData.Data_MaterialNumber) && x.type === 'Material No');
                
                              if (index > -1) {
                                let desc = masterData.data.data.data[index].description;
                                if (desc.length > 7) {
                                    desc = desc.substring(0,7) + '...';
                                    aggreateData.Desc = masterData.data.data.data[index].description;
                                }
                                obj.Desc = desc;
                              }
                            }
              
                            if (aggreateData.BarcodeData_ColorCode || aggreateData.Data_ColorCode) {
                              let index = masterData.data.data.data.findIndex((x) => (x.number === aggreateData.BarcodeData_ColorCode || x.number === aggreateData.Data_ColorCode) && x.type === 'Color Code');
                
                              if (index > -1) {
                                let desc = masterData.data.data.data[index].description;
                                if (desc.length > 7) {
                                    desc = desc.substring(0,7) + '...';
                                    aggreateData.Col = masterData.data.data.data[index].description;
                                }
                                obj.Col = desc;
                              }
                            }
                        }
                        tempDataLabel[dataId] = obj;

                        // Remove unwanted parameters
                        let filteredAggreateData = Object.entries(aggreateData).reduce((newObj, [key, val]) => {
                            if (!key.includes('qc') && !key.includes('_time')) {
                              newObj[key] = val;
                            }
                            return newObj;
                          }, {})

                          // Remove quotation marks "" and brackets {}
                        tempDataInfo[dataId] = JSON.stringify(filteredAggreateData, undefined, 2).replace(/[{}]/g, "").replace(/"([^"]+)":/g, '$1:');
                    } else {
                        tempData[dataId] = {};
                        tempDataInfo[dataId] = {};
                        tempDataLabel[dataId] = {};
                    }
                })
                .catch((error) => {
                    handleMindsphereError(TOOMANYREQUESTS);
                });
            }
        }))
        setData(tempData);
        setDataInfo(tempDataInfo);
        setDataLabel(tempDataLabel);
    }

    return (          
        <div className="grid-container">
            <div className="trolleyPlus"><TrolleyPlus /><p className="label adjust">Loading</p></div>
            <div className="trolleyMinus1"><TrolleyMinus /><p className="label">Unloading 1</p></div>
            <div className="trolleyMinus2"><TrolleyMinus /><p className="label">Unloading 2</p></div>
            <div className="layout">
                <svg
                    width="100%"
                    height="1000"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    {/* Line flow */}
                    <line x1="40" y1="40" x2="1200" y2="40" style={{stroke:'#006600'}}/>
                    <line x1="1200" y1="40" x2="1200" y2="210" style={{stroke:'#006600'}}/>
                    <line x1="40" y1="210" x2="1200" y2="210" style={{stroke:'#006600'}}/>
                    <line x1="40" y1="210" x2="40" y2="420" style={{stroke:'#006600'}}/>
                    <line x1="40" y1="420" x2="1200" y2="420" style={{stroke:'#006600'}}/>
                    <line x1="1200" y1="420" x2="1200" y2="700" style={{stroke:'#006600'}}/>
                    <line x1="1180" y1="700" x2="1200" y2="700" style={{stroke:'#006600'}}/>
                    <line x1="1180" y1="610" x2="1180" y2="790" style={{stroke:'#006600'}}/>
                    <line x1="40" y1="610" x2="1180" y2="610" style={{stroke:'#006600'}}/>
                    <line x1="40" y1="790" x2="1180" y2="790" style={{stroke:'#006600'}}/>

                    {/* Order Loading */}
                    <Link innerRef={innerRef} to="/OrderLoading">
                    {/* <Link to="/OrderLoading"> */}
                        {data.Loading_Trolley_00 && Object.keys(data.Loading_Trolley_00).length > 0 && 
                        data.Loading_Trolley_00.BarcodeData_MaterialNumber && data.Loading_Trolley_00.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="40" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_00}</title></circle> :
                            <circle cx="40" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="5" y="85"> T/N: {dataLabel.Loading_Trolley_00 && dataLabel.Loading_Trolley_00.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_00.TrolleyNo : ''}</text>  */}
                            <text x="5" y="85"> Desc: {dataLabel.Loading_Trolley_00 && dataLabel.Loading_Trolley_00.Desc ? dataLabel.Loading_Trolley_00.Desc : ''}</text>    
                            <text x="5" y="100"> Qty: {dataLabel.Loading_Trolley_00 && dataLabel.Loading_Trolley_00.Qty ? dataLabel.Loading_Trolley_00.Qty : ''}</text>      
                            <text x="5" y="115"> Col: {dataLabel.Loading_Trolley_00 && dataLabel.Loading_Trolley_00.Col ? dataLabel.Loading_Trolley_00.Col : ''}</text>      
                            <text x="5" y="130"> Prog: {dataLabel.Loading_Trolley_00 && dataLabel.Loading_Trolley_00.Prog ? dataLabel.Loading_Trolley_00.Prog : ''}</text>          
                            <text x="5" y="145"> N/T: {dataLabel.Loading_Trolley_00 && dataLabel.Loading_Trolley_00.NoOfTrolley ? dataLabel.Loading_Trolley_00.NoOfTrolley : ''}</text>                                 
                        {data.Loading_Trolley_01 && Object.keys(data.Loading_Trolley_01).length > 0 && 
                        data.Loading_Trolley_01.BarcodeData_MaterialNumber && data.Loading_Trolley_01.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="160" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_01}</title></circle> :
                            <circle cx="160" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="125" y="85"> T/N: {dataLabel.Loading_Trolley_01 && dataLabel.Loading_Trolley_01.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_01.TrolleyNo : ''}</text>  */}
                            <text x="125" y="85"> Desc: {dataLabel.Loading_Trolley_01 && dataLabel.Loading_Trolley_01.Desc ? dataLabel.Loading_Trolley_01.Desc : ''}</text>    
                            <text x="125" y="100"> Qty: {dataLabel.Loading_Trolley_01 && dataLabel.Loading_Trolley_01.Qty ? dataLabel.Loading_Trolley_01.Qty : ''}</text>      
                            <text x="125" y="115"> Col: {dataLabel.Loading_Trolley_01 && dataLabel.Loading_Trolley_01.Col ? dataLabel.Loading_Trolley_01.Col : ''}</text>      
                            <text x="125" y="130"> Prog: {dataLabel.Loading_Trolley_01 && dataLabel.Loading_Trolley_01.Prog ? dataLabel.Loading_Trolley_01.Prog : ''}</text>          
                            <text x="125" y="145"> N/T: {dataLabel.Loading_Trolley_01 && dataLabel.Loading_Trolley_01.NoOfTrolley ? dataLabel.Loading_Trolley_01.NoOfTrolley : ''}</text>                
                        {data.Loading_Trolley_02 && Object.keys(data.Loading_Trolley_02).length > 0 && 
                        data.Loading_Trolley_02BarcodeData_MaterialNumber && data.Loading_Trolley_02.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="280" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_02}</title></circle> :
                            <circle cx="280" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="245" y="85"> T/N: {dataLabel.Loading_Trolley_02 && dataLabel.Loading_Trolley_02.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_02.TrolleyNo : ''}</text>  */}
                            <text x="245" y="85"> Desc: {dataLabel.Loading_Trolley_02 && dataLabel.Loading_Trolley_02.Desc ? dataLabel.Loading_Trolley_02.Desc : ''}</text>    
                            <text x="245" y="100"> Qty: {dataLabel.Loading_Trolley_02 && dataLabel.Loading_Trolley_02.Qty ? dataLabel.Loading_Trolley_02.Qty : ''}</text>      
                            <text x="245" y="115"> Col: {dataLabel.Loading_Trolley_02 && dataLabel.Loading_Trolley_02.Col ? dataLabel.Loading_Trolley_02.Col : ''}</text>      
                            <text x="245" y="130"> Prog: {dataLabel.Loading_Trolley_02 && dataLabel.Loading_Trolley_02.Prog ? dataLabel.Loading_Trolley_02.Prog : ''}</text>          
                            <text x="245" y="145"> N/T: {dataLabel.Loading_Trolley_02 && dataLabel.Loading_Trolley_02.NoOfTrolley ? dataLabel.Loading_Trolley_02.NoOfTrolley : ''}</text>                
                        {data.Loading_Trolley_03 && Object.keys(data.Loading_Trolley_03).length > 0 && 
                        data.Loading_Trolley_03.BarcodeData_MaterialNumber && data.Loading_Trolley_03.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="400" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_03}</title></circle> :
                            <circle cx="400" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="365" y="85"> T/N: {dataLabel.Loading_Trolley_03 && dataLabel.Loading_Trolley_03.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_03.TrolleyNo : ''}</text>  */}
                            <text x="365" y="85"> Desc: {dataLabel.Loading_Trolley_03 && dataLabel.Loading_Trolley_03.Desc ? dataLabel.Loading_Trolley_03.Desc : ''}</text>    
                            <text x="365" y="100"> Qty: {dataLabel.Loading_Trolley_03 && dataLabel.Loading_Trolley_03.Qty ? dataLabel.Loading_Trolley_03.Qty : ''}</text>      
                            <text x="365" y="115"> Col: {dataLabel.Loading_Trolley_03 && dataLabel.Loading_Trolley_03.Col ? dataLabel.Loading_Trolley_03.Col : ''}</text>      
                            <text x="365" y="130"> Prog: {dataLabel.Loading_Trolley_03 && dataLabel.Loading_Trolley_03.Prog ? dataLabel.Loading_Trolley_03.Prog : ''}</text>          
                            <text x="365" y="145"> N/T: {dataLabel.Loading_Trolley_03 && dataLabel.Loading_Trolley_03.NoOfTrolley ? dataLabel.Loading_Trolley_03.NoOfTrolley : ''}</text>              
                        {data.Loading_Trolley_04 && Object.keys(data.Loading_Trolley_04).length > 0 && 
                        data.Loading_Trolley_04.BarcodeData_MaterialNumber && data.Loading_Trolley_04.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="520" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_04}</title></circle> :
                            <circle cx="520" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="485" y="85"> T/N: {dataLabel.Loading_Trolley_04 && dataLabel.Loading_Trolley_04.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_04.TrolleyNo : ''}</text>  */}
                            <text x="485" y="85"> Desc: {dataLabel.Loading_Trolley_04 && dataLabel.Loading_Trolley_04.Desc ? dataLabel.Loading_Trolley_04.Desc : ''}</text>    
                            <text x="485" y="100"> Qty: {dataLabel.Loading_Trolley_04 && dataLabel.Loading_Trolley_04.Qty ? dataLabel.Loading_Trolley_04.Qty : ''}</text>      
                            <text x="485" y="115"> Col: {dataLabel.Loading_Trolley_04 && dataLabel.Loading_Trolley_04.Col ? dataLabel.Loading_Trolley_04.Col : ''}</text>      
                            <text x="485" y="130"> Prog: {dataLabel.Loading_Trolley_04 && dataLabel.Loading_Trolley_04.Prog ? dataLabel.Loading_Trolley_04.Prog : ''}</text>          
                            <text x="485" y="145"> N/T: {dataLabel.Loading_Trolley_04 && dataLabel.Loading_Trolley_04.NoOfTrolley ? dataLabel.Loading_Trolley_04.NoOfTrolley : ''}</text>              
                        {data.Loading_Trolley_05 && Object.keys(data.Loading_Trolley_05).length > 0 && 
                        data.Loading_Trolley_05.BarcodeData_MaterialNumber && data.Loading_Trolley_05.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="640" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_05}</title></circle> :
                            <circle cx="640" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="605" y="85"> T/N: {dataLabel.Loading_Trolley_05 && dataLabel.Loading_Trolley_05.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_05.TrolleyNo : ''}</text>  */}
                            <text x="605" y="85"> Desc: {dataLabel.Loading_Trolley_05 && dataLabel.Loading_Trolley_05.Desc ? dataLabel.Loading_Trolley_05.Desc : ''}</text>    
                            <text x="605" y="100"> Qty: {dataLabel.Loading_Trolley_05 && dataLabel.Loading_Trolley_05.Qty ? dataLabel.Loading_Trolley_05.Qty : ''}</text>      
                            <text x="605" y="115"> Col: {dataLabel.Loading_Trolley_05 && dataLabel.Loading_Trolley_05.Col ? dataLabel.Loading_Trolley_05.Col : ''}</text>      
                            <text x="605" y="130"> Prog: {dataLabel.Loading_Trolley_05 && dataLabel.Loading_Trolley_05.Prog ? dataLabel.Loading_Trolley_05.Prog : ''}</text>          
                            <text x="605" y="145"> N/T: {dataLabel.Loading_Trolley_05 && dataLabel.Loading_Trolley_05.NoOfTrolley ? dataLabel.Loading_Trolley_05.NoOfTrolley : ''}</text>              
                        {data.Loading_Trolley_06 && Object.keys(data.Loading_Trolley_06).length > 0 && 
                        data.Loading_Trolley_06.BarcodeData_MaterialNumber && data.Loading_Trolley_06.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="760" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_06}</title></circle> :
                            <circle cx="760" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="725" y="85"> T/N: {dataLabel.Loading_Trolley_06 && dataLabel.Loading_Trolley_06.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_06.TrolleyNo : ''}</text>  */}
                            <text x="725" y="85"> Desc: {dataLabel.Loading_Trolley_06 && dataLabel.Loading_Trolley_06.Desc ? dataLabel.Loading_Trolley_06.Desc : ''}</text>    
                            <text x="725" y="100"> Qty: {dataLabel.Loading_Trolley_06 && dataLabel.Loading_Trolley_06.Qty ? dataLabel.Loading_Trolley_06.Qty : ''}</text>      
                            <text x="725" y="115"> Col: {dataLabel.Loading_Trolley_06 && dataLabel.Loading_Trolley_06.Col ? dataLabel.Loading_Trolley_06.Col : ''}</text>      
                            <text x="725" y="130"> Prog: {dataLabel.Loading_Trolley_06 && dataLabel.Loading_Trolley_06.Prog ? dataLabel.Loading_Trolley_06.Prog : ''}</text>          
                            <text x="725" y="145"> N/T: {dataLabel.Loading_Trolley_06 && dataLabel.Loading_Trolley_06.NoOfTrolley ? dataLabel.Loading_Trolley_06.NoOfTrolley : ''}</text>              
                        {data.Loading_Trolley_07 && Object.keys(data.Loading_Trolley_07).length > 0 && 
                        data.Loading_Trolley_07.BarcodeData_MaterialNumber && data.Loading_Trolley_07.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="880" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_07}</title></circle> :
                            <circle cx="880" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="845" y="85"> T/N: {dataLabel.Loading_Trolley_07 && dataLabel.Loading_Trolley_07.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_07.TrolleyNo : ''}</text>  */}
                            <text x="845" y="85"> Desc: {dataLabel.Loading_Trolley_07 && dataLabel.Loading_Trolley_07.Desc ? dataLabel.Loading_Trolley_07.Desc : ''}</text>    
                            <text x="845" y="100"> Qty: {dataLabel.Loading_Trolley_07 && dataLabel.Loading_Trolley_07.Qty ? dataLabel.Loading_Trolley_07.Qty : ''}</text>      
                            <text x="845" y="115"> Col: {dataLabel.Loading_Trolley_07 && dataLabel.Loading_Trolley_07.Col ? dataLabel.Loading_Trolley_07.Col : ''}</text>      
                            <text x="845" y="130"> Prog: {dataLabel.Loading_Trolley_07 && dataLabel.Loading_Trolley_07.Prog ? dataLabel.Loading_Trolley_07.Prog : ''}</text>          
                            <text x="845" y="145"> N/T: {dataLabel.Loading_Trolley_07 && dataLabel.Loading_Trolley_07.NoOfTrolley ? dataLabel.Loading_Trolley_07.NoOfTrolley : ''}</text>              
                        {data.Loading_Trolley_08 && Object.keys(data.Loading_Trolley_08).length > 0 && 
                        data.Loading_Trolley_08.BarcodeData_MaterialNumber && data.Loading_Trolley_08.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="1000" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_08}</title></circle> :
                            <circle cx="1000" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="965" y="85"> T/N: {dataLabel.Loading_Trolley_08 && dataLabel.Loading_Trolley_08.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_08.TrolleyNo : ''}</text>  */}
                            <text x="965" y="85"> Desc: {dataLabel.Loading_Trolley_08 && dataLabel.Loading_Trolley_08.Desc ? dataLabel.Loading_Trolley_08.Desc : ''}</text>    
                            <text x="965" y="100"> Qty: {dataLabel.Loading_Trolley_08 && dataLabel.Loading_Trolley_08.Qty ? dataLabel.Loading_Trolley_08.Qty : ''}</text>      
                            <text x="965" y="115"> Col: {dataLabel.Loading_Trolley_08 && dataLabel.Loading_Trolley_08.Col ? dataLabel.Loading_Trolley_08.Col : ''}</text>      
                            <text x="965" y="130"> Prog: {dataLabel.Loading_Trolley_08 && dataLabel.Loading_Trolley_08.Prog ? dataLabel.Loading_Trolley_08.Prog : ''}</text>          
                            <text x="965" y="145"> N/T: {dataLabel.Loading_Trolley_08 && dataLabel.Loading_Trolley_08.NoOfTrolley ? dataLabel.Loading_Trolley_08.NoOfTrolley : ''}</text>              
                        {data.Loading_Trolley_09 && Object.keys(data.Loading_Trolley_09).length > 0 && 
                        data.Loading_Trolley_09.BarcodeData_MaterialNumber && data.Loading_Trolley_09.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="1120" cy="40" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Loading_Trolley_09}</title></circle> :
                            <circle cx="1120" cy="40" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            {/* <text x="1085" y="85"> T/N: {dataLabel.Loading_Trolley_09 && dataLabel.Loading_Trolley_09.TrolleyNo !== undefined ? dataLabel.Loading_Trolley_09.TrolleyNo : ''}</text>  */}
                            <text x="1085" y="85"> Desc: {dataLabel.Loading_Trolley_09 && dataLabel.Loading_Trolley_09.Desc ? dataLabel.Loading_Trolley_09.Desc : ''}</text>    
                            <text x="1085" y="100"> Qty: {dataLabel.Loading_Trolley_09 && dataLabel.Loading_Trolley_09.Qty ? dataLabel.Loading_Trolley_09.Qty : ''}</text>      
                            <text x="1085" y="115"> Col: {dataLabel.Loading_Trolley_09 && dataLabel.Loading_Trolley_09.Col ? dataLabel.Loading_Trolley_09.Col : ''}</text>      
                            <text x="1085" y="130"> Prog: {dataLabel.Loading_Trolley_09 && dataLabel.Loading_Trolley_09.Prog ? dataLabel.Loading_Trolley_09.Prog : ''}</text>          
                            <text x="1085" y="145"> N/T: {dataLabel.Loading_Trolley_09 && dataLabel.Loading_Trolley_09.NoOfTrolley ? dataLabel.Loading_Trolley_09.NoOfTrolley : ''}</text>              
                    </Link>

                    {/* ESTA 1 Box */}
                    <rect x="2" y="170" width="1175" height="190" style={{stroke:'#cc0000', strokeWidth: '1', strokeDasharray: '10 5', fill: 'none'}} />
                    <text x="520" y="350" style={{fill: '#cc0000', fontWeight: 'bold'}}>Paint Booth ESTA 1</text>

                    {/* ESTA 1 */}
                    <Link innerRef={innerRef} to="/OrderESTA1And2">
                    {/* <Link to="/OrderESTA1And2"> */}
                        {/* {data.ESTA1_Trolley_09 && Object.keys(data.ESTA1_Trolley_09).length > 0 && 
                        data.ESTA1_Trolley_09.BarcodeData_MaterialNumber && data.ESTA1_Trolley_09.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="40" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_09}</title></circle> :
                            <circle cx="40" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}   
                            <text x="5" y="255"> T/N: {dataLabel.ESTA1_Trolley_09 && dataLabel.ESTA1_Trolley_09.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_09.TrolleyNo : ''}</text> 
                            <text x="5" y="270"> Desc: {dataLabel.ESTA1_Trolley_09 && dataLabel.ESTA1_Trolley_09.Desc ? dataLabel.ESTA1_Trolley_09.Desc : ''}</text>    
                            <text x="5" y="285"> Qty: {dataLabel.ESTA1_Trolley_09 && dataLabel.ESTA1_Trolley_09.Qty ? dataLabel.ESTA1_Trolley_09.Qty : ''}</text>      
                            <text x="5" y="300"> Col: {dataLabel.ESTA1_Trolley_09 && dataLabel.ESTA1_Trolley_09.Col ? dataLabel.ESTA1_Trolley_09.Col : ''}</text>      
                            <text x="5" y="315"> Prog: {dataLabel.ESTA1_Trolley_09 && dataLabel.ESTA1_Trolley_09.Prog ? dataLabel.ESTA1_Trolley_09.Prog : ''}</text>          
                            <text x="5" y="330"> N/T: {dataLabel.ESTA1_Trolley_09 && dataLabel.ESTA1_Trolley_09.NoOfTrolley ? dataLabel.ESTA1_Trolley_09.NoOfTrolley : ''}</text>              
                        {data.ESTA1_Trolley_08 && Object.keys(data.ESTA1_Trolley_08).length > 0 && 
                        data.ESTA1_Trolley_08.BarcodeData_MaterialNumber && data.ESTA1_Trolley_08.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="160" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_08}</title></circle> :
                            <circle cx="160" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="125" y="255"> T/N: {dataLabel.ESTA1_Trolley_08 && dataLabel.ESTA1_Trolley_08.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_08.TrolleyNo : ''}</text> 
                            <text x="125" y="270"> Desc: {dataLabel.ESTA1_Trolley_08 && dataLabel.ESTA1_Trolley_08.Desc ? dataLabel.ESTA1_Trolley_08.Desc : ''}</text>    
                            <text x="125" y="285"> Qty: {dataLabel.ESTA1_Trolley_08 && dataLabel.ESTA1_Trolley_08.Qty ? dataLabel.ESTA1_Trolley_08.Qty : ''}</text>      
                            <text x="125" y="300"> Col: {dataLabel.ESTA1_Trolley_08 && dataLabel.ESTA1_Trolley_08.Col ? dataLabel.ESTA1_Trolley_08.Col : ''}</text>      
                            <text x="125" y="315"> Prog: {dataLabel.ESTA1_Trolley_08 && dataLabel.ESTA1_Trolley_08.Prog ? dataLabel.ESTA1_Trolley_08.Prog : ''}</text>          
                            <text x="125" y="330"> N/T: {dataLabel.ESTA1_Trolley_08 && dataLabel.ESTA1_Trolley_08.NoOfTrolley ? dataLabel.ESTA1_Trolley_08.NoOfTrolley : ''}</text>             
                        {data.ESTA1_Trolley_07 && Object.keys(data.ESTA1_Trolley_07).length > 0 && 
                        data.ESTA1_Trolley_07.BarcodeData_MaterialNumber && data.ESTA1_Trolley_07.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="280" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_07}</title></circle> :
                            <circle cx="280" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="245" y="255"> T/N: {dataLabel.ESTA1_Trolley_07 && dataLabel.ESTA1_Trolley_07.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_07.TrolleyNo : ''}</text> 
                            <text x="245" y="270"> Desc: {dataLabel.ESTA1_Trolley_07 && dataLabel.ESTA1_Trolley_07.Desc ? dataLabel.ESTA1_Trolley_07.Desc : ''}</text>    
                            <text x="245" y="285"> Qty: {dataLabel.ESTA1_Trolley_07 && dataLabel.ESTA1_Trolley_07.Qty ? dataLabel.ESTA1_Trolley_07.Qty : ''}</text>      
                            <text x="245" y="300"> Col: {dataLabel.ESTA1_Trolley_07 && dataLabel.ESTA1_Trolley_07.Col ? dataLabel.ESTA1_Trolley_07.Col : ''}</text>      
                            <text x="245" y="315"> Prog: {dataLabel.ESTA1_Trolley_07 && dataLabel.ESTA1_Trolley_07.Prog ? dataLabel.ESTA1_Trolley_07.Prog : ''}</text>          
                            <text x="245" y="330"> N/T: {dataLabel.ESTA1_Trolley_07 && dataLabel.ESTA1_Trolley_07.NoOfTrolley ? dataLabel.ESTA1_Trolley_07.NoOfTrolley : ''}</text>             
                        {data.ESTA1_Trolley_06 && Object.keys(data.ESTA1_Trolley_06).length > 0 && 
                        data.ESTA1_Trolley_06.BarcodeData_MaterialNumber && data.ESTA1_Trolley_06.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="400" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_06}</title></circle> :
                            <circle cx="400" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="365" y="255"> T/N: {dataLabel.ESTA1_Trolley_06 && dataLabel.ESTA1_Trolley_06.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_06.TrolleyNo : ''}</text> 
                            <text x="365" y="270"> Desc: {dataLabel.ESTA1_Trolley_06 && dataLabel.ESTA1_Trolley_06.Desc ? dataLabel.ESTA1_Trolley_06.Desc : ''}</text>    
                            <text x="365" y="285"> Qty: {dataLabel.ESTA1_Trolley_06 && dataLabel.ESTA1_Trolley_06.Qty ? dataLabel.ESTA1_Trolley_06.Qty : ''}</text>      
                            <text x="365" y="300"> Col: {dataLabel.ESTA1_Trolley_06 && dataLabel.ESTA1_Trolley_06.Col ? dataLabel.ESTA1_Trolley_06.Col : ''}</text>      
                            <text x="365" y="315"> Prog: {dataLabel.ESTA1_Trolley_06 && dataLabel.ESTA1_Trolley_06.Prog ? dataLabel.ESTA1_Trolley_06.Prog : ''}</text>          
                            <text x="365" y="330"> N/T: {dataLabel.ESTA1_Trolley_06 && dataLabel.ESTA1_Trolley_06.NoOfTrolley ? dataLabel.ESTA1_Trolley_06.NoOfTrolley : ''}</text>         
                        {data.ESTA1_Trolley_05 && Object.keys(data.ESTA1_Trolley_05).length > 0 && 
                        data.ESTA1_Trolley_05.BarcodeData_MaterialNumber && data.ESTA1_Trolley_05.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="520" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_05}</title></circle> :
                            <circle cx="520" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="485" y="255"> T/N: {dataLabel.ESTA1_Trolley_05 && dataLabel.ESTA1_Trolley_05.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_05.TrolleyNo : ''}</text> 
                            <text x="485" y="270"> Desc: {dataLabel.ESTA1_Trolley_05 && dataLabel.ESTA1_Trolley_05.Desc ? dataLabel.ESTA1_Trolley_05.Desc : ''}</text>    
                            <text x="485" y="285"> Qty: {dataLabel.ESTA1_Trolley_05 && dataLabel.ESTA1_Trolley_05.Qty ? dataLabel.ESTA1_Trolley_05.Qty : ''}</text>      
                            <text x="485" y="300"> Col: {dataLabel.ESTA1_Trolley_05 && dataLabel.ESTA1_Trolley_05.Col ? dataLabel.ESTA1_Trolley_05.Col : ''}</text>      
                            <text x="485" y="315"> Prog: {dataLabel.ESTA1_Trolley_05 && dataLabel.ESTA1_Trolley_05.Prog ? dataLabel.ESTA1_Trolley_05.Prog : ''}</text>          
                            <text x="485" y="330"> N/T: {dataLabel.ESTA1_Trolley_05 && dataLabel.ESTA1_Trolley_05.NoOfTrolley ? dataLabel.ESTA1_Trolley_05.NoOfTrolley : ''}</text>         
                        {data.ESTA1_Trolley_04 && Object.keys(data.ESTA1_Trolley_04).length > 0 && 
                        data.ESTA1_Trolley_04.BarcodeData_MaterialNumber && data.ESTA1_Trolley_04.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="640" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_04}</title></circle> :
                            <circle cx="640" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="605" y="255"> T/N: {dataLabel.ESTA1_Trolley_04 && dataLabel.ESTA1_Trolley_04.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_04.TrolleyNo : ''}</text> 
                            <text x="605" y="270"> Desc: {dataLabel.ESTA1_Trolley_04 && dataLabel.ESTA1_Trolley_04.Desc ? dataLabel.ESTA1_Trolley_04.Desc : ''}</text>    
                            <text x="605" y="285"> Qty: {dataLabel.ESTA1_Trolley_04 && dataLabel.ESTA1_Trolley_04.Qty ? dataLabel.ESTA1_Trolley_04.Qty : ''}</text>      
                            <text x="605" y="300"> Col: {dataLabel.ESTA1_Trolley_04 && dataLabel.ESTA1_Trolley_04.Col ? dataLabel.ESTA1_Trolley_04.Col : ''}</text>      
                            <text x="605" y="315"> Prog: {dataLabel.ESTA1_Trolley_04 && dataLabel.ESTA1_Trolley_04.Prog ? dataLabel.ESTA1_Trolley_04.Prog : ''}</text>          
                            <text x="605" y="330"> N/T: {dataLabel.ESTA1_Trolley_04 && dataLabel.ESTA1_Trolley_04.NoOfTrolley ? dataLabel.ESTA1_Trolley_04.NoOfTrolley : ''}</text>          */}
                        {data.ESTA1_Trolley_03 && Object.keys(data.ESTA1_Trolley_03).length > 0 && 
                        data.ESTA1_Trolley_03.BarcodeData_MaterialNumber && data.ESTA1_Trolley_03.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="160" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_03}</title></circle> :
                            <circle cx="160" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="125" y="255"> T/N: {dataLabel.ESTA1_Trolley_03 && dataLabel.ESTA1_Trolley_03.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_03.TrolleyNo : ''}</text> 
                            <text x="125" y="270"> Desc: {dataLabel.ESTA1_Trolley_03 && dataLabel.ESTA1_Trolley_03.Desc ? dataLabel.ESTA1_Trolley_03.Desc : ''}</text>    
                            <text x="125" y="285"> Qty: {dataLabel.ESTA1_Trolley_03 && dataLabel.ESTA1_Trolley_03.Qty ? dataLabel.ESTA1_Trolley_03.Qty : ''}</text>      
                            <text x="125" y="300"> Col: {dataLabel.ESTA1_Trolley_03 && dataLabel.ESTA1_Trolley_03.Col ? dataLabel.ESTA1_Trolley_03.Col : ''}</text>      
                            <text x="125" y="315"> Prog: {dataLabel.ESTA1_Trolley_03 && dataLabel.ESTA1_Trolley_03.Prog ? dataLabel.ESTA1_Trolley_03.Prog : ''}</text>          
                            <text x="125" y="330"> N/T: {dataLabel.ESTA1_Trolley_03 && dataLabel.ESTA1_Trolley_03.NoOfTrolley ? dataLabel.ESTA1_Trolley_03.NoOfTrolley : ''}</text>         
                        {data.ESTA1_Trolley_02 && Object.keys(data.ESTA1_Trolley_02).length > 0 && 
                        data.ESTA1_Trolley_02.BarcodeData_MaterialNumber && data.ESTA1_Trolley_02.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="400" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_02}</title></circle> :
                            <circle cx="400" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="365" y="255"> T/N: {dataLabel.ESTA1_Trolley_02 && dataLabel.ESTA1_Trolley_02.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_02.TrolleyNo : ''}</text> 
                            <text x="365" y="270"> Desc: {dataLabel.ESTA1_Trolley_02 && dataLabel.ESTA1_Trolley_02.Desc ? dataLabel.ESTA1_Trolley_02.Desc : ''}</text>    
                            <text x="365" y="285"> Qty: {dataLabel.ESTA1_Trolley_02 && dataLabel.ESTA1_Trolley_02.Qty ? dataLabel.ESTA1_Trolley_02.Qty : ''}</text>      
                            <text x="365" y="300"> Col: {dataLabel.ESTA1_Trolley_02 && dataLabel.ESTA1_Trolley_02.Col ? dataLabel.ESTA1_Trolley_02.Col : ''}</text>      
                            <text x="365" y="315"> Prog: {dataLabel.ESTA1_Trolley_02 && dataLabel.ESTA1_Trolley_02.Prog ? dataLabel.ESTA1_Trolley_02.Prog : ''}</text>          
                            <text x="365" y="330"> N/T: {dataLabel.ESTA1_Trolley_02 && dataLabel.ESTA1_Trolley_02.NoOfTrolley ? dataLabel.ESTA1_Trolley_02.NoOfTrolley : ''}</text>         
                        {data.ESTA1_Trolley_01 && Object.keys(data.ESTA1_Trolley_01).length > 0 && 
                        data.ESTA1_Trolley_01.BarcodeData_MaterialNumber && data.ESTA1_Trolley_01.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="760" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_01}</title></circle> :
                            <circle cx="760" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="725" y="255"> T/N: {dataLabel.ESTA1_Trolley_01 && dataLabel.ESTA1_Trolley_01.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_01.TrolleyNo : ''}</text> 
                            <text x="725" y="270"> Desc: {dataLabel.ESTA1_Trolley_01 && dataLabel.ESTA1_Trolley_01.Desc ? dataLabel.ESTA1_Trolley_01.Desc : ''}</text>    
                            <text x="725" y="285"> Qty: {dataLabel.ESTA1_Trolley_01 && dataLabel.ESTA1_Trolley_01.Qty ? dataLabel.ESTA1_Trolley_01.Qty : ''}</text>      
                            <text x="725" y="300"> Col: {dataLabel.ESTA1_Trolley_01 && dataLabel.ESTA1_Trolley_01.Col ? dataLabel.ESTA1_Trolley_01.Col : ''}</text>      
                            <text x="725" y="315"> Prog: {dataLabel.ESTA1_Trolley_01 && dataLabel.ESTA1_Trolley_01.Prog ? dataLabel.ESTA1_Trolley_01.Prog : ''}</text>          
                            <text x="725" y="330"> N/T: {dataLabel.ESTA1_Trolley_01 && dataLabel.ESTA1_Trolley_01.NoOfTrolley ? dataLabel.ESTA1_Trolley_01.NoOfTrolley : ''}</text>         
                        {data.ESTA1_Trolley_00 && Object.keys(data.ESTA1_Trolley_00).length > 0 && 
                        data.ESTA1_Trolley_00.BarcodeData_MaterialNumber && data.ESTA1_Trolley_00.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="1000" cy="210" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA1_Trolley_00}</title></circle> :
                            <circle cx="1000" cy="210" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="965" y="255"> T/N: {dataLabel.ESTA1_Trolley_00 && dataLabel.ESTA1_Trolley_00.TrolleyNo !== undefined ? dataLabel.ESTA1_Trolley_00.TrolleyNo : ''}</text> 
                            <text x="965" y="270"> Desc: {dataLabel.ESTA1_Trolley_00 && dataLabel.ESTA1_Trolley_00.Desc ? dataLabel.ESTA1_Trolley_00.Desc : ''}</text>    
                            <text x="965" y="285"> Qty: {dataLabel.ESTA1_Trolley_00 && dataLabel.ESTA1_Trolley_00.Qty ? dataLabel.ESTA1_Trolley_00.Qty : ''}</text>      
                            <text x="965" y="300"> Col: {dataLabel.ESTA1_Trolley_00 && dataLabel.ESTA1_Trolley_00.Col ? dataLabel.ESTA1_Trolley_00.Col : ''}</text>      
                            <text x="965" y="315"> Prog: {dataLabel.ESTA1_Trolley_00 && dataLabel.ESTA1_Trolley_00.Prog ? dataLabel.ESTA1_Trolley_00.Prog : ''}</text>          
                            <text x="965" y="330"> N/T: {dataLabel.ESTA1_Trolley_00 && dataLabel.ESTA1_Trolley_00.NoOfTrolley ? dataLabel.ESTA1_Trolley_00.NoOfTrolley : ''}</text>         
                    </Link>
                    

                    {/* ESTA 2 Box */}
                    <rect x="2" y="380" width="1175" height="190" style={{stroke:'#cc0000', strokeWidth: '1', strokeDasharray: '10 5', fill: 'none'}} />
                    <text x="520" y="560" style={{fill: '#cc0000', fontWeight: 'bold'}}>Paint Booth ESTA 2</text>

                    {/* ESTA 2 */}
                    <Link innerRef={innerRef} to="/OrderESTA1And2">   
                    {/* <Link to="/OrderESTA1And2">                             */}
                        {data.ESTA2_Trolley_00 && Object.keys(data.ESTA2_Trolley_00).length > 0 && 
                        data.ESTA2_Trolley_00.BarcodeData_MaterialNumber && data.ESTA2_Trolley_00.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="160" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_00}</title></circle> :
                            <circle cx="160" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="125" y="460"> T/N: {dataLabel.ESTA2_Trolley_00 && dataLabel.ESTA2_Trolley_00.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_00.TrolleyNo : ''}</text> 
                            <text x="125" y="475"> Desc: {dataLabel.ESTA2_Trolley_00 && dataLabel.ESTA2_Trolley_00.Desc ? dataLabel.ESTA2_Trolley_00.Desc : ''}</text>    
                            <text x="125" y="490"> Qty: {dataLabel.ESTA2_Trolley_00 && dataLabel.ESTA2_Trolley_00.Qty ? dataLabel.ESTA2_Trolley_00.Qty : ''}</text>      
                            <text x="125" y="505"> Col: {dataLabel.ESTA2_Trolley_00 && dataLabel.ESTA2_Trolley_00.Col ? dataLabel.ESTA2_Trolley_00.Col : ''}</text>      
                            <text x="125" y="520"> Prog: {dataLabel.ESTA2_Trolley_00 && dataLabel.ESTA2_Trolley_00.Prog ? dataLabel.ESTA2_Trolley_00.Prog : ''}</text>          
                            <text x="125" y="535"> N/T: {dataLabel.ESTA2_Trolley_00 && dataLabel.ESTA2_Trolley_00.NoOfTrolley ? dataLabel.ESTA2_Trolley_00.NoOfTrolley : ''}</text>         
                        {data.ESTA2_Trolley_01 && Object.keys(data.ESTA2_Trolley_01).length > 0 && 
                        data.ESTA2_Trolley_01.BarcodeData_MaterialNumber && data.ESTA2_Trolley_01.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="400" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_01}</title></circle> :
                            <circle cx="400" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="365" y="460"> T/N: {dataLabel.ESTA2_Trolley_01 && dataLabel.ESTA2_Trolley_01.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_01.TrolleyNo : ''}</text> 
                            <text x="365" y="475"> Desc: {dataLabel.ESTA2_Trolley_01 && dataLabel.ESTA2_Trolley_01.Desc ? dataLabel.ESTA2_Trolley_01.Desc : ''}</text>    
                            <text x="365" y="490"> Qty: {dataLabel.ESTA2_Trolley_01 && dataLabel.ESTA2_Trolley_01.Qty ? dataLabel.ESTA2_Trolley_01.Qty : ''}</text>      
                            <text x="365" y="505"> Col: {dataLabel.ESTA2_Trolley_01 && dataLabel.ESTA2_Trolley_01.Col ? dataLabel.ESTA2_Trolley_01.Col : ''}</text>      
                            <text x="365" y="520"> Prog: {dataLabel.ESTA2_Trolley_01 && dataLabel.ESTA2_Trolley_01.Prog ? dataLabel.ESTA2_Trolley_01.Prog : ''}</text>          
                            <text x="365" y="535"> N/T: {dataLabel.ESTA2_Trolley_01 && dataLabel.ESTA2_Trolley_01.NoOfTrolley ? dataLabel.ESTA2_Trolley_01.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_02 && Object.keys(data.ESTA2_Trolley_02).length > 0 && 
                        data.ESTA2_Trolley_02.BarcodeData_MaterialNumber && data.ESTA2_Trolley_02.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="760" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_02}</title></circle> :
                            <circle cx="760" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="725" y="460"> T/N: {dataLabel.ESTA2_Trolley_02 && dataLabel.ESTA2_Trolley_02.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_02.TrolleyNo : ''}</text> 
                            <text x="725" y="475"> Desc: {dataLabel.ESTA2_Trolley_02 && dataLabel.ESTA2_Trolley_02.Desc ? dataLabel.ESTA2_Trolley_02.Desc : ''}</text>    
                            <text x="725" y="490"> Qty: {dataLabel.ESTA2_Trolley_02 && dataLabel.ESTA2_Trolley_02.Qty ? dataLabel.ESTA2_Trolley_02.Qty : ''}</text>      
                            <text x="725" y="505"> Col: {dataLabel.ESTA2_Trolley_02 && dataLabel.ESTA2_Trolley_02.Col ? dataLabel.ESTA2_Trolley_02.Col : ''}</text>      
                            <text x="725" y="520"> Prog: {dataLabel.ESTA2_Trolley_02 && dataLabel.ESTA2_Trolley_02.Prog ? dataLabel.ESTA2_Trolley_02.Prog : ''}</text>          
                            <text x="725" y="535"> N/T: {dataLabel.ESTA2_Trolley_02 && dataLabel.ESTA2_Trolley_02.NoOfTrolley ? dataLabel.ESTA2_Trolley_02.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_03 && Object.keys(data.ESTA2_Trolley_03).length > 0 && 
                        data.ESTA2_Trolley_03.BarcodeData_MaterialNumber && data.ESTA2_Trolley_03.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="1000" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_03}</title></circle> :
                            <circle cx="1000" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="965" y="460"> T/N: {dataLabel.ESTA2_Trolley_03 && dataLabel.ESTA2_Trolley_03.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_03.TrolleyNo : ''}</text> 
                            <text x="965" y="475"> Desc: {dataLabel.ESTA2_Trolley_03 && dataLabel.ESTA2_Trolley_03.Desc ? dataLabel.ESTA2_Trolley_03.Desc : ''}</text>    
                            <text x="965" y="490"> Qty: {dataLabel.ESTA2_Trolley_03 && dataLabel.ESTA2_Trolley_03.Qty ? dataLabel.ESTA2_Trolley_03.Qty : ''}</text>      
                            <text x="965" y="505"> Col: {dataLabel.ESTA2_Trolley_03 && dataLabel.ESTA2_Trolley_03.Col ? dataLabel.ESTA2_Trolley_03.Col : ''}</text>      
                            <text x="965" y="520"> Prog: {dataLabel.ESTA2_Trolley_03 && dataLabel.ESTA2_Trolley_03.Prog ? dataLabel.ESTA2_Trolley_03.Prog : ''}</text>          
                            <text x="965" y="535"> N/T: {dataLabel.ESTA2_Trolley_03 && dataLabel.ESTA2_Trolley_03.NoOfTrolley ? dataLabel.ESTA2_Trolley_03.NoOfTrolley : ''}</text>        
                        {/* {data.ESTA2_Trolley_04 && Object.keys(data.ESTA2_Trolley_04).length > 0 && 
                        data.ESTA2_Trolley_05.BarcodeData_MaterialNumber && data.ESTA2_Trolley_05.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="520" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_04}</title></circle> :
                            <circle cx="520" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="485" y="460"> T/N: {dataLabel.ESTA2_Trolley_04 && dataLabel.ESTA2_Trolley_04.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_04.TrolleyNo : ''}</text> 
                            <text x="485" y="475"> Desc: {dataLabel.ESTA2_Trolley_04 && dataLabel.ESTA2_Trolley_04.Desc ? dataLabel.ESTA2_Trolley_04.Desc : ''}</text>    
                            <text x="485" y="490"> Qty: {dataLabel.ESTA2_Trolley_04 && dataLabel.ESTA2_Trolley_04.Qty ? dataLabel.ESTA2_Trolley_04.Qty : ''}</text>      
                            <text x="485" y="505"> Col: {dataLabel.ESTA2_Trolley_04 && dataLabel.ESTA2_Trolley_04.Col ? dataLabel.ESTA2_Trolley_04.Col : ''}</text>      
                            <text x="485" y="520"> Prog: {dataLabel.ESTA2_Trolley_04 && dataLabel.ESTA2_Trolley_04.Prog ? dataLabel.ESTA2_Trolley_04.Prog : ''}</text>          
                            <text x="485" y="535"> N/T: {dataLabel.ESTA2_Trolley_04 && dataLabel.ESTA2_Trolley_04.NoOfTrolley ? dataLabel.ESTA2_Trolley_04.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_05 && Object.keys(data.ESTA2_Trolley_05).length > 0 && 
                        data.ESTA2_Trolley_05.BarcodeData_MaterialNumber && data.ESTA2_Trolley_05.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="640" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_05}</title></circle> :
                            <circle cx="640" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="605" y="460"> T/N: {dataLabel.ESTA2_Trolley_05 && dataLabel.ESTA2_Trolley_05.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_05.TrolleyNo : ''}</text> 
                            <text x="605" y="475"> Desc: {dataLabel.ESTA2_Trolley_05 && dataLabel.ESTA2_Trolley_05.Desc ? dataLabel.ESTA2_Trolley_05.Desc : ''}</text>    
                            <text x="605" y="490"> Qty: {dataLabel.ESTA2_Trolley_05 && dataLabel.ESTA2_Trolley_05.Qty ? dataLabel.ESTA2_Trolley_05.Qty : ''}</text>      
                            <text x="605" y="505"> Col: {dataLabel.ESTA2_Trolley_05 && dataLabel.ESTA2_Trolley_05.Col ? dataLabel.ESTA2_Trolley_05.Col : ''}</text>      
                            <text x="605" y="520"> Prog: {dataLabel.ESTA2_Trolley_05 && dataLabel.ESTA2_Trolley_05.Prog ? dataLabel.ESTA2_Trolley_05.Prog : ''}</text>          
                            <text x="605" y="535"> N/T: {dataLabel.ESTA2_Trolley_05 && dataLabel.ESTA2_Trolley_05.NoOfTrolley ? dataLabel.ESTA2_Trolley_05.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_06 && Object.keys(data.ESTA2_Trolley_06).length > 0 && 
                        data.ESTA2_Trolley_06.BarcodeData_MaterialNumber && data.ESTA2_Trolley_06.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="760" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_06}</title></circle> :
                            <circle cx="760" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="725" y="460"> T/N: {dataLabel.ESTA2_Trolley_06 && dataLabel.ESTA2_Trolley_06.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_06.TrolleyNo : ''}</text> 
                            <text x="725" y="475"> Desc: {dataLabel.ESTA2_Trolley_06 && dataLabel.ESTA2_Trolley_06.Desc ? dataLabel.ESTA2_Trolley_06.Desc : ''}</text>    
                            <text x="725" y="490"> Qty: {dataLabel.ESTA2_Trolley_06 && dataLabel.ESTA2_Trolley_06.Qty ? dataLabel.ESTA2_Trolley_06.Qty : ''}</text>      
                            <text x="725" y="505"> Col: {dataLabel.ESTA2_Trolley_06 && dataLabel.ESTA2_Trolley_06.Col ? dataLabel.ESTA2_Trolley_06.Col : ''}</text>      
                            <text x="725" y="520"> Prog: {dataLabel.ESTA2_Trolley_06 && dataLabel.ESTA2_Trolley_06.Prog ? dataLabel.ESTA2_Trolley_06.Prog : ''}</text>          
                            <text x="725" y="535"> N/T: {dataLabel.ESTA2_Trolley_06 && dataLabel.ESTA2_Trolley_06.NoOfTrolley ? dataLabel.ESTA2_Trolley_06.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_07 && Object.keys(data.ESTA2_Trolley_07).length > 0 && 
                        data.ESTA2_Trolley_07.BarcodeData_MaterialNumber && data.ESTA2_Trolley_07.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="880" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_07}</title></circle> :
                            <circle cx="880" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="845" y="460"> T/N: {dataLabel.ESTA2_Trolley_07 && dataLabel.ESTA2_Trolley_07.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_07.TrolleyNo : ''}</text> 
                            <text x="845" y="475"> Desc: {dataLabel.ESTA2_Trolley_07 && dataLabel.ESTA2_Trolley_07.Desc ? dataLabel.ESTA2_Trolley_07.Desc : ''}</text>    
                            <text x="845" y="490"> Qty: {dataLabel.ESTA2_Trolley_07 && dataLabel.ESTA2_Trolley_07.Qty ? dataLabel.ESTA2_Trolley_07.Qty : ''}</text>      
                            <text x="845" y="505"> Col: {dataLabel.ESTA2_Trolley_07 && dataLabel.ESTA2_Trolley_07.Col ? dataLabel.ESTA2_Trolley_07.Col : ''}</text>      
                            <text x="845" y="520"> Prog: {dataLabel.ESTA2_Trolley_07 && dataLabel.ESTA2_Trolley_07.Prog ? dataLabel.ESTA2_Trolley_07.Prog : ''}</text>          
                            <text x="845" y="535"> N/T: {dataLabel.ESTA2_Trolley_07 && dataLabel.ESTA2_Trolley_07.NoOfTrolley ? dataLabel.ESTA2_Trolley_07.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_08 && Object.keys(data.ESTA2_Trolley_08).length > 0 && 
                        data.ESTA2_Trolley_08.BarcodeData_MaterialNumber && data.ESTA2_Trolley_08.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="1000" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_08}</title></circle> :
                            <circle cx="1000" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="965" y="460"> T/N: {dataLabel.ESTA2_Trolley_08 && dataLabel.ESTA2_Trolley_08.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_08.TrolleyNo : ''}</text> 
                            <text x="965" y="475"> Desc: {dataLabel.ESTA2_Trolley_08 && dataLabel.ESTA2_Trolley_08.Desc ? dataLabel.ESTA2_Trolley_08.Desc : ''}</text>    
                            <text x="965" y="490"> Qty: {dataLabel.ESTA2_Trolley_08 && dataLabel.ESTA2_Trolley_08.Qty ? dataLabel.ESTA2_Trolley_08.Qty : ''}</text>      
                            <text x="965" y="505"> Col: {dataLabel.ESTA2_Trolley_08 && dataLabel.ESTA2_Trolley_08.Col ? dataLabel.ESTA2_Trolley_08.Col : ''}</text>      
                            <text x="965" y="520"> Prog: {dataLabel.ESTA2_Trolley_08 && dataLabel.ESTA2_Trolley_08.Prog ? dataLabel.ESTA2_Trolley_08.Prog : ''}</text>          
                            <text x="965" y="535"> N/T: {dataLabel.ESTA2_Trolley_08 && dataLabel.ESTA2_Trolley_08.NoOfTrolley ? dataLabel.ESTA2_Trolley_08.NoOfTrolley : ''}</text>        
                        {data.ESTA2_Trolley_09 && Object.keys(data.ESTA2_Trolley_09).length > 0 && 
                        data.ESTA2_Trolley_09.BarcodeData_MaterialNumber && data.ESTA2_Trolley_09.BarcodeData_MaterialNumber !== '0000000000000' ?
                            <circle cx="1120" cy="420" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.ESTA2_Trolley_09}</title></circle> :
                            <circle cx="1120" cy="420" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="1085" y="460"> T/N: {dataLabel.ESTA2_Trolley_09 && dataLabel.ESTA2_Trolley_09.TrolleyNo !== undefined ? dataLabel.ESTA2_Trolley_09.TrolleyNo : ''}</text> 
                            <text x="1085" y="475"> Desc: {dataLabel.ESTA2_Trolley_09 && dataLabel.ESTA2_Trolley_09.Desc ? dataLabel.ESTA2_Trolley_09.Desc : ''}</text>    
                            <text x="1085" y="490"> Qty: {dataLabel.ESTA2_Trolley_09 && dataLabel.ESTA2_Trolley_09.Qty ? dataLabel.ESTA2_Trolley_09.Qty : ''}</text>      
                            <text x="1085" y="505"> Col: {dataLabel.ESTA2_Trolley_09 && dataLabel.ESTA2_Trolley_09.Col ? dataLabel.ESTA2_Trolley_09.Col : ''}</text>      
                            <text x="1085" y="520"> Prog: {dataLabel.ESTA2_Trolley_09 && dataLabel.ESTA2_Trolley_09.Prog ? dataLabel.ESTA2_Trolley_09.Prog : ''}</text>          
                            <text x="1085" y="535"> N/T: {dataLabel.ESTA2_Trolley_09 && dataLabel.ESTA2_Trolley_09.NoOfTrolley ? dataLabel.ESTA2_Trolley_09.NoOfTrolley : ''}</text>         */}
                    </Link>

                    {/* Unloading 1 */}
                    <Link innerRef={innerRef} to="/OrderUnloading1">
                    {/* <Link to="/OrderUnloading1"> */}
                        {data.Unloading1_Unloading_09 && Object.keys(data.Unloading1_Unloading_09).length > 0 && 
                        data.Unloading1_Unloading_09.Data_MaterialNumber && data.Unloading1_Unloading_09.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="40" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_09}</title></circle> :
                            <circle cx="40" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="5" y="655"> O/I: {dataLabel.Unloading1_Unloading_09 && dataLabel.Unloading1_Unloading_09.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_09.TrolleyNo : ''}</text> 
                            <text x="5" y="670"> Desc: {dataLabel.Unloading1_Unloading_09 && dataLabel.Unloading1_Unloading_09.Desc ? dataLabel.Unloading1_Unloading_09.Desc : ''}</text>    
                            <text x="5" y="685"> Qty: {dataLabel.Unloading1_Unloading_09 && dataLabel.Unloading1_Unloading_09.Qty ? dataLabel.Unloading1_Unloading_09.Qty : ''}</text>      
                            <text x="5" y="700"> Col: {dataLabel.Unloading1_Unloading_09 && dataLabel.Unloading1_Unloading_09.Col ? dataLabel.Unloading1_Unloading_09.Col : ''}</text>           
                            <text x="5" y="715"> N/T: {dataLabel.Unloading1_Unloading_09 && dataLabel.Unloading1_Unloading_09.NoOfTrolley ? dataLabel.Unloading1_Unloading_09.NoOfTrolley : ''}</text>      
                            <text x="5" y="730"> ETA: {dataLabel.Unloading1_Unloading_09 && dataLabel.Unloading1_Unloading_09.ETA ? dataLabel.Unloading1_Unloading_09.ETA : ''}</text>  
                        {data.Unloading1_Unloading_08 && Object.keys(data.Unloading1_Unloading_08).length > 0 && 
                        data.Unloading1_Unloading_08.Data_MaterialNumber && data.Unloading1_Unloading_08.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="160" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_08}</title></circle> :
                            <circle cx="160" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="125" y="655"> O/I: {dataLabel.Unloading1_Unloading_08 && dataLabel.Unloading1_Unloading_08.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_08.TrolleyNo : ''}</text> 
                            <text x="125" y="670"> Desc: {dataLabel.Unloading1_Unloading_08 && dataLabel.Unloading1_Unloading_08.Desc ? dataLabel.Unloading1_Unloading_08.Desc : ''}</text>    
                            <text x="125" y="685"> Qty: {dataLabel.Unloading1_Unloading_08 && dataLabel.Unloading1_Unloading_08.Qty ? dataLabel.Unloading1_Unloading_08.Qty : ''}</text>      
                            <text x="125" y="700"> Col: {dataLabel.Unloading1_Unloading_08 && dataLabel.Unloading1_Unloading_08.Col ? dataLabel.Unloading1_Unloading_08.Col : ''}</text>           
                            <text x="125" y="715"> N/T: {dataLabel.Unloading1_Unloading_08 && dataLabel.Unloading1_Unloading_08.NoOfTrolley ? dataLabel.Unloading1_Unloading_08.NoOfTrolley : ''}</text>      
                            <text x="125" y="730"> ETA: {dataLabel.Unloading1_Unloading_08 && dataLabel.Unloading1_Unloading_08.ETA ? dataLabel.Unloading1_Unloading_08.ETA : ''}</text>  
                        {data.Unloading1_Unloading_07 && Object.keys(data.Unloading1_Unloading_07).length > 0 && 
                        data.Unloading1_Unloading_07.Data_MaterialNumber && data.Unloading1_Unloading_07.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="280" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_07}</title></circle> :
                            <circle cx="280" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="245" y="655"> O/I: {dataLabel.Unloading1_Unloading_07 && dataLabel.Unloading1_Unloading_07.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_07.TrolleyNo : ''}</text> 
                            <text x="245" y="670"> Desc: {dataLabel.Unloading1_Unloading_07 && dataLabel.Unloading1_Unloading_07.Desc ? dataLabel.Unloading1_Unloading_07.Desc : ''}</text>    
                            <text x="245" y="685"> Qty: {dataLabel.Unloading1_Unloading_07 && dataLabel.Unloading1_Unloading_07.Qty ? dataLabel.Unloading1_Unloading_07.Qty : ''}</text>      
                            <text x="245" y="700"> Col: {dataLabel.Unloading1_Unloading_07 && dataLabel.Unloading1_Unloading_07.Col ? dataLabel.Unloading1_Unloading_07.Col : ''}</text>           
                            <text x="245" y="715"> N/T: {dataLabel.Unloading1_Unloading_07 && dataLabel.Unloading1_Unloading_07.NoOfTrolley ? dataLabel.Unloading1_Unloading_07.NoOfTrolley : ''}</text>      
                            <text x="245" y="730"> ETA: {dataLabel.Unloading1_Unloading_07 && dataLabel.Unloading1_Unloading_07.ETA ? dataLabel.Unloading1_Unloading_07.ETA : ''}</text>  
                        {data.Unloading1_Unloading_06 && Object.keys(data.Unloading1_Unloading_06).length > 0 && 
                        data.Unloading1_Unloading_06.Data_MaterialNumber && data.Unloading1_Unloading_06.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="400" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_06}</title></circle> :
                            <circle cx="400" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="365" y="655"> O/I: {dataLabel.Unloading1_Unloading_06 && dataLabel.Unloading1_Unloading_06.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_06.TrolleyNo : ''}</text> 
                            <text x="365" y="670"> Desc: {dataLabel.Unloading1_Unloading_06 && dataLabel.Unloading1_Unloading_06.Desc ? dataLabel.Unloading1_Unloading_06.Desc : ''}</text>    
                            <text x="365" y="685"> Qty: {dataLabel.Unloading1_Unloading_06 && dataLabel.Unloading1_Unloading_06.Qty ? dataLabel.Unloading1_Unloading_06.Qty : ''}</text>      
                            <text x="365" y="700"> Col: {dataLabel.Unloading1_Unloading_06 && dataLabel.Unloading1_Unloading_06.Col ? dataLabel.Unloading1_Unloading_06.Col : ''}</text>           
                            <text x="365" y="715"> N/T: {dataLabel.Unloading1_Unloading_06 && dataLabel.Unloading1_Unloading_06.NoOfTrolley ? dataLabel.Unloading1_Unloading_06.NoOfTrolley : ''}</text>      
                            <text x="365" y="730"> ETA: {dataLabel.Unloading1_Unloading_06 && dataLabel.Unloading1_Unloading_06.ETA ? dataLabel.Unloading1_Unloading_06.ETA : ''}</text>  
                        {data.Unloading1_Unloading_05 && Object.keys(data.Unloading1_Unloading_05).length > 0 && 
                        data.Unloading1_Unloading_05.Data_MaterialNumber && data.Unloading1_Unloading_05.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="520" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_05}</title></circle> :
                            <circle cx="520" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="485" y="655"> O/I: {dataLabel.Unloading1_Unloading_05 && dataLabel.Unloading1_Unloading_05.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_05.TrolleyNo : ''}</text> 
                            <text x="485" y="670"> Desc: {dataLabel.Unloading1_Unloading_05 && dataLabel.Unloading1_Unloading_05.Desc ? dataLabel.Unloading1_Unloading_05.Desc : ''}</text>    
                            <text x="485" y="685"> Qty: {dataLabel.Unloading1_Unloading_05 && dataLabel.Unloading1_Unloading_05.Qty ? dataLabel.Unloading1_Unloading_05.Qty : ''}</text>      
                            <text x="485" y="700"> Col: {dataLabel.Unloading1_Unloading_05 && dataLabel.Unloading1_Unloading_05.Col ? dataLabel.Unloading1_Unloading_05.Col : ''}</text>           
                            <text x="485" y="715"> N/T: {dataLabel.Unloading1_Unloading_05 && dataLabel.Unloading1_Unloading_05.NoOfTrolley ? dataLabel.Unloading1_Unloading_05.NoOfTrolley : ''}</text>      
                            <text x="485" y="730"> ETA: {dataLabel.Unloading1_Unloading_05 && dataLabel.Unloading1_Unloading_05.ETA ? dataLabel.Unloading1_Unloading_05.ETA : ''}</text>  
                        {data.Unloading1_Unloading_04 && Object.keys(data.Unloading1_Unloading_04).length > 0 && 
                        data.Unloading1_Unloading_04.Data_MaterialNumber && data.Unloading1_Unloading_04.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="640" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_04}</title></circle> :
                            <circle cx="640" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="605" y="655"> O/I: {dataLabel.Unloading1_Unloading_04 && dataLabel.Unloading1_Unloading_04.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_04.TrolleyNo : ''}</text> 
                            <text x="605" y="670"> Desc: {dataLabel.Unloading1_Unloading_04 && dataLabel.Unloading1_Unloading_04.Desc ? dataLabel.Unloading1_Unloading_04.Desc : ''}</text>    
                            <text x="605" y="685"> Qty: {dataLabel.Unloading1_Unloading_04 && dataLabel.Unloading1_Unloading_04.Qty ? dataLabel.Unloading1_Unloading_04.Qty : ''}</text>      
                            <text x="605" y="700"> Col: {dataLabel.Unloading1_Unloading_04 && dataLabel.Unloading1_Unloading_04.Col ? dataLabel.Unloading1_Unloading_04.Col : ''}</text>           
                            <text x="605" y="715"> N/T: {dataLabel.Unloading1_Unloading_04 && dataLabel.Unloading1_Unloading_04.NoOfTrolley ? dataLabel.Unloading1_Unloading_04.NoOfTrolley : ''}</text>      
                            <text x="605" y="730"> ETA: {dataLabel.Unloading1_Unloading_04 && dataLabel.Unloading1_Unloading_04.ETA ? dataLabel.Unloading1_Unloading_04.ETA : ''}</text>  
                        {data.Unloading1_Unloading_03 && Object.keys(data.Unloading1_Unloading_03).length > 0 && 
                        data.Unloading1_Unloading_03.Data_MaterialNumber && data.Unloading1_Unloading_03.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="760" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_03}</title></circle> :
                            <circle cx="760" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="725" y="655"> O/I: {dataLabel.Unloading1_Unloading_03 && dataLabel.Unloading1_Unloading_03.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_03.TrolleyNo : ''}</text> 
                            <text x="725" y="670"> Desc: {dataLabel.Unloading1_Unloading_03 && dataLabel.Unloading1_Unloading_03.Desc ? dataLabel.Unloading1_Unloading_03.Desc : ''}</text>    
                            <text x="725" y="685"> Qty: {dataLabel.Unloading1_Unloading_03 && dataLabel.Unloading1_Unloading_03.Qty ? dataLabel.Unloading1_Unloading_03.Qty : ''}</text>      
                            <text x="725" y="700"> Col: {dataLabel.Unloading1_Unloading_03 && dataLabel.Unloading1_Unloading_03.Col ? dataLabel.Unloading1_Unloading_03.Col : ''}</text>           
                            <text x="725" y="715"> N/T: {dataLabel.Unloading1_Unloading_03 && dataLabel.Unloading1_Unloading_03.NoOfTrolley ? dataLabel.Unloading1_Unloading_03.NoOfTrolley : ''}</text>      
                            <text x="725" y="730"> ETA: {dataLabel.Unloading1_Unloading_03 && dataLabel.Unloading1_Unloading_03.ETA ? dataLabel.Unloading1_Unloading_03.ETA : ''}</text>  
                        {data.Unloading1_Unloading_02 && Object.keys(data.Unloading1_Unloading_02).length > 0 && 
                        data.Unloading1_Unloading_02.Data_MaterialNumber && data.Unloading1_Unloading_02.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="880" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_02}</title></circle> :
                            <circle cx="880" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="845" y="655"> O/I: {dataLabel.Unloading1_Unloading_02 && dataLabel.Unloading1_Unloading_02.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_02.TrolleyNo : ''}</text> 
                            <text x="845" y="670"> Desc: {dataLabel.Unloading1_Unloading_02 && dataLabel.Unloading1_Unloading_02.Desc ? dataLabel.Unloading1_Unloading_02.Desc : ''}</text>    
                            <text x="845" y="685"> Qty: {dataLabel.Unloading1_Unloading_02 && dataLabel.Unloading1_Unloading_02.Qty ? dataLabel.Unloading1_Unloading_02.Qty : ''}</text>      
                            <text x="845" y="700"> Col: {dataLabel.Unloading1_Unloading_02 && dataLabel.Unloading1_Unloading_02.Col ? dataLabel.Unloading1_Unloading_02.Col : ''}</text>           
                            <text x="845" y="715"> N/T: {dataLabel.Unloading1_Unloading_02 && dataLabel.Unloading1_Unloading_02.NoOfTrolley ? dataLabel.Unloading1_Unloading_02.NoOfTrolley : ''}</text>      
                            <text x="845" y="730"> ETA: {dataLabel.Unloading1_Unloading_02 && dataLabel.Unloading1_Unloading_02.ETA ? dataLabel.Unloading1_Unloading_02.ETA : ''}</text>  
                        {data.Unloading1_Unloading_01 && Object.keys(data.Unloading1_Unloading_01).length > 0 && 
                        data.Unloading1_Unloading_01.Data_MaterialNumber && data.Unloading1_Unloading_01.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="1000" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_01}</title></circle> :
                            <circle cx="1000" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="965" y="655"> O/I: {dataLabel.Unloading1_Unloading_01 && dataLabel.Unloading1_Unloading_01.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_01.TrolleyNo : ''}</text> 
                            <text x="965" y="670"> Desc: {dataLabel.Unloading1_Unloading_01 && dataLabel.Unloading1_Unloading_01.Desc ? dataLabel.Unloading1_Unloading_01.Desc : ''}</text>    
                            <text x="965" y="685"> Qty: {dataLabel.Unloading1_Unloading_01 && dataLabel.Unloading1_Unloading_01.Qty ? dataLabel.Unloading1_Unloading_01.Qty : ''}</text>      
                            <text x="965" y="700"> Col: {dataLabel.Unloading1_Unloading_01 && dataLabel.Unloading1_Unloading_01.Col ? dataLabel.Unloading1_Unloading_01.Col : ''}</text>           
                            <text x="965" y="715"> N/T: {dataLabel.Unloading1_Unloading_01 && dataLabel.Unloading1_Unloading_01.NoOfTrolley ? dataLabel.Unloading1_Unloading_01.NoOfTrolley : ''}</text>      
                            <text x="965" y="730"> ETA: {dataLabel.Unloading1_Unloading_01 && dataLabel.Unloading1_Unloading_01.ETA ? dataLabel.Unloading1_Unloading_01.ETA : ''}</text>  
                        {data.Unloading1_Unloading_00 && Object.keys(data.Unloading1_Unloading_00).length > 0 && 
                        data.Unloading1_Unloading_00.Data_MaterialNumber && data.Unloading1_Unloading_00.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="1120" cy="610" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading1_Unloading_00}</title></circle> :
                            <circle cx="1120" cy="610" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="1085" y="655"> O/I: {dataLabel.Unloading1_Unloading_00 && dataLabel.Unloading1_Unloading_00.TrolleyNo !== undefined ? dataLabel.Unloading1_Unloading_00.TrolleyNo : ''}</text> 
                            <text x="1085" y="670"> Desc: {dataLabel.Unloading1_Unloading_00 && dataLabel.Unloading1_Unloading_00.Desc ? dataLabel.Unloading1_Unloading_00.Desc : ''}</text>    
                            <text x="1085" y="685"> Qty: {dataLabel.Unloading1_Unloading_00 && dataLabel.Unloading1_Unloading_00.Qty ? dataLabel.Unloading1_Unloading_00.Qty : ''}</text>      
                            <text x="1085" y="700"> Col: {dataLabel.Unloading1_Unloading_00 && dataLabel.Unloading1_Unloading_00.Col ? dataLabel.Unloading1_Unloading_00.Col : ''}</text>           
                            <text x="1085" y="715"> N/T: {dataLabel.Unloading1_Unloading_00 && dataLabel.Unloading1_Unloading_00.NoOfTrolley ? dataLabel.Unloading1_Unloading_00.NoOfTrolley : ''}</text>      
                            <text x="1085" y="730"> ETA: {dataLabel.Unloading1_Unloading_00 && dataLabel.Unloading1_Unloading_00.ETA ? dataLabel.Unloading1_Unloading_00.ETA : ''}</text>  
                    </Link>

                    {/* Unloading 2 */}
                    <Link innerRef={innerRef} to="/OrderUnloading2">
                    {/* <Link to="/OrderUnloading2"> */}
                        {data.Unloading2_Unloading_09 && Object.keys(data.Unloading2_Unloading_09).length > 0 && 
                        data.Unloading2_Unloading_09.Data_MaterialNumber && data.Unloading2_Unloading_09.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="40" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_09}</title></circle> :
                            <circle cx="40" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="5" y="835"> O/I: {dataLabel.Unloading2_Unloading_09 && dataLabel.Unloading2_Unloading_09.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_09.TrolleyNo : ''}</text> 
                            <text x="5" y="850"> Desc: {dataLabel.Unloading2_Unloading_09 && dataLabel.Unloading2_Unloading_09.Desc ? dataLabel.Unloading2_Unloading_09.Desc : ''}</text>    
                            <text x="5" y="865"> Qty: {dataLabel.Unloading2_Unloading_09 && dataLabel.Unloading2_Unloading_09.Qty ? dataLabel.Unloading2_Unloading_09.Qty : ''}</text>      
                            <text x="5" y="880"> Col: {dataLabel.Unloading2_Unloading_09 && dataLabel.Unloading2_Unloading_09.Col ? dataLabel.Unloading2_Unloading_09.Col : ''}</text>          
                            <text x="5" y="895"> N/T: {dataLabel.Unloading2_Unloading_09 && dataLabel.Unloading2_Unloading_09.NoOfTrolley ? dataLabel.Unloading2_Unloading_09.NoOfTrolley : ''}</text>      
                            <text x="5" y="910"> ETA: {dataLabel.Unloading2_Unloading_09 && dataLabel.Unloading2_Unloading_09.ETA ? dataLabel.Unloading2_Unloading_09.ETA : ''}</text>  
                        {data.Unloading2_Unloading_08 && Object.keys(data.Unloading2_Unloading_08).length > 0 && 
                        data.Unloading2_Unloading_08.Data_MaterialNumber && data.Unloading2_Unloading_08.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="160" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_08}</title></circle> :
                            <circle cx="160" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="125" y="835"> O/I: {dataLabel.Unloading2_Unloading_08 && dataLabel.Unloading2_Unloading_08.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_08.TrolleyNo : ''}</text> 
                            <text x="125" y="850"> Desc: {dataLabel.Unloading2_Unloading_08 && dataLabel.Unloading2_Unloading_08.Desc ? dataLabel.Unloading2_Unloading_08.Desc : ''}</text>    
                            <text x="125" y="865"> Qty: {dataLabel.Unloading2_Unloading_08 && dataLabel.Unloading2_Unloading_08.Qty ? dataLabel.Unloading2_Unloading_08.Qty : ''}</text>      
                            <text x="125" y="880"> Col: {dataLabel.Unloading2_Unloading_08 && dataLabel.Unloading2_Unloading_08.Col ? dataLabel.Unloading2_Unloading_08.Col : ''}</text>          
                            <text x="125" y="895"> N/T: {dataLabel.Unloading2_Unloading_08 && dataLabel.Unloading2_Unloading_08.NoOfTrolley ? dataLabel.Unloading2_Unloading_08.NoOfTrolley : ''}</text>      
                            <text x="125" y="910"> ETA: {dataLabel.Unloading2_Unloading_08 && dataLabel.Unloading2_Unloading_08.ETA ? dataLabel.Unloading2_Unloading_08.ETA : ''}</text>  
                        {data.Unloading2_Unloading_07 && Object.keys(data.Unloading2_Unloading_07).length > 0 && 
                        data.Unloading2_Unloading_07.Data_MaterialNumber && data.Unloading2_Unloading_07.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="280" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_07}</title></circle> :
                            <circle cx="280" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="245" y="835"> O/I: {dataLabel.Unloading2_Unloading_07 && dataLabel.Unloading2_Unloading_07.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_07.TrolleyNo : ''}</text> 
                            <text x="245" y="850"> Desc: {dataLabel.Unloading2_Unloading_07 && dataLabel.Unloading2_Unloading_07.Desc ? dataLabel.Unloading2_Unloading_07.Desc : ''}</text>    
                            <text x="245" y="865"> Qty: {dataLabel.Unloading2_Unloading_07 && dataLabel.Unloading2_Unloading_07.Qty ? dataLabel.Unloading2_Unloading_07.Qty : ''}</text>      
                            <text x="245" y="880"> Col: {dataLabel.Unloading2_Unloading_07 && dataLabel.Unloading2_Unloading_07.Col ? dataLabel.Unloading2_Unloading_07.Col : ''}</text>          
                            <text x="245" y="895"> N/T: {dataLabel.Unloading2_Unloading_07 && dataLabel.Unloading2_Unloading_07.NoOfTrolley ? dataLabel.Unloading2_Unloading_07.NoOfTrolley : ''}</text>      
                            <text x="245" y="910"> ETA: {dataLabel.Unloading2_Unloading_07 && dataLabel.Unloading2_Unloading_07.ETA ? dataLabel.Unloading2_Unloading_07.ETA : ''}</text>  
                        {data.Unloading2_Unloading_06 && Object.keys(data.Unloading2_Unloading_06).length > 0 && 
                        data.Unloading2_Unloading_06.Data_MaterialNumber && data.Unloading2_Unloading_06.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="400" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_06}</title></circle> :
                            <circle cx="400" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="365" y="835"> O/I: {dataLabel.Unloading2_Unloading_06 && dataLabel.Unloading2_Unloading_06.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_06.TrolleyNo : ''}</text> 
                            <text x="365" y="850"> Desc: {dataLabel.Unloading2_Unloading_06 && dataLabel.Unloading2_Unloading_06.Desc ? dataLabel.Unloading2_Unloading_06.Desc : ''}</text>    
                            <text x="365" y="865"> Qty: {dataLabel.Unloading2_Unloading_06 && dataLabel.Unloading2_Unloading_06.Qty ? dataLabel.Unloading2_Unloading_06.Qty : ''}</text>      
                            <text x="365" y="880"> Col: {dataLabel.Unloading2_Unloading_06 && dataLabel.Unloading2_Unloading_06.Col ? dataLabel.Unloading2_Unloading_06.Col : ''}</text>          
                            <text x="365" y="895"> N/T: {dataLabel.Unloading2_Unloading_06 && dataLabel.Unloading2_Unloading_06.NoOfTrolley ? dataLabel.Unloading2_Unloading_06.NoOfTrolley : ''}</text>      
                            <text x="365" y="910"> ETA: {dataLabel.Unloading2_Unloading_06 && dataLabel.Unloading2_Unloading_06.ETA ? dataLabel.Unloading2_Unloading_06.ETA : ''}</text>  
                        {data.Unloading2_Unloading_05 && Object.keys(data.Unloading2_Unloading_05).length > 0 && 
                        data.Unloading2_Unloading_05.Data_MaterialNumber && data.Unloading2_Unloading_05.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="520" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_05}</title></circle> :
                            <circle cx="520" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="485" y="835"> O/I: {dataLabel.Unloading2_Unloading_05 && dataLabel.Unloading2_Unloading_05.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_05.TrolleyNo : ''}</text> 
                            <text x="485" y="850"> Desc: {dataLabel.Unloading2_Unloading_05 && dataLabel.Unloading2_Unloading_05.Desc ? dataLabel.Unloading2_Unloading_05.Desc : ''}</text>    
                            <text x="485" y="865"> Qty: {dataLabel.Unloading2_Unloading_05 && dataLabel.Unloading2_Unloading_05.Qty ? dataLabel.Unloading2_Unloading_05.Qty : ''}</text>      
                            <text x="485" y="880"> Col: {dataLabel.Unloading2_Unloading_05 && dataLabel.Unloading2_Unloading_05.Col ? dataLabel.Unloading2_Unloading_05.Col : ''}</text>          
                            <text x="485" y="895"> N/T: {dataLabel.Unloading2_Unloading_05 && dataLabel.Unloading2_Unloading_05.NoOfTrolley ? dataLabel.Unloading2_Unloading_05.NoOfTrolley : ''}</text>      
                            <text x="485" y="910"> ETA: {dataLabel.Unloading2_Unloading_05 && dataLabel.Unloading2_Unloading_05.ETA ? dataLabel.Unloading2_Unloading_05.ETA : ''}</text>  
                        {data.Unloading2_Unloading_04 && Object.keys(data.Unloading2_Unloading_04).length > 0 && 
                        data.Unloading2_Unloading_04.Data_MaterialNumber && data.Unloading2_Unloading_04.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="640" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_04}</title></circle> :
                            <circle cx="640" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="605" y="835"> O/I: {dataLabel.Unloading2_Unloading_04 && dataLabel.Unloading2_Unloading_04.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_04.TrolleyNo : ''}</text> 
                            <text x="605" y="850"> Desc: {dataLabel.Unloading2_Unloading_04 && dataLabel.Unloading2_Unloading_04.Desc ? dataLabel.Unloading2_Unloading_04.Desc : ''}</text>    
                            <text x="605" y="865"> Qty: {dataLabel.Unloading2_Unloading_04 && dataLabel.Unloading2_Unloading_04.Qty ? dataLabel.Unloading2_Unloading_04.Qty : ''}</text>      
                            <text x="605" y="880"> Col: {dataLabel.Unloading2_Unloading_04 && dataLabel.Unloading2_Unloading_04.Col ? dataLabel.Unloading2_Unloading_04.Col : ''}</text>          
                            <text x="605" y="895"> N/T: {dataLabel.Unloading2_Unloading_04 && dataLabel.Unloading2_Unloading_04.NoOfTrolley ? dataLabel.Unloading2_Unloading_04.NoOfTrolley : ''}</text>      
                            <text x="605" y="910"> ETA: {dataLabel.Unloading2_Unloading_04 && dataLabel.Unloading2_Unloading_04.ETA ? dataLabel.Unloading2_Unloading_04.ETA : ''}</text>  
                        {data.Unloading2_Unloading_03 && Object.keys(data.Unloading2_Unloading_03).length > 0 && 
                        data.Unloading2_Unloading_03.Data_MaterialNumber && data.Unloading2_Unloading_03.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="760" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_03}</title></circle> :
                            <circle cx="760" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="725" y="835"> O/I: {dataLabel.Unloading2_Unloading_03 && dataLabel.Unloading2_Unloading_03.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_03.TrolleyNo : ''}</text> 
                            <text x="725" y="850"> Desc: {dataLabel.Unloading2_Unloading_03 && dataLabel.Unloading2_Unloading_03.Desc ? dataLabel.Unloading2_Unloading_03.Desc : ''}</text>    
                            <text x="725" y="865"> Qty: {dataLabel.Unloading2_Unloading_03 && dataLabel.Unloading2_Unloading_03.Qty ? dataLabel.Unloading2_Unloading_03.Qty : ''}</text>      
                            <text x="725" y="880"> Col: {dataLabel.Unloading2_Unloading_03 && dataLabel.Unloading2_Unloading_03.Col ? dataLabel.Unloading2_Unloading_03.Col : ''}</text>          
                            <text x="725" y="895"> N/T: {dataLabel.Unloading2_Unloading_03 && dataLabel.Unloading2_Unloading_03.NoOfTrolley ? dataLabel.Unloading2_Unloading_03.NoOfTrolley : ''}</text>      
                            <text x="725" y="910"> ETA: {dataLabel.Unloading2_Unloading_03 && dataLabel.Unloading2_Unloading_03.ETA ? dataLabel.Unloading2_Unloading_03.ETA : ''}</text>  
                        {data.Unloading2_Unloading_02 && Object.keys(data.Unloading2_Unloading_02).length > 0 && 
                        data.Unloading2_Unloading_02.Data_MaterialNumber && data.Unloading2_Unloading_02.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="880" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_02}</title></circle> :
                            <circle cx="880" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="845" y="835"> O/I: {dataLabel.Unloading2_Unloading_02 && dataLabel.Unloading2_Unloading_02.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_02.TrolleyNo : ''}</text> 
                            <text x="845" y="850"> Desc: {dataLabel.Unloading2_Unloading_02 && dataLabel.Unloading2_Unloading_02.Desc ? dataLabel.Unloading2_Unloading_02.Desc : ''}</text>    
                            <text x="845" y="865"> Qty: {dataLabel.Unloading2_Unloading_02 && dataLabel.Unloading2_Unloading_02.Qty ? dataLabel.Unloading2_Unloading_02.Qty : ''}</text>      
                            <text x="845" y="880"> Col: {dataLabel.Unloading2_Unloading_02 && dataLabel.Unloading2_Unloading_02.Col ? dataLabel.Unloading2_Unloading_02.Col : ''}</text>          
                            <text x="845" y="895"> N/T: {dataLabel.Unloading2_Unloading_02 && dataLabel.Unloading2_Unloading_02.NoOfTrolley ? dataLabel.Unloading2_Unloading_02.NoOfTrolley : ''}</text>      
                            <text x="845" y="910"> ETA: {dataLabel.Unloading2_Unloading_02 && dataLabel.Unloading2_Unloading_02.ETA ? dataLabel.Unloading2_Unloading_02.ETA : ''}</text>  
                        {data.Unloading2_Unloading_01 && Object.keys(data.Unloading2_Unloading_01).length > 0 && 
                        data.Unloading2_Unloading_01.Data_MaterialNumber && data.Unloading2_Unloading_01.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="1000" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_01}</title></circle> :
                            <circle cx="1000" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="965" y="835"> O/I: {dataLabel.Unloading2_Unloading_01 && dataLabel.Unloading2_Unloading_01.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_01.TrolleyNo : ''}</text> 
                            <text x="965" y="850"> Desc: {dataLabel.Unloading2_Unloading_01 && dataLabel.Unloading2_Unloading_01.Desc ? dataLabel.Unloading2_Unloading_01.Desc : ''}</text>    
                            <text x="965" y="865"> Qty: {dataLabel.Unloading2_Unloading_01 && dataLabel.Unloading2_Unloading_01.Qty ? dataLabel.Unloading2_Unloading_01.Qty : ''}</text>      
                            <text x="965" y="880"> Col: {dataLabel.Unloading2_Unloading_01 && dataLabel.Unloading2_Unloading_01.Col ? dataLabel.Unloading2_Unloading_01.Col : ''}</text>          
                            <text x="965" y="895"> N/T: {dataLabel.Unloading2_Unloading_01 && dataLabel.Unloading2_Unloading_01.NoOfTrolley ? dataLabel.Unloading2_Unloading_01.NoOfTrolley : ''}</text>      
                            <text x="965" y="910"> ETA: {dataLabel.Unloading2_Unloading_01 && dataLabel.Unloading2_Unloading_01.ETA ? dataLabel.Unloading2_Unloading_01.ETA : ''}</text>  
                        {data.Unloading2_Unloading_00 && Object.keys(data.Unloading2_Unloading_00).length > 0 && 
                        data.Unloading2_Unloading_00.Data_MaterialNumber && data.Unloading2_Unloading_00.Data_MaterialNumber !== '0000000000000' ?
                            <circle cx="1120" cy="790" r="24" className="tooltip" style={{stroke: 'none', fill: '#0000ff'}}><title>{dataInfo.Unloading2_Unloading_00}</title></circle> :
                            <circle cx="1120" cy="790" r="24" style={{stroke: '#0000ff', fill: '#ffffff'}}/>}
                            <text x="1085" y="835"> O/I: {dataLabel.Unloading2_Unloading_00 && dataLabel.Unloading2_Unloading_00.TrolleyNo !== undefined ? dataLabel.Unloading2_Unloading_00.TrolleyNo : ''}</text> 
                            <text x="1085" y="850"> Desc: {dataLabel.Unloading2_Unloading_00 && dataLabel.Unloading2_Unloading_00.Desc ? dataLabel.Unloading2_Unloading_00.Desc : ''}</text>    
                            <text x="1085" y="865"> Qty: {dataLabel.Unloading2_Unloading_00 && dataLabel.Unloading2_Unloading_00.Qty ? dataLabel.Unloading2_Unloading_00.Qty : ''}</text>      
                            <text x="1085" y="880"> Col: {dataLabel.Unloading2_Unloading_00 && dataLabel.Unloading2_Unloading_00.Col ? dataLabel.Unloading2_Unloading_00.Col : ''}</text>          
                            <text x="1085" y="895"> N/T: {dataLabel.Unloading2_Unloading_00 && dataLabel.Unloading2_Unloading_00.NoOfTrolley ? dataLabel.Unloading2_Unloading_00.NoOfTrolley : ''}</text>      
                            <text x="1085" y="910"> ETA: {dataLabel.Unloading2_Unloading_00 && dataLabel.Unloading2_Unloading_00.ETA ? dataLabel.Unloading2_Unloading_00.ETA : ''}</text>  
                    </Link>
                </svg>
            </div>
        </div>       
    )
}

export default withStyles(useStyles, { withTheme: true })(ConveyorVisualization);