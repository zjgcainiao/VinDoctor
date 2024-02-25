import { useState, useEffect } from "react";
import axios from "axios";
import firebaseUserStore from "../app/auth/firebaseUserStore";
import { useStoreState } from "pullstate";

const useFetch = (searchParams, token) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');
  useEffect(() => {
    let endpoint, vin, licensePlate, state;

    if ('vin' in searchParams) {
      endpoint = 'vin_data_aggregated';
      vin = searchParams.vin;
    } else if ('licensePlate' in searchParams) {
      endpoint = 'plate_and_vin_data';
      licensePlate = searchParams.licensePlate;
      state = searchParams.state;
    }

    const validEndpoints = ['vin_data_lite', 'vin_data_aggregated', 'plate_and_vin_data'];
    if (validEndpoints.includes(endpoint)) {
      const newUrl = `https://new76prolubeplus.com/apis/${endpoint}/${vin || licensePlate}/${state || ''}/?format=json`;
      setUrl(newUrl);
    } else {
      setError(new Error("Invalid endpoint"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (token && url) {
      const fetchData = async () => {
        setIsFetching(true);
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data);
        } catch (err) {
          setError(err);
          console.log('Error:', err);
        } finally {
          setIsFetching(false);
        }
      };

      fetchData();
    }
  }, [token, url]);

  const refetch = () => {
    setIsFetching(true);
    fetchData();
  };

  return { data, isFetching, error, refetch };
};

export default useFetch;
