<?php
// Ensure you have a database connection established here.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if an image file was sent
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Read the image file
        $imageData = file_get_contents($_FILES['image']['tmp_name']);

        // Escape the binary data to prevent SQL injection
        $escapedImageData = mysqli_real_escape_string($connection, $imageData);

        // Get the original file name
        $imageName = $_FILES['image']['name'];

        // Insert the image data into the database
        $query = "INSERT INTO images (image_data, image_name) VALUES ('$escapedImageData', '$imageName')";
        $result = mysqli_query($connection, $query);

        if ($result) {
            echo json_encode(array('message' => 'Image uploaded successfully.'));
        } else {
            echo json_encode(array('error' => 'Failed to upload image.'));
        }
    } else {
        echo json_encode(array('error' => 'No image file uploaded or an error occurred.'));
    }
} else {
    echo json_encode(array('error' => 'Invalid request method.'));
}
?>
