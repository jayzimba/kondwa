<?php
  $servername = '62.72.50.52';
  $username = 'u314956449_kondwani';
  $password = '12345678Joe';
  $dbname = 'u314956449_kondwagreen';

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die('Connection failed: ' . $conn->connect_error);
  }
  
?>