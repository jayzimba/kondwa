<?php

require_once("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $city = $_POST['city'];
    $street = $_POST['street'];
    $houseNumber = $_POST['houseNumber'];
    $date = $_POST['date'];
    $phoneNumber = $_POST['phoneNumber'];
    $email = $_POST['email'];
    $garbageType = $_POST['garbageType'];
    $isLocationSend = $_POST['isLocationSend'];
    
  
        $sql = "INSERT INTO requests (city, street, houseNumber, date, phoneNumber, email, garbageType, isLocationSend)
                VALUES ('$city', '$street', '$houseNumber', '$date', '$phoneNumber', '$email', '$garbageType', '$isLocationSend' )";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Request inserted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error inserting request']);
        }

        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error uploading image']);
    }

?>
