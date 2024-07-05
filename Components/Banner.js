import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getBanners } from '@/Services/api';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
export default function BannerDataTable() {
    
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getBanners();
        console.log(apiData, "Fetched banner data"); 
        setBannerData(apiData?.data?.results); 
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'image', headerName: 'Image', width: 250, renderCell: (params) => (
        <img src={params.value} alt={params.row.title} style={{ width: '100%', height: '200%',  objectFit: 'cover',}} />
      )
    },
    { 
        field: 'created_at', 
        headerName: 'Created At', 
        width: 180, 
        valueGetter: (params) => moment(params.value).format('YYYY-MM-DD HH:mm') 
      },
    { field: 'is_active', headerName: 'Active', width: 120, type: 'boolean' },
    { field: 'order', headerName: 'Order', width: 100 },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600, width: '100%' }}>
        <CircularProgress /> 
      </Box>
    );
  }

  return (


    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
       rowHeight={100}
        rows={bannerData}
        columns={columns}
    
      />
    </Box>
  );
}
