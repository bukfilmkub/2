<?php
// error_reporting(0);
require '../connectdb.php';

// Load the latest settings from DB
$sql = "SELECT * FROM setting ORDER BY id DESC LIMIT 1 ";
$result = mysqli_query($con, $sql) or die("Error in query: $sql " . mysqli_error($con));
$row = mysqli_fetch_array($result);
extract($row);

// --- API Helper Functions ---
function agentuser() {
    // ใส่ยุสเอเย่น
    return 'b42ppk88';
}

function api_betflix() {
    // ใส่ api-betflix
    return 'JBREtz1aO6eGSHTl';
}

function xapikey() {
    // ใส่ api-key
    return '89de9112d242dab79c06c734836cb76f';
}

// --- API Actions ---
function Balance($username = null) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/balance',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . urlencode($username),
        CURLOPT_HTTPHEADER => array(
            'x-api-betflix: ' . api_betflix(),
            'x-api-key: ' . xapikey(),
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function turnover($username = null) {
    date_default_timezone_set("Asia/Bangkok");
    $start_date = date('Y-m-d');
    $end_date = date('Y-m-d');
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/report/summary?start=' . $start_date . '&end=' . $end_date . '&username=' . urlencode($username),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'x-api-betflix: ' . api_betflix(),
            'x-api-key: ' . xapikey(),
        ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function withdraw($username = null, $credit = null) {
    $ran = rand(10000, 99999);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/transfer',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . urlencode($username) . '&amount=-' . urlencode($credit) . '&ref=with' . $ran,
        CURLOPT_HTTPHEADER => array(
            'x-api-betflix: ' . api_betflix(),
            'x-api-key: ' . xapikey(),
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function deposit($username = null, $credit = null) {
    $ran = rand(10000, 99999);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/transfer',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . urlencode($username) . '&amount=' . urlencode($credit) . '&ref=dps' . $ran,
        CURLOPT_HTTPHEADER => array(
            'x-api-betflix: ' . api_betflix(),
            'x-api-key: ' . xapikey(),
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function register($username = null, $password = null) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/register',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'username=' . urlencode($username) . '&password=' . urlencode($password),
        CURLOPT_HTTPHEADER => array(
            'x-api-betflix: ' . api_betflix(),
            'x-api-key: ' . xapikey(),
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function agentinfo() {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/agent/balance?upline=' . urlencode(agentuser()),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'x-api-betflix: ' . api_betflix(),
            'x-api-key: ' . xapikey(),
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

// --- Action Handlers ---
if (isset($_GET['deposit'])) {
    $admin = $_POST['admin'];
    if ($admin == '') {
        header("Content-Type: text/html; charset=utf-8");
        echo "<script>alert('ท่านไม่สามารถเพิ่มเครดิตได้');window.location.href='javascript:history.back(1)';</script>";
    } else {
        $username = $_POST['username'];
        $amount = $_POST['amount'];
        $data2 = deposit($username, $amount);
        $Balance1 = json_decode($data2);
        $Balance = $Balance1->status;
        if ($Balance == 'success') {
            header("Content-Type: text/html; charset=utf-8");
            echo "<script>alert('เติมเครดิตสำเร็จ');window.location.href='javascript:history.back(1)';</script>";
            $key = $row['linedeposit'];
            $sMessage = "เติมเครดิตโดยแอดมิน \nจำนวนเงิน $amount บาท\nเข้ายูสเซอร์ $username \nผู้ทำรายการ $admin";
            $chOne = curl_init();
            curl_setopt($chOne, CURLOPT_URL, "https://notify-api.line.me/api/notify");
            curl_setopt($chOne, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($chOne, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($chOne, CURLOPT_POST, 1);
            curl_setopt($chOne, CURLOPT_POSTFIELDS, "message=" . $sMessage);
            $headers = array('Content-type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $key);
            curl_setopt($chOne, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($chOne, CURLOPT_RETURNTRANSFER, 1);
            $result = curl_exec($chOne);
        }
    }
}

if (isset($_GET['cashback'])) {
    $username = $_POST['username'];
    $amount = $_POST['amount'];
    echo deposit($username, $amount);
}

if (isset($_GET['withdraw'])) {
    $username = $_POST['username'];
    $amount = $_POST['amount'];
    $admin = $_POST['admin'];
    $data2 = withdraw($username, $amount);
    $Balance1 = json_decode($data2);
    $Balance = $Balance1->status;
    if ($Balance == 'success') {
        header("Content-Type: text/html; charset=utf-8");
        echo "<script>alert('ตัดเครดิตสำเร็จ');window.location.href='javascript:history.back(1)';</script>";
        $key = $row['linewithdraw'];
        $sMessage = "ตัดเครดิตโดยแอดมิน \nจำนวนเงิน $amount บาท\nยูสเซอร์ $username \nผู้ทำรายการ $admin";
        $chOne = curl_init();
        curl_setopt($chOne, CURLOPT_URL, "https://notify-api.line.me/api/notify");
        curl_setopt($chOne, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($chOne, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($chOne, CURLOPT_POST, 1);
        curl_setopt($chOne, CURLOPT_POSTFIELDS, "message=" . $sMessage);
        $headers = array('Content-type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $key);
        curl_setopt($chOne, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($chOne, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($chOne);
    } else {
        header("Content-Type: text/html; charset=utf-8");
        echo "<script>alert('ตัดเครดิตไม่สำเร็จ !!!!');window.location.href='javascript:history.back(1)';</script>";
    }
}

// Example usage (can comment out in production)
// echo Balance('b42ppk88test');
// echo deposit('b42ppk88test', 1);
// echo agentinfo();
// echo withdraw('b42ppk88test',1);
// echo register('test3','aa123456');

// Query current agent+user balance (example)
$data2 = Balance($agent . $username_mb);
$Balance1 = json_decode($data2);
$Balance = isset($Balance1->data->balance) ? $Balance1->data->balance : null;
// echo $Balance;
?>