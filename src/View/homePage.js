/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from "react";
import { Table, Select, Space, Button, Modal, Drawer } from "antd";
import { MenuUnfoldOutlined, RadiusBottomleftOutlined } from '@ant-design/icons'
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import BarChart from "../Component/barChart";
import PieChart from "../Component/pieChart";
import LineGraph from "../Component/lineGraph";
import { useNavigate } from 'react-router-dom';

Chart.defaults.plugins.legend.display = false;
  
const HomePage = () => {
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [dataSource, setDataSource] = useState();
    const [columns, setColumn] = useState([]);
    const [foodName, setLabel] = useState([]);
    const [foodSell, setCount] = useState([]);
    const [labelBorderColor, setLabelBorderColor] = useState([]);
    const [labelBackgroundColor, setLabelBackGroundColor] = useState([]);
    const [filterOptions, setFilterOptions] = useState();
    const [filteredData, setFilteredData] = useState();
    const [drawerPage, setOpenDrawer] = useState(false)
    const [welcomeModal, setModalOpen] = useState(false);
    const [sessionModal, setModalExpired] = useState(false);

    useEffect(() => {
        setName(localStorage.getItem("username"));
        
        if(localStorage.getItem("welcomePop") === 'false'){
            setModalOpen(true);
        }
        
        getDataTable();
    },[]);
    
    const getDataTable = (params, filter) => {
        console.log("filter", filter)
        axios.get(`http://localhost:3000/api/getList/${params === undefined || params === null ? null : params.length === 0 ? null : params}`, {withCredentials: true}).then((res) => {
            if(res.data.success === true)
            {
                setDataSource(res.data.result);

                const tempArr = [];
                const tempFoodName = [];
                const tempFoodSell = [];
                const tempFilter = [];

                Object.keys(res.data.result[0]).forEach(key=> {
                    tempArr.push(
                        {
                            title: key.substring(0,1).toUpperCase() + key.substring(1),
                            dataIndex: key,
                            key: key,
                        }
                    );
                });
                setColumn(tempArr);

                res.data.result.forEach(items => {
                    if(filter === undefined)
                    {
                        tempFilter.push(
                            {
                                label: items.name,
                                value: items.name,
                            }
                        );
                    }
                    tempFoodName.push(items.name);
                    tempFoodSell.push(items.Count);
                });

                if(filter === undefined)
                {
                    setFilterOptions(tempFilter);
                }
                setLabel(tempFoodName);
                setCount(tempFoodSell);

                getRandomColor(tempFoodName.length);
            }else{
                if(res.data.message === "login")
                {
                    navigate('/login');
                }

                if(res.data.message === 'session expired'){
                    setModalExpired(true);
                }
            }
       });
    }
    
    const getRandomColor = (foodLength) => {

        var tempBorderArr = [];
        var tempBackArr = [];

        for(var i =0; i< foodLength; i++)
        {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
          
            tempBackArr.push(`rgba(${r},${g},${b},0.5)`);
            tempBorderArr.push(`rgba(${r},${g},${b})`)
        }

        setLabelBorderColor(tempBorderArr);
        setLabelBackGroundColor(tempBackArr);

    }

    const handleLogout = () => {
        axios.get('http://localhost:3000/api/logout', {withCredentials: true}).then((res) => {
            if(res.data.success === true){
               navigate('/login');
            }
        })
    }

    const handleChange = (value) => {
        setFilteredData(value);
    }

    const handlePopModal = () =>{
        localStorage.setItem("welcomePop", 'true');
        setModalOpen(false);
    }

    const handleFilter = () => {
        setOpenDrawer(false);
        getDataTable(filteredData, "filter");
    }
    
    const styles = {
        layout:{
            height: '100vh',
            width: '100vw',
            display: 'block',
        },
        rowContainer: {
            height: '30%',
            display: 'flex',
        },
        graphSettings: {
            width: '33.33%',
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid black',
            margin: '5px',
            padding: '5px'
        },
        tableSettings: {
            height: '67%',
            border: '1px solid black',
            margin: '5px',
        },
        filterContainer: {
            border: '1px solid black',
            borderRadius: '10px',
            padding: '10px',
            background: '#CCC',
            display: 'flex',
            justifyContent: 'center',
            margin: '5px',
        },
        header: {
            height: '3%',
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            borderBottom: '1px solid',
            padding: '10px 15px',
        }, 
        textStyle:{
            fontSize: 'medium',
            fontWeight: '400',
        },
        filterField:{
            width: '100%', 
            margin:'15px 0px 5px 0px'
        },
        seacrhButtonStyle: {
            padding: '8px 36px 8px 36px',
            marginTop: '10px',
            height: 'auto',
            fontSize: 'medium',
            fontWeight: '400',
            textAlign: 'center',
        },
        logoutButton: {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            left: '10px',
            borderRadius: '10px',
            padding: '15px',
            display: 'flex',
            justifyContent: 'center',
            background: '#ccc',
            cursor: 'pointer'
        }
    };

    
      
    return (
        <div style={styles.layout}>
            <Modal title="Session Expired!" open={sessionModal} centered='true' onOk={() => navigate('/login')} cancelButtonProps={{style:{display: 'none'}}} onClose={() => navigate('/login')}></Modal>
            <Modal title="Welcome Back!" open={welcomeModal} centered='true' onOk={handlePopModal} onClose={handlePopModal} cancelButtonProps={{style:{display: 'none'}}}></Modal>
            <Drawer title="Filter Options" placement="left" onClose={() => setOpenDrawer(false)} open={drawerPage}>
                <div className="filterOptions">
                    <div>
                        <div>
                            <div style={styles.textStyle}>Please filter your selection:</div>
                            <Select 
                                mode='multiple' 
                                onChange={handleChange} 
                                style={styles.filterField} 
                                placeholder='Select Food' 
                                options={filterOptions} 
                                optionRender={(option) => (
                                    <Space>
                                    <span role="img">
                                        {option.data.label}
                                    </span>
                                    </Space>
                                )}
                            />
                        </div>
                        <div>
                            <Button style={styles.seacrhButtonStyle} type="primary" onClick={handleFilter}>Search</Button>
                        </div>
                    </div>
                    <div style={styles.logoutButton} onClick={handleLogout}>Logout</div>
                </div>
            </Drawer>
            <div style={styles.header}>
                <div onClick={() => setOpenDrawer(true)}><MenuUnfoldOutlined style={{ fontSize: '150%', cursor: 'pointer'}} /></div>
                <div>
                    <div style={{fontWeight: 600, textAlign: 'end'}}>WELCOME, <span style={{fontWeight: 400, textAlign: 'end'}}>{username}</span></div>
                </div>
            </div>
            <div style={styles.rowContainer}>
                <div style={styles.graphSettings} className="barChart">
                    <BarChart chartData={{label: foodName, data: foodSell, color: labelBorderColor, backColor: labelBackgroundColor}}/>
                </div>
                <div style={styles.graphSettings} className="pieChart">
                    <PieChart chartData={{label: foodName, data:foodSell, color: labelBorderColor, backColor: labelBackgroundColor}}/>
                </div>
                <div style={styles.graphSettings} className="lineGraph">
                    <LineGraph chartData={{label: foodName, data:foodSell, color: labelBorderColor, backColor: labelBackgroundColor}}/>
                </div>
            </div>
            <div style={styles.tableSettings} className="tableContent">
                <Table pagination={{position:['bottomCenter']}} dataSource={dataSource} columns={columns} />
            </div>
        </div>
        
    )
}

export default HomePage;