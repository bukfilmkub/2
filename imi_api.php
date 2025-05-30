<?php
error_reporting(0);
date_default_timezone_set("Asia/Bangkok");
require_once 'config/config.php';
include "config/config_data.php";

class imi {
    private $timestamp;
    private $agent;
    private $key;

    public function milliseconds() {
        $mt = explode(' ', microtime());
        return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
    }

    public function __construct($agent, $key = array()) {
        $this->timestamp = $this->milliseconds();
        $this->agent = $agent;
        $this->key = $key;
    }

    public function Curl($method, $url, $data = null)  {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_TIMEOUT => 10,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => $this->key,
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function register($username, $Fullname, $Password, $Mobile) {
        $data = 'username=' . $username . '&password=' . $Password . '&name=' . $Fullname . '&tel=' . $Mobile . '&note=';
        $res = $this->Curl("POST", 'https://api.bfx.fail/v4/user/register', $data);
        return $res;
    }

    public function get_balance($username) {
        $data = 'username=' . $this->agent . $username;
        $res = $this->Curl("POST", 'https://api.bfx.fail/v4/user/balance', $data);
        return $res;
    }

    public function deposit($username, $Amount) {
        $ref = 'ad' . time() . $username;
        $Amount = str_replace(",", "", $Amount);
        $data = 'username=' . $this->agent . $username . '&amount=' . $Amount . '&ref=' . $ref;
        $res = $this->Curl("POST", 'https://api.bfx.fail/v4/user/transfer', $data);
        return $res;
    }

    public function withdraw($username, $Amount) {
        $ref = 'wd-' . time() . $username;
        $Amount = str_replace(",", "", $Amount);
        $data = 'username=' . $this->agent . $username . '&amount=-' . $Amount . '&ref=' . $ref;
        $res = $this->Curl("POST", 'https://api.bfx.fail/v4/user/transfer', $data);
        return $res;
    }

    public function report_game($lastId, $month, $limit, $username) {
        $res = $this->Curl("GET", 'https://api.bfx.fail/v4/report/getBetlog?lastedID=' . $lastId . '&month=' . (int)$month . '&limit=' . $limit . '&upline=' . $this->agent . $username, null);
        return $res;
    }

    public function Turnover($username) {
        $StartDate = date("Y-m-d");
        $EndDate = date('Y-m-d');
        $res = $this->Curl("GET", 'https://api.bfx.fail/v4/report/summary?username=' . $this->agent . $username . '&start=' . $StartDate . '&end=' . $EndDate, null);
        $data = json_decode($res, true);
        return isset($data['data']['turnover']) ? $data['data']['turnover'] : null;
    }

    public function Winlose($username, $StartDate) {
        $res = $this->Curl("GET", 'https://api.bfx.fail/v4/report/summary?username=' . $this->agent . $username . '&start=' . $StartDate . '&end=' . $StartDate, null);
        $data = json_decode($res, true);
        return isset($data['data']['winloss']) ? $data['data']['winloss'] : null;
    }

    public function report($username) {
        $startDate = date("Y-m-d");
        $endDate = date('Y-m-d', strtotime("+1 day"));
        $res = $this->Curl("GET", 'https://api.bfx.fail/v4/report/summary2?username=' . $this->agent . trim($username) . '&start=' . $startDate . '&end=' . $endDate, null);
        $data = json_decode($res, true);
        return isset($data['data']) ? $data['data'] : null;
    }

    public function report1($username, $startDate) {
        $res = $this->Curl("GET", 'https://api.bfx.fail/v4/report/summary2?username=' . $this->agent . trim($username) . '&start=' . $startDate . '&end=' . $startDate, null);
        $data = json_decode($res, true);
        return isset($data['data']) ? $data['data'] : null;
    }

    public function edit($username, $name, $tel) {
        $data = 'username=' . $this->agent . $username . '&name=' . $name . '&note=&tel=' . $tel;
        $res = $this->Curl("POST", 'https://api.bfx.fail/v4/user/edit', $data);
        return $res;
    }

    public function play($username, $provider, $gamecode, $language, $openGame, $returnUrl) {
        $data = 'username=' . $this->agent . $username . '&provider=' . $provider . '&gamecode=' . $gamecode . '&language=' . $language . '&openGame=' . $openGame . '&returnUrl=' . $returnUrl;
        $res = $this->Curl("POST", 'https://api.bfx.fail/v4/play/login', $data);
        return $res;
    }

    public function balance_agent() {
        $res = $this->Curl("GET", 'https://api.bfx.fail/v4/agent/balance?upline=' . $this->agent, null);
        $data = json_decode($res, true);
        return isset($data['data']['total_credit']) ? $data['data']['total_credit'] : null;
    }

    // ... (ฟังก์ชัน ChangePassword และอื่นๆ)
}

$api = new imi($agent, $key_betflix);