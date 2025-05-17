<?php
function agentuser() { return 'bdaccdemo0'; }
function api_betflix() { return 'pIZkwgh7xandGQrc'; }
function xapikey() { return '9cb07f925b2fc376387ae7f8a30bdd3d'; }

function Balance($username = null) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/balance',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
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
function deposit($username = null, $credit = null) {
    $ran = rand(10000, 99999);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/transfer',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
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
function withdraw($username = null, $credit = null) {
    $ran = rand(10000, 99999);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.bfx.fail/v4/user/transfer',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
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
?>