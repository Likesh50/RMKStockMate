import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import './purchase.css';
import "./tables.css";

// Setting up Axios interceptors for logging requests and responses
axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});