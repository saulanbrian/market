import {
  Box,
  Paper,
} from '@mui/material'

import { border, styled } from '@mui/system'

import React from 'react'
import { Outlet } from 'react-router-dom'

import Navigation from '../components/Navigation'
import HoldableComponent from '../components/HoldableComponent'


export default function LandingPage(){
  
  return (
    <HoldableComponent 
      holdCallback={() => {console.log('hello')}} 
      holdSec={10}>
        <h1>landing page</h1>
    </HoldableComponent>
  )
}