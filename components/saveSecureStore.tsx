import * as SecureStore from 'expo-secure-store';
import icons from '../constants/icons';
import React, { useState, useEffect } from "react";
const SEARCH_LIMIT = 3;
// the follwoing three token functions work together
export const fetchAndStoreAnonymousToken = async () => {
    let url='';

    if (process.env.NODE_ENV === 'development') {
        url = 'http://127.0.0.1:8000/apis/get_anonymous_token/?format=json';
    } else {
        url = 'https://new76prolubeplus.com/apis/get_anonymous_token/?format=json';
    }

    // acccess = await SecureStore.getItemAsync('jwtAccessToken');
    // refresh = await SecureStore.getItemAsync('jwtRefreshToken');
    // if (acccess && refresh) {
    //     return;
    // }

    const response = await fetch(url);
    const data = await response.json();
    console.log('data that fetched from anonymous token source:', data);
    await SecureStore.setItemAsync('jwtAccessToken', data.access);
    await SecureStore.setItemAsync('jwtRefreshToken', data.refresh);
};

export const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('jwtRefreshToken');
    const response = await fetch('https://new76prolubeplus.com/apis/token/verify/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!response.ok) {
        throw new Error('Token refresh failed');
    }

    const data = await response.json();
    await SecureStore.setItemAsync('jwtAccessToken', data.access);
    return data.access;
};

export const getAccessToken = async () => {
    let accessToken = await SecureStore.getItemAsync('jwtAccessToken');
    //  verify token and refresh if necessary
    if (!accessToken) {
        await fetchAndStoreAnonymousToken();
        accessToken = await SecureStore.getItemAsync('jwtAccessToken');
    }

    return accessToken;
};

export const initializeSearchCounter = async () => {
  const searchCount = await SecureStore.getItemAsync('anonymousSearchCount');
  if (!searchCount) {
    // Set the initial search count to 3 for new anonymous users
    await SecureStore.setItemAsync('anonymousSearchCount', JSON.stringify(3));
  }
};

export const saveVinSearchCount = async (count) => {
  await SecureStore.setItemAsync('vin_search_count', count.toString(count));
};

export const getVinSearchCount = async ()=> {
  let result = await SecureStore.getItemAsync('vin_search_count');
  if (result) {
    return parseInt(result, 10);
  } else {
    // Default value if not yet set
    return 5;
  }
};

export const saveLicensePlateSearchCount = async (count) => {
  await SecureStore.setItemAsync('license_plate_search_count', count.toString());
};

export const getLicensePlateSearchCount = async ()=> {
  let result = await SecureStore.getItemAsync('license_plate_search_count');
  if (result) {
    return parseInt(result, 5);
  } else {
    // Default value if not yet set
    return 1;
  }
};


export const saveSearchedVins = async ()=>{
  await SecureStore.setItemAsync('searchedVins', JSON.stringify(newVINs));
};

export const  getSearchedVins = async ()=> {
    let result = await SecureStore.getItemAsync('vins');
    if (result) {
        return parseInt(result, 10);
    } else {
        // Default value if not yet set
        return [];
    }
};