"use client"


import SinglePostDetails from '@/app/_components/SinglePost/SinglePost';
import SkelltonLoading from '@/app/_components/SkelltonLoading/SkelltonLoading';
import { getSinglePost } from '@/app/redux/slices/postsSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
interface IPrams{
  id:string
}
export default function SinglePost(props:{params:IPrams}) {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const router = useRouter();
const  {loading,post}= useSelector((state:RootState)=>state.posts)
const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
  
  dispatch(getSinglePost(props.params.id))
  }, [props.params.id ,dispatch])

  
useEffect(() => {
  if (!localStorage.getItem("token")) {
    router.push("/signin");
  }
}, [token, router]);

if (!token) {
  return null;
}




  return (
    <Container maxWidth="sm">
        {loading ? <SkelltonLoading /> : post && <SinglePostDetails/>}
      </Container>
  )
}
