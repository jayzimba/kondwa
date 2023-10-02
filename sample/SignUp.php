<?php
    require_once("connection.php");
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $city = $_POST['city'];
    $street = $_POST['street'];
    $phone = $_POST['phone'];
    $password = ($_POST['password']);
    
    
    $query = "SELECT * FROM Customer WHERE phone = '$phone' OR email = '$email";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0)
    {
        echo'here';
        $Reg_Query = "INSERT INTO Customer(`name`, `phone`, `password`, `email`, 'street', 'city') VALUES ('$name', '$phone', '$password', '$email', '$street', '$city')";
        $Reg_Query_Result = $conn->query($Reg_Query);
    
        if ($Reg_Query_Result) 
        {
            $Message = "Registered successfuly!";
        } else 
        {
            $Message = "Error - Try again";
        }
        
    } else 
    {
        $Message = "User Already Registered";
    }
    
    $response[] = array("Message" => $Message);
    
    echo json_encode($response);
?>