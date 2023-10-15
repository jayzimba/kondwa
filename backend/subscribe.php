<?php

require_once("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $customerID = $_POST['customerID'];
    $companyID = $_POST['companyID'];
    

        $sql = "UPDATE Customer SET companyID='$companyID' WHERE id='$customerID'";

        if ($conn->query($sql) === true) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }

        $conn->close();
    } else {
        echo json_encode(['success' => false]);
    }

?>
