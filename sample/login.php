<?php
    require_once("connection.php");

    $phone = $_POST['phone'];
    $password = ($_POST['password']);

    $query = "SELECT * FROM Customer WHERE phone = $phone AND password = $password";


    $Table = mysqli_query($conn, $query);
 
    $json;

    if(mysqli_num_rows($Table) > 0){
            while($Row = mysqli_fetch_assoc($Table))
            {
                $json[] = $Row; 
            }
           mysqli_fetch_all($Table, MYSQLI_ASSOC);

            echo json_encode($json);
    }
    else{
        echo "log in Failed!";

    }
?>