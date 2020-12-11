import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const fetchAPI = async (data) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://dokadev-fleetmanager.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/2b746151d5be4db9a484525a19108656/AHU1?from=2020-12-08T06:17:00.000Z&to=2020-12-08T07:17:00.000Z&sort=desc&limit=256&select=AirIn_Humidity_Pct",
        {
          // https://cors-anywhere.herokuapp.com/
          // credentials: true,
          // withCredentials: true,
          // exposedHeaders: ["set-cookie"],
          headers: {
            Cookie:
              "ste_vi=vi_fv%3A1606201058987%7Cvi%3A6e43b822b84d03c553ad35d3ea42a815; AMCV_EFB35E09512D2A530A490D4D%40AdobeOrg=1099438348%7CMCMID%7C06485376781080288280534405425586232035%7CvVersion%7C2.1.0; REGION-SESSION=f598def9-9c7d-4a90-a321-00f6bf52153d536ef00d; XSRF-TOKEN=3f05796b-e617-45fc-998f-12d7a6d362de; SESSION=ZTg0ODk0NjYtNGFjYS00Mzg0LTk4MTYtOTIwMjEyNTE1NDVm",
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchAPI();
    // const interval = setInterval(() => {
    //   fetchAPI();
    // }, 20000);
    // return () => clearInterval(interval);
  }, []);

  return <div>halo</div>;
};

export default Test;
