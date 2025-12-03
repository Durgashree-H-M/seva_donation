<?php
// saveDonation.php
date_default_timezone_set("Asia/Kolkata");

// ---------- DB CONNECT ----------
$host = "localhost";
$user = "root";
$pass = "";
$db   = "website";

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    // stop and show error
    die("Database connection failed: " . mysqli_connect_error());
}

// ---------- COLLECT & SANITIZE INPUTS ----------
$first  = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
$last   = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
$email  = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone  = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$paymentMethod  = isset($_POST['paymentMethod']) ? trim($_POST['paymentMethod']) : '';
$donationDetails = isset($_POST['donation_details']) ? trim($_POST['donation_details']) : '';
$totalAmount     = isset($_POST['total_amount']) ? trim($_POST['total_amount']) : '';
// $notes           = isset($_POST['notes']) ? trim($_POST['notes']) : '';

// optional: cast total to numeric (if expected numeric)
if ($totalAmount === '') {
    $totalAmount = 0;
} else {
    // remove non-numeric characters except dot
    $totalAmount = preg_replace('/[^\d\.]/', '', $totalAmount);
    $totalAmount = $totalAmount === '' ? 0 : $totalAmount;
       

}



// ---------- INSERT using prepared statement ----------
$sql = "INSERT INTO donations 
    (first_name, last_name, email, phone, payment_method, donation_details, total_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);
if (!$stmt) {
    die("Prepare failed: " . mysqli_error($conn));
}

// bind parameters: s = string, d = double (use s for total as well to keep simple)
mysqli_stmt_bind_param($stmt, "sssssss",
    $first,
    $last,
    $email,
    $phone,
    $paymentMethod,
    $donationDetails,
    $totalAmount
);

$executed = mysqli_stmt_execute($stmt);

if ($executed) {
    // success — redirect or show message
    echo "<script>
            alert('🙏 Thank you — donation recorded successfully.');
            window.location.href = 'thankyou.html';
          </script>";
} else {
    // show error for debugging (remove in production)
    echo "Error saving donation: " . mysqli_stmt_error($stmt);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
