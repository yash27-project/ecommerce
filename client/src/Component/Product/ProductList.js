import React, { useEffect, useMemo, useState } from 'react';
import './Product.css'
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [sortkey, setSortKey] = useState("start");
    const [sortOrder, setSortOrder] = useState("DESC");

    useEffect(() => {
        productData();
    }, [page,limit,totalRows,search,sortOrder,sortkey])

    // useEffect(() => {
    //   if(search){
    //     let userId = JSON.parse(localStorage.getItem('user'))._id
    //     axios({
    //       url : `http://localhost:4000/search/${userId}/${search}`,
    //       method : 'GET',
    //       headers : {
    //         Authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
    //       }
    //     }).then((res)=>{
    //       if(res?.data){
    //         setProductList(res.data)
    //       }
          
    //     }).catch(err=>console.log(err))
    //   } else {
    //     productData();
    //   }
    // }, [search])
    

    const productData=()=>{
      let userId = JSON.parse(localStorage.getItem('user'))._id
      console.log("userId",userId)
      let data={
        id : userId,
        page : page,
        limit : limit,
        search : search
      }
        axios({
            url : `http://localhost:4000/product-list`,
            method : "Post",
            headers : {
              Authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            data : data
        }).then((res)=>{
                console.log("res",res)
                if(res.data.result){
                  setProductList(res.data.result);
                  setTotalRows(res.data.totalPages)
                  setLoading(false);
                }
                
        }).catch((err)=>{console.log(err); setLoading(false);})
    }

    const columns = useMemo(()=>[
        {
            name: 'Product',
            id: 'name',
            sortable: true,
            sortField: 'name',
            wrap: true,
            selector: (row) => row.name
          },
          {
            name: 'Price',
            id: 'price',
            sortable: true,
            sortField: 'price',
            wrap: true,
            selector: (row) => row.price
          },
          {
            name: 'Category',
            id: 'category',
            sortable: true,
            sortField: 'category',
            wrap: true,
            selector: (row) => row.category
          },
          {
            name: 'Company',
            id: 'company',
            sortable: true,
            sortField: 'company',
            wrap: true,
            selector: (row) => row.company
          },
          {name: 'Actions',
          selector : (row)=>[
            <button type='button' className='column-button' onClick={()=>{handleDelete(row._id)}}>Delete</button>,
            <button type='button' className='column-button'><Link className='column-update' to={`/product/update/${row._id}`}>Update</Link></button>
          ]
          }
    ],[])

    const handleDelete=(id)=>{
        axios({
            url :`http://localhost:4000/product/${id}`,
            method : "Delete",
            headers : {
              Authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then((res)=>{
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
              ).then(()=>{
                productData();
              })
            }
          })
                
        }).catch((err)=>{console.log(err); setLoading(false);})
    }

    const onHandleSearch=(e)=>{
      let key = e.target.value;
      setSearch(key);
    }
    const handleReset=()=>{
      setSearch("")
    }

    const handlePageChange = (pageNo) => {
      setPage(pageNo);
    };
  
    const handlePerRowsChange = (newPerPage, page) => {
      setLimit(newPerPage);
    };
  
    const handleSort = (column, sortDirection) => {
      setSortKey(column.sortField);
      setSortOrder(sortDirection === "asc" ? "ASC" : "DESC");
    };
  
    
  return (
    <div className='productlist'>
        <input onChange={(e)=>{onHandleSearch(e)}} value={search} className='search' type='text' placeholder='Search'/>
        <button className='reset' type='button' onClick={()=>{handleReset()}}>Reset</button>
        <DataTable
        data={productList}
        columns={columns}
        pagination={true}
        progressComponent={<Skeleton count={5} />}
        progressPending={loading}
        noDataComponent={"No record found"}
        defaultSortAsc={true}
        onSort={handleSort}
        defaultSortField={"Company"}
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        highlightOnHover={false}
        // paginationRowsPerPageOptions={10}
        />
  </div>
  )
}

export default ProductList